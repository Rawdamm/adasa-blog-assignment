# عدسة — Photography Blog (React + React Router)

## Run
    npm install
    npm run dev

## Routes
| Path | Page |
|---|---|
| `/` | Home |
| `/blog` | Blog list — search, category filter, grid/list (state in URL: `?q=&category=&view=`) |
| `/blog/:slug` | Blog details (unknown slug -> 404) |
| `*` | 404 |

## Structure
- `src/App.jsx` route table · `src/data/api.js` data helpers over `posts.json`
- `src/pages/*` pages · `src/components/*` Layout, PostCard

## Next phase (bonus)
Pagination — 6 posts per page.
