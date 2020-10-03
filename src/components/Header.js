import React, { useState, useContext, useEffect } from "react";
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
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [userDetails, setUserDetails] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  const handleLogin = (values) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios({
        url: "login",
        data: values,
        method: "post",
      })
        .then(({ data }) => {
          setUserDetails({
            user: data.user,
          });
          localStorage.setItem(
            "ikiSettings",
            JSON.stringify(data.user.ikiSettings)
          );
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
    setLogoutLoading(true);
    axios({
      url: "logout",
      method: "post",
    })
      .then(({ data }) => {
        setUserDetails({
          user: {},
        });
        setLogoutLoading(false);
        history.push("/");
      })
      .catch((e) => {
        setLogoutLoading(false);
      });
  };

  const handleRegister = (values) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios({
        url: "register",
        method: "post",
      })
        .then(({ data }) => {
          setUserDetails({
            user: data.user,
          });
          localStorage.setItem(
            "ikiSettings",
            JSON.stringify(data.user.ikiSettings)
          );
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
        url: "profile",
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
    // <header className={location.pathname === "/chart" ? "fixed" : ""}>
    <header
      className={
        loginModal || registerModal || profileModal ? "modal-open" : ""
      }
    >
      <div className="shell">
        <div className="logo" onClick={() => history.push("/")}></div>
        <div className="profile-controls">
          {/* {JSON.stringify(userDetails, null, 4)} */}

          {!Object.keys(userDetails.user).length ? (
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
              {logoutLoading ? (
                <span>Logging out...</span>
              ) : (
                <span style={{ cursor: "pointer" }} onClick={handleLogOut}>
                  Log out
                </span>
              )}
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
                  <h4>Register</h4>
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
                onClick={() => setProfileModal(false)}
              ></span>
              <div className="modal-content">
                <div className="modal-title">
                  <h4>Profile</h4>
                </div>
                <span
                  className="view"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setProfileModal(false);
                    history.push("/chart");
                  }}
                >
                  View my Ikigai
                </span>
                <Form
                  onSubmit={handleProfileUpdate}
                  initialValues={{ email: userDetails.user.email }}
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
