/*
  Warnings:

  - Added the required column `teamId` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LeaveType" ADD VALUE 'FULL';
ALTER TYPE "LeaveType" ADD VALUE 'HALFDAY';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'TeamLEAD';

-- AlterTable
ALTER TABLE "Leave" ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
