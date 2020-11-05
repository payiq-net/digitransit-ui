import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import Icon from './Icon';
import { displayDistance } from '../util/geo-utils';
import { durationToString } from '../util/timeUtils';
import {
  getTotalDistance,
  getTotalBikingDistance,
  compressLegs,
} from '../util/legUtils';

export const StreetModeSelectorButton = (
  { icon, name, plan, onClick },
  { config, intl },
) => {
  let itinerary = plan.itineraries[0];
  if (!itinerary) {
    return null;
  }

  if (name === 'bikeAndVehicle') {
    const compressedLegs = compressLegs(itinerary.legs);
    itinerary = {
      ...itinerary,
      legs: compressedLegs,
    };
  }

  const duration = durationToString(itinerary.duration * 1000);
  let distance = 0;
  switch (name) {
    case 'WALK':
      distance = displayDistance(itinerary.walkDistance, config);
      break;
    case 'bikeAndVehicle':
      distance = displayDistance(getTotalBikingDistance(itinerary), config);
      break;
    default:
      distance = displayDistance(getTotalDistance(itinerary), config);
      break;
  }

  let secondaryIcon;

  if (name === 'bikeAndVehicle') {
    const publicModes = plan.itineraries[0].legs.filter(
      obj => obj.mode !== 'WALK' && obj.mode !== 'BICYCLE',
    );
    if (publicModes.length > 0) {
      const firstMode = publicModes[0].mode.toLowerCase();
      secondaryIcon = `icon-icon_${firstMode}`;
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="street-mode-selector-button-container"
      onClick={() => onClick(name)}
      role="button"
      tabIndex={0}
      aria-label={intl.formatMessage(
        {
          id: `street-mode-${name.toLowerCase()}-aria`,
          defaultMessage: 'Walk plan',
        },
        {
          length: distance,
          duration,
        },
      )}
    >
      <div className="street-mode-selector-button-content">
        <div
          className={`street-mode-selector-button-icon ${
            secondaryIcon ? 'primary-icon' : ''
          }`}
        >
          <Icon img={icon} />
        </div>
        {name === 'bikeAndVehicle' ? (
          <div className="street-mode-selector-button-icon secondary-icon">
            <Icon img={secondaryIcon} />
          </div>
        ) : (
          ''
        )}
        <div className="street-mode-button-info">
          <div className="street-mode-button-time">{duration}</div>
          <div className="street-mode-button-length">{distance}</div>
        </div>
      </div>
    </div>
  );
};

StreetModeSelectorButton.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  plan: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

StreetModeSelectorButton.defaulProps = {
  plan: undefined,
};

StreetModeSelectorButton.contextTypes = {
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired,
};
export default StreetModeSelectorButton;
