"use client";
import React, { useState } from "react";
import { useAuth } from "./useAuth";
import { updateWishlist } from "../../actions";

import {
  useSearchParams,
  usePathname,
  useRouter,
  useParams,
} from "next/navigation";
import { useSession } from "next-auth/react";
import { Bounce, toast } from "react-toastify";

export default function useWishlist(productId) {
  const { loggedUser, setLoggedUser } = useAuth();

  const langParam = useParams().lang;

  const { replace, push } = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const [isWishlist, setIsWishlist] = useState(
    loggedUser?.wishlist?.includes(productId) || false
  );

  const handleWishlist = async (userId) => {
    if (loggedUser) {
      const newUser = await updateWishlist(productId, loggedUser?.id);
      setLoggedUser(newUser);
      setIsWishlist(!isWishlist);
      toast(isWishlist ? "Removed from wishlist" : "Added to wishlist", {
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
      return newUser;
    } else {
      params.set("wishlist", productId);

      if (pathname.includes("productDetails")) {
        replace(`/${langParam}/login?${params.toString()}`);
      } else {
        replace(`${pathname}/login?${params.toString()}`);
      }
    }
  };
  return {
    isWishlist,
    setIsWishlist,
    handleWishlist,
  };
}
