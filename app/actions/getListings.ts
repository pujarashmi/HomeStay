import prisma from "@/app/libs/prismadb";

// this is for showing the list of property. in sometimes, list can be after the search as per following. 
export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount, 
      guestCount, 
      bathroomCount, 
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    // seting the query string as per the user search or by default.
    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }
    // equal or more than
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      // here we are reversing the inside logic
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }
    
    // fetching listing directly, no need to call api
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // bcz plan listing giving me date err. its def is present in app/type/index.ts
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}