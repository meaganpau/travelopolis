import React from "react";
import PropTypes from "prop-types";

const Trip = props => {
  const { name, id } = props;
  return (
    <li key={id}>
      {name}
    </li>
  );
};

Trip.propTypes = {
  name: PropTypes.string.isRequired
};

export default Trip;
