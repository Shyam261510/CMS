"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserData,
  setOrganization,
  setLoading,
  setisFetch,
} from "@/lib/dataSlice";
import { useSession } from "next-auth/react";

import type { UserState } from "@/lib/dataSlice";
import axios from "axios";
import Navbar from "@/components/navbar";
import EntityCreationCard from "@/components/EntityCreationCard";
import { Loading } from "@/components/Loader";
import { Button } from "@/components/ui/button";

export default function Home() {
  const dispatch = useDispatch();
  const [organizationName, setOrganizationName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // ✅ Correctly type useSelector
  const userData = useSelector((state: any) => state.userSlice.userData);
  const Organizations = useSelector(
    (state: any) => state.userSlice.organization
  );
  const loading = useSelector((state: any) => state.userSlice.isLoading);
  const isFetch = useSelector((state: any) => state.userSlice.isFetch);
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
  }, [data, status, dispatch, userData]); // Dependencies to trigger effect only when session changes

  // checking if User join any Organization or not
  useEffect(() => {
    if (userData.id) {
      const getOrganization = async () => {
        try {
          dispatch(setLoading(true));
          const result = await axios.get(
            `/api/getOrganization?id=${userData.id}`
          );

          dispatch(setOrganization(result.data.organization));
        } catch (e) {
          console.error(`Error Occur while getting organization`);
        } finally {
          dispatch(setLoading(false));
        }
      };

      getOrganization();
    }
  }, [status, userData, isFetch]);

  async function createOrganization(e: React.FormEvent) {
    e.preventDefault();
    dispatch(setLoading(true));
    const result = await axios.post("/api/createOrganization", {
      id: userData.id,
      organizationName,
    });
    dispatch(setisFetch(!isFetch));
    dispatch(setLoading(false));

    console.log(result.data);
  }
  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <EntityCreationCard
            showDescription={Organizations ? false : true}
            description="organization"
            entityName={organizationName}
            setEntityName={setOrganizationName}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleCreateEntity={createOrganization}
          />

          <div className="flex gap-3 items-center justify-center py-9 px-26 flex-wrap  ">
            {Organizations &&
              Organizations.map((organization: any) => (
                <div
                  key={organization.id}
                  className=" flex justify-center shadow-[3px_-1px_5px_7px_rgba(0,_0,_0,_0.1)] rounded-md"
                >
                  <div className="flex justify-between py-7 p-8 gap-44 items-center">
                    <div className="flex flex-col gap-3">
                      {" "}
                      <h2 className="text-lg font-semibold ">
                        Workspace for{" "}
                        <span className="font-bold">{userData.email}</span>{" "}
                      </h2>
                      <div className="text-md font-bold">
                        {organization.organizationName}
                      </div>
                    </div>
                    <Button className="cursor-pointer">Launch</Button>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
