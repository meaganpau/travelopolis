import React from "react";
import { removeToken } from "../services/tokenServices";

const Logout = props => {
  const logout = () => {
    removeToken('userToken');
    props.setUser(null);
  };
  return <button onClick={logout}>Logout</button>;
};

export default Logout;
