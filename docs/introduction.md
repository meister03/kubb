---
layout: doc

title: Introduction
outline: deep
---
<script setup>

import { version } from '../packages/core/package.json'

</script>

# Introduction
Hi 👋🏽 and welcome to Kubb<img width="30" style="display: inline-block;line-height: 30px;" src="/logo.png"/>!<br/>
My name is <a href="https://twitter.com/stijnvanhulle">Stijn Van Hulle</a>, the creator of Kubb and I'm super excited to have you here! Let me give you a quick introduction to Kubb and what it can do for you.

<b>Kubb</b> is a library and toolkit that converts your Swagger/OpenAPI specification to one of the generated client libraries(TypeScript, React-Query, Zod, Zodios, Faker.js and Axios). 
<hr/>

Imagine that your backend team is writing an API in Java/Kotlin, how do you connect your frontend to their system without the need of communicating on every API change. 
This is not a new problem and has already been resolved with the use of a Swagger/OpenAPI specification and a <a href="https://tools.openapis.org/categories/code-generators.html">code generator</a>. 

The problem is that most of them are good at one *thing*: generating TypeScript types or generating React-Query hooks. Kubb is trying to resolve that with a plugin system where we already provide you with some <a href="/plugins/introduction">generation plugins</a> but also giving you the possibilty to create your own generation plugin without the need of forking the full project.

## Motivation

Swagger/OpenAPI has been used a lot as a contract between frontend and backend teams, this was the same for the last couple of projects I did. Every project is different so it always came down in choosing one of the provided <a href="https://tools.openapis.org/categories/code-generators.html">code generators</a> or the default one of <a href="https://swagger.io/tools/swagger-codegen/">Swagger</a>. But that wasn't enough for my needs 🙁.

Main features ✨:
- Every generated client(React-Query, MSW, Zod, ...) is contained in it's own package.
- Clean code that follows the examples of the client(no extra un-needed boilerplate code).
- Out-of-box <a href="https://www.typescriptlang.org/">TypeScript</a> (with JSDoc) support.
- Open-source first.
- Plugins system based on Rollup, esbuild,
- CLI support.

## Installation

<Badge type="tip" :text="version" /> 
You can install Kubb via [NPM](https://www.npmjs.com/).

::: code-group

```shell [bun <img src="/feature/bun.svg"/>] 
bun add @kubb/cli @kubb/core
```

```shell [pnpm <img src="/feature/pnpm.svg"/>]
pnpm add @kubb/cli @kubb/core
```

```shell [npm <img src="/feature/npm.svg"/>]
npm install @kubb/cli @kubb/core
```

```shell [yarn <img src="/feature/yarn.svg"/>]
yarn add @kubb/cli @kubb/core
```

:::

<Badge type="warning" text="canary" /> 
Kubb also publishes a canary version on every commit to the main branch. <br/>
To install the canary version:

::: code-group

```shell [bun <img src="/feature/bun.svg"/>] 
bun add @kubb/cli@canary @kubb/core@canary
```

```shell [pnpm <img src="/feature/pnpm.svg"/>] 
pnpm add @kubb/cli@canary @kubb/core@canary
```

```shell [npm <img src="/feature/npm.svg"/>] 
npm install @kubb/cli@canary @kubb/core@canary
```

```shell [yarn <img src="/feature/yarn.svg"/>] 
yarn add @kubb/cli@canary @kubb/core@canary
```

:::

## Configuration File

Kubb uses [Cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for the configuration file support. 
This means you can configure Kubb via (in order of precedence):

- A "kubb" key in your package.json file.
- A `.kubbrc` file written in JSON or YAML.
- A `.kubbrc.json` file.
- A `.kubbrc.js`, `.kubbrc.cjs`, `kubb.config.js`, or `kubb.config.cjs` file that exports an object using module.exports.
- A `.kubbrc.ts` or `kubb.config.ts` file that exports an object using export default.

See [kubb.config.js](/configuration/options) on how to configure Kubb.