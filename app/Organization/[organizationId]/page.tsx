"use client";
import Navbar from "@/components/navbar";
import { useParams } from "next/navigation";
import EntityCreationCard from "@/components/EntityCreationCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setisFetch, setLoading, setTeam } from "@/lib/dataSlice";
import { Loading } from "@/components/Loader";
import TeamCard from "@/components/team-card";

export default function organization() {
  const param = useParams();
  const { organizationId } = param;
  const dispatch = useDispatch();
  const teams = useSelector((state: any) => state.userSlice.team);
  const loading = useSelector((state: any) => state.userSlice.isLoading);
  const isFetch = useSelector((state: any) => state.userSlice.isFetch);
  const userData = useSelector((state: any) => state.userSlice.userData);

  const [teamName, setTeamName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getTeam() {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(
          `/api/getTeam?organizationId=${organizationId}`
        );
        const teamData = result.data.team;

        if (teamData) {
          dispatch(setTeam(teamData));
        }
      } catch (error: any) {
        console.error(`Error Occur while getting Team ${error.message}`);
      } finally {
        dispatch(setLoading(false));
      }
    }
    getTeam();
  }, [dispatch, organizationId, isFetch]);

  async function createTeam(e: React.FormEvent) {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const team = await axios.post("/api/createTeam", {
        organizationId,
        teamName,
        email: userData.email,
        name: userData.name,
        userId: userData.id,
      });

      dispatch(setisFetch(!isFetch));
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Error creating team:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <Navbar />

      {loading ? (
        <Loading />
      ) : (
        <>
          <EntityCreationCard
            showDescription={teams.length > 0 ? false : true}
            description="Team"
            entityName={teamName}
            setEntityName={setTeamName}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleCreateEntity={createTeam}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {teams.map((team: any) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    organizationId={String(organizationId)}
                  />
                ))}
              </div>
            </div>
          </EntityCreationCard>
        </>
      )}
    </div>
  );
}
