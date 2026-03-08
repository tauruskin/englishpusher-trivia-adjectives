# EnglishPusher Trivia
     
A sleek, modern vocabulary trivia game for adult English learners. Built with React, TypeScript, and Tailwind CSS.

**Current topic:** Adjectives for Feelings (-ed / -ing adjectives) — English → Ukrainian

## Features

- **3 question formats** randomly mixed each round:
  - Multiple choice — English word → pick the Ukrainian translation
  - Reversed multiple choice — Ukrainian translation → pick the English word
  - Fill in the blank — complete a sentence with the correct English adjective
- **10 questions per round**, randomly selected from the word list
- **Live score tracking** during the game
- **Visual feedback** — wrong answers highlight red, correct answers highlight green
- **End screen** with final score, percentage, and Play Again button
- **No login required** — works instantly in the browser

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development and builds
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) component primitives

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm (or yarn / bun)

### Install & Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/englishpusher-trivia.git
cd englishpusher-trivia

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Deploy to GitHub Pages

1. In `vite.config.ts`, set the `base` to your repo name:
   ```ts
   export default defineConfig({ base: '/your-repo-name/', ... })
   ```

2. Build and deploy:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

3. In your GitHub repo → Settings → Pages → Source: **Deploy from a branch** → select `gh-pages`.

### Automated Deployment (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

Then enable Pages → Source: **GitHub Actions** in your repo settings.

## Customizing the Word List

All vocabulary lives in `src/data/wordList.ts`. Each entry:

```ts
{
  word: "excited",            // English word
  translation: "захоплений",  // Ukrainian translation
  example: "She was really ___ about her trip to Paris."
}
```

Edit this file to swap in new topics.

## Project Structure

```
src/
├── components/
│   ├── EndScreen.tsx        # Final score screen
│   ├── ProgressBar.tsx      # Question progress indicator
│   ├── QuestionCard.tsx     # All 3 question formats
│   └── ScoreBadge.tsx       # Live score display
├── data/
│   └── wordList.ts          # Vocabulary data (edit this!)
├── hooks/
│   └── useGame.ts           # Game logic
├── pages/
│   └── Index.tsx            # Main game page
├── index.css                # Design system tokens
└── main.tsx                 # Entry point
```

## License

MIT
