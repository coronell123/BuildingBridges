import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db/drizzle";
import { leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// This api is storing waiting list email in the database.
// The <ButtonLead /> component and waiting-list page triggers the API call.
// Duplicate email submissions return a 200 OK status.

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email) {
    return NextResponse.json(
      {
        error: "Email is required",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // Check if the email already exists in the database
    const existingLead = await db
      .select()
      .from(leads)
      .where(eq(leads.email, body.email))
      .limit(1);

    // Add the email to the database if it doesn't already exist
    if (!existingLead[0]) {
      await db.insert(leads).values({
        email: body.email,
      });

      // Here you can add your own logic
      // For instance, sending a welcome email (use the the sendEmail helper function from /libs/resend)
    }

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: (e as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
