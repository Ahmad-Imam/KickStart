"use client";

import { useState } from "react";

import { AuthContext } from "../contexts";

export default function AuthProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
