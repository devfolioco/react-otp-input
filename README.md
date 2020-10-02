<h1 align="center">React-otp-input</h1>
<p align="center">
  <a href="https://github.com/devfolioco/react-otp-input/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/devfolioco/react-otp-input"></a>
  <a href="https://github.com/devfolioco/react-otp-input/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/devfolioco/react-otp-input"></a>
  <a href="https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fdevfolioco%2Freact-otp-input"><img alt="Twitter" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com"></a>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/devfolioco/react-otp-input">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/devfolioco/react-otp-input">
  <br>
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/y/devfolioco/react-otp-input">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/devfolioco/react-otp-input">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/devfolioco/react-otp-input">
  <br>
  <a href="https://t.me/devfolio"><img src="https://img.shields.io/badge/chat-on%20telegram-brightgreen"></a>
</p>
A fully customizable, one-time password input component for the web built with React.
<br>

![see here](https://media.giphy.com/media/lN98dFU6h3oP0wWS5x/giphy.gif)

[Live Demo](https://devfolioco.github.io/react-otp-input)

[CodeSandbox](https://codesandbox.io/s/react-otp-input-demo-v2-1iy52)

## Prequesites

## Installation

[![NPM](https://nodei.co/npm/react-otp-input.png?compact=true)](https://nodei.co/npm/react-otp-input/)

#### To install the latest stable version:

```
npm install --save react-otp-input
```

#### Basic usage:

```jsx
import React, { Component } from 'react';
import OtpInput from 'react-otp-input';

export default class App extends Component {
  state = { otp: '' };

  handleChange = otp => this.setState({ otp });

  render() {
    return (
      <OtpInput
        value={this.state.otp}
        onChange={this.handleChange}
        numInputs={6}
        separator={<span>-</span>}
      />
    );
  }
}
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
    <td>separator</td>
    <td>component<br/></td>
    <td>false</td>
    <td>none</td>
    <td>Provide a custom separator between inputs by passing a component. For instance, <code>&lt;span&gt;-&lt;/span&gt;</code> would add <code>-</code> between each input</td>
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
</table>

## Breaking changes when porting to v1.0.0

`react-otp-input` is now a controlled component to facilitate functionalities that weren't possible before from the application using it, such as clearing or pre-assigning values. For `v1.0.0` and above, a `value` prop needs to be passed in the component for it to function as expected.

## Development

#### To run the development server:

```
npm run dev
```

#### To run the development server for example:

```
npm run docs
```

#### To make a production build of the example:

```
npm run docs:prod
```

## Checklist

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat&logo=github)](https://github.com/devfolioco/react-otp-input/pulls) [![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/devfolioco/react-otp-input)

- [x] Add flowtypes
- [x] Add ESLint, Prettier for code quality
- [x] Add styling support for states including focus/disabled
- [ ] Travis CI, Codecov
- [ ] Write tests

## Contributing

[![GitHub issues](https://img.shields.io/github/issues-raw/devfolioco/react-otp-input?logo=github)](https://github.com/devfolioco/react-otp-input/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/devfolioco/react-otp-input?logo=git)](https://github.com/devfolioco/react-otp-input/pulls)

Feel free to open [issues](https://github.com/devfolioco/react-otp-input/issues/new/choose) and [pull requests](https://github.com/devfolioco/react-otp-input/pulls)!

## License

[![NPM](https://img.shields.io/npm/l/react-otp-input)](https://github.com/devfolioco/react-otp-input/blob/master/LICENSE)
