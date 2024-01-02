export const KeyFeaturesSection = () => {
  return (
    <div className="key-features">
      <div className="key-features__item">
        <h4>Authorization and Authentication:</h4>
        <ul>
          <li>
            Implements user authentication using Firebase, ensuring secure
            access to the application.
          </li>
          <li>
            Private routes and redirects to the main page upon successful login.
          </li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>Dynamic GraphQL Interaction:</h4>
        <ul>
          <li>Provides a Query editor with prettifying functionality.</li>
          <li>
            Supports Variables and Headers sections, allowing users to customize
            requests.
          </li>
          <li>
            Displays a Documentation Explorer for schema navigation
            (lazy-loaded).
          </li>
          <li>Response section with a JSON viewer for result visualization.</li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>Flexible API Endpoint Selection:</h4>
        <ul>
          <li>
            Allows users to switch between different user-specified GraphQL
            endpoints.
          </li>
          <li>Supports any open GraphQL API with CORS compatibility.</li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>User-Friendly Interface:</h4>
        <ul>
          <li>
            Sticky header with language toggle, sign-out option, and animated
            styling.
          </li>
          <li>
            Welcome page with Sign In/Sign Up buttons, dynamically updating
            based on user authentication status.
          </li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>Localization and Error Handling:</h4>
        <ul>
          <li>
            Implements localization with a language toggler in the header.
          </li>
          <li>Displays API-side errors in a user-friendly format.</li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>Testing and Quality Assurance:</h4>
        <ul>
          <li>
            Ensures a minimum of 80% test coverage with reporting in the
            package.json file.
          </li>
          <li>Utilizes ESLint, Prettier, and Husky hooks for code quality.</li>
          <li>
            Adheres to semantic layout principles and responsive design for
            adaptability.
          </li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>Additional Design Considerations:</h4>
        <ul>
          <li>
            Attention to typography, with a maximum of three fonts per page and
            a font size of at least 14px.
          </li>
          <li>Adaptive layout supporting a minimum page width of 320px.</li>
          <li>
            Consistent styling and unity of elements across all pages for a
            cohesive user experience.
          </li>
        </ul>
      </div>
    </div>
  );
};
