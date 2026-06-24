param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectId,

    [string]$Region = "asia-southeast1",
    [string]$ServiceName = "aquacare-pool-shop"
)

$ErrorActionPreference = "Stop"

gcloud config set project $ProjectId
gcloud services enable `
    run.googleapis.com `
    cloudbuild.googleapis.com `
    artifactregistry.googleapis.com
gcloud run deploy $ServiceName `
    --source . `
    --region $Region `
    --allow-unauthenticated `
    --quiet

gcloud run services describe $ServiceName `
    --region $Region `
    --format "value(status.url)"
