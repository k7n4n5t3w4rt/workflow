# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Flow Attractor" - a 3D workflow visualization application built with Preact and Three.js. The application visualizes work items flowing through process steps using 3D animations and interactive controls.

## Architecture

### Core Technologies
- **Frontend**: Preact (React-like) with HTM for JSX-like syntax without transpilation
- **3D Graphics**: Three.js for 3D visualization and animations
- **State Management**: Global Redux-like store using `useReducer` and React Context
- **Routing**: Preact Router for client-side routing
- **Build**: No webpack - uses ES modules directly with `esinstall` for dependency management
- **Server**: Custom Node.js server with server-side rendering capability

### Key Architecture Patterns
- **No Build Step During Development**: Uses native ES modules and HTM for JSX-like syntax
- **Global State**: Centralized state management through `gSttngs` (settings) and `gState` (application state)
- **Server-Side Rendering**: Custom SSR implementation for static site generation
- **3D Flow Visualization**: Work items are represented as 3D objects that move through workflow steps

### Directory Structure
- `js/` - Main application code
  - `flwAttrctr/` - Core flow attractor application
    - `actions/` - Business logic and state management
    - `Settings/` - Configuration components and logic
    - `Metrics/` - Metrics display and calculation
    - `calculations/` - Mathematical computations
- `server/` - Node.js server and SSR logic
- `web_modules/` - ESInstall-generated ES modules from npm packages
- `css/` - Styling
- `cypress/` - E2E tests
- `testies/` - Custom test files using the "Testy" test runner

## Development Commands

### Primary Development
```bash
npm start                 # Start development server on localhost:4000
npm run esinstall        # Update ES modules in web_modules/ directory
```

### Testing
```bash
npm test                 # Run all tests (testy + cypress)
npm run testy           # Run custom Testy unit tests
npm run cypress:open    # Open Cypress interactive test runner
npm run cypress:run     # Run Cypress tests headlessly
```

### Code Quality
```bash
npm run flow            # Run Flow type checking
npm run lint            # Check code formatting with Prettier
npm run format          # Format code with Prettier
npm run fixpack         # Fix package.json formatting
```

### Deployment
```bash
npm run start:wait-on   # Start server and wait for it to be ready
npm run browsersync     # Local static file server on port 3000
```

## State Management

The application uses a sophisticated global state system:

### Global Settings (`gSttngs`)
- Persistent configuration stored in `EasyStorage` (backend keystore)
- Settings can be shared between users in real-time
- Updated every second when `easyStorage` is enabled

### Global State (`gState`) 
- Runtime application state
- Includes flow metrics, work item positions, and UI state
- Managed through `globalReducer` with Redux-like patterns

### Context Integration
- `AppContext` bridges global state with React Context
- Updates component state every 300ms from global state
- Prevents updates during configuration changes (`isUpdtngCnfg`)

## Flow Visualization System

### Core Concepts
- **Flow Items**: Work items that move through the system
- **Steps**: Workflow stages with configurable limits and metrics
- **Expedited Items**: Priority items that can bypass normal flow rules
- **Metrics**: Real-time calculation of throughput, cycle time, and bottlenecks

### Key Files for Flow Logic
- `js/flwAttrctr/actions/click.js` - Main animation loop and flow processing
- `js/flwAttrctr/actions/pullFlwItems.js` - Work item movement logic
- `js/flwAttrctr/actions/calculateDevPower.js` - Resource capacity calculations
- `js/flwAttrctr/Settings/Steps.js` - Step configuration management

## Testing Strategy

### Testy Test Runner
- Custom lightweight test runner in `testies/` directory
- Files follow pattern `*.testy.js`
- Uses `should` assertion library
- Run with `npm run testy`

### Cypress E2E Tests
- Integration tests in `cypress/integration/`
- Covers full user workflows and caching behavior
- Run with `npm run cypress:open` or `npm run cypress:run`

## Type System

- Uses Flow for static type checking
- Type annotations with `// @flow` headers
- Flow configuration includes Three.js and other library definitions
- Run type checking with `npm run flow`

## Special Considerations

### ESInstall Dependency Management
- Dependencies are pre-bundled into `web_modules/` using `esinstall`
- Run `npm run esinstall` after adding new dependencies
- Allows for no-build development with native ES modules

### Server-Side Rendering
- Custom SSR implementation in `server/index.js`
- Supports static site generation with `?generate=true` query parameter
- Environment variables injected during rendering

### TDD Approach
- Follows Kent Beck style TDD as noted in `copilot.md`
- Emphasizes minimal failing tests and refactoring cycles
- Work in Mob Programming context with Absolute Priority Premise

# Instructions for Code Modifications

When making changes to the codebase, please adhere to the following guidelines:

- Make only the specific changes I've requested - nothing more.
- Before modifying any existing functionality, first explain how the code currently works.
- For any changes you propose, explain your reasoning clearly and wait for my approval before implementing.
- If replacing any component or implementation, ensure the new version maintains identical functionality and appearance.
- Present your changes incrementally with clear explanations of what's being modified and why.
- When modifying files, add descriptive comments.
- Always prioritize maintaining the existing visual appearance and functionality unless specifically asked to change it.
- If you're unsure about any aspect of my request, ask clarifying questions before proceeding.
- For complex changes, outline your approach first and wait for confirmation.
- ALWAYS increment the version number of the application when changing code. There's usually one in the package.json file and in the title of the index.html file if it's a web application.
- Use Flow type annotations and the comment syntax for an code you write or change, even if the original code doesn't have them. Every file needs  "@flow" in a comment at the top.For example:

    ```javascript
    // @flow
    function add(a /*: number */, b /*: number */) /*: number */ {
      return a + b;
    }
    ```
- When I say "tag and push", I mean please tag with the latest version number in the format "v" + the version, e.g. "v0.28.4.0", then "git push".
- After any step where one or more files have been changed, if you think the task is complete, run `npm run test` to verify the change.

## Gemini CLI Settings

The Gemini CLI tool has a configuration file located at `~/.gemini/settings.json`. This file contains settings that control the behavior of the CLI.

To require confirmation before making any changes, set the `autoAccept` property to `false`:

```json
{
  "autoAccept": false
}
```

After changing this setting, you will need to restart the CLI for it to take effect.