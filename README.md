# Raghav Sharma Portfolio

A responsive personal engineering portfolio for Raghav Sharma, a Virginia Tech Computer Engineering student. The site presents five project case studies, internship experience, education, and technical interests.

## Technology

React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, and React Router.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`; preview it locally with `npm run preview`. `npm run typecheck` checks the TypeScript project.

## Pages

- `/` — Home, featured work, experience summary, engineering disciplines, and contact/resume state
- `/projects` — Project index
- `/projects/vehicle-identification-ocr` — Internship case study
- `/projects/fpga-digital-systems` — FPGA and digital logic
- `/projects/embedded-systems` — Embedded systems
- `/projects/robotics-mechatronics` — Robotics and mechatronics
- `/projects/cpp-ai-workspace` — C++ software project
- `/experience` — Professional and student team experience
- `/about` — Personal introduction, education, interests, and skills

## Update your details

Edit `src/data/profile.ts` to add a verified email, GitHub URL, LinkedIn URL, or change the resume path. Unconfigured contact links are hidden. Add your PDF as `public/resume.pdf`; until then the site shows “Coming soon.” Do not add unapproved internship materials or customer information.

Project descriptions and card tags live in `src/data/projects.ts`; case study sections are in `src/pages/Pages.tsx`. Project preview artwork is drawn locally with CSS in `src/styles.css`. The About photo area is an intentional placeholder; replace that element with an approved professional photo when available.

## Deployment

Import this repository into Vercel, keep the default Vite build command (`npm run build`) and output directory (`dist`), then deploy. Client-side project routes need a rewrite to `index.html` if the hosting platform does not automatically provide SPA fallback routing.

After choosing the production domain, set canonical/Open Graph URLs and add a sitemap using that verified domain. No domain is assumed in this source tree.

## Notes

OCR figures are labeled as the initial PaddleOCR baseline (147 images, 22 exact matches, 14.97%). Technical flow diagrams and failure examples are conceptual/illustrative. No final internship accuracy, confidential materials, awards, or unverified performance figures are claimed.
