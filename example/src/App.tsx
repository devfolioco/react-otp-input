import React from 'react';
import OTPInput from '../../src';

function App() {
  const [{
    otp, numInputs, separator, minLength, maxLength, placeholder, inputType, inputColor, companyName, logoFile
  }, setConfig] = React.useState({
    otp: '',
    numInputs: 4,
    separator: '-',
    minLength: 0,
    maxLength: 40,
    placeholder: '',
    inputType: 'text' as const,
    inputColor: '#ffffff', // Default color for the OTP input container
    companyName: '', // New state for Company Name
    logoFile: null // New state for Logo file
  });

  const handleOTPChange = (otp: string) => {
    setConfig((prevConfig) => ({ ...prevConfig, otp }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setConfig((prevConfig) => ({ ...prevConfig, [name]: value }));
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    setConfig((prevConfig) => ({ ...prevConfig, logoFile: file }));
  };

  const handleNumInputsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let numInputs = event.target.valueAsNumber;

    if (numInputs < minLength || numInputs > maxLength) {
      numInputs = 4;
      console.error(`Please enter a value between ${minLength} and ${maxLength}`);
    }

    setConfig((prevConfig) => ({ ...prevConfig, numInputs }));
  };

  const clearOtp = () => {
    setConfig((prevConfig) => ({ ...prevConfig, otp: '' }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(otp);
  };

  return (
    <div className="container">
      <div className="side-bar">
        <a href="https://github.com/devfolioco/react-otp-input" target="_blank" rel="noreferrer">
          <div className="side-bar__segment side-bar__segment--header">
            <h2>react-otp-input</h2>
          </div>
        </a>
        <div className="side-bar__segment">
          <label htmlFor="num-inputs">
            numInputs
            <input
              id="num-inputs"
              name="numInputs"
              type="number"
              value={numInputs}
              onChange={handleNumInputsChange}
              min={minLength}
              max={maxLength}
            />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="separator">
            separator
            <input
              id="separator"
              maxLength={1}
              name="separator"
              type="text"
              value={separator}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="value">
            <input id="value" placeholder='Your OTP Value' maxLength={numInputs} name="otp" type="text" value={otp} onChange={handleChange} />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="placeholder">
            placeholder
            <input id="placeholder" name="placeholder" type="text" value={placeholder} onChange={handleChange} />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="inputType">inputType</label>
          <select id="inputType" name="inputType" value={inputType} onChange={handleChange}>
            <option value="text">text</option>
            <option value="number">number</option>
            <option value="password">password</option>
            <option value="tel">tel</option>
          </select>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="inputColor">
            Color
            <input id="inputColor" name="inputColor" type="color" value={inputColor} onChange={handleChange} />
          </label>
        </div>
        {/* Add Company Name Input */}
        <div className="side-bar__segment">
          <label htmlFor="companyName">
            Company Name
            <input id="companyName" name="companyName" type="text" value={companyName} onChange={handleChange} />
          </label>
        </div>
        {/* Add Logo Input */}
        <div className="side-bar__segment">
          <label htmlFor="logoFile">
            Logo
            <input id="logoFile" name="logoFile" type="file" accept="image/*" onChange={handleLogoChange} />
          </label>
          {/* Display message if logo is uploaded */}
          {logoFile && (
            <p style={{ fontSize: '12px', color: '#555', marginTop: '5px' }}>
              Logo uploaded
            </p>
          )}
        </div>
        <div className="side-bar__segment side-bar__segment--bottom">
          <a href="https://github.com/devfolioco/react-otp-input">Documentation and Source</a>
        </div>
      </div>
      <div className="view">
        <div className="card" style={{ backgroundColor: inputColor, width: '400px', height: 'auto', padding: '20px', position: 'relative' }}>
          <form onSubmit={handleSubmit}>
            {/* Display the Logo if uploaded */}
            {logoFile && (
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <img
                  src={URL.createObjectURL(logoFile)}
                  alt="Logo"
                  style={{ width: '50px' }}
                />
              </div>
            )}
            {/* Display the Company Name if entered */}
            {companyName && <h3 style={{ textAlign: 'center' }}>{companyName}</h3>}
            
            <p>Enter verification code</p>
            <div className="margin-top--small">
              <OTPInput
                inputStyle={{
                  width: '50px',
                  height: '50px',
                  border: '1px solid #000',
                  borderRadius: '5px',
                  textAlign: 'center',
                  margin: '0 5px',
                }}
                numInputs={numInputs}
                onChange={handleOTPChange}
                renderSeparator={<span>{separator}</span>}
                value={otp}
                placeholder={placeholder}
                inputType={inputType}
                renderInput={(props) => <input {...props} />}
                shouldAutoFocus
              />
            </div>
            <div className="btn-row">
              <button className="btn margin-top--large" type="button" disabled={otp.trim() === ''} onClick={clearOtp}>
                Clear
              </button>
              <button className="btn margin-top--large" disabled={otp.length < numInputs}>
                Get OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
