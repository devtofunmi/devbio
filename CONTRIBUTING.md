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
│   ├── dashboard/       # Editor & User Dashboard components
│   │   └── edit/        # Modals and Inline editing tools
│   ├── landingpage/     # Marketing & Front-facing site components
│   └── ui/              # Shared primitive UI components
├── lib/
│   ├── AuthContext.tsx  # Supabase Authentication logic
│   ├── constants.tsx    # Themes, Tech Icons, and Social URLs
│   ├── supabase.ts      # Database client initialization
│   └── utils.ts         # Shared helper functions (URL formatting)
├── pages/
│   ├── dashboard/       # Private editor routes
│   └── [profile].tsx    # High-performance public bio page
├── public/              # Static assets (logos, icons)
├── styles/              # Global CSS & Tailwind configuration
└── SETUP_DB.sql         # Database schema & RLS policies
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