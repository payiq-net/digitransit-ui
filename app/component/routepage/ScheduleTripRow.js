/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@digitransit-component/digitransit-component-icon';

function ScheduleTripRow(props) {
  return (
    <div className="row" role="listitem" tabIndex={0}>
      <div className="trip-column">
        <div
          className={cx('trip-from', 'trip-label', {
            canceled: props.isCanceled,
          })}
        >
          {props.departureTime}
        </div>
        <div className="trip-separator">
          <Icon img="arrow" color="#888888" />
        </div>
        <div
          className={cx('trip-to', 'trip-label', {
            canceled: props.isCanceled,
          })}
        >
          {props.arrivalTime}
        </div>
      </div>
    </div>
  );
}
ScheduleTripRow.propTypes = {
  departureTime: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  isCanceled: PropTypes.bool,
};

ScheduleTripRow.defaultProps = {
  isCanceled: false,
};

ScheduleTripRow.displayName = 'ScheduleTripRow';

export default ScheduleTripRow;
