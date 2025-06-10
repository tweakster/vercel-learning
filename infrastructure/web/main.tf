# Configure the Vercel provider using the required_providers stanza.
# You may optionally use a version directive to prevent breaking
# changes occurring unannounced.
terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
  }
}

provider "vercel" {
  team = var.vercel_team
}
