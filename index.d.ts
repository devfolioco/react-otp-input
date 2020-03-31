declare module 'react-otp-input' {
  import React from 'react';

  type Props = {
    numInputs: number;
    onChange: (value: string) => void;
    separator?: JSX.Element;
    containerStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    focusStyle?: React.CSSProperties;
    isDisabled?: boolean;
    disabledStyle?: any;
    hasErrored?: boolean;
    errorStyle?: React.CSSProperties;
    shouldAutoFocus?: boolean;
    isInputNum?: boolean;
    value?: string;
  };

  type State = {
    activeInput: number;
    otp: string[];
  };

  class OtpInput extends React.Component<Props, State> {}

  export default OtpInput;
}
