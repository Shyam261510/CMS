"use client";

import type React from "react";
import { useState } from "react";
import { ArrowRight, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EntityCreationCard({
  description,
  showDescription,
  entityName,
  setEntityName,
  isDialogOpen,
  setIsDialogOpen,
  handleCreateEntity,
  children,
}: {
  description: string;
  showDescription: boolean;
  entityName: string;
  setEntityName: (name: string) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  handleCreateEntity: (e: React.FormEvent) => void;
  children: React.JSX.Element;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Your {description}s
          </h1>
          {description === "Organization" ? (
            <p className="mt-1 text-muted-foreground">
              Select an organization to access its dashboard and resources
            </p>
          ) : (
            <p className="mt-1 text-muted-foreground">
              Manage your organization's teams and their members
            </p>
          )}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild className="flex flex-end">
            <Button className="flex items-center gap-2 cursor-pointer">
              <PlusCircle /> Create {description}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{description} Name</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateEntity} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="entity-name">Name</Label>
                <Input
                  id="entity-name"
                  placeholder={`Enter ${description} name`}
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Create
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        {showDescription ? (
          <main className="container mx-auto px-4">
            <div className="grid min-h-[60vh] place-items-center">
              <div className="mx-auto max-w-md text-center">
                <div className="mb-6 rounded-full bg-gray-100 p-6 inline-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  You haven't joined any{" "}
                  {String(description).toLocaleLowerCase()} Yet
                </h2>
                <p className="text-gray-500">
                  Create a new {description} or ask your administrator to invite
                  you to an existing one.
                </p>
              </div>
            </div>
          </main>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
}
