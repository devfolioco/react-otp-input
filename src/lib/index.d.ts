export default OtpInput;
declare class OtpInput {
    static defaultProps: {
        numInputs: number;
        onChange: (otp: number) => void;
        isDisabled: boolean;
        shouldAutoFocus: boolean;
        value: string;
    };
    state: {
        activeInput: number;
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
    render(): any;
}
