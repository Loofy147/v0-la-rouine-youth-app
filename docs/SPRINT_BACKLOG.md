# La-Rouine Sprint Backlog

## Sprint 0: Project Setup (3 days)

### SETUP-1: Repository & Development Environment
**Story Points**: 2  
**Priority**: Critical  
**Assignee**: Tech Lead

**Tasks**:
- [ ] Initialize monorepo structure (frontend/backend/shared)
- [ ] Setup Git hooks (Husky) for pre-commit linting
- [ ] Configure ESLint, Prettier, TypeScript configs
- [ ] Create .env.example files
- [ ] Setup CI/CD pipeline skeleton (GitHub Actions)

**Acceptance Criteria**:
- Repo has clear folder structure with README
- Pre-commit hooks prevent commits with lint errors
- CI pipeline runs on PR creation

---

### SETUP-2: Database Schema & Migrations
**Story Points**: 3  
**Priority**: Critical  
**Assignee**: Backend Dev

**Tasks**:
- [ ] Setup PostgreSQL locally + migration tool (Knex/Prisma)
- [ ] Create initial migration with all tables (users, posts, clubs, etc.)
- [ ] Seed script with test data
- [ ] Document schema in /docs

**Acceptance Criteria**:
- Migration runs successfully on fresh DB
- Seed creates 20+ realistic test records
- Schema matches ERD in blueprint

---

### SETUP-3: Tailwind & Component Library
**Story Points**: 2  
**Priority**: High  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] Configure Tailwind v4 with La-Rouine theme
- [ ] Verify shadcn/ui components work with RTL
- [ ] Create custom Arabic font integration
- [ ] Build 3-5 custom components (PostCard, ClubCard, etc.)

**Acceptance Criteria**:
- Colors match design system (coral/teal/purple)
- All components render correctly in RTL
- Storybook/component docs created

---

## Sprint 1: Core Auth & Feed (7 days)

### AUTH-1: User Authentication Backend
**Story Points**: 5  
**Priority**: Critical  
**Assignee**: Backend Dev

**Tasks**:
- [ ] Implement JWT-based auth service
- [ ] Create /auth/signup endpoint with validation
- [ ] Create /auth/login endpoint
- [ ] Create /auth/me endpoint (get current user)
- [ ] Password hashing (if adding password later)
- [ ] Rate limiting on auth endpoints

**Acceptance Criteria**:
- User can sign up with username + display name
- Login returns valid JWT token
- Token validates correctly on protected routes
- Duplicate usernames rejected
- Unit tests coverage >80%

---

### AUTH-2: Frontend Auth Flow
**Story Points**: 5  
**Priority**: Critical  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] Build signup/login forms
- [ ] Implement JWT storage (localStorage + context)
- [ ] Auto-redirect if not authenticated
- [ ] Create AuthProvider context
- [ ] Handle token expiry

**Acceptance Criteria**:
- User can complete signup flow in <30 seconds
- Login persists across page refresh
- Protected routes redirect to login
- Clear error messages for validation

---

### FEED-1: Feed API Endpoint
**Story Points**: 5  
**Priority**: Critical  
**Assignee**: Backend Dev

**Tasks**:
- [ ] Implement /feed endpoint with pagination
- [ ] Add filters (type, clubId, cityZone)
- [ ] Join user and club data efficiently
- [ ] Optimize query performance (indexes)
- [ ] Add caching layer (Redis) for popular feeds

**Acceptance Criteria**:
- Feed returns posts sorted by creation date
- Pagination works (20 items per page)
- Response includes author and club info
- Response time <200ms for cached requests

---

### FEED-2: Feed UI Component
**Story Points**: 5  
**Priority**: Critical  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] Build feed container with infinite scroll
- [ ] Create PostCard component (supports all 3 types)
- [ ] Implement like/comment buttons (UI only)
- [ ] Add pull-to-refresh
- [ ] Loading states & error handling

**Acceptance Criteria**:
- Feed displays posts correctly in RTL
- Infinite scroll loads more posts
- Post types (post/event/challenge) visually distinct
- Works smoothly on mobile

---

### FEED-3: Create Post/Event/Challenge
**Story Points**: 8  
**Priority**: High  
**Assignee**: Full Stack

**Tasks**:
- [ ] Backend: POST /posts endpoint
- [ ] Validation for all 3 types
- [ ] Frontend: Create modal with type selector
- [ ] Form validation (title, body required)
- [ ] Image upload flow (pre-signed URL)
- [ ] Success/error feedback

**Acceptance Criteria**:
- Users can create all 3 post types
- Events have date/location fields
- Challenges have reward points field
- Created posts appear in feed immediately
- Images upload successfully

---

## Sprint 2: Media Upload & Submissions (7 days)

### MEDIA-1: Storage Integration
**Story Points**: 5  
**Priority**: High  
**Assignee**: Backend Dev

**Tasks**:
- [ ] Setup S3/Supabase Storage integration
- [ ] Implement pre-signed URL generation
- [ ] Add file type validation
- [ ] Image compression middleware
- [ ] CDN configuration

**Acceptance Criteria**:
- Images upload to storage successfully
- Pre-signed URLs expire after 5 minutes
- Only image/video MIME types accepted
- Images auto-compressed to <2MB

---

### SUBMIT-1: Challenge Submission Backend
**Story Points**: 5  
**Priority**: High  
**Assignee**: Backend Dev

**Tasks**:
- [ ] POST /challenges/:id/submissions endpoint
- [ ] File upload handling (multipart/form-data)
- [ ] Store submission with "pending" status
- [ ] Prevent duplicate submissions per user
- [ ] GET submissions endpoint

**Acceptance Criteria**:
- Users can submit proof with image/video
- Submissions start as "pending"
- One submission per user per challenge
- Submissions list endpoint returns data

---

### SUBMIT-2: Submission UI
**Story Points**: 5  
**Priority**: High  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] Build submission form modal
- [ ] File picker with preview
- [ ] Upload progress indicator
- [ ] Display submissions on challenge page
- [ ] Vote buttons (UI only)

**Acceptance Criteria**:
- Users can attach media to submissions
- Upload shows progress bar
- Submissions display in gallery view
- Pending status visible

---

### ADMIN-1: Admin Approval Flow
**Story Points**: 5  
**Priority**: High  
**Assignee**: Full Stack

**Tasks**:
- [ ] Backend: /admin/submissions/:id/approve endpoint
- [ ] Backend: /admin/submissions/:id/reject endpoint
- [ ] Award points on approval
- [ ] Frontend: Admin panel basic UI
- [ ] Display pending submissions list
- [ ] Approve/reject buttons

**Acceptance Criteria**:
- Admin can see all pending submissions
- Approve button changes status + awards points
- Reject button changes status (no points)
- Points reflected in user profile immediately

---

## Sprint 3: Clubs & Chat (7 days)

### CLUB-1: Club Backend
**Story Points**: 5  
**Priority**: High  
**Assignee**: Backend Dev

**Tasks**:
- [ ] GET /clubs endpoint (list all)
- [ ] POST /clubs (create club)
- [ ] POST /clubs/:id/members (join)
- [ ] DELETE /clubs/:id/members (leave)
- [ ] Club-specific feed filter

**Acceptance Criteria**:
- Users can create clubs with name/description/tags
- Join/leave updates membership count
- Club feed shows only posts from that club
- Slug generation enforced (unique)

---

### CLUB-2: Club UI
**Story Points**: 5  
**Priority**: High  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] Clubs discovery page
- [ ] ClubCard component
- [ ] Club detail page
- [ ] Join/leave button
- [ ] Club member list

**Acceptance Criteria**:
- Clubs displayed in grid layout
- Search/filter by tags
- Join button updates member count
- Club page shows club-specific feed

---

### CHAT-1: Basic Group Chat
**Story Points**: 8  
**Priority**: Medium  
**Assignee**: Full Stack

**Tasks**:
- [ ] Setup WebSocket server (Socket.io)
- [ ] Messages table + backend endpoints
- [ ] WebSocket room per club
- [ ] Frontend: Chat component
- [ ] Real-time message display
- [ ] Message persistence

**Acceptance Criteria**:
- Club members can send messages
- Messages appear in real-time for all online members
- Message history loaded on join
- Works with 50+ concurrent users

---

## Sprint 4: Gamification & Leaderboard (7 days)

### GAME-1: Points Engine
**Story Points**: 5  
**Priority**: High  
**Assignee**: Backend Dev

**Tasks**:
- [ ] Points calculation service
- [ ] Award points on actions (post, like, challenge win)
- [ ] Deduct points on violations
- [ ] Transaction log for auditability
- [ ] Prevent double-awarding

**Acceptance Criteria**:
- Points awarded correctly per action
- User points balance always accurate
- Transactions logged in separate table
- Edge cases handled (concurrent requests)

---

### GAME-2: Badges System
**Story Points**: 5  
**Priority**: Medium  
**Assignee**: Backend Dev

**Tasks**:
- [ ] Badges table + seed data (3-5 badges)
- [ ] Badge awarding engine (rule-based)
- [ ] GET /users/:id/badges endpoint
- [ ] Award early-adopter badge automatically
- [ ] Notification on badge unlock

**Acceptance Criteria**:
- 3 badges defined (early-adopter, challenge-master, social-butterfly)
- Badges auto-awarded when criteria met
- User profile shows badges
- Badge unlock triggers notification

---

### LEADER-1: Leaderboard Backend
**Story Points**: 5  
**Priority**: High  
**Assignee**: Backend Dev

**Tasks**:
- [ ] GET /leaderboard endpoint
- [ ] Filters: period (daily/weekly/monthly), cityZone
- [ ] Redis cache for leaderboard
- [ ] Scheduled job to recalculate (daily)
- [ ] Optimize query performance

**Acceptance Criteria**:
- Leaderboard returns top 50 users
- Filtered by time period
- Response time <100ms (cached)
- Updates daily via cron job

---

### LEADER-2: Leaderboard UI
**Story Points**: 3  
**Priority**: High  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] Leaderboard page component
- [ ] User rank cards with medals
- [ ] Period selector (daily/weekly/monthly)
- [ ] Current user highlight
- [ ] Animations for top 3

**Acceptance Criteria**:
- Top 3 users have special styling (gold/silver/bronze)
- Current user highlighted
- Period filter works
- Smooth scrolling for long lists

---

## Sprint 5: PWA & Offline (7 days)

### PWA-1: Service Worker
**Story Points**: 5  
**Priority**: High  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] Register service worker
- [ ] Cache static assets
- [ ] Cache API responses (feed)
- [ ] Offline fallback page
- [ ] Network-first strategy for dynamic content

**Acceptance Criteria**:
- App loads instantly on repeat visit
- Feed readable offline
- Offline indicator shown
- Install prompt appears on mobile

---

### PWA-2: Offline Sync Queue
**Story Points**: 5  
**Priority**: Medium  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] IndexedDB for local storage
- [ ] Queue writes when offline
- [ ] Sync queue when back online
- [ ] Show sync status in UI
- [ ] Handle conflicts

**Acceptance Criteria**:
- User can create post offline
- Post syncs when connection restored
- Queue shows pending items
- No data loss

---

### POLISH-1: UX Refinement
**Story Points**: 3  
**Priority**: Medium  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] Loading skeletons for all pages
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Smooth transitions
- [ ] Accessibility audit (WCAG 2.1)

**Acceptance Criteria**:
- No blank screens during load
- Errors caught gracefully
- Keyboard navigation works
- Screen reader compatible

---

### POLISH-2: RTL & i18n
**Story Points**: 3  
**Priority**: Medium  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] Audit all components for RTL issues
- [ ] Fix flipped icons/layouts
- [ ] Add Arabic strings file
- [ ] Bilingual UI labels
- [ ] Date/time formatting for Arabic locale

**Acceptance Criteria**:
- All UI elements render correctly RTL
- Icons/arrows mirror appropriately
- Dates format as Arabic locale

---

## Beta Week (7 days)

### BETA-1: Deployment & Monitoring
**Story Points**: 5  
**Priority**: Critical  
**Assignee**: DevOps/Tech Lead

**Tasks**:
- [ ] Deploy to staging environment
- [ ] Setup Sentry for error tracking
- [ ] Configure analytics (Vercel Analytics or Mixpanel)
- [ ] Load testing (simulate 100 concurrent users)
- [ ] Performance audit (Lighthouse)

**Acceptance Criteria**:
- App deployed and accessible publicly
- Errors logged to Sentry
- Analytics tracking events
- Load test passes without crashes
- Lighthouse score >85

---

### BETA-2: User Onboarding
**Story Points**: 3  
**Priority**: High  
**Assignee**: Frontend Dev

**Tasks**:
- [ ] Recruit 20 beta testers
- [ ] Create onboarding slides/tutorial
- [ ] Prepare feedback form
- [ ] Monitor user behavior
- [ ] Quick-fix critical bugs

**Acceptance Criteria**:
- 20+ users signed up
- Onboarding flow completion >80%
- Feedback collected from ≥15 users
- Critical bugs fixed within 24h

---

## Definition of Done (All Stories)

- [ ] Code reviewed and approved
- [ ] Unit tests written (backend >80% coverage)
- [ ] Integration tests pass
- [ ] Deployed to staging
- [ ] QA tested on mobile + desktop
- [ ] Documentation updated
- [ ] No critical bugs

---

## Resource Allocation

**Team Composition**:
- 1 Tech Lead (20% sprint time)
- 1 Full-stack Developer (100%)
- 1 Frontend Developer (100%)
- 1 Backend Developer (100%)
- 1 Designer (25% sprint time)

**Total Capacity**: ~40 story points per 2-week sprint

**Velocity Target**: Complete MVP in 5 sprints (10 weeks)
