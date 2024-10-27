# Cron Parser

A command-line application that parses and expands standard cron expressions to display the times each field will run. Built without external cron libraries to demonstrate core parsing and handling.

## Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine. You can download it [here](https://nodejs.org/en/download/prebuilt-binaries).

### Installation
Install the dependencies:

```sh
npm install
```

### Running

Pass a cron string as an argument:

```sh
npm start -- "*/15 0 1,15 * 1-5 /usr/bin/find"
```

### Testing

#### Run tests

Run tests in watch mode (recommended)

```sh
npm run test:watch
```

or run with debugger in VS Code (no need to setup)

or run and exit

```sh
npm test
```