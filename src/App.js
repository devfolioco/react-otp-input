import React, { Component } from 'react';
import OtpInput from './OtpInput';

class App extends Component {
  render() {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <OtpInput
          containerStyle={{ padding: '2em' }}
          inputStyle={{
            background: 'white',
            fontSize: 24,
            color: 'black',
            border: '1px solid grey',
            margin: '1em',
            padding: 16,
          }}
        />
      </div>
    );
  }
}

export default App;
