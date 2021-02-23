import React, { useEffect, useContext, useState } from "react";
import { useHistory /*, useLocation*/ } from "react-router-dom";
import { UserContext } from "../../context";
import { Form, Field } from "react-final-form";
import { required, composeValidators, email } from "../../utils/validation";
import axios from "../../utils/api";
import Loader from "../../components/Loader";

const Congratulations = () => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useContext(UserContext);
  const [formSubmitting, setFormSubmitting] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (values) => {
    setFormSubmitting(true);
    axios({
      url: "subscribe/",
      data: {
        email: values.email,
        ikigai: JSON.parse(localStorage.getItem("ikigai")),
      },
      method: "post",
    })
      .then(({ data }) => setEmailSent(true))
      .catch(() => setEmailSent(false))
      .finally(() => setFormSubmitting(false));
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="section-yellowFull">
      <div className="shell">
        <div className="congratulations">
          {formSubmitting && <Loader />}
          {!emailSent ? (
            <>
              <h1 className="congrats-title">Congratulations!</h1>
              <Form
                validate={(values) => {
                  const errors = {};
                  return errors;
                }}
                onSubmit={handleSubmit}
                initialValues={{}}
              >
                {(props) => {
                  return (
                    <form onSubmit={props.handleSubmit}>
                      <div className="congrats-body">
                        <p>You have filled in your ikigai.</p>
                        <p>
                          We will send you a link to your ikigai Venn diagram.{" "}
                          <br></br>
                          Please, enter your email below:{" "}
                        </p>
                      </div>
                      <div className="field-wrapper congrats">
                        <Field
                          name="email"
                          component="input"
                          type="email"
                          placeholder="Type your email here ..."
                          className={
                            props.touched.email && props.errors.email
                              ? "invalid"
                              : ""
                          }
                          validate={composeValidators(required, email)}
                        />
                      </div>
                      <div className="congrats-btns">
                        <button
                          disabled={!props.valid}
                          className="btn-lg"
                          onClick={() => {
                            const ikiSettings = JSON.parse(
                              localStorage.getItem("ikigai")
                            );
                            localStorage.setItem(
                              "ikigai",
                              JSON.stringify({
                                ...ikiSettings,
                                dateCreated: new Date(),
                              })
                            );

                            // history.push({
                            //   pathname: "/chart",
                            //   state: location.state,
                            // });
                          }}
                        >
                          submit
                        </button>
                      </div>
                    </form>
                  );
                }}
              </Form>
            </>
          ) : (
            <>
              <div className="shell">
                <div className="congratulations">
                  <h1 className="congrats-title">Thank you!</h1>
                  <div className="congrats-body">
                    <p>We will be back in touch soon.</p>
                  </div>
                  <div className="congrats-btns">
                    <button
                      className="btn-lg"
                      onClick={() => history.push("/")}
                    >
                      Go to homepage
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Congratulations;
