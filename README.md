# react18-otp-input

![GitHub package.json version](https://img.shields.io/github/package-json/v/mahdimhqq/react18-otp-input?color=g)
[![npm](https://img.shields.io/npm/dw/react18-otp-input.svg?logo=npm)](https://www.npmjs.com/package/react18-otp-input) [![npm](https://img.shields.io/bundlephobia/minzip/react18-otp-input@latest)](https://img.shields.io/bundlephobia/minzip/react18-otp-input@latest)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

A fully customizable, one-time password input component for the web built with React. This package is based on great work of contributers of `react-otp-input`. But i needed this package and for unknown reasons the contributers of the original package does not accept the open PRs that solve the _REACT 18_ dependency problem. So based on The PR [here](https://github.com/devfolioco/react-otp-input/pull/347) i created this package for the others who need this.
To see the original package [Click](https://github.com/devfolioco/react-otp-input)

[CodeSandbox & LiveDemo](https://codesandbox.io/s/react18-otp-input-demo-j7z0bk?file=/public/index.html)

## Installation

[![NPM](https://nodei.co/npm/react18-otp-input.png)](https://nodei.co/npm/react18-otp-input/)

#### To install the latest stable version:

```
npm install --save react18-otp-input
```

#### Basic usage:

```jsx
import React, { useState } from 'react';

import OtpInput from 'react18-otp-input';

function App() {
  const [otp, setOtp] = useState('');

  return (
    <OtpInput
      inputStyle="inputStyle"
      numInputs={4}
      onChange={(value) => setOtp(value)}
      separator={<span>-</span>}
      isInputNum={true}
      shouldAutoFocus
      value={otp}
    />
  );
}

export default App;
```

## API

<table>
  <tr>
    <th>Name<br/></th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>numInputs</td>
    <td>number</td>
    <td>true</td>
    <td>4</td>
    <td>Number of OTP inputs to be rendered.</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>function</td>
    <td>true</td>
    <td>console.log</td>
    <td>Returns OTP code typed in inputs.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>string / number</td>
    <td>true</td>
    <td>''</td>
    <td>The value of the OTP passed into the component.</td>
  </tr>
    <tr>
     <td>placeholder</td>
     <td>string</td>
     <td>false</td>
     <td>none</td>
     <td>Specify an expected value of each input. The length of this string should be equal to <code>numInputs</code>.</td>
   </tr>
  <tr>
    <td>separator</td>
    <td>component<br/></td>
    <td>false</td>
    <td>none</td>
    <td>Provide a custom separator between inputs by passing a component. For instance, <code>&lt;span&gt;-&lt;/span&gt;</code> would add <code>-</code> between each input.</td>
  </tr>
  <tr>
    <td>containerStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to container of inputs.</td>
  </tr>
  <tr>
    <td>inputStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input.</td>
  </tr>
  <tr>
    <td>focusStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to inputs on focus.</td>
  </tr>
  <tr>
    <td>isDisabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Disables all the inputs.</td>
  </tr>
  <tr>
    <td>disabledStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input when disabled.</td>
  </tr>
  <tr>
    <td>hasErrored</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Indicates there is an error in the inputs.</td>
  </tr>
  <tr>
    <td>errorStyle</td>
    <td>style (object) / className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input when errored.</td>
  </tr>
  <tr>
    <td>shouldAutoFocus</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Auto focuses input on initial page load.</td>
  </tr>
  <tr>
    <td>isInputNum</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Restrict input to only numbers.</td>
  </tr>
  <tr>
    <td>isInputSecure</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Masks input characters.</td>
  </tr>
  <tr>
    <td>data-cy</td>
    <td>string</td>
    <td>false</td>
    <td>-</td>
    <td>Test attribute passed to the inputs.</td>
  </tr>
  <tr>
    <td>data-testid</td>
    <td>string</td>
    <td>false</td>
    <td>-</td>
    <td>Test attribute passed to the inputs.</td>
  </tr>
</table>

## Development

#### To run the development server:

```
npm run dev
```

## License

[![NPM](https://img.shields.io/npm/l/react18-otp-input)](https://github.com/mahdimhqq/react18-otp-input/blob/master/LICENSE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/MahdiMhqq"><img src="https://avatars.githubusercontent.com/u/90528664?v=4" width="100px;" alt="Mahdi Mohaqeq"/><br /><sub><b>Mahdi Mohaqeq</b></sub></a><br /><a href="https://github.com/mahdimhqq/react18-otp-input/commits?author=mahdimhqq" title="Code">💻</a><a href="#maintenance-mahdimhqq" title="Maintenance">🚧</a> <a href="#ideas-mahdimhqq" title="Ideas, Planning, & Feedback">🤔</a> <a href="" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
