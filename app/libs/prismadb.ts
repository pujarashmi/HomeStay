// doing this bcz nextjs 13 reloading can create bunch of this PrismaClient and will give warning in terminal
// so here we assing a prisma client to a global variable which will not affected by hook reload. it is best practice using prisma with next js  

import { PrismaClient } from "@prisma/client"

// importing the prisma client nad giving global definition of prisma, so it can work throughout the code 
declare global {
  var prisma: PrismaClient | undefined
}

// now creating constant called client which either serch for globalthis.prisma or it create a new prisma client
const client = globalThis.prisma || new PrismaClient()
// if we are in dev that set the global prisma to client const
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client