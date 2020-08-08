import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => history.push("/what-are-you-good-at")}>
        Start here
      </button>
    </>
  );
};

export default Home;
