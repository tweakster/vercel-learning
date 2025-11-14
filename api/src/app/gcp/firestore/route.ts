import { NextResponse } from "next/server";
import { Firestore } from "@google-cloud/firestore";

import getAuthClient from "@/lib/getAuthClient";

export async function GET() {

  const authClient = getAuthClient(["https://www.googleapis.com/auth/datastore"]);

  const firestore = new Firestore({
    authClient,
    projectId: process.env.GCP_PROJECT_ID,
    databaseId: process.env.GCP_FIRESTORE_NAME,
  });

  const collections = await firestore.listCollections();

  return NextResponse.json({ collections: [collections] });
}
