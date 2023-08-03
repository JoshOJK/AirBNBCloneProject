import React, { useContext, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './loginform.css';
import { useModal }  from "../../context/Modal"


function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).then(closeModal).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoLogin = () => {
    setCredential('Demo-lition')
    setPassword('password')
    setErrors({})
  }

  return (
    <div  className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="button-wrap">
        <button className="demo-button" onClick={demoLogin}>Log in as demo user</button>
        {errors.credential && <p>{errors.credential}</p>}
        <button className="login-button" type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        </div>
    </form>
    </div>
  );
}

export default LoginFormModal;
