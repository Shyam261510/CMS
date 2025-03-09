"use client";

import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { setLoading, setUserData } from "@/lib/dataSlice";
import type { UserState } from "@/lib/dataSlice";

export function getUserData() {
  const userData = useSelector((state: any) => state.userSlice.userData);
  const dispatch = useDispatch();
  // ✅ Get session data
  const { data, status } = useSession();

  // ✅ Use useEffect to avoid infinite loop
  useEffect(() => {
    if (data?.user && status === "authenticated") {
      const { id, name, email, image } = data.user as UserState;

      // ✅ Only dispatch if the user data is different
      if (
        userData.id !== id ||
        userData.name !== name ||
        userData.email !== email ||
        userData.image !== image
      ) {
        dispatch(setLoading(true));
        dispatch(setUserData({ id, name, email, image }));
        dispatch(setLoading(false));
      }
    }
  }, [data, status, dispatch, userData]);
}
