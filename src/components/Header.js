import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { required, composeValidators, email } from "../utils/validation";
import Loader from "./Loader";
import axios from "../utils/api";

const Header = () => {
  const [loginModal, setLoginModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios({
        url: "login",
        method: "post",
      })
        .then(({ data }) => {
          setLoading(false);
          setLoginModal(false);
          resolve();
        })
        .catch((e) => {
          setLoading(false);
          reject();
        });
    });

    // console.log(`${baseUrl}login`);
    // // setLoginModal(false);
    // fetch(`${baseUrl}login`, {
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   method: "POST",
    // })
    //   .then((data) => {
    //     data.json().then((data) => console.log(data));
    //   })
    //   .catch((e) => console.log(e));
  };
  return (
    <header>
      <div className="logo">Logo</div>
      <div className="profile-controls">
        <span style={{ cursor: "pointer" }} onClick={() => setLoginModal(true)}>
          Log in
        </span>
      </div>

      {/** modals */}
      {loginModal && (
        <div className="modal-mask">
          <div className="modal-wrapper">
            {loading && <Loader />}
            <span
              className="closeBtn"
              onClick={() => setLoginModal(false)}
            ></span>
            <div className="modal-content">
              <h6>Login</h6>
              <Form onSubmit={handleSubmit}>
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
                    <div className="field-wrapper">
                      <Field
                        name="email"
                        component="input"
                        type="text"
                        placeholder="First Name"
                        className={
                          props.touched.password && props.errors.password
                            ? "invalid"
                            : ""
                        }
                        // validate={composeValidators(required, email)}
                      />
                    </div>

                    <div className="field-wrapper">
                      <Field
                        name="password"
                        component="input"
                        type="password"
                        placeholder="Password"
                        className={
                          props.touched.password && props.errors.password
                            ? "invalid"
                            : ""
                        }
                        validate={required}
                      />
                      {props.touched.password && props.errors.password && (
                        <span className="error">{props.errors.password}</span>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={!props.valid || props.submitting}
                    >
                      Log in
                    </button>
                  </form>
                )}
              </Form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
