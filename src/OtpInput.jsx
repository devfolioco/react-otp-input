// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {
  numberOfInputs: number
}

const SingleOtpInput = (props: Object) => {
  return <Input type="tel" maxLength="1" {...props}/>
}

class OtpInput extends Component<Props> {
  static defaultProps = {
    numberOfInputs: 4
  }

  state = {
    activeInput: 0,
  };

  focusInput = (input: number) => {
    const { numberOfInputs } = this.props;
    const activeInput = Math.max(Math.min(numberOfInputs, input),0);

    this.setState({
      activeInput
    })
  }

  focusNextInput = () => {
    const { activeInput } = this.state;
    
    this.focusInput(activeInput + 1);
  }

  handleOnChange = (e: Object) => {
    this.focusNextInput();
  }

  renderInputs = () => {
    const { activeInput } = this.state;
    const { numberOfInputs } = this.props;
    const inputs = [];

    for (let i = 0; i < numberOfInputs; i++) {
      inputs.push(
        <SingleOtpInput 
          key={i} 
          innerRef={input => {
            if (activeInput === i)
              input && input.focus();
          }}
          onChange={this.handleOnChange}
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
      <div>{this.renderInputs()}</div>
    );
  }
}

const Input = styled.input`
  width: 1em;
`;
 
export default OtpInput;