import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  // it will give u the current user from next-auth
  return await getServerSession(authOptions)
}

// we are going to use this getCurrentUser in layout
export default async function getCurrentUser() {
  try {
    // initiating the session
    const session = await getSession();
    // now session is having the next auth curr user

    if (!session?.user?.email) {
      return null;
    }

    // now finding the currentuser and its details from db. this is not api call, this the the direct communication to our database thr server component. 
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: 
        currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
