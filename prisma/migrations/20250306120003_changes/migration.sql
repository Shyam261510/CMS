-- AlterTable
ALTER TABLE "TeamMember" ALTER COLUMN "contactNumber" SET DEFAULT '',
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT '';
