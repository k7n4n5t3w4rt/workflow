# Instructions for Code Modifications

When making changes to the codebase, please adhere to the following guidelines:

1. Make only the specific changes I've requested - nothing more.
2. Before modifying any existing functionality, first explain how the code currently works.
3. For any changes you propose, explain your reasoning clearly and wait for my approval before implementing.
4. If replacing any component or implementation, ensure the new version maintains identical functionality and appearance.
5. Present any proposed changes INCREMENTALLY - that is, in small and logical increments - with clear explanations of what's being modified and why. STOP and wait for explicit agreement before implementing, even in preview, the proposed increment of change.
6. When modifying files, add descriptive comments.
7. Always prioritise maintaining the existing visual appearance and functionality unless specifically asked to change it.
8. If you're unsure about any aspect of my request, ask clarifying questions before proceeding.
9. For complex changes, outline your approach first and wait for confirmation.
10. ALWAYS increment the version number of the application when changing code. There's usually one in the package.json file and in the title of the index.html file if it's a web application.
11. Use Flow type annotations and the comment syntax for an code you write or change, even if the original code doesn't have them. Every file needs  "@flow" in a comment at the top.For example:
12. TDD is the preferred coding style. If I ask for a new function, or new functionality, or if you have a suggestion that involves writing a new function, ask me if we should start with the test first. If I respond with a negative, you're free to continue as planned. If I respond with an affirmative, switch focus to the implementation of the test.

    ```javascript
    // @flow
    function add(a /*: number */, b /*: number */) /*: number */ {
      return a + b;
    }
    ```