# messaging-app-frontend

Following The Odin Project - Messaging App Project (React + Vite + Vitest).

README written with AI but project completed without.

Connects to `messaging-app-backend` and covers the core user flows:

- [ ] 1. Authentication & session handling
- [ ] 2. Sending, viewing, and browsing messages & conversations
- [ ] 3. Searching users & managing friend requests / friends
- [ ] 4. Customising a user profile

## Plan

- Keep the frontend straightforward, modular, and focused on core flows without over-engineering
- Use Vite for fast bundling/dev server and Vitest + React Testing Library for behavior-focused TDD
- Isolate API/HTTP requests from UI components so components and flows are easy to test with mocked responses
- Support user profile customisation fields from the backend (`avatar`, `theme`, `statusMessage`)

## Views & Flows

- [ ] Signup view — register a new user, handle validation/conflict errors, and store JWT
- [ ] Login view — authenticate user, handle invalid credentials (401), and store JWT
- [ ] Authenticated guard / route protection — redirect or prompt login when unauthenticated or JWT is invalid/expired (401)
- [ ] Messages inbox (`GET /my-messages`) — show people messaged with latest message preview, ordered by most recent
- [ ] Conversation view (`GET /convo/:userId` & `POST /message`) — display recent messages ordered by timestamp and send new messages
- [ ] User search (`GET /user-search`) — search users by first/last name or username, handle empty/no-match states, and send friend requests
- [ ] Friend requests & friends (`POST /friend-request/new/:userId`, `GET /friend-request/received`, `GET /friend-request/sent`, `PATCH /friend-request/:requestId`, `GET /friends`) — send, view pending received/sent requests, accept/reject requests, and view friends list
- [ ] Profile customisation (`PATCH /users/profile`) — update `avatar`, `theme`, and `statusMessage` with validation/error feedback

## Testing (TDD with Vitest & React Testing Library)

Written test-first around user interactions, rendered UI states, and API integration (mocking `fetch`/API modules in tests):

### Authentication

- Signup:
  - [ ] Submits valid details, stores JWT, and navigates into the app
  - [ ] Shows validation/error message on missing fields
  - [ ] Shows clear error when email or username already exists
- Login:
  - [ ] Logs in with valid credentials and stores JWT
  - [ ] Attaches JWT to authenticated API requests
  - [ ] Displays error message on wrong password or unknown email (401)

### Session & Authorisation

- [ ] Redirects or blocks protected views when unauthenticated
- [ ] Clears session and prompts re-login if API responds with 401 (expired/invalid JWT)

### Messages

- Sending messages (`POST /message`):
  - [ ] Sends message with recipient ID and content, then updates/displays the sent message
  - [ ] Prevents or shows error on empty/whitespace-only message or invalid recipient
  - [ ] Handles unauthenticated (401) or missing user (404) errors cleanly
- Inbox (`GET /my-messages`):
  - [ ] Renders list of conversations with latest message preview in order
  - [ ] Renders empty state when user has no messages yet
  - [ ] Handles error states gracefully
- Conversation thread (`GET /convo/:userId`):
  - [ ] Renders messages between current user and selected user in chronological order
  - [ ] Handles invalid/non-existent user (404)

### Friends & Search

- User search (`GET /user-search`):
  - [ ] Displays matching users (excluding current user) for name/username queries
  - [ ] Handles empty query / 400 and shows no-results state for empty match array
- Friend requests (`POST /friend-request/new/:userId`, `GET /friend-request/received`, `GET /friend-request/sent`, `PATCH /friend-request/:requestId`):
  - [ ] Sends friend request and updates button/status state
  - [ ] Handles duplicate/existing request or invalid target errors
  - [ ] Lists pending received and sent requests with user details and timestamps
  - [ ] Accepts a received request and adds the user to the friends list
  - [ ] Rejects a received request and removes it from pending requests
- Friends list (`GET /friends`):
  - [ ] Renders accepted friends and handles empty friends list state

### User Customisation

- Profile settings (`PATCH /users/profile`):
  - [ ] Loads current profile details and updates `avatar`, `theme`, and `statusMessage`
  - [ ] Displays validation error on invalid input (400) and success confirmation on save
