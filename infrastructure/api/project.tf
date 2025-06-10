resource "vercel_project" "this" {
  name      = "learning-demo-api"
  framework = "nextjs"

  git_repository = {
    type              = "github"
    repo              = var.git_repo_url
    production_branch = var.git_repo_branch
  }

  root_directory = "api"
}

resource "vercel_deployment" "this" {
  project_id = vercel_project.this.id
  ref        = var.git_repo_branch
  production = true
}
