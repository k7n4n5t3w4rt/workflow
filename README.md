# FlowAttractor

Visualising the flow of work.

This project is a web application built with Preact and HTM, designed to run directly in the browser without a build step. It's hosted on GitHub Pages, serving files directly from the `main` branch.

## Key Technologies

*   **Frontend:** [Preact](https://preactjs.com/)
*   **Templating:** [HTM](https://github.com/developit/htm) (JSX-like syntax in plain JavaScript)
*   **State Management:** Preact's `useReducer` and `Context` API for a global state store.
*   **ES Modules:** Dependencies are managed as ES modules in the `/web_modules` directory.
*   **Testing:**
    *   **Component/Unit:** A custom runner named "Testy" (see `testies/` directory).
    *   **End-to-End:** [Cypress](https://www.cypress.io/) (see `cypress/` directory).
*   **Type Checking:** [Flow](https://flow.org/)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:k7n4n5t3w4rt/workflow.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Update ES Modules:**
    This step uses `esinstall` to populate the `/web_modules` directory based on `package.json` dependencies.
    ```bash
    npm run esinstall
    ```

4.  **Start the development server:**
    This will serve the application locally at `http://localhost:5174`.
    ```bash
    npm run browsersync
    ```

## Testing

To run the tests, first ensure the development server is running (`npm start`).

*   **Run all tests (Testy & Cypress):**
    ```bash
    npm run test
    ```

*   **Run only Testy tests:**
    ```bash
    npm run testy
    ```

*   **Run Cypress tests interactively:**
    ```bash
    npm run cypress:open
    ```

## Deployment

This project is deployed on GitHub Pages and configured to serve files directly from the root of the `main` branch. Any changes pushed to `main` will be live.