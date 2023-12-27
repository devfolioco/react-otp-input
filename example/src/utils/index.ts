enum InputType {
  TEXT = "text",
  NUMBER = "number",
  PASSWORD = "password",
  TEL = "tel"
}

export type TConfig = {
  otp: string;
  numInputs: number | undefined; separator: string; minLength:number; maxLength:number; placeholder:string; inputType: InputType
}