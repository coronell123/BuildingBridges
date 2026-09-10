# Building Bridges TP3 — Work Package 3.2  
## Formative evaluation of the living platform (proof-of-concept)

| Field | Value |
|---|---|
| Work package | WP 3.2 — Iterative development of relevant components + formative evaluation |
| Period covered | Project months 11–30 (July 2025 – February 2027) |
| This review date | 23 August 2026 |
| Site reviewed | https://building-bridges.app |
| Evidence | Live pages, full-page screenshots in `screenshots/pages`, and the current codebase |
| Status of this document | Formative (during development), not a final impact evaluation |

This document checks whether the current website follows the **design principles and task definitions** of WP 3.2. It is written so TP1–TP3 can record *what exists, what is only partly in place, and what still needs qualitative research*.

**Rating key**

- **In place** — visible on the live site and usable for the proof-of-concept  
- **Partly** — started, but incomplete or not yet systematic  
- **Not yet** — planned in WP 3.2, not implemented on the living platform  
- **Outside this review** — needs interviews / surveys (Tasks 4–6), not a yes/no website check  

---

## 1. Goal of WP 3.2 (are we doing the right kind of work?)

| WP 3.2 definition | Current platform status | Rating |
|---|---|---|
| **Iterative development** (build → test → adjust → build again) | The site is a running prototype, not a one-shot launch. Story tool, stories page, contact, workshops, and admin review were added in cycles. GitHub `main` + Vercel deploys support this. A formal iteration log (what changed, why, which feedback) is still thin. | Partly |
| **Relevant components only** (PoC building blocks, not the whole platform) | Public site, glossary, stories, story tool, workshops, bilingual UI, and a review path exist. Full mentoring operations, published-from-database stories, and formal evaluation widgets are not finished. | In place |
| **Formative evaluation** (check during development) | This document + screenshots + TP1 survey plan. On-site mini surveys and version history are not live yet. | Partly |
| **Proof-of-concept** (show the concept works, not a finished product) | Visitors can read stories, use DE/EN, open a glossary, watch an explainer video, try a story-creation preview, and staff can receive submissions for review. That is a PoC, not a finished product. Story tool is labelled “under development”. | In place |

**Important for scientific evidence:** keep an iteration log (see Appendix B). Record *what* changed, *when*, and *why* (e.g. TP1 finding, workshop 31.08.2026, n8n test, mentor feedback).

---

## 2. Task 1 — Infrastructure of the living platform

WP 3.2 asked: where is it hosted, how is AI integrated, what is the workflow?

| Question in the WP note | Actual implementation (August 2026) | Follows the intended living-platform setup? |
|---|---|---|
| Where is the site hosted? | **Vercel** (`building-bridges.app`). Confirmed. | Yes |
| Frontend / authoring | **Cursor** used for implementation; Next.js 14 App Router, React. | Yes |
| Development workflow | **GitHub** (`laureenwr/BuildingBridges`), push to `main` triggers Vercel production. | Yes |
| Backend database | **PostgreSQL on Neon**, not MySQL. Drizzle ORM. | Yes (different DB than the draft note; Neon/Postgres is the real stack) |
| Automation | **n8n** can POST stories to `/api/stories/submit` with `x-api-key`. Website Story Tool can submit the same way. | Partly (pipeline exists; production table/branch must match Vercel `DATABASE_URL`) |
| “How is Claude currently integrated?” | **Claude is not integrated in the live app.** Matching, recommendations, and digital-story generation use **OpenAI GPT-4 Turbo** (`lib/ai/openai-service.ts`, `OPENAI_API_KEY`). Cursor/Claude may be used only as a development assistant, not as the production ML component. | Clarify in the write-up: production ML = OpenAI; Claude ≠ live ML component |

**PoC conclusion (Task 1):** The living platform runs on a selected cloud stack (Vercel + GitHub + Neon + Next.js). The WP note’s “MySQL / Claude” items should be updated to **Postgres/Neon** and **OpenAI (+ optional n8n)**.

---

## 3. Task 2 — Design principles for context-sensitive content

Target group (from project context): **girls and FLINTA\* of Colour**, school grade 10+, mentoring / empowerment / academic pathways (DE + EN).

**Context-sensitive** here means: language, format, and safeguards fit that group and the setting (school, youth centre, mentoring), not generic one-size-fits-all content.

Literature cited in the WP (Aditya et al. 2023; Large et al. 2001; Rybakov & Rybakova 2019) is used as the source of the five principles below. This review checks the *platform*, not the papers.

### 3.1 Accessible language

| Expected | What the site does | Rating |
|---|---|---|
| German / English | EN \| DE switch in the header. Many landing, team, stories, glossary, contact, and story-tool strings are bilingual via `useLanguage()`. | In place |
| Glossary for key terms | `/glossary` exists with plain-language definitions (DE + EN), e.g. FLINTA\*, Empowerment, BIPoC, Mentoring, Storytelling, Resilienz. | In place |
| Language stays simple on all pages | Glossary is written accessibly. Some academic/research pages stay denser. Not every dashboard string is bilingual. | Partly |

**Evidence:** `screenshots/pages/glossary.png`, `home.png`, `app/glossary/page.tsx`.

### 3.2 Multimodal communication

| Expected | What the site does | Rating |
|---|---|---|
| Text | Main content is text throughout. | In place |
| Short explainer videos | Homepage embeds a YouTube explainer (`LandingVideo`, youtube-nocookie). | In place |
| Infographics | Knowledge copy *promises* infographics. Dedicated infographic pages/assets are not a systematic library yet. Workshop flyers appear as images. | Partly |
| Example stories | `/stories` shows published community stories (currently **4 hardcoded narratives**, not live DB rows). Formats include story cards / chapters. | In place (PoC) |

**Evidence:** `screenshots/pages/stories.png`, `story-tool.png`, `components/landing/LandingVideo.tsx`, `lib/content/communityStories.ts`.

### 3.3 Trauma-sensitive design

| Expected | What the site does | Rating |
|---|---|---|
| Content warnings | No systematic content-warning component on published stories or workshop pages. | Not yet |
| “Skip sensitive content” | Story-tool process mentions “skip sensitive sections” as a **preview tag**, not a working skip control on live story text. | Partly |
| Clear navigation | Public header: Home, About, Program, Platform, Partners, Contact, Dashboard, Register, DE/EN. Footer repeats the map. Story tool uses numbered steps. | In place |
| Consent / no auto-publish | Story Tool requires a consent checkbox; submissions go to **human review**, not straight to `/stories`. | In place |

**Gap for WP 3.2:** add visible content warnings on stories that discuss racism/discrimination, and a real skip/continue control—not only a label in the prototype steps.

### 3.4 Inclusive design

| Expected | What the site does | Rating |
|---|---|---|
| Gender-inclusive language | FLINTA\*, Mentor\*in, Mentee, “girls and FLINTA\* of Colour” used in DE/EN copy. Glossary explains the terms. | In place |
| Accessibility (WCAG) | Footer claims WCAG 2.1 AA. Some `aria-*` roles exist (story filters, dialogs, switches). **No documented independent WCAG audit** in this review. Contrast is generally strong (purple/white); formal AA proof is still missing. | Partly |

**Evidence:** `screenshots/pages/home.png` footer; `CommunityStories.tsx` `role="tablist"` / `aria-modal`.

### 3.5 Dynamic platform / Action Design Research

The platform should not look finished and closed.

| Expected | What the site does | Rating |
|---|---|---|
| “This section is evolving” markers | Story tool shows **Under development / In Entwicklung** and says it is built with the community. | In place (story tool) |
| Invitation for feedback | Events text invites people to “share feedback and co-create”. Contact form exists. No persistent “Was this useful?” on stories/knowledge. | Partly |
| Version history transparency | No public changelog of content versions. | Not yet |
| Mini surveys | Google Form for workshop evaluation is used **off-site**. No in-platform mini survey. | Partly (process exists off-site) |

---

## 4. Task 3 — Design principles for participatory content creation

WP question: can mentors, M\*oC, and partners **shape** stories instead of only consuming them?

| Principle / question | Current state | Rating |
|---|---|---|
| People can contribute narratives | **Story Creation Tool** (`/story-tool`): type, context, transcript, generated chapters, consent, submit for review. **n8n** can send interview-structured stories to the same API. | In place (PoC) |
| Simple input for non-technical partners | Guided steps + free-text transcript. Preview still says “sample mode” / under development. | Partly |
| Humans keep editorial control (AI as tool) | Consent required. Status starts as `pending_review`. Admin review UI exists in code (`/portal/admin/stories/review`). Public `/stories` is **not** auto-updated from new submissions (hardcoded examples). | Partly |
| Users can edit AI drafts before publication | In the tool, users see generated chapters before submit. After submit, there is no public “edit my published story” flow. | Partly |
| Feedback loop on whether content fits context | Workshop 31.08.2026 (storytelling) and Google Form for workshops are planned/used as process, not wired into the story pages. | Partly |
| Authenticity vs AI generalisation | Human review + consent are the main safeguards. No documented bias/stereotyping check (that is Task 5). | Partly |

**Approaches already named in the WP (keep in the iteration log)**

1. Storytelling Workshop — 31.08.2026  
2. Google Form evaluating workshops  

---

## 5. Machine-learning component (Tasks 2–3, 5)

| Question | Answer for the write-up |
|---|---|
| What ML is used? | **OpenAI GPT-4 Turbo** for mentor matching, recommendations, and digital-story generation (`lib/ai/openai-service.ts`). Story Tool currently **splits a transcript into chapters in the browser** (rule-based), then can submit to `/api/stories/submit`. n8n may run its own generator off-site. |
| Is Claude in production? | **No.** Do not describe Claude as the live ML component unless that is added later. |
| Prompt design needed? | **Yes, for OpenAI** (and for n8n if that workflow uses an LLM). Prompts should encode: target group, no stereotyping, keep the speaker’s words, DE/EN, trauma-aware tone, human review required. |
| Human oversight if AI fails | Submit path can fail closed (500). Published stories on `/stories` do not depend on the API (hardcoded). That is a fallback, but also means new community stories do not appear automatically. |

---

## 6. Tasks 4–6 — What the website can show vs what still needs people

These three tasks are **qualitative**. The website cannot “pass” them without interviews, conversations, or feedback sessions.

| Task | What it asks | What the platform already allows you to study | Still needed |
|---|---|---|---|
| **4 — Is the content useful?** | Helpful, motivating, target-group- and context-sensitive empowerment narratives | 4 example stories + glossary + workshops + story-tool drafts | Interviews / focus groups with M\*oC, mentors, trainers (TP1) |
| **5 — Is the system reliable / low-risk?** | Stereotyping, inaccuracy, loss of authenticity, sensitive phrasing, dependency on AI | Consent + human review + hardcoded public stories reduce auto-publish risk | Review a sample of AI/n8n outputs against a risk checklist; document failures |
| **6 — Is creation easy?** | Understandability, effort, non-technical users, frustration points | Numbered story-tool steps, DE/EN, development banner | Observed usability tests (mentors / staff creating one story) |

**Do not claim Tasks 4–6 are completed** only because the pages exist.

---

## 7. Summary: does the website follow the WP 3.2 principles?

**Yes, as a proof-of-concept — not as a finished living platform.**

The site **does** demonstrate the core concept: bilingual, target-group language; a glossary; multimodal pieces (text, video, stories); a participatory story path with consent and human review; and an “under development” stance.

It **does not yet** fully implement trauma warnings, skip-sensitive-content, version history, in-page mini surveys, WCAG-proven AA, database-backed public stories, or documented qualitative proof for usefulness / risk / ease of use.

| Principle cluster | Overall |
|---|---|
| Task 1 infrastructure | In place (correct the WP note: Neon/Postgres, OpenAI, not MySQL/Claude) |
| 2.1 Accessible language | In place |
| 2.2 Multimodal | Partly / In place for text, video, stories |
| 2.3 Trauma-sensitive | Partly |
| 2.4 Inclusive / WCAG | Partly |
| 2.5 Dynamic / ADR | Partly |
| Task 3 participatory creation | Partly (PoC tool + review; not a closed community loop) |
| Tasks 4–6 | Outside this review — methods exist, findings not in this document |

---

## 8. Recommended next iterations (for the scientific log)

Record each as: **date — change — reason (feedback source)**.

1. **Align production database** so n8n / Story Tool submissions land in the same Neon branch Vercel uses, then show approved stories on `/stories` from the database. *Reason:* PoC of the living (not static) story archive.  
2. **Add content warnings + skip** on stories that mention discrimination/racism. *Reason:* Task 2 trauma-sensitive principle.  
3. **Add a short feedback prompt** on `/stories` and `/story-tool` (“Did this fit your context?”). *Reason:* Task 3 feedback loop + Task 4/6 data collection.  
4. **Write OpenAI/n8n prompt rules** (no stereotypes, keep first-person voice, flag sensitive themes). *Reason:* Task 5 risk estimation.  
5. **Usability session** with one mentor and one staff member creating a story (count steps, time, where they get stuck). *Reason:* Task 6.  
6. **Keep iteration log** after the 31.08.2026 storytelling workshop and after TP1 shares findings.

---

## Appendix A — Pages reviewed (23 August 2026)

Screenshots: `screenshots/pages/` (production, unauthenticated).

Public: `/`, `/sign-in`, `/sign-up`, `/reset-password`, `/contact`, `/partners`, `/team` + 10 profiles, `/mentors`, `/workshops`, `/vision`, `/roadmap`, `/glossary`, `/stories`, `/story-tool`, `/imprint`, `/tos`, `/privacy-policy`, `/onboarding`, `/design-system`.

Login-only (`/dashboard`, `/portal`, `/portal/admin`, …) redirected to sign-in in this review. Admin story review exists in the codebase but was not screenshot as a logged-in session.

---

## Appendix B — Iteration log template (copy for each cycle)

| Date | Component | What we built or changed | Tested with | What we learned | What we adjust next |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

---

## Appendix C — Sources used for this review

- WP 3.2 task text (TP3, living platform, design principles, Tasks 1–6)  
- Live site https://building-bridges.app  
- Screenshots in `screenshots/pages`  
- Code: `app/glossary/page.tsx`, `components/landing/LandingVideo.tsx`, `components/landing/AiStoryTool.tsx`, `components/landing/StoryToolDevelopmentNotice.tsx`, `lib/content/communityStories.ts`, `lib/ai/openai-service.ts`, `app/api/stories/submit/route.ts`  
- Project context: `Infos/PROJECT_CONTEXT.md` (intersectionality, empowerment, community, accessibility, cultural sensitivity)  

*This is a formative PoC review. It does not replace TP1 surveys, focus groups, or a formal WCAG audit.*
