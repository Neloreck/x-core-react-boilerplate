# Dreamplate client application starter

### Install:

- `npm run setup` [project packages installation]

### NPM Scripts

- `npm run setup` [project packages sync, install all package.json sub-projects dependencies]

- `npm run clean` [purge project-built files, uninstall all sub-projects dependencies]

- `npm run build` [build project in production mode]

- `npm run build:dev` [build project in development mode]

- `npm run start` [start project in production mode]

- `npm run start:dev` [build project in production mode]

- `npm run test` [run unit tests, linter and type checker]

- `npm run cli COMMAND_NAME` [run specific cli script]

- `npm run cli COMMAND_NAME` [print cli commands list]

### What is used:
    
- Custom CLI
- Webpack, lazy loading, tree shaking, chunks + modular architecture, aliases
- Web components (lit-element, lit-html)
- React, dreamstate as contextStore
- JSS, theming with own context management
- Typescript (proposal decorators, OOP style, newest features, babel loader)
- Jest for unit testing (enzyme-react, web-components tests)
- HMR with live editing
- HBS (template, global styles)

### Architecture and general approach:

Current architecture is intended to separate logical modules/scopes with reducing of memory/cpu/network usage.

File 'src/application/modules/modules.json' is used for separating modules and declaration of application routes.

Such approach allows to:

  - Reduce initial load without importing lazy components right after first JS evaluation
  - Reduce bundle size with improved npm modules caching related to specific routes
  - Reduce general codebase complexity with better modular system
  - Clean up used memory amount since every module will trigger soft page reload

* Shared reusable logic takes place: src/lib 
* Shared reusable api logic: src/api 
* Shared application level code: src/application/main
* Specific module code: src/application/modules/{MODULE_NAME}

### General project structure tree

- **cli** [project commands and everything runnable]

- __cli_ [internal implementation]

- _build_ [webpack build configuration and scripts]
   - config [configuration]
   - loaders [webpack loaders for files processing]
   - public [public files that will be copied to target dist]
   - template [project template specific scripts and configs]

- _test_ [jest testing configuration and runner]
   - config [configuration]

- **src** [project source code]

- _api_ [project client api mule, everything related to data exchange]
  - GENERIC_DESTINATION (*)

- _application_[application specific code]
  - initialization [inline pre-executed code with first priority]
  - main [application specific code shared between all modules]
  - modules [folder with application modules]
    - GENERIC MODULE (*)

- _lib_ - [shared utils and code samples that can be reused later]
  - GENERIC_LIB (*)

---
    
+ **GENERIC_DESTINATION** [specific api destination or route that includes api exchange and models declaration]
+ **GENERIC_MODULE** [specific application module that implements application route -> feature]
+ **GENERIC_LIB** [specific library module that includes sharable code between applications]

--- 

Typically module is separated as VIEW and DATA sub-modules. Each one includes only view or data logic and tries to keep this pattern.

## Imports declaration priority in file head (code-style)

- node_modules
- @Lib
- @Api
- @Data
- @View
- 'styles'
- 'props/types'

## Futures

- Config type and production/dev as separated flags from env modes
- Benchmark for testing?
- Build something from wasm as experiment and use wasm-loader
- Workers investigation
- Translations experiments
- Better config for eslint

## Side packages (waiting for)

- Hooks implementation for react-router (less VDOM tree pollution)
