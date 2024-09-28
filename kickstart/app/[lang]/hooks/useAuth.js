"use client";
import { AuthContext } from "../contexts";
import { useContext } from "react";

export const useAuth = () => {
  const { loggedUser, setLoggedUser } = useContext(AuthContext);

  return {
    loggedUser,
    setLoggedUser,
  };
};
