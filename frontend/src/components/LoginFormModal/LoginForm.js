import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginFormModal.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  // const [ demoUser, setDemoUser ] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-modal-display">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-header">Please Log In</div>
        <div className="errors-display">
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
          <input className="username-input"
            placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />
          <input className="password-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-modal-button" onClick={(e) => handleSubmit(e)}>
            Continue
          </div>
        <button className="demo-user-button" type="submit" onClick={() => {
              setCredential("Demo-lition")
              setPassword("password")
          }}>Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
