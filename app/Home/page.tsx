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
import OrganizationComponent from "@/components/OrganizationComponent";

export default function Home() {
  const dispatch = useDispatch();
  const [organizationName, setOrganizationName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [hoveredOrgId, setHoveredOrgId] = useState<string | null>(null);

  // ✅ Correctly type useSelector
  const userData = useSelector((state: any) => state.userSlice.userData);

  const loading = useSelector((state: any) => state.userSlice.isLoading);
  const isFetch = useSelector((state: any) => state.userSlice.isFetch);
  const Organization = useSelector(
    (state: any) => state.userSlice.organization
  );
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
    setIsDialogOpen(false);
    dispatch(setisFetch(!isFetch));
    dispatch(setLoading(false));
  }
  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <EntityCreationCard
            showDescription={Organization ? false : true}
            description="Organization"
            entityName={organizationName}
            setEntityName={setOrganizationName}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleCreateEntity={createOrganization}
          >
            {Organization && (
              <OrganizationComponent
                organization={Organization}
                isHovered={hoveredOrgId === Organization.id}
                onHover={() => setHoveredOrgId(Organization.id)}
                onLeave={() => setHoveredOrgId(null)}
              />
            )}
          </EntityCreationCard>
        </>
      )}
    </div>
  );
}
