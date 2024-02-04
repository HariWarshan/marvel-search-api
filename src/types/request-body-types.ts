
export interface IRequestBodySignup {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface IRequestLogin {
  phone_number: string;
  password: string;
}
