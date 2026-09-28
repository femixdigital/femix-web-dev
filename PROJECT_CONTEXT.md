# Femix Web Dev — Project Context

## Project
Femix Web Dev is a premium, modern Single Page Application (SPA) for Femix Digital web-development services.

The goal is to demonstrate professional frontend development, UI/UX design, responsive layouts, clean architecture, maintainable code, and Supabase integration.

## Current Development Environment
- Device: Samsung Galaxy S10+
- Operating system: Android
- Primary development environment: Termux
- Optional editor/viewer: Acode
- Local project: `~/projects/femix-web-dev`
- Version control: Git + GitHub
- GitHub repository: `femixdigital/femix-web-dev`
- Main branch: `main`
- Planned deployment: Vercel

## Technology Stack
- React
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lucide React
- Supabase
- PostgreSQL

## Important Development Rule
Use Termux as the primary development environment. Acode may be used for viewing or occasional editing.

Work step-by-step. Prefer one terminal command at a time and verify the result before continuing.

## Git Workflow
After a meaningful working change:
1. Test the project.
2. Check the changes.
3. Stage the intended files.
4. Commit with a clear message.
5. Push to `origin main`.

Do not assume that changes are automatically pushed to GitHub.

## Current GitHub Checkpoint
Latest verified commit:

`4be7e81 — Configure Tailwind and preserve Vite build settings`

This checkpoint has been successfully pushed to GitHub.

## Completed Foundation
- React + TypeScript + Vite project is working.
- Tailwind CSS v4 is installed.
- `@tailwindcss/vite` is installed and configured.
- Lucide React is installed.
- React Router is installed.
- Supabase client is present.
- Existing Vite build optimizations were preserved.
- Supabase Edge Function `send-lead-email` exists.
- Production build has successfully completed.

## Current Build Result
`npm run build` completed successfully.

The build confirmed:
- TypeScript compilation succeeds.
- Vite production build succeeds.
- Tailwind integration works.
- Existing application code still builds.

## Current Source Structure
Important existing files include:

### Pages
- `src/pages/Home.tsx`
- `src/pages/About.tsx`
- `src/pages/Services.tsx`
- `src/pages/Portfolio.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Estimator.tsx`
- `src/pages/AdminDashboard.tsx`
- `src/pages/NotFound.tsx`

### Components
- `Navbar.tsx`
- `Hero.tsx`
- `Pricing.tsx`
- `Testimonials.tsx`
- `FAQ.tsx`
- `FAQAccordion.tsx`
- `ContactForm.tsx`
- `Footer.tsx`
- `ProjectEstimator.tsx`
- `CostCalculator.tsx`
- `PortfolioModal.tsx`
- `OrderModal.tsx`
- `PaymentModal.tsx`
- `AdminLogin.tsx`
- `AdminGuard.tsx`
- `Toast.tsx`

### Supabase
- `src/lib/supabase.ts`
- `src/types/database.ts`
- `supabase/migrations/01_rls_policies.sql`
- `supabase/migrations/20260926220000_init_schema.sql`
- `supabase/functions/send-lead-email/index.ts`

## Current App State
The project already contains a substantial application. Do NOT blindly rebuild the project from a blank Vite starter.

The existing engineering and functionality should be inspected and preserved where useful while the user-facing design is improved.

The current `App.tsx` contains routing for:
- `/`
- `/portfolio`
- `/estimator`
- `/contact`
- `/admin`

The application has recently been redesigned toward a premium theme-aware interface, but the current Home/Navbar implementation is still a long-scroll marketing layout with a purple/blue/green accent system. This implementation is now scheduled for a structural redesign into the new nested SPA/product-platform direction described above.

## Design Direction

The user has now defined a new product direction for the Femix Web Dev interface.

The final website should be a **premium, properly nested SPA/product-platform experience**, inspired by the structural clarity and application UX of platforms such as Bitget, but with completely original Femix branding, content, visuals, and implementation.

### Core UX direction

- Do NOT make the Home page a long-scroll website containing every major section.
- Home should be a focused entry experience.
- Home, Services, Portfolio, About, Estimator, Contact, and Start a Project should behave as distinct SPA experiences/routes.
- Maintain a persistent premium application shell/navigation while the main view changes between routes.
- Navigation should feel like a polished digital product rather than a conventional one-page agency template.
- Important actions should be immediately discoverable.
- Start a Project should be treated as a primary conversion action.
- Pages may contain their own internal sections where useful, but the overall website must not depend on one giant continuous homepage scroll.
- Keep the experience responsive and polished on mobile as well as desktop.

### Visual direction

The previous purple/blue/green mixed-accent direction is no longer desired.

The new visual system should use:
- Modern premium colors
- A restrained, coherent brand palette
- Strong neutral foundations
- A distinctive Femix accent system rather than many unrelated accent colors
- Excellent contrast and readability
- Premium typography and spacing
- Subtle depth and interaction states rather than excessive decorative effects

Do NOT make purple the dominant brand color.

The visual goal is to communicate:

**Femix Web Dev = serious engineering + premium digital product capability + business results.**

The website should make a prospective customer feel confident that Femix can handle sophisticated, professional websites and web applications.

### Brand and presentation

The website should feel:
- Premium
- Confident
- Modern
- Technical without being intimidating
- Convincing to business owners
- Original rather than template-like
- Visually memorable
- Clean and structured
- Conversion-focused

Avoid:
- Generic AI-generated agency aesthetics
- Dominant purple branding
- Randomly mixed accent colors
- Excessive gradients
- Excessive animations
- Excessive glassmorphism
- Decorative glow effects everywhere
- Huge repetitive cards
- One-page marketing-template structure
- Unnecessary technical jargon for normal clients

Use Bitget only as inspiration for **application structure, navigation discipline, density, responsiveness, and product-like UX**. Do not copy Bitget's branding, proprietary visual identity, content, or exact interface.

### Existing functionality

Preserve useful existing functionality while redesigning the presentation:
- React Router SPA navigation
- Supabase integration
- Contact/lead submission
- Estimator functionality
- Admin authentication and dashboard
- Portfolio functionality
- Theme switching
- Toast notifications

Do not unnecessarily change Supabase schema, RLS, authentication, or backend functionality during the visual redesign.

## Existing Design To Review
`src/pages/Home.tsx` currently contains the old hero, service cards, technology section, and CTA sections.

The old design uses cyan/blue/slate styling and technical language.

Before replacing functionality, inspect the existing components and preserve useful functionality.

## Supabase Schema
The current database migration defines:

### leads
Fields include:
- id
- full_name
- email
- phone
- service_type
- budget
- notes
- status
- source
- created_at
- updated_at

### orders
Fields include:
- id
- lead_id
- package_name
- amount
- currency
- client_name
- client_email
- client_phone
- status
- payment_reference
- requirements
- created_at
- updated_at

### case_studies
Fields include:
- id
- slug
- title
- client_name
- summary
- content
- tech_stack
- featured_image
- demo_url
- is_published
- published_at
- created_at
- updated_at

Do not change database security policies casually. Inspect the existing setup and user intent before modifying RLS.

## Completed Cleanup
`ToastProvider` duplication was resolved. It is mounted from `src/main.tsx`, while the duplicate wrapper was removed from `src/App.tsx`.

Verified in commit `d151f71`.

## Important Working Principle
The actual source code and Git history are the final authority.

Do not assume that an earlier conversation decision was implemented unless it is verified in the repository.

When continuing this project:
1. Read this file.
2. Inspect the relevant existing source code.
3. Make one controlled change.
4. Run the appropriate test/build.
5. Commit the working change.
6. Push to GitHub.
7. Continue to the next milestone.

## Current Stage

The technical foundation and core SPA functionality are working.

The next major stage is:

**Redesign the user-facing Femix Web Dev experience into a premium nested SPA/product-platform interface.**

The first redesign milestone is:
1. Rework the persistent application shell/navigation.
2. Replace the current long-scroll Home page with a focused Home experience.
3. Establish the new restrained premium visual system without dominant purple.
4. Keep Services, Portfolio, About, Estimator, Contact, and Start a Project as distinct SPA experiences.
5. Preserve working Supabase and business functionality.

## Handoff Instructions
If another ChatGPT account continues this project, it should read this file first and inspect the repository before making changes.

The new ChatGPT should NOT restart the project from scratch.

Current working directory:

`~/projects/femix-web-dev`

Git remote:

`https://github.com/femixdigital/femix-web-dev.git`

Current branch:

`main`

# AI CONTINUATION PROTOCOL

IMPORTANT: This repository is an active project being developed with ChatGPT.

Any AI assistant continuing this project must follow these rules:

1. DO NOT restart the project.
2. DO NOT create a new Vite/React project.
3. DO NOT replace existing functionality without first inspecting it.
4. DO NOT assume that something discussed in a previous conversation was implemented. Verify it in the repository.
5. Treat this PROJECT_CONTEXT.md file as the persistent project handoff document.
6. Treat the actual repository source code and Git history as the final authority when they differ from this document.
7. Read this entire file before making project changes.
8. Inspect the current Git status before modifying files.
9. Inspect relevant existing files before replacing or redesigning them.
10. Preserve working functionality unless there is a clear reason to change it.
11. Follow the existing technology stack documented in this file.
12. Development is being performed primarily through Termux on Android. Acode may be used as an optional editor.
13. The user prefers simple, beginner-friendly, step-by-step instructions.
14. Give the user ONE terminal command at a time. Wait for the command result before giving the next command.
15. Do not give long sequences of terminal commands unless the user explicitly requests them.
16. Explain what a command is expected to do before asking the user to run it when clarification is useful.
17. Before significant code changes, inspect the relevant existing implementation.
18. After a meaningful change, run an appropriate test or production build.
19. Do not commit code that has not been tested when testing is reasonably possible.
20. After a successful milestone, commit the changes with a clear Git commit message.
21. Push completed milestones to origin/main so the GitHub repository remains the persistent backup.
22. Never claim that a change was pushed to GitHub unless the Git push actually succeeds.
23. Never claim that a file exists unless it has been verified.
24. Never invent project files, database tables, routes, components, dependencies, or configuration.
25. If the repository state is unclear, inspect it before proceeding.
26. If there is a conflict between an old conversation instruction and the current repository, prioritize the actual current repository and this context file, then ask the user before making a destructive change.
27. Do not unnecessarily change Supabase schema, RLS policies, authentication, or backend functionality while working on the frontend.
28. Do not remove existing components simply because they are not currently used without first checking whether they contain reusable functionality.
29. The desired final product is a premium, modern, professional, responsive Femix Web Dev website—not a generic AI-generated template.
30. Do not automatically reuse the old cyan/blue visual identity. Choose the final visual system based on professional UI/UX, readability, accessibility, contrast, and brand quality.
31. Avoid excessive gradients, animations, glassmorphism, decorative effects, and unnecessary technical jargon.
32. Keep the application maintainable and understandable.
33. When the user says they want to continue the project, begin by reading PROJECT_CONTEXT.md and checking Git status.
34. Identify the exact current milestone before proposing the next development step.
35. If the user changes devices, accounts, or ChatGPT sessions, continue from the repository state rather than assuming the previous conversation is available.
36. If another AI assistant is given access to this GitHub repository, it should use this document as the persistent project handoff.
37. Never reset, force-push, delete the repository, or perform destructive Git operations unless the user explicitly requests it and the consequences are explained first.

CURRENT VERIFIED CHECKPOINT:

- Repository: femixdigital/femix-web-dev
- Branch: main
- Latest verified commit: 4be7e81
- Commit message: Configure Tailwind and preserve Vite build settings
- Tailwind CSS v4 configured
- @tailwindcss/vite configured
- Existing Vite build optimization preserved
- Supabase Edge Function send-lead-email exists
- npm run build successfully completed
- PROJECT_CONTEXT.md is now part of the project handoff system
- Next major milestone: premium UI redesign
- First frontend redesign area: application shell/navigation and homepage

WHEN RESUMING:

The AI assistant must first:

1. Read PROJECT_CONTEXT.md.
2. Check the current Git status.
3. Check the current branch.
4. Verify the latest repository state.
5. Inspect the relevant source files for the current milestone.
6. Tell the user briefly what has already been completed.
7. Identify the next unfinished milestone.
8. Give only the next required terminal command.
9. Wait for the user's result.
10. Continue step-by-step.

DO NOT START FROM SCRATCH.

The goal is to continue the existing Femix Web Dev project from its actual repository state, even when the previous ChatGPT conversation or account is unavailable.
