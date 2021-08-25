import React, { Component, PureComponent } from 'react';

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

// Doesn't really check if it's a style Object
// Basic implementation to check if it's not a string
// of classNames and is an Object
// TODO: Better implementation
const isStyleObject = (obj) => typeof obj === 'object';

class SingleOtpInput extends PureComponent {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  // Focus on first render
  // Only when shouldAutoFocus is true
  componentDidMount() {
    const { focus, shouldAutoFocus } = this.props;
    const { current: inputEl } = this.input;

    if (inputEl && focus && shouldAutoFocus) {
      inputEl.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const { focus } = this.props;
    const { current: inputEl } = this.input;

    // Check if focusedInput changed
    // Prevent calling function if input already in focus
    if (prevProps.focus !== focus && inputEl && focus) {
      inputEl.focus();
      inputEl.select();
    }
  }

  getClasses = (...classes) => classes.filter((c) => !isStyleObject(c) && c !== false).join(' ');

  getType = () => {
    const { isInputSecure, isInputNum } = this.props;

    if (isInputSecure) {
      return 'password';
    }

    if (isInputNum) {
      return 'tel';
    }

    return 'text';
  };

  render() {
    const {
      placeholder,
      separator,
      isLastChild,
      inputStyle,
      focus,
      isDisabled,
      hasErrored,
      errorStyle,
      focusStyle,
      disabledStyle,
      shouldAutoFocus,
      isInputNum,
      index,
      value,
      className,
      isInputSecure,
      ...rest
    } = this.props;

    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          aria-label={`${index === 0 ? 'Please enter verification code. ' : ''}${isInputNum ? 'Digit' : 'Character'} ${
            index + 1
          }`}
          autoComplete="off"
          style={Object.assign(
            { width: '1em', textAlign: 'center' },
            isStyleObject(inputStyle) && inputStyle,
            focus && isStyleObject(focusStyle) && focusStyle,
            isDisabled && isStyleObject(disabledStyle) && disabledStyle,
            hasErrored && isStyleObject(errorStyle) && errorStyle
          )}
          placeholder={placeholder}
          className={this.getClasses(
            inputStyle,
            focus && focusStyle,
            isDisabled && disabledStyle,
            hasErrored && errorStyle
          )}
          type={this.getType()}
          maxLength={this.props.numInputs}
          ref={this.input}
          disabled={isDisabled}
          value={value ? value : ''}
          {...rest}
        />
        {!isLastChild && separator}
      </div>
    );
  }
}

class OtpInput extends Component {
  static defaultProps = {
    numInputs: 4,
    onChange: (otp) => console.log(otp),
    isDisabled: false,
    shouldAutoFocus: false,
    value: '',
    isInputSecure: false,
  };

  state = {
    activeInput: 0,
  };

  getOtpValue = () => (this.props.value ? this.props.value.toString().split('') : []);

  getPlaceholderValue = () => {
    const { placeholder, numInputs } = this.props;

    if (typeof placeholder === 'string') {
      if (placeholder.length === numInputs) {
        return placeholder;
      }

      if (placeholder.length > 0) {
        console.error('Length of the placeholder should be equal to the number of inputs.');
      }
    }
  };

  // Helper to return OTP from input
  handleOtpChange = (otp) => {
    const { onChange } = this.props;
    const otpValue = otp.join('');

    onChange(otpValue);
  };

  isInputValueValid = (value) => {
    const isTypeValid = this.props.isInputNum ? !isNaN(parseInt(value, 10)) : typeof value === 'string';

    return isTypeValid && value.trim().length === 1;
  };

  // Focus on input by index
  focusInput = (input) => {
    const { numInputs } = this.props;
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0);

    this.setState({ activeInput });
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
  changeCodeAtFocus = (value) => {
    const { activeInput } = this.state;
    const otp = this.getOtpValue();
    otp[activeInput] = value[0];

    this.handleOtpChange(otp);
  };

  // Handle pasted OTP
  handleOnPaste = (e) => {
    e.preventDefault();

    const { activeInput } = this.state;
    const { numInputs, isDisabled } = this.props;

    if (isDisabled) {
      return;
    }

    const otp = this.getOtpValue();
    let nextActiveInput = activeInput;

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('');

    // Paste data from focused input onwards
    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift();
        nextActiveInput++;
      }
    }

    this.setState({ activeInput: nextActiveInput }, () => {
      this.focusInput(nextActiveInput);
      this.handleOtpChange(otp);
    });
  };

  handleOnChange = (e) => {
    const { value } = e.target;

    if (this.isInputValueValid(value)) {
      this.changeCodeAtFocus(value);
    }
  };

  // Handle cases of backspace, delete, left arrow, right arrow, space
  handleOnKeyDown = (e) => {
    if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
      e.preventDefault();
      this.changeCodeAtFocus('');
      this.focusPrevInput();
    } else if (e.keyCode === DELETE || e.key === 'Delete') {
      e.preventDefault();
      this.changeCodeAtFocus('');
    } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
      e.preventDefault();
      this.focusPrevInput();
    } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
      e.preventDefault();
      this.focusNextInput();
    } else if (e.keyCode === SPACEBAR || e.key === ' ' || e.key === 'Spacebar' || e.key === 'Space') {
      e.preventDefault();
    }
  };

  // The content may not have changed, but some input took place hence change the focus
  handleOnInput = (e) => {
    if (!e.target.value) return;
    if (e.target.value && e.target.value.length > 1) {
      // this code happens when the users click the 'from your messages' code at the top of the keyboard
      // essentially the mobile OS's act as though someone has pressed all of the OTP numbers all at once
      // rather than using a 'paste' style.
      e.preventDefault();
      const { numInputs } = this.props;
      const { activeInput } = this.state;
      const otp = this.getOtpValue();

      // Get pastedData in an array of max size (num of inputs - current position)
      const pastedData = e.target.value.slice(0, numInputs - activeInput).split('');
      // Paste data from focused input onwards
      for (let pos = 0; pos < numInputs; ++pos) {
        if (pos >= activeInput && pastedData.length > 0) {
          otp[pos] = pastedData.shift();
        }
      }
      this.handleOtpChange(otp);
      this.focusInput(this.props.numInputs);
    } else if (this.isInputValueValid(e.target.value)) {
      this.focusNextInput();
    } else {
      // This is a workaround for dealing with keyCode "229 Unidentified" on Android.

      if (!this.props.isInputNum) {
        const { nativeEvent } = e;

        if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {
          e.preventDefault();
          this.changeCodeAtFocus('');
          this.focusPrevInput();
        }
      }
    }
  };

  renderInputs = () => {
    const { activeInput } = this.state;
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
      isInputNum,
      isInputSecure,
      className,
    } = this.props;

    const inputs = [];
    const otp = this.getOtpValue();
    const placeholder = this.getPlaceholderValue();
    const dataCy = this.props['data-cy'];
    const dataTestId = this.props['data-testid'];

    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <SingleOtpInput
          placeholder={placeholder && placeholder[i]}
          key={i}
          index={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          onInput={this.handleOnInput}
          onPaste={this.handleOnPaste}
          onFocus={(e) => {
            this.setState({ activeInput: i });
            e.target.select();
          }}
          onBlur={() => this.setState({ activeInput: -1 })}
          separator={separator}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          isLastChild={i === numInputs - 1}
          isDisabled={isDisabled}
          disabledStyle={disabledStyle}
          hasErrored={hasErrored}
          errorStyle={errorStyle}
          shouldAutoFocus={shouldAutoFocus}
          isInputNum={isInputNum}
          isInputSecure={isInputSecure}
          className={className}
          data-cy={dataCy && `${dataCy}-${i}`}
          data-testid={dataTestId && `${dataTestId}-${i}`}
        />
      );
    }

    return inputs;
  };

  render() {
    const { containerStyle } = this.props;

    return (
      <div
        style={Object.assign({ display: 'flex' }, isStyleObject(containerStyle) && containerStyle)}
        className={!isStyleObject(containerStyle) ? containerStyle : ''}
      >
        {this.renderInputs()}
      </div>
    );
  }
}

export default OtpInput;
