import React from "react";
import { Link } from 'react-router-dom';

const Trip = props => {
  const { name, slug } = props;
  return (
    <Link to={`/${slug}`}>{name}</Link>
  );
};

export default Trip;
