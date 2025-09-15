import { NextResponse } from "next/server";
import { getVercelOidcToken } from '@vercel/functions/oidc';

import { ExternalAccountClient } from "google-auth-library";
import { Firestore } from "@google-cloud/firestore";

export async function GET() {
  const authClient = ExternalAccountClient.fromJSON({
    type: 'external_account',
    audience: `//iam.googleapis.com/${process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
    subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
    token_url: 'https://sts.googleapis.com/v1/token',
    service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${process.env.GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,

    subject_token_supplier: {
      getSubjectToken: getVercelOidcToken,
    },
    scopes: ["https://www.googleapis.com/auth/datastore"],
  });

  console.log(await authClient!.getAccessToken());

  const firestore = new Firestore({
    authClient,
    projectId: process.env.GCP_PROJECT_ID,
    databaseId: process.env.GCP_FIRESTORE_NAME,
  });

  const collections = await firestore.listCollections();

  return NextResponse.json({ collections: [collections] });
}
