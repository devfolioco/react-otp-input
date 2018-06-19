# react-otp-input

A fully customizable, one-time password input component for the web built with React.

![GIPHY](https://media.giphy.com/media/9JiszPVOX5FuPfJm39/giphy.gif)

[Live Demo](https://devfolioco.github.io/react-otp-input)

## Installation

To install the latest stable version:

```
npm install --save react-otp-input
```

Basic usage:

```javascript
import React, { Component } from 'react';
import OtpInput from 'react-otp-input';

export default class App extends Component {
  render() {
    return (
      <div>
        <OtpInput
          onChange={otp => console.log(otp)}
          numInputs={6}
          separator={<span>-<span>}
        />
      </div>
    )
  }
}
```

## API

<table>
  <tr>
    <th>Name<br></th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>numInputs</td>
    <td>number</td>
    <td><strong>true</strong></td>
    <td>4</td>
    <td>Number of OTP inputs to be rendered.</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>function</td>
    <td><strong>true</strong></td>
    <td>console.log</td>
    <td>Returns OTP code typed in inputs.</td>
  </tr>
  <tr>
    <td>separator</td>
    <td>component<br></td>
    <td>false</td>
    <td></td>
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
    <td>Auto focuses input on inital page load.</td>
  </tr>
</table>

## Development

To run the development server:

```
npm run dev
```

To run the development server for example:

```
npm run docs
```

To make a production build of the example:

```
npm run docs:prod
```

## Checklist

- [x] Add flowtypes
- [x] Add ESLint, Prettier for code quality
- [x] Add styling support for states including focus/disabled
- [ ] Travis CI, Codecov
- [ ] Write tests

## Contributing

Feel free to open issues and pull requests!

## License

MIT
