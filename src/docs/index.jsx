import React from "react";
import { render } from "react-dom";
import OtpInput from "../../lib";
import "./styles.css";

function Demo() {
  return (
    <div>
      <h1>Demo with examples of the component</h1>
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

render(<Demo />, document.getElementById("app"));
