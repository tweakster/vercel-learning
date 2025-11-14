import { getVercelOidcToken } from '@vercel/functions/oidc';
import { ExternalAccountClient } from "google-auth-library";

function getAuthClient(scopes: string[]) {
  const authClient = ExternalAccountClient.fromJSON({
    type: 'external_account',
    audience: `//iam.googleapis.com/${process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
    subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
    token_url: 'https://sts.googleapis.com/v1/token',
    service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${process.env.GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,

    subject_token_supplier: {
      getSubjectToken: getVercelOidcToken,
    },
    scopes: scopes,
  });

  return authClient;
};

export default getAuthClient;