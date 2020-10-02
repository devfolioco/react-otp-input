// @flow
import React from 'react';

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

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
  isInputNum?: boolean,
  value?: string,
  className?: string
};

// Doesn't really check if it's a style Object
// Basic implementation to check if it's not a string
// of classNames and is an Object
// TODO: Better implementation
const isStyleObject = obj => typeof obj === 'object';

const SingleOtpInput = ({
                             separator, isLastChild, inputStyle, focus, isDisabled, hasErrored, errorStyle,
                             focusStyle, disabledStyle, shouldAutoFocus, isInputNum, value, className, ...rest
                           }) => {
  const inputRef = React.useRef(null)

  // Focus on first render
  // Only when shouldAutoFocus is true
  React.useEffect(()=>{
    if (inputRef && focus && shouldAutoFocus) {
      inputRef.current.focus();
    }
  }, [])

  // Check if focusedInput changed
  // Prevent calling function if input already in focus
  React.useEffect(() => {
    if (inputRef && focus) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [focus]);

  const getClasses = (...classes) =>
    classes.filter(c => !isStyleObject(c) && c !== false).join(' ');

  return (
    <div className={className} style={{display: 'flex', alignItems: 'center'}}>
      <input
        autoComplete="off"
        style={Object.assign(
          {width: '1em', textAlign: 'center'},
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
        type={isInputNum ? 'tel' : 'text'}
        maxLength="1"
        ref={inputRef}
        disabled={isDisabled}
        value={value ? value : ''}
        {...rest}
      />
      {!isLastChild && separator}
    </div>
  );
}

const OtpInput = ({
                    separator, containerStyle, inputStyle, focusStyle, disabledStyle, hasErrored, errorStyle,
                    className, isInputNum, numInputs = 4, onChange = (otp: number): void => console.log(otp),
                    isDisabled = false, shouldAutoFocus = false, value = '',
                  }) => {

  const [activeInput, setActiveInput] = React.useState(0)

  const getOtpValue = () =>
    value ? value.toString().split('') : [];

  // Helper to return OTP from input
  const handleOtpChange = (otp: string[]) => {
    const otpValue = otp.join('');

    onChange(otpValue);
  };

  const isInputValueValid = value => {
    const isTypeValid = isInputNum
      ? !isNaN(parseInt(value, 10))
      : typeof value === 'string';

    return isTypeValid && value.trim().length === 1;
  };

  // Focus on input by index
  const focusInput = (input: number) => {
    const activeInputNew = Math.max(Math.min(numInputs - 1, input), 0);

    setActiveInput(() => activeInputNew)
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
  const changeCodeAtFocus = (value: string) => {
    const otp = getOtpValue();
    otp[activeInput] = value[0];

    handleOtpChange(otp);
  };

  const handleOnPaste = (e: Object) => {
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

  const handleOnChange = (e: Object) => {
    const {value} = e.target;

    if (isInputValueValid(value)) {
      changeCodeAtFocus(value);
    }
  };

  // Handle cases of backspace, delete, left arrow, right arrow, space
  const handleOnKeyDown = (e: Object) => {
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
      e.key === 'Spacebar' ||
      e.key === 'Space'
    ) {
      e.preventDefault();
    }
  };

  const handleOnInput = (e: Object) => {
    if (isInputValueValid(e.target.value)) {
      focusNextInput();
    } else {
      // This is a workaround for dealing with keyCode "229 Unidentified" on Android.

      if (!isInputNum) {
        const {nativeEvent} = e;

        if (
          nativeEvent.data === null &&
          nativeEvent.inputType === 'deleteContentBackward'
        ) {
          e.preventDefault();
          changeCodeAtFocus('');
          focusPrevInput();
        }
      }
    }
  };

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
          onInput={handleOnInput}
          onPaste={handleOnPaste}
          onFocus={e => {
            setActiveInput(() => i)
            e.target.select();
          }}
          onBlur={() => setActiveInput(() => -1)}
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
          className={className}
        />
      );
    }

    return inputs;
  }

  return (
    <div
      style={Object.assign(
        {display: 'flex'},
        isStyleObject(containerStyle) && containerStyle
      )}
      className={!isStyleObject(containerStyle) ? containerStyle : ''}
    >
      {renderInputs()}
    </div>
  );
}

export default OtpInput;
