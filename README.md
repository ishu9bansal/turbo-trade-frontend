# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Arch Design
```mermaid
graph TD
  subgraph Frontend
    A[React Web App]
  end

  subgraph ConfigBackend[Configuration Backend - Node.js]
    B1[Strategy Management API]
    B2[User Authentication & Profile]
    B3[Backtesting API]
  end

  subgraph EngineBackend[Trading Engine - Python]
    C1[Backtest Runner]
  end

  subgraph Database
    D1[(User Data)]
    D2[(Strategy Configurations)]
    D3[(Backtest History)]
  end

  subgraph DataLayer[Market Data]
    E1[Options Minute Data]
  end

  A -->|REST| B1
  A -->|REST| B2
  A -->|REST| B3
  B3 -->|Call API| C1
  C1 -->|Fetch| E1
  C1 -->|Return results| B3
  B3 -->|Store Results| D3
  B1 -->|Store/Retrieve| D2
  B2 -->|Store/Retrieve| D1
```
