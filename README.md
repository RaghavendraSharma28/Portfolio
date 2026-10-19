# Raghav Sharma Engineering Portfolio

A responsive React and TypeScript portfolio focused on embedded systems, FPGA and digital design, robotics, computer vision, and software engineering. It includes five project case studies, professional and student-team experience, an About page, theme switching, and a downloadable resume.

## Run and verify locally

```bash
npm install
npm run dev
```

Before deployment, run:

```bash
npm run typecheck
npm run build
npm run preview
```

The production output is `dist/`. React Router routes are configured with the Vercel rewrite in `vercel.json` so nested project URLs can be refreshed directly.

## Pages

- `/` — Featured projects, experience summary, technical disciplines, contact links, and resume download
- `/projects` — Project index with status labels
- `/projects/vehicle-identification-ocr` — A.W. Rostamani UAE Mulkiya VIN extraction case study, final RapidOCR production benchmark, and clearly separated initial PaddleOCR baseline
- `/projects/fpga-digital-systems` — Source-aligned FSM, datapath, and sequential multiplier case study
- `/projects/embedded-systems` — MSP432 coursework collection
- `/projects/cpp-ai-workspace` — C++ project architecture concept
- `/projects/robotics-mechatronics` — Robotics experience and academic prototype
- `/experience` — Internship and student-team experience
- `/about` — Introduction, education, interests, and toolkit

## Add a project

1. Add a project object to `src/data/projects.ts`. Each project has a unique `slug`, title, description, category, tags, and a `kind` used by its artwork. `status` distinguishes an internship case study, RTL implementation, academic collection, prototype, or concept. Set `featured: true` to feature it on the homepage.
2. Add its written case study to `src/data/caseStudies.ts` using the same slug. Include specific claims only when supported by the source code, project records, or verified results.
3. If the project needs a new kind of preview artwork, add it to `ProjectKind` and `ProjectVisual` in `src/data/projects.ts` and `src/components/Visual.tsx`.

Optional project fields are shown only when present:

- `repositoryUrl` and optional `repositoryLabel` for a source link
- `screenshots` with `src`, descriptive `alt`, and optional `caption`
- `videoDemoUrl` for a demonstration link
- `technicalDocumentationUrl` for project documentation
- `verifiedResults` for source-checked facts or measured results, with any necessary context in `note`
- `status` and `featured` for project classification and placement

### Add screenshots or replace preview artwork

Put approved, non-confidential images under `public/projects/<project-slug>/`. Reference them with a root-relative URL such as `/projects/<project-slug>/board.jpg` in the project's `screenshots` array. The first screenshot replaces the artwork in its project card; all provided images appear in a captioned case-study gallery. Write useful alt text and do not include private documents or customer data.

The FPGA case study also contains a source-aligned architecture diagram and RTL-derived examples. Add real simulator captures or waveform screenshots through the same `screenshots` field only after they have been captured from an actual run; do not present illustrative diagrams as test output.

## Update your profile and resume

- Edit `src/data/profile.ts` to update your display name, graduation year, or verified contact URLs. Email and LinkedIn are blank by default; empty values are hidden.
- Keep `github` pointed at the profile you want visitors to see. It appears in the main navigation and footer.
- Replace `public/resume.pdf` with the current PDF. `resumePath` in `src/data/profile.ts` controls the download URL. Confirm the updated file opens before publishing.

## Deploy to Vercel

1. Import the repository into Vercel or select its existing Vercel project.
2. Use the Vite build command `npm run build` and output directory `dist`.
3. Keep `vercel.json`; it provides the SPA rewrite for nested routes.
4. Deploy a preview and check the homepage, project routes, resume download, and mobile navigation. Then promote it using the Vercel project workflow.
5. Add canonical metadata or a sitemap only after choosing and verifying the production domain. No domain is assumed in this repository.

## Content and verification notes

The internship case study distinguishes 99.09% (109/110) on a cleaned production benchmark from the 14.97% initial PaddleOCR baseline (22/147); these are different evaluation contexts, not a controlled same-set comparison. The 935-image labelled dataset and its 748/93/94 train/validation/test split are separate from both. EasyOCR's approximately 15% result is a separate early experiment. Qwen2.5-VL-3B, SmolVLM2, BLIP, and hybrid routing are documented as experiments, not production engines. No private Mulkiya images or VINs are included. The Verilog testbench includes self-checking scenarios, but a complete simulation run has not been independently confirmed. No simulation pass, clock rate, synthesis result, or FPGA resource count is claimed.
