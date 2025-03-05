import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./NEXT_AUTH";

export const getUser = async () => {
  const session = await getServerSession(NEXT_AUTH);
  console.log(session.user);
  return session?.user || null;
};
