import { badRequest } from "./http.js";
import validator from "validator";

export const invalidPasswordResponse = () => {
  return badRequest({
    message: "Password must be at least 6 characters.",
  });
};

export const invalidEmailResponse = () => {
  return badRequest({
    message: "Invalid e-mail. Please provided a valid one.",
  });
};

export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);
