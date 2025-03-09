"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "@/lib/dataSlice";
import axios from "axios";

export const fetchAllUsers = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userSlice.userData);
  const isFetch = useSelector((state: any) => state.userSlice.isFetch);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("/api/getUsers");

      dispatch(setAllUsers(result.data.allUsers));
    };
    fetch();
  }, [isFetch, userData, dispatch]);
};
