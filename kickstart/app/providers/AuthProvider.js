"use client";

import { useState } from "react";

import { AuthContext } from "../contexts";

export default function AuthProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [product, setProduct] = useState({
    id: "",
    quantity: 1,
  });

  const [timeoutId, setTimeoutId] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        product,
        setProduct,
        timeoutId,
        setTimeoutId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
