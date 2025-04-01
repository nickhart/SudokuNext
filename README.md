# Sudoku

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-8.15.4-orange?logo=pnpm)](https://pnpm.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Tests](https://github.com/nickhart/sudoku/actions/workflows/test.yml/badge.svg)](https://github.com/nickhart/sudoku/actions/workflows/test.yml)
[![Deploy](https://github.com/nickhart/sudoku/actions/workflows/deploy.yml/badge.svg)](https://github.com/nickhart/sudoku/actions/workflows/deploy.yml)

**This is the first NextJS project I created.** I borrowed a simple JS/React Tic Tac Toe app,
converted it to Typescript, upgraded it to use NextJS, then mostly rewrote it with an updated
model, Board, Cell, and Game components in order to make a Sudoku game--while still preserving
the ability to go back to a previous state (which seems kinda handy for a Sudoku game that
doesn't prevent one from making an incorrect move).

As an experiment one can switch to a 4x4 grid which is pretty trivial to solve, but I
thought it would be interesting and possibly make it easy to test.

I used [Cursor](https://www.cursor.com) to help update dependencies, do some project cleanup,
and make the README a little spiffier. **But the code was 100% human.** Before Cursor it would
take a lot of googling to solve minor issues with various module and project configuration
problems. In the span of an hour it took my 15 month old project and brought it up to date! 🚀

## Features

- 🎮 Two grid sizes: 4x4 and 9x9
- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Built with Next.js for optimal performance
- 📱 Mobile-friendly interface
- 🎯 Real-time validation
- 🎨 Clean, minimalist UI

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- pnpm 8.0.0 or later

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nickhart/sudoku.git
   cd sudoku
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests

## Project Structure

```
sudoku/
├── src/
│   ├── components/     # React components
│   ├── model/         # Game logic and state management
│   ├── pages/         # Next.js pages
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── public/            # Static assets
└── tests/             # Test files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the classic Sudoku game
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## Overview

Started with an example React tic-tac-toe app, converted it to typescript, turned it into a sudoku game, and then:

- ability to switch between a 4x4 and 9x9 grid
- added tailwindcss and cleaned up css

## TODO

- templates (enabled partially-filled games)
- hover states--disable if not clickable
- more color palattes?
- show conflicts/errors/contraints?
- annotations
- hints
- auto-play (via correct annotations)
