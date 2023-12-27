enum InputType {
"text",
"number",
"password",
"tel"
}

export type TConfig = {
  otp: string;
  numInputs: number;
  separator: string;
  minLength:number;
  maxLength:number;
  placeholder:string;
  inputType: "text" | "number" | "password" | "tel"
}