"use client";
import { AuthContext } from "../contexts";
import { useContext } from "react";

export const useAuth = () => {
  const {
    loggedUser,
    setLoggedUser,
    product,
    setProduct,
    timeoutId,
    setTimeoutId,
  } = useContext(AuthContext);

  return {
    loggedUser,
    setLoggedUser,
    product,
    setProduct,
    timeoutId,
    setTimeoutId,
  };
};
