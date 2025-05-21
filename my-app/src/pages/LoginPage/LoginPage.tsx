import "./LoginPage.css";
import TextInput from "../../components/TextInput/TextInput.tsx";
import Button from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router";
import { FormEventHandler, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import type { LoginFormError, LoginFormState } from "./types.ts";
import {
  clearLoginError,
  loginAsync,
  selectAuth,
} from "../../redux/features/authSlice/authSlice.ts";
import { passwordValidator, usernameValidator } from "../../util/util.ts";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, loginError } = useAppSelector(selectAuth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginFormError>({});

  const ref = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> | undefined = async (e) => {
    e.preventDefault();
    const validationErrors = validate({ username, password });

    if (validationErrors) {
      return setErrors(validationErrors);
    }

    try {
      await dispatch(loginAsync({ username, password })).unwrap();
      navigate("/products");
    } catch (e) {
      console.error(e);
    }
  };

  const validate = ({ username, password }: LoginFormState) => {
    const newErrors: LoginFormError = {};

    newErrors.usernameError = usernameValidator(username);
    newErrors.passwordError = passwordValidator(password);

    if (newErrors.usernameError || newErrors.passwordError) return newErrors;

    return null;
  };

  return (
    <div className={"login-page-main-wrapper"}>
      <form className={"login-form"} onSubmit={onSubmit}>
        <TextInput
          onChange={(e) => {
            setUsername(e.target.value);
            dispatch(clearLoginError());
            setErrors({
              ...errors,
              usernameError: "",
            });
          }}
          value={username}
          label={"Username"}
          name={"username"}
          error={!!errors.usernameError ? errors.usernameError : loginError}
          ref={ref}
        />
        <TextInput
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({
              ...errors,
              passwordError: "",
            });
            dispatch(clearLoginError());
          }}
          value={password}
          label={"Password"}
          name={"password"}
          type={"password"}
          error={errors.passwordError}
        />
        <Button
          style={{ maxWidth: "100%" }}
          isLoading={isLoading}
          label={"Log in"}
        />
      </form>
    </div>
  );
}
