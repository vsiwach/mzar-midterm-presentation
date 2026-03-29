# MZAR x BAM — Mid-Term Presentation

MIT Sloan GenAI Lab | Spring 2026

## Run Locally

```bash
git clone https://github.com/vsiwach/mzar-midterm-presentation.git
cd mzar-midterm-presentation
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## Tabs

| Tab | What it shows |
|-----|--------------|
| **Presentation** | 3 slides (arrow keys to navigate): Problem, Solution, Biggest Hurdle |
| **Illustrative Demo** | Animated pipeline with "Run Pipeline" button, real sample data, eval scorecard |
| **Architecture** | Block diagram of 6-agent system + tools/methods/prompt strategies |

## Controls

- **Arrow keys** (left/right) navigate between slides on the Presentation tab
- **"Run Pipeline"** button on the Demo tab animates the 10-stage pipeline
- **Tab bar** at the top switches between views

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — open `dist/index.html` or serve with any static file server.
