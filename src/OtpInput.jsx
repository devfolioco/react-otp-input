// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {
  numberOfInputs: number
}

const SingleOtpInput = () => {
  return <Input type="tel" maxLength="1"/>
}

class OtpInput extends Component<Props> {
  static defaultProps = {
    numberOfInputs: 4
  }

  renderInputs = () => {
    const { numberOfInputs } = this.props;
    const inputs = [];

    for (let i = 0; i < numberOfInputs; i++) {
      inputs.push(
        <SingleOtpInput />
      )
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