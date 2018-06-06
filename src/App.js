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
            padding: 16,
          }}
          numInputs={6}
          separator={<span style={{ margin: '1em' }}>-</span>}
          separatorStyle={{ fontWeight: 'bold' }}
        />
      </div>
    );
  }
}

export default App;
