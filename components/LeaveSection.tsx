"use client";
import { PopupCard } from "./PopUpCard";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Plus, Bell, Check, XCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";

import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TeamCardProps } from "./team-card";
import { Leave, setisFetch, setLeaves, setLoading } from "@/lib/dataSlice";
import { Loading } from "./Loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamMember } from "./team-card";
import toast from "react-hot-toast";

export const LeaveSection = ({
  team,
  teamPendingLeaves,
}: {
  team: TeamCardProps;
  teamPendingLeaves: any;
}) => {
  const dispatch = useDispatch();

  const userData = useSelector((state: any) => state.userSlice.userData);
  const isFetch = useSelector((state: any) => state.userSlice.isFetch);
  const isLoading = useSelector((state: any) => state.userSlice.isLoading);
  const allUsers = useSelector((state: any) => state.userSlice.allUsers);

  const userMap = new Map();

  allUsers.forEach((user: any) => {
    let { id, name } = user;
    userMap.set(id, name);
  });

  const leaves = useSelector((state: any) => state.userSlice.leaves);

  const role = team?.teamMembers
    ?.map((member: TeamMember) => member.userId === userData.id && member.role)
    .filter((data) => data !== false)
    .flat();

  const totaleaves = leaves.filter(
    (leave: Leave) => leave.userId === userData.id
  );

  const pendingLeaves = totaleaves
    ?.filter((leave: Leave) => !leave.approve && !leave.rejected)
    .filter((data: any) => data !== false);

  const approvedLeaves = totaleaves?.filter((leave: Leave) => leave.approve);

  const rejectedLeaves = totaleaves?.filter((leave: Leave) => leave.rejected);

  const leavesInfo = [
    {
      status: "All",
      data: totaleaves,
    },
    {
      status: "Pending",
      data: pendingLeaves,
    },
    {
      status: "Approved",
      data: approvedLeaves,
    },
    {
      status: "Rejected",
      data: rejectedLeaves,
    },
  ];

  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [isAprroveLeave, setIsApproveLeave] = useState<boolean>(false);

  const formSchema = z.object({
    leaveType: z.enum(["SICK", "VACATION", "FULL", "HALFDAY", "PERSONAL"]),
    reason: z
      .string()
      .min(10, { message: "Reason should be atleast of 10 words" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    let { leaveType, reason } = data;
    reason = reason.trim();
    const userId = userData.id;
    const teamId = team.id;
    try {
      dispatch(setLoading(true));
      const result = await axios.post("/api/applyForLeave", {
        leaveType,
        reason,
        userId,
        teamId,
      });
      if (result.data?.success) {
        toast.success("Leave request submitted successfully");
      }
    } catch (error: any) {
      console.error(`Error in applyling for your leave`);
      toast.error(" Could not able to send request . try again later.");
    } finally {
      dispatch(setLoading(false));
      dispatch(setisFetch(!isFetch));
      setIsModelOpen(false);
    }
  }

  useEffect(() => {
    const fetchUserLeaves = async () => {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(
          `/api/getUserLeaves?userId=${userData.id}`
        );
        dispatch(setLeaves(result.data?.leaves));
      } catch (error: any) {
        console.error(`Error in getting User leaves : ${error.message}`);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUserLeaves();
  }, [isFetch, dispatch]);

  const approveStatusHandler = async (status: string, leaveId: string) => {
    try {
      dispatch(setLoading(true));
      const result = await axios.post("/api/approveLeave", { status, leaveId });

      setIsApproveLeave(false);
    } catch (error: any) {
      console.log("Could not able to approve leave");
    } finally {
      dispatch(setisFetch(!isFetch));
      dispatch(setLoading(false));
    }
  };
  if (isLoading) return <Loading />;

  return (
    <div className="mt-3 w-full p-3 ">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between ">
          <div className="flex gap-4  items-center ">
            <h2 className="text-2xl font-bold">Leave Requests</h2>
            <Badge variant="secondary" className="rounded-full">
              {totaleaves?.length > 0 ? totaleaves.length : 0}
            </Badge>
            {role[0] === "TeamLead" && (
              <div
                className="relative cursor-pointer"
                onClick={() => setIsApproveLeave(true)}
              >
                <Badge className="absolute bottom-4 left-2 rounded-full ">
                  {teamPendingLeaves ? teamPendingLeaves.length : 0}
                </Badge>
                <Bell />
              </div>
            )}
          </div>
          <Button onClick={() => setIsModelOpen(true)}>
            <Plus />
            <span>Apply for Leave</span>
          </Button>
        </div>

        <PopupCard
          isOpen={isModelOpen}
          onClose={() => setIsModelOpen(false)}
          title="Apply for Leave"
          description="Fill out the form below to submit your leave request."
        >
          <div>
            <div className="flex flex-col gap-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <FormField
                    control={form.control}
                    name="leaveType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Leave Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="SICK">SICK</SelectItem>
                                <SelectItem value="VACATION">
                                  VACATION
                                </SelectItem>
                                <SelectItem value="FULL">FULL</SelectItem>
                                <SelectItem value="HALFDAY">HALFDAY</SelectItem>
                                <SelectItem value="PERSONAL">
                                  PERSONAL
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Leave Reason</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide the reason for your leave request."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button>Apply</Button>
                </form>
              </Form>
            </div>
          </div>
        </PopupCard>

        <Tabs defaultValue="All">
          <TabsList className="grid gap-3 w-full grid-cols-4 md:w-[500px]">
            {leavesInfo.map((info: any) => (
              <TabsTrigger
                value={info.status}
                key={info.status}
                className="flex items-center"
              >
                {info.status}

                <Badge className="rounded-full">
                  {info.data?.length > 0 ? info.data.length : 0}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          {leavesInfo.map((info: any) => (
            <TabsContent
              value={info.status}
              key={info.status}
              className="mt-3 flex gap-12 flex-wrap  "
            >
              {info.data.length > 0 ? (
                info.data.map((leave: Leave) => (
                  <div
                    key={leave.id}
                    className="flex flex-col gap-3 w-[20%] p-3 cursor-pointer border-1   shadow-lg rounded-lg
                  transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    <Badge variant="secondary">{leave?.leaveType}</Badge>
                    <h2>{leave?.reason?.toUpperCase()}</h2>
                    <Badge
                      className={
                        leave.approve
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : leave.rejected
                          ? "bg-red-100 text-red-800 hover:bg-red-20"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }
                    >
                      {leave.approve
                        ? "Approve"
                        : leave.rejected
                        ? "Rejected"
                        : "Pending"}
                    </Badge>
                  </div>
                ))
              ) : (
                <div>
                  <h2 className="text-lg font-semibold ">No leave found</h2>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <PopupCard
        isOpen={isAprroveLeave}
        onClose={() => setIsApproveLeave(false)}
        title="Approve Leaves"
        description="Manage your team leaves"
      >
        <div>
          {teamPendingLeaves?.length === 0 ? (
            <div>No Pending Leaves</div>
          ) : (
            <div className="flex flex-col gap-4">
              {teamPendingLeaves &&
                teamPendingLeaves?.map((leave: any) => (
                  <div
                    key={leave.id}
                    className=" p-3 flex flex-col gap-14 border-1   shadow-lg rounded-lg
            transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-4 relative items-center">
                        <Badge className="rounded-full h-10 w-10 bg-gray-600 text-amber-100">
                          {leave.name[0]}
                        </Badge>
                        <h2>{leave.name}</h2>
                        <h2 className="absolute top-9 left-14 text-gray-500">
                          {leave.reason.toUpperCase()}
                        </h2>
                      </div>
                      <Badge className="w-12 h-7">{leave.leaveType}</Badge>
                    </div>
                    <div className="flex justify-around">
                      <Button
                        className="h-7 px-2 text-xs cursor-pointer bg-red-400 hover:bg-red-500"
                        onClick={() => approveStatusHandler("reject", leave.id)}
                        size="sm"
                      >
                        <XCircle className="mr-1 h-3 w-3" />{" "}
                        <span> Reject</span>
                      </Button>
                      <Button
                        className="h-7 px-2 text-xs cursor-pointer"
                        size="sm"
                        onClick={() =>
                          approveStatusHandler("approve", leave.id)
                        }
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </PopupCard>
    </div>
  );
};
