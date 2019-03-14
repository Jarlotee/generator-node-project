## Node Project Generator
[![Build Status](https://travis-ci.org/Jarlotee/generator-node-project.svg?branch=master)](https://travis-ci.org/Jarlotee/generator-node-project)
![Dependency Status](https://david-dm.org/Jarlotee/generator-node-project.svg)

Helps you bootstrap your respository for a next.js projects.

### Getting Started

* Install `npm install -g @jarlotee/generator-node-project`
* Run `yo node-project`

### Options
```bash
Node... so many options, frameworks, always changing, lets tame the beast...
 What is the name of your project? next-project
 What kind of project would you like to create? next.js
 You definitely want unit tests, right? Yes
 How about an .editorconfig? Yes
 Would you like to supress package-lock generation? Yes
```

### What you get

```bash
├── .editorconfig
├── .gitignore
├── .npmrc
├── .prettierrc
├── package.json
├── readme.md
├── src
│   ├── next.config.js
│   ├── pages
│   │   ├── _app.tsx
│   │   └── index.tsx
│   ├── server.js
│   └── tsconfig.json
└── tslint.json
```

## Opinions

Options may be added later, but here is they are:

* Typescript w/ tslint
* Prettier
* Populate the `BuildNumber` environment variable to create a consistent hash for load balancing

## License
MIT
