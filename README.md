# Secure Online Voting System

A premium, secure, and modern online voting system built using **React 19**, **Vite**, **Tailwind CSS v4**, and **Express.js (Node.js)**. 

To maximize code clarity, ease of maintenance, and minimize codebase size, the project has been consolidated into the absolute minimum number of folders and files. All server endpoints reside in `server.js` at the root, the database is stored in a single root-level `database.json` file, and all frontend components, context states, and routing view guards are consolidated into `src/App.jsx`.

The user interface, styles, variables, and flows are identical to the original JSP layout.

---

## Dashboard Preview

![Online Voting System Dashboard](voting_system_dashboard.png)

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, Tailwind CSS v4           |
| Build Tool | Vite 8                              |
| Backend    | Express.js (Node.js)                |
| Database   | JSON Database (`database.json`)     |
| Manager    | npm (Node Package Manager)          |

---

## Technical Architecture

### Consolidated File Layout
```
OnlineVotingSystem/
├── database.json              # Persistent JSON database (root level, auto-generated)
├── server.js                  # Backend Express API server (root level)
├── src/
│   ├── App.jsx                # Unified frontend: Context, views, and routing guards
│   ├── index.css              # Combined style sheet: Tailwind v4 + original styles
│   └── main.jsx               # React 19 entry point
├── eslint.config.js           # ESLint configuration
├── index.html                 # Root index file
├── package.json               # Dependencies, build tools, & concurrently execution scripts
└── vite.config.js             # Vite configuration with @tailwindcss/vite plugin
```

### Flow and Component Structure
1. **API Client**: Implements `fetchData` and `saveData` talking to `http://localhost:3001/data` with offline fallback to `localStorage`.
2. **Context Provider (`SpendingsProvider`)**:
   - Manages state lists: `candidates`, `voters`, `users`, `votes`.
   - Manages authentication sessions: `currentUser` (saved to local storage) and `pendingVoter`.
   - Syncs changes automatically to backend via debounced sync.
   - Runs a 10-second polling fetch loop to keep live results tallies up-to-date.
3. **Interactive Subcomponents**:
   - `Navbar`: Displays commission branding and conditional Logout actions.
   - `VerifyVoter`: Landing screen validating Voter registration EPIC IDs against database.
   - `VerifyOtp`: OTP passcode sender and dual 6-digit passcode inputs (advances focus and pastes data automatically).
   - `Vote`: Candidate selection list, radio check indicators, and review confirmation modal overlay.
   - `Confirmed`: Cast ticket receipt page displaying a randomized transaction receipt hash.
   - `Results`: Live tallies including turnout, total votes, projected leader name, and real-time candidate voter turnout progress bars.
4. **Router Component (`AppContent`)**: Intercepts hash changes and performs client-side session checks, protecting restricted voting/results pages from unauthenticated access.

---

## Express Server Endpoints

The root-level Express backend (`server.js`) operates on port **3001** and manages the following API endpoints:

- **`GET /data`** — Reads `database.json` and returns the complete database structure. If the file is missing, it creates and seeds it.
- **`POST /data`** — Overwrites `database.json` with the request body (representing the updated state of candidates, voters, users, and votes).

---

## Demo Credentials Card

Use the credentials below to walk through the voting process during a demo. Each Voter ID can only vote **once**.

| # | Voter ID       | Name          | Masked Phone   | Masked Email             | Phone OTP  | Email OTP  |
|---|----------------|---------------|----------------|--------------------------|------------|------------|
| 1 | **VUP47392**   | Aarav Sharma  | `987****10`    | `aa***@example.com`      | **482910** | **736251** |
| 2 | **VDL81620**   | Isha Patel    | `876****09`    | `is***@example.com`      | **193047** | **528374** |
| 3 | **VKA30517**   | Rohan Gupta   | `765****98`    | `ro***@example.com`      | **847362** | **019283** |
| 4 | **VTN92746**   | Meera Nair    | `901****78`    | `me***@example.com`      | **571038** | **294716** |
| 5 | **VRJ54803**   | Vikram Singh  | `890****67`    | `vi***@example.com`      | **638492** | **815037** |
| 6 | **VWB61938**   | Ananya Das    | `789****56`    | `an***@example.com`      | **420185** | **963574** |

---

## Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher

### 1. Installation
Install all project dependencies (React 19, Express, Vite, Tailwind CSS v4):
```bash
npm install
```

### 2. Start Servers Concurrently
Start the Express server on port 3001 and Vite frontend on port 5173 concurrently:
```bash
npm run dev
```

- **Voter Interface**: [http://localhost:5173/](http://localhost:5173/)
- **Backend API**: [http://localhost:3001/data](http://localhost:3001/data)

### 3. Reset Database State
To reset the database, clear votes, and restore voter statuses to unused:
1. Stop the running server.
2. Delete the root file `database.json`.
3. Restart the server (`npm run dev`), which will automatically seed a fresh `database.json` file.
