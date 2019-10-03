import React, { Component } from 'react';
import { render } from 'react-dom';
import OtpInput from '../../lib';
import './styles.css';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      numInputs: 4,
      separator: '-',
      isDisabled: false,
      hasErrored: false,
      isInputNum: false,
    };
  }

  handleOtpChange = otp => {
    this.setState({ otp });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearOtp = () => {
    this.setState({ otp: '' });
  };

  handleCheck = e => {
    const { name } = e.target;
    this.setState(prevState => ({ [name]: !prevState[name] }));
  };

  handleSubmit = e => {
    e.preventDefault();
    alert(this.state.otp);
  };

  render() {
    const { otp, numInputs, separator, isDisabled, hasErrored, isInputNum } = this.state;

    return (
      <div className="container">
        <div className="side-bar">
          <a href="https://github.com/ajayns/react-otp-input" target="_blank">
            <div className="side-bar__segment side-bar__segment--header">
              <h2>react-otp-input</h2>
            </div>
          </a>
          <div className="side-bar__segment">
            <label htmlFor="num-inputs">
              numInputs
              <input
                id="num-inputs"
                name="numInputs"
                type="number"
                value={numInputs}
                onChange={this.handleChange}
                min="0"
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
                value={separator}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="value">
              value
              <input
                id="value"
                maxLength={numInputs}
                name="otp"
                type="text"
                value={otp}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="disabled">
              <input
                id="disabled"
                name="isDisabled"
                type="checkbox"
                checked={isDisabled}
                onChange={this.handleCheck}
              />
              isDisabled
            </label>
          </div>
          <div className="side-bar__segment">
            <label htmlFor="hasErrored">
              <input
                id="hasErrored"
                name="hasErrored"
                type="checkbox"
                checked={hasErrored}
                onChange={this.handleCheck}
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
                checked={isInputNum}
                onChange={this.handleCheck}
              />
              isInputNum
            </label>
          </div>
          <div className="side-bar__segment side-bar__segment--bottom">
            <a href="https://github.com/ajayns/react-otp-input">
              Documentation and Source
            </a>
          </div>
        </div>
        <div className="view">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <h2>Enter verification code</h2>
              <div className="margin-top--small">
                <OtpInput
                  inputStyle={{
                    width: '3rem',
                    height: '3rem',
                    margin: '0 1rem',
                    fontSize: '2rem',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.3)',
                  }}
                  numInputs={numInputs}
                  isDisabled={isDisabled}
                  hasErrored={hasErrored}
                  errorStyle="error"
                  onChange={this.handleOtpChange}
                  separator={<span>{separator}</span>}
                  isInputNum={isInputNum}
                  shouldAutoFocus
                  value={otp}
                />
              </div>
              <div className="btn-row">
                <button
                  className="btn margin-top--large"
                  type="button"
                  onClick={this.clearOtp}
                >
                  Clear
                </button>
                <button
                  className="btn margin-top--large"
                  disabled={otp.length < numInputs}
                >
                  Get OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

render(<Demo />, document.getElementById('app'));
