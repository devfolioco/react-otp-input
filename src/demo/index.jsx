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
      minLength: 0,
      maxLength: 40,
      inputStyle: {
        width: "3rem",
        height: "3rem",
        margin: "0 1rem",
        fontSize: "2rem",
        borderRadius: "4px",
        border: "1px solid #0003",
      },
      valErrors: {
        inputStyle: false,
      },
    };
  }

  componentDidMount() {
    let $inputStyle = document.querySelector(`#inputStyle`);

    $inputStyle.value = JSON.stringify(this.state.inputStyle, undefined, 2)
  }

  handleOtpChange = otp => {
    this.setState({ otp });
  };

  handleChange = e => {
    let currVal = e.target.value;

    if (e.target.name === 'numInputs') {
      const { minLength, maxLength } = this.state;

      if (currVal < minLength || currVal > maxLength) {
        currVal = 4;

        console.error(
          `Please enter a value between ${minLength} and ${maxLength}`
        );
      }
    }

    this.setState({ [e.target.name]: currVal });
  };

  applyStyles = (name) => {
    let curVal;
    let $el = document.querySelector(`#${name}`);
    let json = $el.value;
    if (name == 'inputStyle') {
      try {
        curVal = JSON.parse(json);
        this.setState({
          [name]: curVal,
          valErrors: {
            [name]: false
          }
        });

        $el.value = JSON.stringify(curVal, undefined, 2);
        $el.style.color = "black";
        return;
      }
      catch (e) {
        this.setState({
          valErrors: {
            [name]: e.message
          }
        })
        return;
      }
    }
  }

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
    const {
      otp,
      numInputs,
      separator,
      isDisabled,
      hasErrored,
      isInputNum,
      minLength,
      maxLength,
      inputStyle,
      valErrors,
    } = this.state;

    return (
      <div className="container">
        <div className="side-bar">
          <a
            href="https://github.com/devfolioco/react-otp-input"
            target="_blank"
          >
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
                min={minLength}
                max={maxLength}
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
            <label htmlFor="inputStyle">
              inputStyle <button className="btn btn-sm" onClick={() => this.applyStyles('inputStyle')}>Apply</button>
              <textarea
                id="inputStyle"
                name="inputStyle"
                spellCheck={false}
                onChange={(e) => { e.target.style.color = "#3273dc"; }}
                className={valErrors.inputStyle ? 'error-text' : ''}
              />
            </label>
            {valErrors.inputStyle ? <div style={{ color: 'red', fontSize: '0.7em' }}>{valErrors.inputStyle}</div> : null}
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
            <a href="https://github.com/devfolioco/react-otp-input">
              Documentation and Source
            </a>
          </div>
        </div>
        <div className="view">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <p>Enter verification code</p>
              <div className="margin-top--small">
                <OtpInput
                  inputStyle={inputStyle || "inputStyle"}
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
                  disabled={isDisabled}
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
