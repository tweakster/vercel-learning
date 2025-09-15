import { getVercelOidcToken } from '@vercel/functions/oidc';
import { ExternalAccountClient } from 'google-auth-library';
import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { Firestore } from '@google-cloud/firestore';

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
// const GCP_PROJECT_NUMBER = process.env.GCP_PROJECT_NUMBER;
const GCP_SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
// const GCP_WORKLOAD_IDENTITY_POOL_ID = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID;
const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID = process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;
 
// Initialize the External Account Client
const authClient = ExternalAccountClient.fromJSON({
  type: 'external_account',
  audience: `//iam.googleapis.com/${GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
  subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
  token_url: 'https://sts.googleapis.com/v1/token',
  service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
  subject_token_supplier: {
    // Use the Vercel OIDC token as the subject token
    getSubjectToken: getVercelOidcToken,
  },
});


export async function GET() {
  try {
    const firestore = new Firestore({
      authClient,
      projectId: GCP_PROJECT_ID,
    });

    // Get the list of buckets in the project
    const [collections] = await firestore.listCollections();
    // Extract only the bucket names
    //const bucketNames = buckets.map((bucket) => bucket.name);

    // return NextResponse.json({ buckets: bucketNames });
    return NextResponse.json({ collections: [collections] });
  } catch (error: any) {
    console.error("Error fetching buckets:", error);
    return NextResponse.json(
      { error: "Failed to fetch buckets", details: error.message },
      { status: 500 }
    );
  }
}
