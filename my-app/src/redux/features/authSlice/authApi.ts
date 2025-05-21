import type { LoginFormState } from "../../../pages/LoginPage/types.ts";
import type { ApiResponse } from "../../types.ts";

export async function login({
  username,
  password,
}: LoginFormState): Promise<ApiResponse<boolean>> {
  const isSuccess = username === "admin" && password === "Admin123$";

  return {
    data: isSuccess,
    error: isSuccess ? undefined : "Invalid username or password",
  };
}
