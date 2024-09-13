import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { legShape } from '../../util/shapes';
import Icon from '../Icon';
import { legDestination, isRental } from '../../util/legUtils';
import NaviDestination from './NaviDestination';

const iconMap = {
  BICYCLE: 'icon-icon_cyclist',
  CAR: 'icon-icon_car-withoutBox',
  SCOOTER: 'icon-icon_scooter_rider',
  WALK: 'icon-icon_walk',
};

/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
export default function NaviLeg({ leg, focusToLeg, nextLeg }, { intl }) {
  const iconName = iconMap[leg.mode];
  let goTo = `navileg-${leg.mode.toLowerCase()}`;

  if (isRental(leg, nextLeg)) {
    if (leg.mode === 'WALK' && nextLeg?.mode === 'SCOOTER') {
      goTo = `navileg-rent-scooter`;
    } else {
      goTo = `navileg-rent-cycle`;
    }
  }
  return (
    <div>
      <div className="navileg-goto">
        <Icon img={iconName} className="navileg-mode" />
        <FormattedMessage id={goTo} defaultMessage="Go to" />
        &nbsp;
        {legDestination(intl, leg, null, nextLeg)}
      </div>
      <div className="navileg-destination">
        <div className="navi-left-bar" />
        <NaviDestination leg={leg} focusToLeg={focusToLeg} />
      </div>
    </div>
  );
}

NaviLeg.propTypes = {
  leg: legShape.isRequired,
  focusToLeg: PropTypes.func.isRequired,
  nextLeg: legShape,
};

NaviLeg.defaultProps = {
  nextLeg: null,
};

NaviLeg.contextTypes = {
  intl: intlShape.isRequired,
};
