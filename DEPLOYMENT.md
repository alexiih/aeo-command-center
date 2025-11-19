# Deployment & Connections Guide

This guide walks you through connecting the **AEO Command Center** to real data sources and deploying it to the web.

## 1. GitHub (Source Control)
First, ensure your code is safe and versioned.

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  **Create a Repository**: Go to [GitHub.com/new](https://github.com/new) and create a repo named `aeo-command-center`.
3.  **Push Code**:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/aeo-command-center.git
    git branch -M main
    git push -u origin main
    ```

## 2. Supabase (Database)
We use Supabase to store historical ranking data.

1.  **Create Project**: Go to [database.new](https://database.new) and create a new project.
2.  **Get Credentials**:
    *   Go to **Project Settings** -> **API**.
    *   Copy the `Project URL` and `anon` public key.
3.  **Setup Environment**:
    *   Create a `.env.local` file in your project root:
        ```env
        NEXT_PUBLIC_SUPABASE_URL=your_project_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
        ```
4.  **Run Schema**:
    *   Go to the **SQL Editor** in your Supabase dashboard.
    *   Copy the contents of `supabase/schema.sql` from this project.
    *   Run the query to create your tables.

## 3. LLM APIs (The "Mystery Shopper")
To replace the mock data with real intelligence, you need to build a backend script (or Edge Function) that queries these APIs.

### Required Keys
You will need to sign up for developer accounts and get API keys for:
*   **OpenAI** (GPT-5.1/4o): [platform.openai.com](https://platform.openai.com)
*   **Anthropic** (Claude/Sonnet): [console.anthropic.com](https://console.anthropic.com)
*   **Perplexity**: [docs.perplexity.ai](https://docs.perplexity.ai)
*   **Google** (Gemini): [aistudio.google.com](https://aistudio.google.com)

### Implementation Strategy
Don't run these scans from the browser (frontend). Create a **Supabase Edge Function** or a scheduled Cron Job (e.g., via GitHub Actions or Vercel Cron) that runs once every 24 hours:

```typescript
// Example pseudo-code for a background worker
async function scanKeyword(keyword) {
  const prompt = `Act as a user looking for real estate. Search for "${keyword}".`;
  
  // Call Perplexity API
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${PERPLEXITY_KEY}` },
    body: JSON.stringify({ model: 'llama-3-sonar-large-32k-online', messages: [...] })
  });
  
  // Analyze response for "Boligsiden" mentions
  // Insert result into Supabase 'rankings' table
}
```

## 4. Vercel (Deployment)
Deploy your frontend to a live URL.

1.  **Sign Up**: Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2.  **Import Project**:
    *   Click **Add New** -> **Project**.
    *   Select your `aeo-command-center` repository.
3.  **Configure Environment Variables**:
    *   In the "Environment Variables" section, add the same keys from your `.env.local`:
        *   `NEXT_PUBLIC_SUPABASE_URL`
        *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4.  **Deploy**: Click **Deploy**. Vercel will build your site and give you a live URL (e.g., `aeo-command-center.vercel.app`).

## 5. Verification
Once deployed:
1.  Visit your Vercel URL.
2.  Check the browser console for any connection errors.
3.  The dashboard should load (currently showing mock data until you implement the backend scraper).
