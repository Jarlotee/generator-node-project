const url = require('url');
const chalk = require('chalk');
const Generator = require('yeoman-generator');

const normalizeAppName = (name) =>
  name.toLocaleLowerCase().replace(/ /g, '-');

module.exports = class extends Generator {

  initializing() {
    this.log(chalk.bold.blue("Node... so many options, frameworks, always changing, let's tame the beast..."));
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        default: normalizeAppName(this.appname),
        prefix: ''
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'What kind of project would you like to create?',
        choices: [
          'next.js',
        ],
        prefix: ''
      },
      {
        type: 'confirm',
        name: 'createUnitTests',
        message: 'You definitly want unit tests, right?',
        default: true,
        when: (answers) => !!answers.projectType,
        prefix: ''
      },
      {
        type: 'confirm',
        name: 'createEditorConfig',
        message: 'How about an .editorconfig?',
        default: true,
        prefix: ''
      },
      {
        type: 'confirm',
        name: 'supressPackageLock',
        message: 'Would you like to supress package-lock generation?',
        default: true,
        prefix: ''
      }
    ]);
  }

  configuring() {
    if (this.answers.createEditorConfig) {
      this.fs.copy(
        this.templatePath('editorconfig.template'),
        this.destinationPath('.editorconfig')
      );
    }

    this.fs.copy(
      this.templatePath('gitignore.template'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('readme.template'),
      this.destinationPath('readme.md'),
      {
        title: this.answers.projectName
      }
    );

    if (this.answers.supressPackageLock) {
      this.fs.copyTpl(
        this.templatePath('npmrc.template'),
        this.destinationPath('.npmrc')
      );
    }

    this.spawnCommandSync('npm', [
      'init',
      '--yes'
    ]);

    this.fs.extendJSON('package.json', {
      main: undefined,
      version: '0.1.0',
      name: this.answers.projectName,
      author: this.user.name
    });
  }

  writing() {

    if (this.answers.projectType === 'next.js') {
      this.fs.extendJSON('package.json', {
        scripts: {
          dev: "node src/server.js",
          build: "next build src",
          start: "cross-env NODE_ENV=production node src/server.js"
        },
        babel: {
          presets: [
            "next/babel",
            "@zeit/next-typescript/babel"
          ]
        },
        bundledDependencies: [
          "@zeit/next-sass",
          "@zeit/next-typescript",
          "express",
          "fork-ts-checker-webpack-plugin",
          "next",
          "react",
          "react-dom"
        ]
      });

      this.fs.copyTpl(
        this.templatePath('nextjs/config.template'),
        this.destinationPath('src/next.config.js')
      );

      this.fs.copyTpl(
        this.templatePath('tsconfig.template'),
        this.destinationPath('src/tsconfig.json')
      );

      this.fs.copyTpl(
        this.templatePath('tslint.template'),
        this.destinationPath('tslint.json')
      );

      this.fs.copyTpl(
        this.templatePath('prettierrc.template'),
        this.destinationPath('.prettierrc')
      );

      this.fs.copyTpl(
        this.templatePath('npmignore.template'),
        this.destinationPath('.npmignore')
      );

      this.fs.copyTpl(
        this.templatePath('nextjs/server.template'),
        this.destinationPath('server.js')
      );

      this.fs.copyTpl(
        this.templatePath('nextjs/pages/app.template'),
        this.destinationPath('src/pages/_app.tsx')
      );

      this.fs.copyTpl(
        this.templatePath('nextjs/pages/index.template'),
        this.destinationPath('src/pages/index.tsx')
      );
    }
  }

  install() {
    if (this.answers.projectType === 'next.js') {
      this.npmInstall([
        'express',
        'fork-ts-checker-webpack-plugin',
        'next',
        'react',
        'react-dom',
        '@zeit/next-sass',
        '@zeit/next-typescript'
      ]);

      this.npmInstall([
        '@types/react',
        '@types/next',
        'cross-env',
        'prettier',
        'tslint',
        'tslint-config-airbnb',
        'tslint-config-prettier',
        'tslint-loader',
        'tslint-react',
        'tslint-plugin-prettier',
        'typescript'
      ], { 'save-dev': true });
    }
  }
};
