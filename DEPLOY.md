# Deploy to Vercel

Vercel is the cleanest free host for Next.js apps (same company that maintains Next.js). Free tier is generous and the deploy flow is built around importing a GitHub repo.

This guide gets the demo to a public URL in ~10 minutes.

---

## 1. Push the repo to GitHub

If you haven't already:

```bash
cd ~/Desktop/Projects/afs-catalogue-demo

# Easiest path — gh CLI (if installed and authenticated):
gh repo create afs-catalogue-demo --public --source=. --push

# OR the manual path:
# 1. Create the repo on github.com/new
#    Name: afs-catalogue-demo
#    Visibility: Public
#    Do NOT initialise with a README (this repo already has one)
# 2. Then run:
git remote add origin git@github.com:arambarrid/afs-catalogue-demo.git
git branch -M main
git push -u origin main
```

After pushing, the public URL will be:

```
https://github.com/arambarrid/afs-catalogue-demo
```

This is the URL you'll put on your resume and in the cover letter.

---

## 2. Connect Vercel

1. Go to **https://vercel.com/signup** and sign in **with GitHub**. (Don't create a Vercel-only account — signing in with GitHub auto-links your repos.)
2. After auth, click **Add New → Project**.
3. **Import Git Repository**: find `arambarrid/afs-catalogue-demo` in the list and click **Import**. If you don't see it, click "Adjust GitHub App Permissions" and grant Vercel access to the repo.

---

## 3. Configure the deploy

Vercel auto-detects Next.js. Leave all defaults as-is:

| Setting | Leave as |
|---|---|
| Framework Preset | **Next.js** (auto-detected) |
| Root Directory | `./` |
| Build Command | `next build` (default) |
| Output Directory | `.next` (default) |
| Install Command | `npm install` (default) |
| Node.js Version | 20.x or 22.x (default) |

**No environment variables needed** for this demo — there's no API key, no database.

Click **Deploy**.

---

## 4. First build

Build takes ~1–2 minutes. You'll get a URL like:

```
https://afs-catalogue-demo.vercel.app
```

(Or with a numeric suffix if that exact name is taken.)

Vercel also gives you preview URLs for every git branch. Push to `main` and the production URL updates automatically. That's it — every future `git push` redeploys.

---

## 5. Update the resume + cover letter + README with the live URL

Once you have the Vercel URL:

1. **README.md** — add a "Live demo" line near the top of the project description.
2. **`advanced_fleet_signs/cover_letter.md`** in the jobSearch repo — link the Vercel URL alongside the GitHub URL.
3. **`advanced_fleet_signs/resume_afs.tex`** — same, in the Selected Project section.
4. Regenerate `coverLetter.docx` from the markdown.

Tell me the final URL and I'll patch all three files in one go.

---

## Troubleshooting

**Build fails with "module not found"** — usually means a file is gitignored or wasn't pushed. `git status` and confirm everything's committed and pushed.

**Build succeeds but page is blank** — check the Vercel deployment logs (Vercel dashboard → your project → Deployments → click the latest → "Build Logs" / "Runtime Logs"). Most likely a Tailwind CSS issue.

**Form submits but nothing happens visually** — Server actions need the production runtime. They work fine on Vercel, but `next start` locally needs `npm run build` first.
