import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const IkigaiChart = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <h1>Your Ikigai chart</h1>
      <pre>{JSON.stringify(location.state, null, 4)}</pre>
      <button
        onClick={() =>
          history.push({
            pathname: "/what-are-you-paid-for",
            state: location.state,
          })
        }
      >
        Back
      </button>
    </>
  );
};

export default IkigaiChart;
