import NextAuth from "next-auth";

import { NEXT_AUTH } from "@/lib/NEXT_AUTH";
const handler = NextAuth(NEXT_AUTH);

export const GET = handler;
export const POST = handler;
