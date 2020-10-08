import React, { useState, useContext } from "react";
import { Form, Field } from "react-final-form";
import { required, composeValidators, email } from "../utils/validation";
import Loader from "./Loader";
import axios from "../utils/api";
import { UserContext } from "../context";
import { useHistory, useLocation } from "react-router-dom";

const Header = ({ userState }) => {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useContext(UserContext);
  const [changePassword, setChangePassword] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const handleLogin = (values) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios({
        url: "login/",
        data: values,
        method: "post",
      })
        .then(({ data }) => {
          setUserDetails({
            user: data.user,
          });
          localStorage.setItem("ikigai", JSON.stringify(data.ikigai));
          history.push("/");
          setLoading(false);
          setLoginModal(false);
          resolve();
        })
        .catch((e) => {
          setLoading(false);
          reject();
        });
    });
  };

  const handleLogOut = (values) => {
    setLoading(true);
    axios({
      url: "logout/",
      method: "post",
    })
      .then(({ data }) => {
        setUserDetails({
          user: {},
        });
        setLoading(false);
        setProfileModal(false);
        history.push("/");
        localStorage.setItem("ikigai", "{}");
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const handleRegister = (values) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios({
        url: "register/",
        method: "post",
        data: {
          ...values,
          ikigai: JSON.parse(localStorage.getItem("ikigai")),
        },
      })
        .then(({ data }) => {
          setUserDetails({
            user: data.user,
          });
          setLoading(false);
          setRegisterModal(false);
          resolve();
        })
        .catch((e) => {
          setLoading(false);
          reject();
        });
    });
  };

  const handleProfileUpdate = (values) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios({
        url: "profile/",
        method: "patch",
        data: values,
      })
        .then(({ data }) => {
          setUserDetails({
            user: data.user,
          });
          setLoading(false);
          setProfileModal(false);
          resolve();
        })
        .catch((e) => {
          setLoading(false);
          reject();
        });
    });
  };

  return (
    <header
      className={
        loginModal || registerModal || profileModal ? "modal-open" : ""
      }
    >
      <div className="shell">
        <div className="logo" onClick={() => history.push("/")}></div>
        <div className="profile-controls">
          {userDetails &&
            userDetails.user &&
            !Object.keys(userDetails.user).length &&
            location.pathname === "/chart" && (
              <span
                style={{ cursor: "pointer", marginRight: "15px" }}
                onClick={() => setRegisterModal(true)}
              >
                Register
              </span>
            )}

          {userDetails &&
          userDetails.user &&
          !Object.keys(userDetails.user).length ? (
            <>
              {/* <span
              style={{ cursor: "pointer", marginRight: "15px" }}
              onClick={() => setRegisterModal(true)}
            >
              Register
            </span> */}

              <span
                style={{ cursor: "pointer" }}
                onClick={() => setLoginModal(true)}
              >
                Login
              </span>
            </>
          ) : (
            <>
              <span
                style={{ cursor: "pointer", marginRight: "15px" }}
                onClick={() => setProfileModal(true)}
              >
                Profile
              </span>
            </>
          )}
        </div>

        {/** modals */}
        {loginModal && (
          <div className="modal-mask ">
            <div className="modal-wrapper show">
              {loading && <Loader />}
              <span
                className="closeBtn"
                onClick={() => setLoginModal(false)}
              ></span>
              <div className="modal-content">
                <div className="modal-title">
                  <h4>Welcome back</h4>
                </div>

                <Form
                  onSubmit={handleLogin}
                  initialValues={{ email: "email@email.com", password: "asd" }}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
                      <div className="field-wrapper">
                        <Field
                          name="email"
                          component="input"
                          type="email"
                          placeholder="Email"
                          className={
                            props.touched.email && props.errors.email
                              ? "invalid"
                              : ""
                          }
                          validate={composeValidators(required, email)}
                        />
                        {props.touched.email && props.errors.email && (
                          <span className="error">{props.errors.email}</span>
                        )}
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
                        className="btn-submit"
                        type="submit"
                        disabled={!props.valid || props.submitting}
                      >
                        Login
                      </button>
                    </form>
                  )}
                </Form>
              </div>
            </div>
          </div>
        )}

        {registerModal && (
          <div className="modal-mask">
            <div className="modal-wrapper show">
              {loading && <Loader />}
              <span
                className="closeBtn"
                onClick={() => setRegisterModal(false)}
              ></span>
              <div className="modal-content">
                <div className="modal-title">
                  <h4>Create account</h4>
                </div>
                <Form
                  onSubmit={handleRegister}
                  initialValues={{ email: "email@email.com" }}
                  validate={(values) => {
                    const errors = {};
                    if (values.password !== values.password2) {
                      errors.password2 = "Passwords are not matching";
                    }
                    return errors;
                  }}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
                      <div className="field-wrapper">
                        <Field
                          name="name"
                          component="input"
                          type="text"
                          placeholder="Name"
                          className={
                            props.touched.name && props.errors.name
                              ? "invalid"
                              : ""
                          }
                          validate={composeValidators(required)}
                        />
                        {props.touched.email && props.errors.email && (
                          <span className="error">{props.errors.email}</span>
                        )}
                      </div>

                      <div className="field-wrapper">
                        <Field
                          name="email"
                          component="input"
                          type="email"
                          placeholder="Email"
                          className={
                            props.touched.email && props.errors.email
                              ? "invalid"
                              : ""
                          }
                          validate={composeValidators(required, email)}
                        />
                        {props.touched.email && props.errors.email && (
                          <span className="error">{props.errors.email}</span>
                        )}
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
                      <div className="field-wrapper">
                        <Field
                          name="password2"
                          component="input"
                          type="password"
                          placeholder="Confirm password"
                          className={
                            props.touched.password &&
                            props.touched.password2 &&
                            props.errors.password2
                              ? "invalid"
                              : ""
                          }
                          validate={required}
                        />
                        {props.touched.password &&
                          props.touched.password2 &&
                          props.errors.password2 && (
                            <span className="error">
                              {props.errors.password2}
                            </span>
                          )}
                      </div>
                      <button
                        className="btn-submit"
                        type="submit"
                        disabled={!props.valid || props.submitting}
                      >
                        Register
                      </button>
                    </form>
                  )}
                </Form>
              </div>
            </div>
          </div>
        )}

        {profileModal && (
          <div className="modal-mask">
            <div className="modal-wrapper show">
              {loading && <Loader />}
              <span
                className="closeBtn"
                onClick={() => {
                  setChangePassword(false);
                  setProfileModal(false);
                }}
              ></span>
              <div className="modal-content">
                <div className="modal-title">
                  <h4>
                    Your profile
                    <br />
                    <span className="log-out" onClick={handleLogOut}>
                      Log out
                    </span>
                  </h4>
                </div>
                <Form
                  onSubmit={handleProfileUpdate}
                  initialValues={{
                    name:
                      (userDetails &&
                        userDetails.user &&
                        userDetails.user.name) ||
                      null,
                    email:
                      (userDetails &&
                        userDetails.user &&
                        userDetails.user.email) ||
                      null,
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (values.new_password !== values.new_password2) {
                      errors.new_password2 = "Passwords are not matching";
                    }
                    return errors;
                  }}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
                      <div className="field-wrapper">
                        <Field
                          name="name"
                          component="input"
                          type="text"
                          placeholder="Name"
                          className={
                            props.touched.name && props.errors.name
                              ? "invalid"
                              : ""
                          }
                          validate={composeValidators(required)}
                        />
                        {props.touched.email && props.errors.email && (
                          <span className="error">{props.errors.email}</span>
                        )}
                      </div>
                      <div className="field-wrapper">
                        <Field
                          name="email"
                          component="input"
                          type="email"
                          placeholder="Email"
                          className={
                            props.touched.email && props.errors.email
                              ? "invalid"
                              : ""
                          }
                          validate={composeValidators(required, email)}
                        />
                        {props.touched.email && props.errors.email && (
                          <span className="error">{props.errors.email}</span>
                        )}
                      </div>
                      <fieldset>
                        <legend
                          onClick={() => setChangePassword(!changePassword)}
                        >
                          Change password
                        </legend>
                        {changePassword && (
                          <>
                            <div className="field-wrapper">
                              <Field
                                name="old_password"
                                component="input"
                                type="password"
                                placeholder="Old password"
                                className={
                                  props.touched.old_password &&
                                  props.errors.old_password
                                    ? "invalid"
                                    : ""
                                }
                                validate={required}
                              />
                              {props.touched.old_password &&
                                props.errors.old_password && (
                                  <span className="error">
                                    {props.errors.old_password}
                                  </span>
                                )}
                            </div>
                            <div className="field-wrapper">
                              <Field
                                name="new_password"
                                component="input"
                                type="password"
                                placeholder="New password"
                                className={
                                  props.touched.new_password &&
                                  props.touched.new_password2 &&
                                  props.errors.new_password2
                                    ? "invalid"
                                    : ""
                                }
                                validate={required}
                              />
                              {props.touched.new_password &&
                                props.touched.new_password2 &&
                                props.errors.new_password2 && (
                                  <span className="error">
                                    {props.errors.new_password2}
                                  </span>
                                )}
                            </div>
                            <div className="field-wrapper">
                              <Field
                                name="new_password2"
                                component="input"
                                type="password"
                                placeholder="Confirm password"
                                className={
                                  props.touched.new_password2 &&
                                  props.errors.new_password2
                                    ? "invalid"
                                    : ""
                                }
                                validate={required}
                              />
                              {props.touched.new_password2 &&
                                props.errors.new_password2 && (
                                  <span className="error">
                                    {props.errors.new_password2}
                                  </span>
                                )}
                            </div>
                          </>
                        )}
                      </fieldset>
                      <button
                        className="btn-submit"
                        type="submit"
                        disabled={!props.valid || props.submitting}
                      >
                        Save
                      </button>
                    </form>
                  )}
                </Form>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
