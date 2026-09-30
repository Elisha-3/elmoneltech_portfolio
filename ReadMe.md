# Elisha Keanche — Portfolio

Single-page portfolio for Elisha Keanche, Full Stack Software Developer (Laravel · System Architecture · DevOps), built with **Next.js 14**, **React 18** and **TypeScript**. Client reviews are stored in **Supabase**.

## ✨ Features

* Hero, About, Skills, Experience & Education, Projects, Contact and Reviews sections
* Project grid with filters (Enterprise Platforms / SaaS Products / Other Projects) and Live / Private / In-development badges
* Branded cover generated automatically for any project without a screenshot
* Downloadable CV
* Client reviews form backed by Supabase

## ✏️ Updating the content

All text on the site lives in **[`data/portfolio.json`](data/portfolio.json)** — edit that file; no component changes needed.

| To change… | Edit |
|---|---|
| Name, title, phone, email, links, CV path | `personal` |
| Hero tech chips and stats | `heroTech`, `heroStats` |
| About paragraphs (`**bold**` supported) and impact numbers | `about` |
| Skill categories | `skills` |
| Jobs and education | `experience`, `education` |
| Projects | `projects.featured`, `projects.items` |

**Adding a project:** append an object to `projects.items`:

```json
{
  "title": "My New Platform",
  "category": "enterprise",          // enterprise | saas | other
  "desc": "One or two sentences on what it does and the impact.",
  "tags": ["Laravel", "MySQL"],
  "demo": "https://example.com",     // optional — shows a "Live" button and badge
  "github": "https://github.com/…",  // optional — shows a "Code" button
  "image": "/images/my-platform.jpg",// optional — a branded cover is used if omitted
  "status": "In development"         // optional — overrides the badge, e.g. "Private repo"
}
```

**Screenshots** go in `public/images/` (1440×810 JPG works well; cards crop from the top).
**CV:** replace `public/cv/Elisha_Keanche_CV.pdf`, or update `personal.cv` if the file name changes.

## 🛠️ Development

```bash
npm install
cp .env.example .env.local   # add your Supabase URL and anon key
npm run dev                  # http://localhost:3000
npm run build                # production build
```

## 📂 Project Structure

```
app/                 layout + page
components/
  portfolio.tsx      all page sections (reads data/portfolio.json)
  reviews-section.tsx
data/portfolio.json  site content
lib/supabase.ts      Supabase client
public/images/       project screenshots
public/cv/           downloadable CV
```

## 📬 Contact

* **Email:** [keancheelisha3@gmail.com](mailto:keancheelisha3@gmail.com)
* **LinkedIn:** [linkedin.com/in/keanche-elisha-329284158](https://www.linkedin.com/in/keanche-elisha-329284158)
* **GitHub:** [Elisha-3](https://github.com/Elisha-3)
