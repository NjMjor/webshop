export function isParamValidId(id: string) {
  return !isNaN(Number(id));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function usernameValidator(username?: string) {
  if (!username) return "Username is required";

  if (username.length < 3) return "Username must be at least 3 characters long";
  else if (username.length > 30)
    return "Username must be less than 30 characters long";
  else if (username.includes(" ")) return "Username must not contain spaces";
  else if (/[!@#$%^&*()[\]{}|\\;:'",.<>/?`+=]/.test(username))
    return "Username must not contain special characters";

  return "";
}

export function passwordValidator(password?: string) {
  if (!password) return "Password is required";

  if (password.length < 3) return "Password must be at least 3 characters long";
  else if (password.length > 50)
    return "Password must be less than 50 characters long";
  else if (password.includes(" ")) return "Password must not contain spaces";

  return "";
}
