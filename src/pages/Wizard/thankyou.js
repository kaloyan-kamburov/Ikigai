import React, { useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context";

const Congratulations = () => {
  const history = useHistory();
  const location = useLocation();
  const [userDetails, setUserDetails] = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (Object.keys(userDetails.user).length) {
      return history.push("/chart");
    }

    const ikiSettings = JSON.parse(localStorage.getItem("ikigai"));
    if (
      !ikiSettings ||
      !(
        ikiSettings &&
        !(
          ikiSettings &&
          (!ikiSettings.step_A ||
            !ikiSettings.step_B ||
            !ikiSettings.step_C ||
            !ikiSettings.step_D)
        )
      )
    ) {
      return history.push("/");
    }
  }, []);
  return (
    <section className="section-yellowFull">
      <div className="shell">
        <div className="congratulations">
          <h1 className="congrats-title">Thank you!</h1>
         
          <div className="congrats-body">
            <p>
              We will be back in touch soon.
            </p>
           
          </div>
          <div className="congrats-btns">
            <button
              className="btn-small"
              onClick={() => {
                const ikiSettings = JSON.parse(localStorage.getItem("ikigai"));
                localStorage.setItem(
                  "ikigai",
                  JSON.stringify({ ...ikiSettings, dateCreated: new Date() })
                );

                history.push({
                  pathname: "/chart",
                  state: location.state,
                });
              }}
            >
        Go to homepage
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Congratulations;
