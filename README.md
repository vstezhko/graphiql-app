# GraphiQL Explorer 👩‍💻

The GraphiQL Explorer is a robust React-based web application that simplifies the creation and execution of GraphQL queries. Built using React, Redux Toolkit, and Vite, this project offers a user-friendly interface for seamless GraphQL interaction.

## Features 🚀

### Authorization and Authentication 🔒

- Implements user authentication using Firebase for secure access.
- Private routes and redirects ensure a streamlined user experience.

### Dynamic GraphQL Interaction 💡

- Query editor with prettifying functionality for enhanced readability.
- Customizable requests via Variables and Headers sections.
- Documentation Explorer for schema navigation (lazy-loaded).
- Response section with a JSON viewer for clear result visualization.

### Flexible API Endpoint Selection 🌐

- Seamless switching between user-specified GraphQL endpoints.
- Compatibility with any open GraphQL API with CORS support.

### User-Friendly Interface 🌈

- Sticky header with language toggle, sign-out option, and animated styling for enhanced usability.
- Welcome page dynamically updates based on user authentication status.

### Localization and Error Handling 🌍

- Localization through a language toggler in the header for enhanced accessibility.
- User-friendly display of API-side errors (toast, pop-up) for smooth error handling.

### Testing and Quality Assurance ✔️

- Ensured minimum 80% test coverage with reporting in package.json.
- Utilization of ESLint, Prettier, and Husky hooks for robust code quality.
- Adherence to semantic layout principles and responsive design for adaptability.

### Collaborative Development 👥

- Private GitHub repository established for collaborative workflow.
- Pull requests initiated from the develop branch to the main branch for version control.

### Additional Design Considerations 🎨

- Attention to typography, limiting to a maximum of three fonts per page and ensuring a font size of at least 14px.
- Adaptive layout supporting a minimum page width of 320px.
- Consistent styling and unity of elements across all pages for a cohesive user experience.

## Technologies

This project is built using the following technologies:

| Technology                                       | Description                                                                                                                                                                                                                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Vite][Vite]][Vite-url]                        | A local development server supporting TypeScript and JSX.                                                                                                                                                                       |
| [![Redux Toolkit Badge][redux-badge]][redux-url] | The official, opinionated, batteries-included toolset for efficient Redux development. It includes utilities to simplify common use cases like store setup, creating reducers and actions, and managing immutable updates.      |
| [![SASS][sass-badge]][sass-url]                  | SASS is a powerful CSS preprocessor that allows for more efficient and maintainable stylesheets. It enhances CSS with features like variables, nesting, and mixins, making it an excellent choice for styling web applications. |
| [![Material-UI Badge][mui-badge]][mui-url]       | A popular React UI framework that implements Google's Material Design guidelines. It provides a set of reusable components and customization options to help developers build beautiful and responsive user interfaces.         |
| [![TypeScript][ts-badge]][ts-url]                | TypeScript is a strict syntactical superset of JavaScript that adds optional type annotations to the language and improves the readability and maintainability of their code.                                                   |
| [![Vitest][vitest-badge]][vitest-url]            | A next-generation testing framework powered by Vite.                                                                                                                                                                            |

## Setup

Before running this project, make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system. This project is powered by Node.js version 18.17 and npm version 9.8.1.

You can check if you have them installed by running the following commands in your terminal:

```bash
node -v
npm -v
```

If not, follow the instructions on the Node.js and npm websites to install them.

Once you have Node.js and npm installed, clone this repository to your local machine and navigate to the project’s root directory:

```bash
git clone <URL>
cd <GraphQL-editor>
```

Then, install the project’s dependencies by running:

```bash
npm install
```

As an alternative to npm, you could use yarn or pnpm package managers. To install them, follow the instructions on the official [Yarn](https://yarnpkg.com/getting-started/install) or [pnpm](https://pnpm.io/installation) websites respectively.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Scripts

This project uses the following npm scripts:

- `npm run dev` - starts the development server using Vite.
- `npm run build` - compiles TypeScript files using `tsc` and then builds the application using Vite.
- `npm run lint` - runs ESLint with specific file extensions and configurations to enforce code quality standards, reporting unused directives, with a maximum of 0 warnings.
- `npm run format:fix` - uses Prettier to automatically fix formatting issues in the project files.
- `npm run prepare` - installs Husky hooks as part of the preparation process.
- `npm run preview` - starts the Vite preview server.
- `npm run test` - runs tests using Vitest.
- `npm run coverage` - runs tests with coverage analysis using Vitest.

You can run these scripts from the command line while in the project's root directory.

This project also uses [Husky](https://typicode.github.io/husky) to run scripts as git hooks. The following hooks are configured:

- `pre-commit` - runs the `npx lint-staged` script before each commit. If the code doesn't follow the linting rules, the commit will be aborted.

You can modify the behavior of these hooks by editing the corresponding files in the `.husky` directory.

## Contributing

Contributions are welcome! If you have an idea for a new feature or improvement, feel free to open an issue or submit a pull request.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Vite]: https://img.shields.io/badge/Vite-%23000000.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[redux-badge]: https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux-toolkit.js.org/
[mui-badge]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[mui-url]: https://mui.com/
[ts-badge]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[ts-url]: https://www.typescriptlang.org/
[sass-badge]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[sass-url]: https://sass-lang.com/
[vitest-badge]: https://img.shields.io/badge/Vitest-%23000000.svg?style=for-the-badge&logo=vitest&logoColor=white
[vitest-url]: https://vitest.dev/
