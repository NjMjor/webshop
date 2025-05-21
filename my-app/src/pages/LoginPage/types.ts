export interface LoginFormState {
  username: string;
  password: string;
}

export interface LoginFormError {
  usernameError?: string;
  passwordError?: string;
}
