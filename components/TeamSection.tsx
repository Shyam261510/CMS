"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, EyeIcon, Edit2 } from "lucide-react";
import { Input } from "./ui/input";
import { TeamCardProps, TeamMember } from "./team-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { PopupCard } from "./PopUpCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setisFetch, setLoading, setTeam } from "@/lib/dataSlice";
import { Loading } from "@/components/Loader";
import toast from "react-hot-toast";

export const TeamSection = ({ team }: { team: TeamCardProps }) => {
  const isFetch = useSelector((state: any) => state.userSlice.isFetch);
  const isLoading = useSelector((state: any) => state.userSlice.isLoading);
  const userData = useSelector((state: any) => state.userSlice.userData);
  const role = team?.teamMembers
    ?.map((member: TeamMember) => member.userId === userData.id && member.role)
    .filter((data) => data !== false)
    .flat();

  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [isInfoModelOpen, setIsInfoModelOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const [searchMemberQuery, setSearchMemberQuery] = useState("");

  const allUsers = useSelector((state: any) => state.userSlice.allUsers);

  const teamMemeberUserIds = team?.teamMembers.map((data: any) => data.userId);

  const userNotInTeam = allUsers.filter(
    (user: any) =>
      !user.teamMembers.some((member: TeamMember) =>
        teamMemeberUserIds.includes(member.userId)
      )
  );

  const filterUsers = userNotInTeam.filter((user: any) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterTeamMember = team?.teamMembers?.filter((member: TeamMember) =>
    member.name.toLowerCase().includes(searchMemberQuery.toLowerCase())
  );

  const addMemeberHandler = async (
    teamId: string,
    name: string,
    email: string,
    organizationId: string,
    userId: string
  ) => {
    const result = await axios.post("/api/addMember", {
      teamId,
      name,
      email,
      organizationId,
      userId,
    });
    dispatch(setisFetch(!isFetch));
    toast.success(`You add ${name}`);
    console.log(result.data.message);
    setIsModelOpen(false);
  };

  useEffect(() => {
    async function getTeam() {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(
          `/api/getTeam?organizationId=${String(team?.organizationId)}`
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
  }, [dispatch, isFetch]);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6 w-[90%]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap justify-between">
          <div className="flex gap-4 items-center">
            <h2 className="text-2xl font-bold">Team Member</h2>
            <Badge variant="secondary" className="rounded-full">
              {team?.teamMembers.length > 0 ? team.teamMembers.length : 0}
            </Badge>
          </div>
          {role[0] === "TeamLead" && (
            <Button
              className="flex gap-3 cursor-pointer  "
              onClick={() => setIsModelOpen(true)}
            >
              <Plus />
              <span>Add Member</span>
            </Button>
          )}
        </div>

        <div className="relative">
          <Search className="absolute top-2 left-2" />
          <Input
            type="text"
            placeholder="Seach memebers..."
            className="pl-10 w-[27%] "
            value={searchMemberQuery}
            onChange={(e) => setSearchMemberQuery(e.target.value)}
          />
        </div>

        <div className="flex  flex-wrap py-8 gap-6  items-center">
          {filterTeamMember?.map((member: TeamMember) => (
            <div
              key={member.id}
              className="relative flex items-center  gap-4 py-10 px-4  cursor-pointer border-1   shadow-lg rounded-lg
            transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Avatar>
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <h2>{member.name}</h2>
              <Badge>{member.role ? member.role : "Not assign"}</Badge>
              <h2
                className="absolute right-3 top-2 text-gray-800 hover:text-gray-500"
                onClick={() => setIsInfoModelOpen(true)}
              >
                <EyeIcon />
              </h2>
            </div>
          ))}
        </div>
      </div>
      <PopupCard
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        title="Add Team Members"
        description="Search for users and add them to your team."
      >
        <div className="flex flex-col gap-5">
          <div className="relative">
            <Search className="absolute top-2 left-2" />
            <Input
              type="text"
              placeholder="Seach by name  . . ."
              className="pl-10 "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            {filterUsers.map((user: any) => (
              <div
                key={user.id}
                className="flex p-2 justify-between items-center border-1 rounded-lg cursor-pointer"
              >
                <div className="flex gap-4">
                  {" "}
                  <Avatar>
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <h2>{user.name}</h2>
                </div>

                <Button
                  className="h-10 w-10 rounded-full "
                  onClick={() =>
                    addMemeberHandler(
                      team.id,
                      user.name,
                      user.email,
                      String(team?.organizationId),
                      user.id
                    )
                  }
                >
                  <Plus />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </PopupCard>

      {/* user can edit details */}
      <PopupCard
        isOpen={isInfoModelOpen}
        onClose={() => setIsInfoModelOpen(false)}
        title="Profile Details"
        description="View and manage your personal information"
      >
        <div className="relative ">
          <Edit2 className="absolute right-8 bottom-7 text-gray-800 hover:text-gray-400" />
        </div>
      </PopupCard>
    </div>
  );
};
