"use client";
import { PopupCard } from "./PopUpCard";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Filter, Plus } from "lucide-react";
import { useState } from "react";

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
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "./ui/textarea";
export const LeaveSection = () => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  console.log(setReason);
  return (
    <div className="mt-3 w-full p-3">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between ">
          <div className="flex gap-4  items-center ">
            <h2 className="text-2xl font-bold">Leave Requests</h2>
            <Badge variant="secondary" className="rounded-full">
              5
            </Badge>
          </div>
          <Button onClick={() => setIsModelOpen(true)}>
            <Plus />
            <span>Apply Leave</span>
          </Button>
        </div>
        <Button className="w-fit">
          <Filter />
          Apply Filter
        </Button>

        <PopupCard
          isOpen={isModelOpen}
          onClose={() => setIsModelOpen(false)}
          title="Apply for Leave"
          description="Fill out the form below to submit your leave request."
        >
          <div>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-md">Leave Type</h2>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="SICK">SICK</SelectItem>
                    <SelectItem value="VACATION">VACATION</SelectItem>
                    <SelectItem value="FULL">FULL</SelectItem>
                    <SelectItem value="HALFDAY">HALFDAY</SelectItem>
                    <SelectItem value="PERSONAL">PERSONAL</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Please provide the reason for your leave request."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <div className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Apply</Button>
              </div>
            </div>
          </div>
        </PopupCard>
      </div>
    </div>
  );
};
