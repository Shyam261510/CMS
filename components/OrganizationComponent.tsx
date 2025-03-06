"use client";

import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { useRouter } from "next/navigation";
export interface Organization {
  id: String;
  organizationName: string;
}
export default function OrganizationComponent({
  organization,
  isHovered,
  onHover,
  onLeave,
}: {
  organization: Organization;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const router = useRouter();
  const handleLaunch = () => {
    router.push(`/Organization/${organization.id}`);
  };

  return (
    <Card
      className={`transition-all duration-300 w-120 ${
        isHovered ? "shadow-md translate-y-[-4px]" : "shadow-sm"
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Building className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">
          {organization.organizationName}
        </h3>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 p-4">
        <Button
          className="w-full transition-all duration-300 cursor-pointer"
          onClick={handleLaunch}
          variant={isHovered ? "default" : "outline"}
        >
          Launch
        </Button>
      </CardFooter>
    </Card>
  );
}
