import React from "react";

const Loader = ({ dark }) => {
  return <div className={`loader${dark ? " dark" : ""}`}>Loading...</div>;
};

export default Loader;
