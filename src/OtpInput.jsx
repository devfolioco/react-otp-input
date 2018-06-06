// @flow
import React, { Component, PureComponent } from 'react';

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

type Props = {
  numInputs: number,
  onChange: Function,
};

class SingleOtpInput extends PureComponent {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    if (this.props.focus) {
      this.input.current.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.focus) {
      this.input.current.focus();
      this.input.current.select();
    }
  }

  render() {
    const { inputStyle, ...rest } = this.props;

    return (
      <div>
        <input
          style={{ width: '1em', ...inputStyle }}
          type="tel"
          maxLength="1"
          ref={this.input}
          {...rest}
        />
      </div>
    );
  }
}

class OtpInput extends Component<Props, State> {
  static defaultProps = {
    numInputs: 4,
    onChange: (otp: number): void => console.log(otp),
  };

  state = {
    activeInput: 0,
    otp: [],
  };

  // Helper to return OTP from input
  returnOtp = () => {
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

  // Change OTP value
  changeCodeAtIndex = (i: number, value: string) => {
    const { otp } = this.state;
    otp[i] = value;

    this.setState({
      otp,
    });
    this.returnOtp();
  };

  // Handle pasted OTP
  handleOnPaste = (i: number, e: Object) => {
    e.preventDefault();
    const { numInputs } = this.props;
    const { otp } = this.state;
    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - i)
      .split('');

    // Paste data from focused input onwards
    for (let j = 0; j < numInputs; ++j) {
      if (j >= i && pastedData.length > 0) {
        otp[j] = pastedData.shift();
      }
    }

    this.setState({
      otp,
    });

    this.returnOtp();
  };

  handleOnChange = (i: number, e: Object) => {
    this.changeCodeAtIndex(i, e.target.value);
    this.focusNextInput();
  };

  // TODO: delete key
  handleOnKeyDown = (i: number, e: Object) => {
    switch (e.keyCode) {
      case BACKSPACE:
        e.preventDefault();
        this.changeCodeAtIndex(i, '');
        this.focusPrevInput();
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
    const { numInputs, inputStyle } = this.props;
    const inputs = [];

    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <SingleOtpInput
          key={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={this.handleOnChange.bind(null, i)}
          onKeyDown={this.handleOnKeyDown.bind(null, i)}
          onPaste={this.handleOnPaste.bind(null, i)}
          onFocus={e => {
            this.setState({
              activeInput: i,
            });
            e.target.select();
          }}
          inputStyle={inputStyle}
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
