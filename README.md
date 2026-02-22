# wa-admin

Admin UI for managing WhatsApp groups: view groups by phone number, search, filter columns, and view group details.

**Live demo:** [https://wa-admin-six.vercel.app/](https://wa-admin-six.vercel.app/)

---

## Setup (run locally)

1. **Clone the repo and install dependencies**

   ```bash
   git clone <your-repo-url>
   cd wa-admin
   npm install
   ```

2. **Configure environment variables**

   Copy the example env file and add your values:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set the required variables (see [Required environment variables](#required-environment-variables) below).

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Required environment variables

Create a `.env` file in the project root (use `.env.example` as a template).

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g. `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public (anon) key for client-side access |

Get both from [Supabase](https://supabase.com) → your project → **Settings** → **API**.

---

## Additional notes & assumptions

- **Data source:** The app reads from a Supabase table `users_data` with a row where `projectname = 'Periskope'`. The `data` column is expected to be JSON matching the `UsersData` shape (e.g. `{ superUser, users: [{ userId, userName, userEmail, phoneNumber, groups, ... }] }`).
- **Groups tab:** Only the **Groups** tab shows the table and side panel. Other sidebar items (Dashboard, Chats, Contacts, etc.) show an “under construction” message.
- **Phone dropdown:** The header phone selector lists users from the fetched data; switching the number filters the table to that user’s groups.
- **Build:** `npm run build` then `npm run start` for production. For Vercel, set **Root Directory** to the folder that contains `package.json` if the repo root is different.
