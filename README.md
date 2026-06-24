# MPE Pool Care & Supplies

A responsive product and service website for a swimming-pool maintenance business. Product buttons direct customers to Shopee Malaysia, while the contact section supports WhatsApp enquiries.

## Before going live

Update these sample details in `index.html`:

- Business name and logo text
- WhatsApp and telephone number (`016-261 6781`)
- Product names and prices
- Individual Shopee product links
- Service hours and company description

## Open locally

Open `index.html` in a browser. No installation or build step is required.

## Deploy to Google Cloud Run

Prerequisites:

1. A Google Cloud project with billing enabled.
2. The Google Cloud CLI installed and signed in.
3. Permission to use Cloud Run and Cloud Build.

From this folder, run:

```powershell
gcloud auth login
.\deploy.ps1 -ProjectId "YOUR_GOOGLE_CLOUD_PROJECT_ID"
```

The script deploys to the Singapore region (`asia-southeast1`) by default and prints the public website URL when complete.

To select another region:

```powershell
.\deploy.ps1 -ProjectId "YOUR_PROJECT_ID" -Region "YOUR_REGION"
```

## Technology

- HTML, CSS and JavaScript
- Nginx container
- Google Cloud Run
