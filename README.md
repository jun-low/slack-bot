# Slack bot 🤖

## Setup Instructions

> Node version 18 is required

### Netlify

Netlify is used as a live tunnel for testing the Slack application.

1. Visit https://www.netlify.com
2. Click **Sign Up** to create a new account.
3. Install the Netlify CLI: `npm i -g netlify-cli`
4. Login to your Netlify account: `ntl login`
5. Initialize the project: `ntl init`
6. Start the live dev server: `ntl dev --live`

### Slack

A free Slack account and workspace is required for this setup. Creating a new workspace for testing the application is recommended. If you don't have a Slack account or workspace:

1. Visit https://slack.com
2. Create a new account or sign in
3. Click **Create a New Workspace** and follow the instructions
4. Visit https://api.slack.com
5. Click **Create new App** and choose to create it from scratch
6. Name the application as you wish and choose to deploy it to your test workspace

### Notion

Notion is used to store data from the Slack application. You'll need to create a free Notion account:

1. Visit https://notion.com
2. Create a new account if you don't already have one.
3. Create a new workspace [optional]
4. Duplicate [the example database](https://jun-low.notion.site/9e0db318a5514c888a099201960d366e?v=f2505574222b4f7684f9026052a76910&pvs=4)

Add new integration with Notion :

1. Visit https://www.notion.so/my-integrations
2. Click the New Integration button
3. Select the workspace you want to use for the application
4. Add the basic information and an image from the `assets` directory.
5. Visit the Food Fight Database you duplicated into your workspace and add the Food Fight connection.
6. From the integrations section, copy the secret into a `NOTION_SECRET` environment variable
7. Copy the database ID into a `NOTION_DATABASE_ID` environment variable

## Deploy

To deploy the application, follow these steps:

1. Navigate to your Netlify dashboard.
2. Click on your site project.
3. Go to the "Deploys" tab.
4. Drag and drop or choose your project folder to upload.
5. Once uploaded, Netlify will automatically build and deploy your site.
6. Import the .env variable via Netlify CLI: ` ntl env:import .env`
7. Once the deployment is complete, you can access your live site using the provided URL and update the URL in Slack application config.