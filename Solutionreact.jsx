import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
 
export default class App extends Component {
  render() {
    return (
      <div>
        <OtpInput
          onChange={otp => console.log(otp)}
          numInputs={6}
          separator={<span>-</span>}
        />
      </div>
    );
  }
}
