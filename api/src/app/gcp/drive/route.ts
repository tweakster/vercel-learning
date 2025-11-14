import { NextResponse } from "next/server";
import { google } from 'googleapis';
import getAuthClient from "@/lib/getAuthClient";

export async function GET() {
  const authClient = getAuthClient(['https://www.googleapis.com/auth/drive']);

  const drive = google.drive({
    version: 'v3',
    auth: authClient!
  });

  const res = await drive.files.list();

  console.log(res);

  return NextResponse.json({ client: authClient?.getServiceAccountEmail(), project: authClient?.getProjectId(), files: res });
}
