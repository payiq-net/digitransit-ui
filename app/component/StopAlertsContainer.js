import uniqBy from 'lodash/uniqBy';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import Relay from 'react-relay/classic';

import AlertList from './AlertList';
import DepartureCancelationInfo from './DepartureCancelationInfo';
import { DATE_FORMAT, AlertSeverityLevelType } from '../constants';
import {
  getServiceAlertsForRoute,
  getServiceAlertsForStop,
  otpServiceAlertShape,
  routeHasServiceAlert,
  stoptimeHasCancelation,
} from '../util/alertUtils';

const StopAlertsContainer = ({ stop }, { intl }) => {
  const cancelations = stop.stoptimes
    .filter(stoptimeHasCancelation)
    .map(stoptime => {
      const { color, mode, shortName } = stoptime.trip.route;
      const departureTime = stoptime.serviceDay + stoptime.scheduledDeparture;
      return {
        header: (
          <DepartureCancelationInfo
            firstStopName={stoptime.trip.stops[0].name}
            headsign={stoptime.headsign}
            routeMode={mode}
            scheduledDepartureTime={departureTime}
            shortName={shortName}
          />
        ),
        route: {
          color,
          mode,
          shortName,
        },
        severity: AlertSeverityLevelType.Warning,
        validityPeriod: {
          startTime: departureTime,
        },
      };
    })
    .reduce((a, b) => a.concat(b), []);

  const serviceAlerts = uniqBy(
    stop.stoptimes
      .map(stoptime => stoptime.trip.route)
      .filter(routeHasServiceAlert),
    route => route.shortName,
  )
    .map(route => getServiceAlertsForRoute(route, intl.locale))
    .reduce((a, b) => a.concat(b), [])
    .concat(getServiceAlertsForStop(stop, intl.locale));

  return (
    <AlertList cancelations={cancelations} serviceAlerts={serviceAlerts} />
  );
};

StopAlertsContainer.propTypes = {
  stop: PropTypes.shape({
    alerts: PropTypes.arrayOf(otpServiceAlertShape).isRequired,
    stoptimes: PropTypes.arrayOf(
      PropTypes.shape({
        headsign: PropTypes.string.isRequired,
        realtimeState: PropTypes.string,
        scheduledDeparture: PropTypes.number,
        serviceDay: PropTypes.number,
        trip: PropTypes.shape({
          route: PropTypes.shape({
            alerts: PropTypes.arrayOf(otpServiceAlertShape).isRequired,
            color: PropTypes.string,
            mode: PropTypes.string.isRequired,
            shortName: PropTypes.string.isRequired,
          }).isRequired,
          stops: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
            }),
          ).isRequired,
        }).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

StopAlertsContainer.contextTypes = {
  intl: intlShape.isRequired,
};

const containerComponent = Relay.createContainer(StopAlertsContainer, {
  fragments: {
    stop: () => Relay.QL`
      fragment Timetable on Stop {
        alerts {
          alertDescriptionText
          alertHash,
          alertHeaderText
          alertSeverityLevel
          effectiveEndDate
          effectiveStartDate
          alertDescriptionTextTranslations {
            language
            text
          }
          alertHeaderTextTranslations {
            language
            text
          }
        }
        stoptimes: stoptimesWithoutPatterns(
          startTime:$startTime,
          timeRange:$timeRange,
          numberOfDepartures:100,
          omitCanceled:false
        ) {
          headsign
          realtimeState
          scheduledDeparture
          serviceDay
          trip {
            route {
              color
              mode
              shortName
              alerts {
                alertDescriptionText
                alertHash
                alertHeaderText
                alertSeverityLevel
                effectiveEndDate
                effectiveStartDate
                alertDescriptionTextTranslations {
                  language
                  text
                }
                alertHeaderTextTranslations {
                  language
                  text
                }
              }
            }
            stops {
              name
            }
          }
        }
      }
    `,
  },
  initialVariables: {
    startTime: moment().unix() - 60 * 5, // 5 mins in the past
    timeRange: 60 * 15, // -5 + 15 = 10 mins in the future
    date: moment().format(DATE_FORMAT),
  },
});

export { containerComponent as default, StopAlertsContainer as Component };
