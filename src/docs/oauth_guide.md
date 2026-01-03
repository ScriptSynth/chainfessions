
# Setting up Social Authentication

To make the Google and GitHub login buttons work, you need to get "Client IDs" and "Client Secrets" from each provider and add them to your Supabase Dashboard.

## 1. GitHub OAuth Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/apps).
2. Click **"New OAuth App"**.
3. Fill in the form:
   - **Application Name**: Chainfessions
   - **Homepage URL**: `http://localhost:3000` (or your production URL later)
   - **Authorization callback URL**: `https://osrnjcmfxeyotznqgqmu.supabase.co/auth/v1/callback`
     - *Note: This URL comes from your Supabase Dashboard > Authentication > Providers > GitHub > "Redirect URL"*
4. Click **"Register application"**.
5. Copy the **Client ID**.
6. Generate a new **Client Secret** and copy it.
7. Go to **Supabase Dashboard > Authentication > Providers > GitHub**.
8. Paste the Client ID and Client Secret.
9. Click **Save**.

## 2. Google OAuth Setup
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a **New Project**.
3. Go to **APIs & Services > OAuth consent screen**.
   - Choose **External**.
   - Fill in the required fields (App name, email, etc.).
4. Go to **Credentials > Create Credentials > OAuth client ID**.
   - Application type: **Web application**.
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `https://osrnjcmfxeyotznqgqmu.supabase.co/auth/v1/callback`
5. Copy the **Client ID** and **Client Secret**.
6. Go to **Supabase Dashboard > Authentication > Providers > Google**.
7. Paste the keys and click **Save**.

## 3. Important: Site URL
Ensure your Supabase "Site URL" is set correctly for redirects to work.
1. Go to **Supabase Dashboard > Authentication > URL Configuration**.
2. Set **Site URL** to `http://localhost:3000`.
