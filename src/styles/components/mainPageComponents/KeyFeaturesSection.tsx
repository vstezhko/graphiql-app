import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext.tsx';

export const KeyFeaturesSection = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="key-features">
      <div className="key-features__item">
        <h4>{dictionary.authAndAuth}</h4>
        <ul>
          <li>{dictionary.authAndAuthImplements}</li>
          <li>{dictionary.authAndAuthPrivateRoutes}</li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>{dictionary.dynamicGraphQL}</h4>
        <ul>
          <li>{dictionary.dynamicGraphQLQueryEditor}</li>
          <li>{dictionary.dynamicGraphQLVariablesHeaders}</li>
          <li>{dictionary.dynamicGraphQLDocumentation}</li>
          <li>{dictionary.dynamicGraphQLResponse}</li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>{dictionary.flexibleAPI}</h4>
        <ul>
          <li>{dictionary.flexibleAPIEndpointSwitching}</li>
          <li>{dictionary.flexibleAPICORS}</li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>{dictionary.userFriendly}</h4>
        <ul>
          <li>{dictionary.userFriendlyStickyHeader}</li>
          <li>{dictionary.userFriendlyWelcomePage}</li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>{dictionary.localizationAndError}</h4>
        <ul>
          <li>{dictionary.localization}</li>
          <li>{dictionary.apiErrors}</li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>{dictionary.testingAndQA}</h4>
        <ul>
          <li>{dictionary.testCoverage}</li>
          <li>{dictionary.eslintPrettierHusky}</li>
          <li>{dictionary.semanticLayout}</li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>{dictionary.collaborativeDevelopment}</h4>
        <ul>
          <li>{dictionary.createPrivateRepo}</li>
          <li>{dictionary.pullRequestInitiated}</li>
        </ul>
      </div>

      <div className="key-features__item">
        <h4>{dictionary.additionalDesign}</h4>
        <ul>
          <li>{dictionary.additionalDesignTypography}</li>
          <li>{dictionary.additionalDesignAdaptiveLayout}</li>
          <li>{dictionary.additionalDesignConsistentStyling}</li>
        </ul>
      </div>
    </div>
  );
};
