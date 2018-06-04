// @flow
import React, { Component, PureComponent } from 'react';

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

type Props = {
  numberOfInputs: number,
  onChange: Function,
};

class SingleOtpInput extends PureComponent {
  componentDidMount() {
    if (this.props.focus) {
      this.input.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.focus) {
      this.input.focus();
      this.input.select();
    }
  }

  render() {
    return (
      <div>
        <input
          style={{ width: '1em' }}
          type="tel"
          maxLength="1"
          ref={input => {
            this.input = input;
          }}
          {...this.props}
        />
      </div>
    );
  }
}

class OtpInput extends Component<Props> {
  // TODO: onChange function should return number
  static defaultProps = {
    numberOfInputs: 4,
    onChange: (otp: number): void => console.log(otp),
  };

  state = {
    activeInput: 0,
    code: [],
  };

  focusInput = (input: number) => {
    const { numberOfInputs } = this.props;
    const activeInput = Math.max(Math.min(numberOfInputs - 1, input), 0);

    this.setState({
      activeInput,
    });
  };

  focusNextInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput + 1);
  };

  focusPrevInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput - 1);
  };

  changeCode = (i: number, value: number) => {
    const { code } = this.state;
    code[i] = value;

    this.setState({
      code,
    });
    this.props.onChange(code);
  };

  handleOnChange = (i: number, e: object) => {
    this.changeCode(i, e.target.value);
    this.focusNextInput();
  };

  handleOnPaste = (e: Object) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const code = pastedData.slice(0, 4).split('');

    this.setState({
      code,
    });
    this.props.onChange(code);
  };

  // TODO: delete key
  handleOnKeyDown = (i: number, e: Object) => {
    switch (e.keyCode) {
      case BACKSPACE:
        e.preventDefault();
        this.changeCode(i, '');
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
    const { activeInput, code } = this.state;
    const { numberOfInputs } = this.props;
    const inputs = [];

    for (let i = 0; i < numberOfInputs; i++) {
      inputs.push(
        <SingleOtpInput
          key={i}
          focus={activeInput === i}
          value={code && code[i]}
          onChange={this.handleOnChange.bind(null, i)}
          onKeyDown={this.handleOnKeyDown.bind(null, i)}
          onPaste={this.handleOnPaste}
          onFocus={e => {
            this.setState({
              activeInput: i,
            });
            e.target.select();
          }}
        />
      );
    }

    return inputs;
  };

  render() {
    return <div style={{ display: 'flex' }}>{this.renderInputs()}</div>;
  }
}

export default OtpInput;
