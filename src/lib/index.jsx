// @flow
import React, { Component, PureComponent } from 'react';

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

type Props = {
  numInputs: number,
  onChange: Function,
  separator?: Object,
  containerStyle?: Object,
  inputStyle?: Object,
  focusStyle?: Object,
  isDisabled?: boolean,
  disabledStyle?: Object,
  hasErrored?: boolean, 
  errorStyle?: Object,
  shouldAutoFocus?: boolean,
};

type State = {
  activeInput: number,
  otp: string[],
};

class SingleOtpInput extends PureComponent<*> {
  input: ?HTMLInputElement;

  // Focus on first render
  // Only when shouldAutoFocus is true
  componentDidMount() {
    const {
      input,
      props: { focus, shouldAutoFocus },
    } = this;

    if (input && focus && shouldAutoFocus) {
      input.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      input,
      props: { focus },
    } = this;

    // Check if focusedInput changed
    // Prevent calling function if input already in focus
    if (prevProps.focus !== focus && (input && focus)) {
      input.focus();
      input.select();
    }
  }

  render() {
    const {
      separator,
      isLastChild,
      inputStyle,
      focus,
      isDisabled,
      hasErrored,
      errorStyle,
      focusStyle,
      disabledStyle,
      ...rest
    } = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          style={Object.assign(
            { width: '1em', textAlign: 'center' },
            inputStyle,
            focus && focusStyle,
            isDisabled && disabledStyle,
            hasErrored && errorStyle
          )}
          type="tel"
          maxLength="1"
          ref={input => {
            this.input = input;
          }}
          disabled={isDisabled}
          {...rest}
        />
        {!isLastChild && separator}
      </div>
    );
  }
}

class OtpInput extends Component<Props, State> {
  static defaultProps = {
    numInputs: 4,
    onChange: (otp: number): void => console.log(otp),
    isDisabled: false,
    shouldAutoFocus: false,
  };

  state = {
    activeInput: 0,
    otp: [],
  };

  // Helper to return OTP from input
  getOtp = () => {
    this.props.onChange(this.state.otp.join(''));
  };

  // Focus on input by index
  focusInput = (input: number) => {
    const { numInputs } = this.props;
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0);

    this.setState({
      activeInput,
    });
  };

  // Focus on next input
  focusNextInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput + 1);
  };

  // Focus on previous input
  focusPrevInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput - 1);
  };

  // Change OTP value at focused input
  changeCodeAtFocus = (value: string) => {
    const { activeInput, otp } = this.state;
    otp[activeInput] = value;

    this.setState({
      otp,
    });
    this.getOtp();
  };

  // Handle pasted OTP
  handleOnPaste = (e: Object) => {
    e.preventDefault();
    const { numInputs } = this.props;
    const { activeInput, otp } = this.state;

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('');

    // Paste data from focused input onwards
    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift();
      }
    }

    this.setState({
      otp,
    });

    this.getOtp();
  };

  handleOnChange = (e: Object) => {
    this.changeCodeAtFocus(e.target.value);
    this.focusNextInput();
  };

  // Handle cases of backspace, delete, left arrow, right arrow
  handleOnKeyDown = (e: Object) => {
    switch (e.keyCode) {
      case BACKSPACE:
        e.preventDefault();
        this.changeCodeAtFocus('');
        this.focusPrevInput();
        break;
      case DELETE:
        e.preventDefault();
        this.changeCodeAtFocus('');
        break;
      case LEFT_ARROW:
        e.preventDefault();
        this.focusPrevInput();
        break;
      case RIGHT_ARROW:
        e.preventDefault();
        this.focusNextInput();
        break;
      default:
        break;
    }
  };

  renderInputs = () => {
    const { activeInput, otp } = this.state;
    const {
      numInputs,
      inputStyle,
      focusStyle,
      separator,
      isDisabled,
      disabledStyle,
      hasErrored,
      errorStyle,
      shouldAutoFocus,
    } = this.props;
    const inputs = [];

    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <SingleOtpInput
          key={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          onPaste={this.handleOnPaste}
          onFocus={e => {
            this.setState({
              activeInput: i,
            });
            e.target.select();
          }}
          separator={separator}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          isLastChild={i === numInputs - 1}
          isDisabled={isDisabled}
          disabledStyle={disabledStyle}
          hasErrored={hasErrored}
          errorStyle={errorStyle}
          shouldAutoFocus={shouldAutoFocus}
        />
      );
    }

    return inputs;
  };

  render() {
    const { containerStyle } = this.props;

    return (
      <div style={{ display: 'flex', ...containerStyle }}>
        {this.renderInputs()}
      </div>
    );
  }
}

export default OtpInput;
