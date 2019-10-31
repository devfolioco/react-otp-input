// @flow
import React, { useState, useEffect } from 'react';

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

type OtpInputProps = {
  value?: string,
  separator?: string, // FIXME: Needs Default
  onChange?: Function,
  numInputs?: number,
  isDisabled?: boolean,
  hasErrored?: boolean,
  shouldAutoFocus?: boolean,
  isInputNum?: boolean, // FIXME: Needs Default
  containerStyle?: Object | String, // FIXME: Needs Default
  inputStyle?: Object | String, // FIXME: Needs Default
  focusStyle?: Object | String, // FIXME: Needs Default
  errorStyle?: Object | String, // FIXME: Needs Default
  disabledStyle?: Object | String, // FIXME: Needs Default
};

type SingleOtpInputProps = {
  focus: boolean,
  shouldAutoFocus: boolean,
  separator: String,
  isLastChild: boolean,
  inputStyle: Object,
  isDisabled: boolean,
  hasErrored: boolean,
  errorStyle: Object,
  focusStyle: Object,
  disabledStyle: Object,
  isInputNum: boolean,
  value: string,
  onChange: (event: React.FormEvent<HTMLInputElement>) => void,
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void,
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  onInput: (event: React.FormEvent<HTMLInputElement>) => void,
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void,
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
};

// Doesn't really check if it's a style Object
// Basic implementation to check if it's not a string
// of classNames and is an Object
// TODO: Better implementation
const isStyleObject = obj => typeof obj === 'object';

function SingleOtpInput(props: SingleOtpInputProps) {
  const {
    focus,
    shouldAutoFocus,
    separator,
    isLastChild,
    inputStyle,
    isDisabled,
    hasErrored,
    errorStyle,
    focusStyle,
    disabledStyle,
    isInputNum,
    value,
    ...rest
  } = props;

  let input: HTMLInputElement;

  // Focus on first render
  // Only when shouldAutoFocus is true
  useEffect(() => {
    if (input && focus && shouldAutoFocus) {
      input.focus();
    }
  }, []);

  useEffect(() => {
    if (input && focus) {
      input.focus();
      input.select();
    }
  }, [focus]);

  const getClasses = (...classes) =>
    classes.filter(c => !isStyleObject(c) && c !== false).join(' ');

  const numValueLimits = isInputNum ? { min: 0, max: 9 } : {};

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        style={Object.assign(
          { width: '1em', textAlign: 'center' },
          isStyleObject(inputStyle) && inputStyle,
          focus && isStyleObject(focusStyle) && focusStyle,
          isDisabled && isStyleObject(disabledStyle) && disabledStyle,
          hasErrored && isStyleObject(errorStyle) && errorStyle
        )}
        className={getClasses(
          inputStyle,
          focus && focusStyle,
          isDisabled && disabledStyle,
          hasErrored && errorStyle
        )}
        type={isInputNum ? 'number' : 'tel'}
        {...numValueLimits}
        maxLength={1}
        ref={(ref: HTMLInputElement) => {
          input = ref;
        }}
        disabled={isDisabled}
        value={value || ''}
        {...rest}
      />
      {!isLastChild && separator}
    </div>
  );
}

function OtpInput(props: OtpInputProps) {
  const {
    numInputs,
    separator,
    isDisabled,
    hasErrored,
    errorStyle,
    shouldAutoFocus,
    onChange,
    isInputNum,
    value,
    inputStyle,
    focusStyle,
    containerStyle,
    disabledStyle,
  } = props;
  const [activeInput, setActiveInput] = useState(0);

  const getOtpValue = () => (value ? value.toString().split('') : []);

  // Helper to return OTP from input
  const handleOtpChange = (otp: string[]) => {
    const otpValue = otp.join('');
    onChange(isInputNum ? Number(otpValue) : otpValue);
  };

  // Focus on input by index
  const focusInput = (input: number) => {
    setActiveInput(Math.max(Math.min(numInputs - 1, input), 0));
  };

  // Focus on next input
  const focusNextInput = () => {
    focusInput(activeInput + 1);
  };

  // Focus on previous input
  const focusPrevInput = () => {
    focusInput(activeInput - 1);
  };

  // Change OTP value at focused input
  const changeCodeAtFocus = (focusedInputValue: string) => {
    const otp = getOtpValue();
    otp[activeInput] = focusedInputValue[0];

    handleOtpChange(otp);
  };

  // Handle pasted OTP
  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const otp = getOtpValue();

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

    handleOtpChange(otp);
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    changeCodeAtFocus(e.currentTarget.value);
    focusNextInput();
  };

  // Handle cases of backspace, delete, left arrow, right arrow
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
      e.preventDefault();
      changeCodeAtFocus('');
      focusPrevInput();
    } else if (e.keyCode === DELETE || e.key === 'Delete') {
      e.preventDefault();
      changeCodeAtFocus('');
    } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
      e.preventDefault();
      focusPrevInput();
    } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
      e.preventDefault();
      focusNextInput();
    } else if (
      e.keyCode === SPACEBAR ||
      e.key === ' ' ||
      e.key === 'Spacebar'
    ) {
      e.preventDefault();
    }
  };

  const checkLength = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 1) {
      e.preventDefault();
      focusNextInput();
    }
  };

  const handleFocus = (i: number) => (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    setActiveInput(i);
    e.currentTarget.select();
  };

  const handleBlur = () => setActiveInput(-1);

  const renderInputs = () => {
    const otp = getOtpValue();
    const inputs = [];

    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <SingleOtpInput
          key={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onInput={checkLength}
          onPaste={handleOnPaste}
          onFocus={handleFocus(i)}
          onBlur={handleBlur}
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
        />
      );
    }

    return inputs;
  };

  return (
    <div
      style={Object.assign(
        { display: 'flex' },
        isStyleObject(containerStyle) && containerStyle
      )}
      className={
        !isStyleObject(containerStyle) ? containerStyle.toString() : ''
      }
    >
      {renderInputs()}
    </div>
  );
}

OtpInput.defaultProps = {
  numInputs: 4,
  onChange: (otp: number): void => console.log(otp), // FIXME: Avoid console output as a default?
  isDisabled: false,
  hasErrored: false,
  shouldAutoFocus: false,
  value: '',
};

export default OtpInput;
