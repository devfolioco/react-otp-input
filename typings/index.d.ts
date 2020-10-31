import * as React from 'react';

export class OtpInput extends React.Component<OtpInputProps, OtpInputState> {
  static defaultProps: {
    numInputs: number;
    onChange: (otp: number) => void;
    isDisabled: boolean;
    shouldAutoFocus: boolean;
    value: string;
  };
  getOtpValue: () => any;
  getPlaceholderValue: () => any;
  handleOtpChange: (otp: string[]) => void;
  isInputValueValid: (value: any) => boolean;
  focusInput: (input: number) => void;
  focusNextInput: () => void;
  focusPrevInput: () => void;
  changeCodeAtFocus: (value: string) => void;
  handleOnPaste: (e: Object) => void;
  handleOnChange: (e: Object) => void;
  handleOnKeyDown: (e: Object) => void;
  handleOnInput: (e: Object) => void;
  renderInputs: () => any[];
}

export interface OtpInputProps {
  className?: string;
  containerStyle?: Object;
  disabledStyle?: Object;
  errorStyle?: Object;
  focusStyle?: Object;
  hasErrored?: boolean;
  inputStyle?: Object;
  isDisabled?: boolean;
  isInputNum?: boolean;
  isInputSecure?: boolean;
  numInputs: number;
  onChange: Function;
  placeholder: string;
  separator?: Object;
  shouldAutoFocus?: boolean;
  value?: string;
}

export interface OtpInputState {
  activeInput: number;
  otp: string[];
}
