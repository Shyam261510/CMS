"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setisFetch } from "@/lib/dataSlice";

import axios from "axios";
import Navbar from "@/components/navbar";
import EntityCreationCard from "@/components/EntityCreationCard";
import { Loading } from "@/components/Loader";
import OrganizationComponent from "@/components/OrganizationComponent";
import { getUserData } from "@/hooks/getUserData";
import { getOrganization } from "@/hooks/getOrganization";
import { fetchAllUsers } from "@/hooks/fetchAllUser";

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

  // Getting user info like id , email , name etc.

  getUserData();

  // getting organization data

  getOrganization();

  // Getting all user's how have login in to our portal
  fetchAllUsers();

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
