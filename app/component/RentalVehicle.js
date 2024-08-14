import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';
import {
  getRentalNetworkIcon,
  getRentalNetworkConfig,
  getRentalNetworkIdByRental,
} from '../util/vehicleRentalUtils';
import { rentalVehicleShape } from '../util/shapes';

const RentalVehicle = ({ rentalVehicle }, { config }) => {
  const disabled = !rentalVehicle.operative;

  const vehicleIcon = getRentalNetworkIcon(
    getRentalNetworkConfig(
      getRentalNetworkIdByRental(rentalVehicle, config),
      config,
    ),
    disabled,
  );
  return (
    <div className="scooter-content-container">
      <Icon img={vehicleIcon} />
    </div>
  );
};

RentalVehicle.contextTypes = {
  config: PropTypes.shape({
    vehicleRental: { networks: PropTypes.arrayOf(PropTypes.string.isRequired) },
  }).isRequired,
};
RentalVehicle.propTypes = {
  rentalVehicle: rentalVehicleShape.isRequired,
};
export default RentalVehicle;
