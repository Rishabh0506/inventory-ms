# Feature Plan 1: Base Project Initialization

## 1. Goal
Initialize the core foundation repositories for both the backend and frontend so development can begin. This is pre-requisite scaffolding before any specific modules (like Products or Orders) are built.

## 2. Requirements & Constraints
- **Backend**: Node.js + TypeScript setup in the `backend/` folder.
- **Frontend**: React + Vite + Electron setup in the `frontend/` folder.
- Both environments must successfully run clean boilerplates.

## 3. Step-by-Step Execution Plan

### Step 1: Backend Initialization
1. Navigate to the `backend` directory.
2. Initialize a Node.js project: `npm init -y`.
3. Install required packages: `npm install express typescript @types/express @types/node ts-node --save`.
4. Run TypeScript initialization: `npx tsc --init`.
5. Create `src/server.ts` with a basic Express app setup listening on port 3000.
6. Add dev scripts to `package.json` (e.g., `"dev": "ts-node src/server.ts"`).

### Step 2: Frontend Initialization
1. Initialize a new Vite app inside the `frontend` directory using the `react-ts` template.
2. Enter the generated folder, install dependencies (`npm install`), and install Electron tools (`npm install electron vite-plugin-electron electron-builder --save-dev`).
3. Modify `vite.config.ts` to include the Electron plugin.
4. Create the Electron main entry script `electron/main.ts` (which spawns a BrowserWindow pointing to Vite's dev server).
5. Add run scripts to `package.json` for launching the web dev server and the Electron shell.

## 4. Verification Check
- Start the backend via `npm run dev` and ensure it responds to `localhost:3000`.
- Start the frontend web script and ensure React loads in the browser.
- Start the frontend Electron script and verify a Desktop window opens and renders the React app.

---
*Once this plan is executed, it will be marked complete in `task_done.md`.*
