# La-Rouine (لاروين) - Youth Social Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

> **Empowering local youth communities through events, challenges, and social connection**

La-Rouine is a bilingual (Arabic/English) Progressive Web App designed to activate social movements within small cities. It combines event management, community challenges, local clubs, and gamification to drive real-world engagement.

---

## 🌟 Key Features

### MVP (Current)
- ✅ **Feed**: Unified timeline of posts, events, and challenges
- ✅ **Events**: Create and RSVP to local meetups
- ✅ **Challenges**: Submit proof and compete for points
- ✅ **Clubs**: Join interest-based groups with chat
- ✅ **Gamification**: Points, badges, and leaderboards
- ✅ **PWA**: Installable app with offline support

### Roadmap
- 🔜 Real-time WebSocket chat
- 🔜 QR code check-in for events
- 🔜 Team challenges
- 🔜 Sponsorship & promotions
- 🔜 Paid ticketing

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis (optional, for caching)

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/larouine.git
cd larouine

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Run database migrations
npm run db:migrate

# Seed demo data
npm run db:seed

# Start development server
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

\`\`\`
larouine/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main application component
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles & design tokens
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utilities and types
│   └── types.ts          # TypeScript definitions
├── docs/                  # Documentation
│   ├── API_SPECIFICATION.md
│   └── SPRINT_BACKLOG.md
├── public/               # Static assets
│   └── manifest.json     # PWA manifest
└── scripts/              # Database migrations & seeds
\`\`\`

---

## 🎨 Design System

La-Rouine uses a vibrant, youth-focused color palette:

- **Primary**: Energetic Coral (#FF6B35)
- **Secondary**: Fresh Teal (#4ECDC4)
- **Accent**: Vibrant Purple (#9B59B6)
- **Typography**: Tajawal (Arabic), Geist (Latin)

All colors support dark mode with automatic contrast adjustments.

---

## 🗄️ Database Schema

See [docs/API_SPECIFICATION.md](docs/API_SPECIFICATION.md) for complete ERD.

**Core Tables**:
- `users` - User profiles & points
- `clubs` - Interest-based groups
- `posts` - Unified content (posts/events/challenges)
- `submissions` - Challenge proof submissions
- `badges` - Achievement definitions
- `leaderboard_cache` - Ranking data

---

## 🔐 Authentication

Lightweight JWT-based authentication:
- Username + display name signup (no password required for MVP)
- Optional phone number for identity verification
- Token expiry: 30 days

---

## 📱 PWA Features

- **Installable**: Add to home screen on mobile/desktop
- **Offline Support**: Read cached feed without connection
- **Background Sync**: Queue posts when offline, sync later
- **Push Notifications**: Event reminders (coming soon)

---

## 🧪 Testing

\`\`\`bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
\`\`\`

---

## 🚀 Deployment

### Vercel (Recommended)

\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Docker

\`\`\`bash
docker-compose up -d
\`\`\`

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

---

## 📊 Success Metrics

**Targets (30 days post-launch)**:
- DAU: 200+
- 7-day retention: 25%+
- Daily posts per active user: 1.5+
- Event attendance rate: 40%+

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Development Workflow**:
1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

---

## 🌐 Links

- **Website**: https://larouine.app
- **Documentation**: [docs/](docs/)
- **API Spec**: [docs/API_SPECIFICATION.md](docs/API_SPECIFICATION.md)
- **Roadmap**: [docs/SPRINT_BACKLOG.md](docs/SPRINT_BACKLOG.md)

---

## 👥 Team

Built with ❤️ by the La-Rouine team.

For questions or support, reach out at: **dev@larouine.app**

---

**Live Demo**: Coming soon! 🚀
