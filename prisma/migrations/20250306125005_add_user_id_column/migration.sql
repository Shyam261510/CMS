/*
  Warnings:

  - You are about to drop the column `email` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TeamMember` table. All the data in the column will be lost.
  - Added the required column `userId` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
