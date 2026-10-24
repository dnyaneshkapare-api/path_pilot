# AI Career Discovery & Learning Platform (Path Copilot)
> **Tagline:** Learn • Discover • Grow  
> **Mission:** Guiding students after 10th, 12th, in college, career explorers and lifelong learners toward transparent, evidence-grounded career pathways. The AI guides; it never decides.

---

## 🌟 Architecture & Core Highlights

1. **Frontend & Backend**: Next.js App Router (React 19, TypeScript) with server-side `/api/v1` routes and Next.js middleware enforcing enterprise security headers (CSP, HSTS, X-Frame-Options: DENY).
2. **Algorithmic Career Recommendation Engine**:
   $$\ S(c) = 0.35I + 0.20A + 0.15G + 0.15P + 0.15F \$$
   - Each component is normalized on a 0–100 scale with adjustable assumptions.
   - Non-exclusionary eligibility checking that alerts students to missing foundation stages without disqualifying the career.
   - Shows fit under the current method, never guaranteeing success.
3. **RIASEC Assessment Engine**:
   - 12 mobile-friendly, skippable questions mapping Realistic, Investigative, Artistic, Social, Enterprising, and Conventional dimensions.
   - Full multilingual support across **English, Hindi (हिन्दी), and Marathi (मराठी)**.
4. **Verified Future Scope & Careers Directory**:
   - 12 authentic, verified career records citing **National Career Service (NCS)**, **MeitY**, **NASSCOM**, **ICAI**, and **MNRE**.
   - Zero hallucinated statistics; each salary and job-growth data point carries a verified date, source, and region.
   - Side-by-side comparison matrix for comparing eligibility, cost, duration, and demand.
5. **Level-by-Level Roadmaps (Level 0 to Level 3)**:
   - Level 0 Explore → Level 1 Foundations → Level 2 Practical Skills → Level 3 Specialize.
   - 100% free courses (NPTEL, Swayam, freeCodeCamp, Harvard CS50x) + portfolio project milestones.
6. **1:1 Expert Consultations**:
   - Directory of verified counselors, educators, and senior practitioners.
   - Transactional slot locking to eliminate double bookings.
   - Minor safety flow with mandatory parental consent acknowledgment (DPDP Act compliance).
   - Instant encrypted video/chat room links (`meet.jit.si`).
7. **Student History Timeline**:
   - Private student history of past assessments, saved careers, roadmaps, and consultations.
   - Instant PDF export of the timeline via `jspdf`.
   - "Delete My History" control for the DPDP right to erasure.
8. **Admin Control Center**:
   - Protected by server-side role verification.
   - Automated stale-data audit queue flagging records older than 90 days.

---

## 🛡️ Non-Negotiable Security Checklist (14/14 Completed)

| # | Requirement | Implementation & Verification Status |
|---|-------------|--------------------------------------|
| **1** | **Hide API keys** | Verified: LLM, DB, and JWT secrets remain strictly server-side. Checked `.gitignore` and `.env.local`. |
| **2** | **Check env variables** | Validated fallback defaults in `src/lib/auth.ts` and `.env.example` with clear documentation. |
| **3** | **Protect admin routes** | Server-side role check enforced in `src/app/api/v1/admin/overview/route.ts` and `src/middleware.ts`. |
| **4** | **Proper authentication** | Passwords hashed with `bcryptjs` (salt factor 12); short-lived JWT access tokens + rotating refresh tokens stored in `HttpOnly`, `SameSite=Lax` cookies. |
| **5** | **Access control** | Object-level ownership check on consultations (`c.studentId === payload.userId`) and history. Deny by default. |
| **6** | **Sanitize forms** | Input validation on all `/api/v1` routes: length boundaries, string types, and email formatting. |
| **7** | **XSS protection** | React JSX escaping throughout; no `dangerouslySetInnerHTML` on untrusted user input; strict CSP in middleware. |
| **8** | **Rate limiting** | In-memory token-bucket limiter in `src/lib/auth.ts`: 10 attempts/min on auth, 15 queries/min on AI mentor. Returns HTTP 429 with `Retry-After`. |
| **9** | **Secure API endpoints** | Authentication required on all private endpoints; standardized JSON error objects without leaking stack traces. |
| **10** | **CORS settings** | Same-origin default in Next.js App Router; no wildcard `*` with credentials. |
| **11** | **Security headers** | Configured in `src/middleware.ts`: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`. |
| **12** | **Update dependencies** | Modern, clean dependencies installed: Next.js 16, React 19, `jose`, `bcryptjs`, `lucide-react`, `jspdf`, `canvas-confetti`. Zero critical vulnerabilities reported by npm. |
| **13** | **Remove unused packages** | Minimal package footprint; no dead code or leftover unused scaffolding. |
| **14** | **Check exposed files** | `.env*` added to `.gitignore`. No secret credentials committed in source control. |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ or v24+
- npm v10+

### Setup & Run
```bash
# 1. Clone or navigate to the directory
cd "Path Copilot"

# 2. Dependencies are already installed; if needed:
npm install

# 3. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials (Pre-seeded)
- **Student**: `student@pathcopilot.org` / `PathCopilot@2026`
- **Expert**: `expert@pathcopilot.org` / `PathCopilot@2026`
- **Admin**: `admin@pathcopilot.org` / `PathCopilot@2026`
*(Quick-fill buttons are also available directly on the `/login` page).*
