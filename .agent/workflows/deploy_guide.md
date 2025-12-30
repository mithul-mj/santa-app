---
description: Deploying the application to Vercel or Render
---
# How to Host Your Project

You can host your project for free on **Vercel**, **Netlify**, or **Render**. I have already prepared your project code (Git initialized, `.gitignore` created).

## Option 1: Vercel (Recommended for Best Performance)

1.  **Create a GitHub Repository**:
    *   Go to [github.com/new](https://github.com/new).
    *   Name your repository (e.g., `santa-terrace-navigator`).
    *   Do **NOT** initialize with README, .gitignore, or License (keep it empty).
    *   Click **Create repository**.

2.  **Push Your Code**:
    *   Copy the commands shown on GitHub under "…or push an existing repository from the command line". They will look like this:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
        git branch -M main
        git push -u origin main
        ```
    *   Paste and run these commands in your sticky terminal here.

3.  **Deploy on Vercel**:
    *   Go to [vercel.com/new](https://vercel.com/new).
    *   Select your GitHub account.
    *   Find the `santa-terrace-navigator` repository and click **Import**.
    *   In the "Configure Project" screen, the default settings for Vite are usually correct:
        *   **Framework Preset**: Vite
        *   **Build Command**: `vite build` (or `npm run build`)
        *   **Output Directory**: `dist`
    *   Click **Deploy**.

## Option 2: Netlify Drop (Easiest - Drag & Drop)
If you don't want to use GitHub, you can just drag and drop your build folder.

1.  Run the build command in the terminal:
    ```bash
    npm run build
    ```
2.  This creates a `dist` folder in your project directory.
3.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
4.  Drag and drop the `dist` folder from your file explorer into the browser window.
5.  Your site will be live instantly!

## Option 3: Render
1.  Push code to GitHub (follow Step 1 & 2 above).
2.  Go to [dashboard.render.com](https://dashboard.render.com/).
3.  Click **New +** -> **Static Site**.
4.  Connect your GitHub repository.
5.  Settings:
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist`
6.  Click **Create Static Site**.
