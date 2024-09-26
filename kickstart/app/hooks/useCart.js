"use client";
import React, { useState } from "react";
import { useAuth } from "./useAuth";
import {
  addProductToStock,
  deleteProductFromCart,
  deleteProductFromStock,
  updateCart,
} from "../../actions";
import { Bounce, toast } from "react-toastify";

export default function useCart(productId, stock) {
  const {
    loggedUser,
    setLoggedUser,
    product,
    setProduct,
    timeoutId,
    setTimeoutId,
  } = useAuth();

  const [isCart, setIsCart] = useState(
    loggedUser?.cart?.some((item) => item?.product === productId)
  );

  const [error, setError] = useState(null);

  async function handleAddToCart() {
    if (loggedUser) {
      if (product?.quantity > stock) {
        setError("Select quantity less than available stock");
        setIsCart(false);
      } else {
        if (!isCart) {
          const newUser = await updateCart(
            productId,
            loggedUser?.id,
            product?.quantity
          );
          setLoggedUser(newUser);

          const newProd = await deleteProductFromStock(
            productId,
            product?.quantity
          );

          const id = setTimeout(async () => {
            // Reverse operation here
            const newProd = await addProductToStock(productId, loggedUser?.id);
            const newUser = await deleteProductFromCart(
              productId,
              loggedUser?.id
            );
            setLoggedUser(newUser);
            setIsCart(false);
            toast("Removed from cart", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }, 60000);
          setTimeoutId(id);
          toast("Added to cart", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          console.log("removed");
          const newProd = await addProductToStock(productId, loggedUser?.id);
          const newUser = await deleteProductFromCart(
            productId,
            loggedUser?.id
          );
          setLoggedUser(newUser);
          clearTimeout(timeoutId);
          toast("Removed from cart", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
        setIsCart(!isCart);
        setProduct({
          id: "",
          quantity: 1,
        });
        setError(null);
      }
    } else {
      //TODO: redirect to login page
      console.log("Please login to add to cart");
    }
  }
  return {
    isCart,
    handleAddToCart,
    error,
    setIsCart,
  };
}
