# react-otp-input

[![npm version](https://badge.fury.io/js/react-otp-input.svg)](https://badge.fury.io/js/react-otp-input) [![npm](https://img.shields.io/npm/dw/react-otp-input.svg?logo=npm)](https://www.npmjs.com/package/react-otp-input) [![npm](https://img.shields.io/bundlephobia/minzip/react-otp-input)](https://www.npmjs.com/package/react-otp-input)
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

A fully customizable, one-time password input component for the web built with React.

![see here](https://media.giphy.com/media/lN98dFU6h3oP0wWS5x/giphy.gif)

[Live Demo](https://devfolioco.github.io/react-otp-input)
<!-- 
[CodeSandbox](https://codesandbox.io/s/react-otp-input-demo-v2-1iy52) -->

## Installation

[![NPM](https://nodei.co/npm/react-otp-input.png?compact=true)](https://nodei.co/npm/react-otp-input/)

#### To install the latest stable version:

```
npm install --save react-otp-input
```

### Still using v2?
No problem! You can find the documentation for v2 [here](https://github.com/devfolioco/react-otp-input/tree/v2.4.0)

#### Basic usage:

```jsx
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export default function App() {
  const [otp, setOtp] = useState('');

  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
  );
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
    <td>renderInput</td>
    <td>function</td>
    <td>true</td>
    <td>none</td>
    <td>A function that returns the input that is supposed to be rendered for each of the input fields. 
      The function will get two arguments: <code>inputProps</code> and <code>index</code>. <code>inputProps</code> is an object that contains all the props <b>that should be passed to the input being rendered</b> (Overriding these props is not recommended because it might lead to some unexpected behaviour). <code>index</code> is the index of the input being rendered.
    </td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>function</td>
    <td>true</td>
    <td>console.log</td>
    <td>Returns OTP code typed in inputs.</td>
  </tr>
  <tr>
    <td>onPaste</td>
    <td>function</td>
    <td>false</td>
    <td>none</td>
    <td>Provide a custom onPaste event handler scoped to the OTP inputs container. Executes when content is pasted into any OTP field.
    </br></br>
    Example:
    <pre>
const handlePaste: React.ClipboardEventHandler<HTMLDivElement> = (event) => {
  const data = event.clipboardData.getData('text');
  console.log(data)
};</pre>

  </td>
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
    <td>renderSeparator</td>
    <td>component / function<br/></td>
    <td>false</td>
    <td>none</td>
    <td>Provide a custom separator between inputs by passing a component. For instance, <code>&lt;span&gt;-&lt;/span&gt;</code> would add <code>-</code> between each input.</td> You can also pass a function that returns a component, where the function will get the index of the separator being rendered as an argument.
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
    <td>inputType</td>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#input_types">&lt;input&gt; type<a></td>
    <td>false</td>
    <td>text</td>
    <td>The type of the input that will be passed to the input element being rendered. In v2 <code>isInputNum</code> used to set the input type as <code>tel</code> and prevented non numerical entries, so as to avoid the spin buttons added to the inputs with input type <code>number</code>. That behaviour is still supported if you pass <code>tel</code> to the inputType prop.</td>
  </tr>
  <tr>
    <td>shouldAutoFocus</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Auto focuses input on initial page load.</td>
  </tr>
  <tr>
    <td>skipDefaultStyles</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>The component comes with default styles for legacy reasons. Pass <code>true</code> to skip those styles. This prop will be removed in the next major release.</td>
  </tr>
</table>

### ⚠️ Warning
Do not override the following props on the input component that you return from the `renderInput` prop. Doing so might lead to unexpected behaviour.
- `ref`
- `value`
- `onChange`
- `onFocus`
- `onBlur`
- `onKeyDown`
- `onPaste`
- `onInput`
- `type`
- `inputMode`

## Migrating from v2

The v3 of `react-otp-input` is a complete rewrite of the library. Apart from making the API more customizable and flexible, this version is a complete rewrite of the library using TypeScript and React Hooks. Here are the breaking changes that you need to be aware of:

- You now need to pass your own custom input component that will be rendered for each of the input fields via `renderInput` prop. This gives you the flexibility to customize the input fields as you desire. This also means that props like `focusStyle`, `isDisabled`, `disabledStyle`, `hasErrored`, `errorStyle`, `isInputNum`, `isInputSecure`, `data-cy` and `data-testid` are no longer supported. You can achieve the same functionality and more by passing the relevant props directly to the input component that you return from the `renderInput` prop.

- The `separator` prop has now been renamed to `renderSeparator`. This prop now apart from accepting a component that will be rendered as a separator between inputs like it used to, now also accepts a function that returns a component. The function will get the index of the separator being rendered as an argument.

- A new prop called `inputType` has been added to the component. This prop can be used to specify the type of the input that will be passed to the input element being rendered. The default value of this prop is `number`.

## Migrating from v1

`react-otp-input` is now a controlled component to facilitate functionalities that weren't possible before from the application using it, such as clearing or pre-assigning values. For `v1.0.0` and above, a `value` prop needs to be passed in the component for it to function as expected.

## Development

#### To run the vite example:

```
cd example
npm run dev
```

## Checklist

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat&logo=github)](https://github.com/devfolioco/react-otp-input/pulls) [![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/devfolioco/react-otp-input)

- [ ] Write tests
- [ ] Add actions for lint checks and tests

## Contributing

[![GitHub issues](https://img.shields.io/github/issues-raw/devfolioco/react-otp-input?logo=github)](https://github.com/devfolioco/react-otp-input/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/devfolioco/react-otp-input?logo=git)](https://github.com/devfolioco/react-otp-input/pulls)

Feel free to open [issues](https://github.com/devfolioco/react-otp-input/issues/new/choose) and [pull requests](https://github.com/devfolioco/react-otp-input/pulls)!

## License

[![NPM](https://img.shields.io/npm/l/react-otp-input)](https://github.com/devfolioco/react-otp-input/blob/master/LICENSE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/apollonian"><img src="https://avatars2.githubusercontent.com/u/2150306?v=4?s=100" width="100px;" alt="Abhishek Warokar"/><br /><sub><b>Abhishek Warokar</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/commits?author=apollonian" title="Code">💻</a> <a href="#design-apollonian" title="Design">🎨</a> <a href="#maintenance-apollonian" title="Maintenance">🚧</a> <a href="#ideas-apollonian" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/devfolioco/react-otp-input/pulls?q=is%3Apr+reviewed-by%3Aapollonian" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ajayns.me"><img src="https://avatars0.githubusercontent.com/u/20743219?v=4?s=100" width="100px;" alt="Aj"/><br /><sub><b>Aj</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/commits?author=ajayns" title="Code">💻</a> <a href="#design-ajayns" title="Design">🎨</a> <a href="#ideas-ajayns" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://aromalanil.me"><img src="https://avatars1.githubusercontent.com/u/49222186?v=4?s=100" width="100px;" alt="Aromal Anil"/><br /><sub><b>Aromal Anil</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/commits?author=aromalanil" title="Code">💻</a> <a href="#tool-aromalanil" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://borntofrappe.github.io"><img src="https://avatars0.githubusercontent.com/u/33316703?v=4?s=100" width="100px;" alt="Gabriele Corti"/><br /><sub><b>Gabriele Corti</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/commits?author=borntofrappe" title="Code">💻</a> <a href="#a11y-borntofrappe" title="Accessibility">️️️️♿️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.anoopms.me"><img src="https://avatars1.githubusercontent.com/u/46913894?v=4?s=100" width="100px;" alt="Anoop"/><br /><sub><b>Anoop</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/commits?author=anoopmsivadas" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://dewanshrawat.xyz"><img src="https://avatars0.githubusercontent.com/u/17003127?v=4?s=100" width="100px;" alt="Dewansh Rawat"/><br /><sub><b>Dewansh Rawat</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/issues?q=author%3Adewanshrawat15" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ishanchhabra.com"><img src="https://avatars3.githubusercontent.com/u/32290367?v=4?s=100" width="100px;" alt="Ishan Chhabra"/><br /><sub><b>Ishan Chhabra</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/commits?author=ishan-chhabra" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.causztic.com"><img src="https://avatars.githubusercontent.com/u/2081441?v=4?s=100" width="100px;" alt="yaojie"/><br /><sub><b>yaojie</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/commits?author=causztic" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://prateeksurana.me"><img src="https://avatars.githubusercontent.com/u/21277179?v=4?s=100" width="100px;" alt="Prateek Surana"/><br /><sub><b>Prateek Surana</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/commits?author=prateek3255" title="Code">💻</a> <a href="#maintenance-prateek3255" title="Maintenance">🚧</a> <a href="#ideas-prateek3255" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/devfolioco/react-otp-input/commits?author=prateek3255" title="Documentation">📖</a> <a href="#design-prateek3255" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/suleymanbariseser"><img src="https://avatars.githubusercontent.com/u/50797736?v=4?s=100" width="100px;" alt="Süleyman Barış Eser"/><br /><sub><b>Süleyman Barış Eser</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/issues?q=author%3Asuleymanbariseser" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://medium.com/@skdomino"><img src="https://avatars.githubusercontent.com/u/28181?v=4?s=100" width="100px;" alt="Steve Domino"/><br /><sub><b>Steve Domino</b></sub></a><br /><a href="https://github.com/devfolioco/react-otp-input/commits?author=sdomino" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
