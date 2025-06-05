resource "vercel_project" "this" {
  name      = "amy-vercel-demo-web"
  framework = "nextjs"

  git_repository = {
    type              = "github"
    repo              = "oaknational/vercel-vs-gcp"
    production_branch = "vercel-main"
  }

  environment = [
    {
      key    = "NEXT_PUBLIC_MESSAGE_API_URL"
      value  = var.api_url
      target = ["production"]
    },
    {
      key    = "NEXT_PUBLIC_MESSAGE_API_URL"
      value  = var.api_url
      target = ["development", "preview"]
    },
  ]

  root_directory = "web"
}

resource "vercel_deployment" "this" {
  project_id  = vercel_project.this.id
  ref         = "vercel-main"
  production  = true
}
