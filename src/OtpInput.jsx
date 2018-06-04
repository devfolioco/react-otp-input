// @flow
import React, { Component, PureComponent } from 'react';

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

type Props = {
  numberOfInputs: number
}

class SingleOtpInput extends PureComponent {
  componentDidMount() {
    if(this.props.focus) {
      this.input.focus();
    }
  }

  componentDidUpdate() {
    if(this.props.focus) {
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
          ref={input => {this.input = input}}
          {...this.props}
        />
      </div>
    );
  }  
}

class OtpInput extends Component<Props> {
  static defaultProps = {
    numberOfInputs: 4
  }

  state = {
    activeInput: 0,
  };

  componentDidUpdate() {
    console.log(this.state.activeInput);
  }

  focusInput = (input: number) => {
    const { numberOfInputs } = this.props;
    const activeInput = Math.max(Math.min(numberOfInputs - 1 , input),0);

    this.setState({
      activeInput
    })
  }

  focusNextInput = () => {
    const { activeInput } = this.state;    
    this.focusInput(activeInput + 1);
  }

  focusPrevInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput - 1)
  }

  handleOnChange = (e: Object) => {
    this.focusNextInput();
  }
  
  handleOnKeyDown = (e: Object) => {
    switch(e.keyCode) {
      case BACKSPACE:
        e.preventDefault();
        e.target.value = '';
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
  }

  renderInputs = () => {
    const { activeInput } = this.state;
    const { numberOfInputs } = this.props;
    const inputs = [];

    for (let i = 0; i < numberOfInputs; i++) {
      inputs.push(
        <SingleOtpInput 
          key={i} 
          focus={activeInput === i}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
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
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>{this.renderInputs()}</div>
    );
  }
}
 
export default OtpInput;