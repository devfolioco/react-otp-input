import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import OtpInput from '../../lib';
import './styles.css';

function Demo() {
  const [states, setStates] = useState({
    otp: '',
    numInputs: 4,
    separator: '-',
    isDisabled: false,
    hasErrored: false,
    isInputNum: false,
    isInputSecure: false,
    minLength: 0,
    maxLength: 40,
    placeholder: '',
  });

  const handleOtpChange = (otp) => {
    setStates((prev) => ({ ...prev, otp }));
  };

  const handleChange = (e) => {
    setStates((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNumInputsChange = (e) => {
    let numInputs = e.target.value;
    const { minLength, maxLength } = states;

    if (numInputs < minLength || numInputs > maxLength) {
      numInputs = 4;

      console.error(`Please enter a value between ${minLength} and ${maxLength}`);
    }

    setStates((prev) => ({ ...prev, [e.target.name]: parseInt(numInputs, 10) }));
  };

  const clearOtp = () => {
    setStates((prev) => ({ ...prev, otp: '' }));
  };

  const handleCheck = (e) => {
    const { name } = e.target;
    setStates((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(states.otp);
  };

  return (
    <div className="container">
      <div className="side-bar">
        <a href="https://github.com/mahdimhqq/react18-otp-input" target="_blank" rel="noreferrer">
          <div className="side-bar__segment side-bar__segment--header">
            <h2>react18-otp-input</h2>
          </div>
        </a>
        <div className="side-bar__segment side-bar__segment--bottom">
          <a href="https://github.com/mahdimhqq/react18-otp-input">Documentation and Source</a>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="num-inputs">
            numInputs
            <input
              id="num-inputs"
              name="numInputs"
              type="number"
              value={states.numInputs}
              onChange={handleNumInputsChange}
              min={states.minLength}
              max={states.maxLength}
            />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="separator">
            separator
            <input
              id="separator"
              maxLength={1}
              name="separator"
              type="text"
              value={states.separator}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="value">
            value
            <input
              id="value"
              maxLength={states.numInputs}
              name="otp"
              type="text"
              value={states.otp}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="placeholder">
            placeholder
            <input id="placeholder" name="placeholder" type="text" value={states.placeholder} onChange={handleChange} />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="disabled">
            <input id="disabled" name="isDisabled" type="checkbox" checked={states.isDisabled} onChange={handleCheck} />
            isDisabled
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="hasErrored">
            <input
              id="hasErrored"
              name="hasErrored"
              type="checkbox"
              checked={states.hasErrored}
              onChange={handleCheck}
            />
            hasErrored
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="isInputNum">
            <input
              id="isInputNum"
              name="isInputNum"
              type="checkbox"
              checked={states.isInputNum}
              onChange={handleCheck}
            />
            isInputNum
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="isInputSecure">
            <input
              id="isInputSecure"
              name="isInputSecure"
              type="checkbox"
              checked={states.isInputSecure}
              onChange={handleCheck}
            />
            isInputSecure
          </label>
        </div>
      </div>
      <div className="view">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <p>Enter verification code</p>
            <div className="margin-top--small">
              <OtpInput
                inputStyle="inputStyle"
                numInputs={states.numInputs}
                isDisabled={states.isDisabled}
                hasErrored={states.hasErrored}
                errorStyle="error"
                onChange={handleOtpChange}
                separator={<span>{states.separator}</span>}
                isInputNum={states.isInputNum}
                isInputSecure={states.isInputSecure}
                shouldAutoFocus
                value={states.otp}
                placeholder={states.placeholder}
              />
            </div>
            <div className="btn-row">
              <button
                className="btn margin-top--large"
                type="button"
                disabled={states.isDisabled || states.otp.trim() === ''}
                onClick={clearOtp}
              >
                Clear
              </button>
              <button className="btn margin-top--large" disabled={states.otp.length < states.numInputs}>
                Get OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);
