# Contributing to DevBio 

First off, thank you for considering contributing to DevBio! It's people like you that make it a great tool for the developer community.

## How Can I Contribute?

### Reporting Bugs
- Check the issues tab to see if the bug has already been reported.
- If not, open a new issue. Include a clear title, a description of the problem, and steps to reproduce the bug.

### Suggesting Enhancements
- If you have an idea for a new feature or theme, open an issue labeled `enhancement`.
- Describe the benefits and provide design mockups if possible.

### Pull Requests
1. **Fork** the repository.
2. **Clone** your fork (`git clone https://github.com/devtofunmi/devbio`).
3. **Create a branch** for your feature/fix (`git checkout -b feature/amazing-feature`).
4. **Commit** your changes (`git commit -m 'Add amazing feature'`).
5. **Push** to the branch (`git push origin feature/amazing-feature`).
6. **Open a Pull Request** against the main branch.

## Project Structure

```text
├── components/
│   ├── dashboard/              # Editor & User Dashboard components
│   │   ├── edit/               # Modals and Inline editing tools
│   │   │   ├── CTAModal.tsx
│   │   │   ├── GitHubModal.tsx
│   │   │   ├── InlineEdit.tsx
│   │   │   ├── ProjectModal.tsx
│   │   │   ├── SocialModal.tsx
│   │   │   ├── StatusModal.tsx
│   │   │   └── TechStackModal.tsx
│   │   ├── cv/                 # CV/Resume components
│   │   │   ├── CVCard.tsx
│   │   │   └── CVDeleteModal.tsx
│   │   ├── AboutMeCard.tsx
│   │   ├── AccountSettings.tsx
│   │   ├── AutoResizingTextarea.tsx
│   │   ├── CTACard.tsx
│   │   ├── DashboardHero.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── DeleteAccountModal.tsx
│   │   ├── GitHubDNACard.tsx
│   │   ├── ProfileCard.tsx
│   │   ├── ProjectGrid.tsx     # Drag-and-drop project reordering
│   │   ├── ShareModal.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SocialCard.tsx
│   │   ├── StatusCard.tsx
│   │   ├── SupportModal.tsx
│   │   ├── TechStackCard.tsx
│   │   ├── ThemeSettings.tsx
│   │   ├── ThemeSidebar.tsx
│   │   ├── ThemeTrigger.tsx
│   │   └── WelcomeModal.tsx
│   ├── landingpage/            # Marketing & Front-facing site components
│   │   ├── About.tsx
│   │   ├── CallToAction.tsx
│   │   ├── Contribute.tsx
│   │   ├── CrackedDevs.tsx     # Auto-scrolling developer showcase
│   │   ├── DonationCTA.tsx
│   │   ├── FAQ.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── SocialProof.tsx
│   │   └── Testimonials.tsx
│   ├── GitHubCard.tsx          # GitHub contribution graph component
│   ├── LoadingSpinner.tsx      # Reusable loading indicator
│   ├── Portal.tsx              # React portal wrapper
│   ├── PublicShareModal.tsx    # Share modal for public profiles
│   └── SuccessModal.tsx        # Success confirmation modal
├── lib/
│   ├── AuthContext.tsx         # Supabase Authentication logic
│   ├── constants.tsx           # Themes, Tech Icons, and Social URLs
│   ├── supabaseClient.ts       # Database client initialization
│   └── utils.ts                # Shared helper functions (URL formatting)
├── pages/
│   ├── api/
│   │   └── webhooks/           # API webhook handlers
│   ├── dashboard/              # Private editor routes
│   │   ├── analytics.tsx       # Profile analytics dashboard
│   │   ├── index.tsx           # Main dashboard/editor
│   │   ├── settings.tsx        # Account settings
│   │   └── themes.tsx          # Theme customization
│   ├── [profile].tsx           # High-performance public bio page
│   ├── _app.tsx                # Next.js app wrapper
│   ├── _document.tsx           # Next.js document wrapper
│   ├── about.tsx               # About page
│   ├── claim.tsx               # Username claim page
│   ├── contribute.tsx          # Contribution page
│   ├── donate.tsx              # Donation/support page
│   ├── index.tsx               # Landing page
│   ├── login.tsx               # Authentication page
│   ├── signup.tsx              # User registration page
│   └── success.tsx             # Post-signup success page
├── public/                     # Static assets
│   ├── 1.jpeg - 12.jpeg        # Developer avatars for CrackedDevs section
│   ├── favicon.ico
│   ├── logo.svg
│   └── *.svg                   # Various icon assets
├── styles/
│   └── globals.css             # Global CSS & Tailwind configuration
├── middleware.ts               # Auth middleware for protected routes
└── SETUP_DB.sql                # Database schema & RLS policies
```

## Design Principles
- **Cleanliness**: Maintain the glassmorphic, premium aesthetic.
- **Performance**: Keep the First Load JS small. Use Turbopack.
- **Accessibility**: Ensure high contrast and screen reader support for public profiles.

## Development Standards
- Use **TypeScript** for all new components.
- Use **Tailwind CSS** for styling (avoid inline styles).
- Follow the existing project structure:
  - `components/dashboard`: Components used in the editor.
  - `components/landingpage`: Components for the main marketing site.
  - `lib`: Shared utilities and contexts.

---

Thank you for being part of the DevBio journey! 