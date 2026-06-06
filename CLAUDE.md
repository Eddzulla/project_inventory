# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Important
I'm learning to code so don't edit the code, only give guidance on how to think/solve the problem so that I learn maximally. Also give examples to make it easier for me to learn.

## Overview

An inventory/shop web app ("fighting shop") built with Express 5 + EJS server-side rendering, backed by PostgreSQL via the `pg` connection pool.

## Commands

- **Run the server:** `node app.js` (listens on http://localhost:3000). There is no `start` script in package.json.
- **Tests:** none configured (`npm test` just errors out).

## Environment

Requires a `.env` file (loaded via `dotenv` in [db/pool.js](db/pool.js)) with:
- `DATABASE_URL` — Postgres connection string used by the `pg` Pool.

## Architecture

Request flow follows a route → controller → query layering:

1. [app.js](app.js) — bootstraps Express, sets EJS as the view engine (`views/`), serves static assets from `public/`, and mounts everything under `/` via the shop router.
2. [routes/shopRoutes.js](routes/shopRoutes.js) — maps URLs to controller functions (`/`, `/categories/:id`).
3. [controllers/shopController.js](controllers/shopController.js) — fetches data through the db layer and calls `res.render(...)` with the data passed to EJS templates.
4. [db/queries.js](db/queries.js) — all SQL lives here as exported async functions; uses [db/pool.js](db/pool.js) (the shared `pg` Pool). Add new data access as functions here rather than querying inline in controllers.

### Database schema (inferred from queries.js)

- `categories` (id, name)
- `items` (id, name, description, price, stock, brand_id)
- `brands` (id, name, country)
- `item_categories` — junction table (item_id, category_id) giving items a many-to-many relationship with categories.

### Views

- `views/` holds full-page templates (`index`, `category`, `item`); `components/` holds partials (`navbar`, `item`) included via EJS `include(...)`. Every page renders the navbar partial and is passed a `categories` array for it.

## Notes / known rough edges

- `app.js` contains a `setAdmin()` toggle and an unused `isAdmin` flag wired to an `onclick="setAdmin()"` in [components/navbar.ejs](components/navbar.ejs), but `setAdmin` is server-side only and not exposed to the browser — admin mode is not actually functional yet.
- The `/categories/:id/:item` (single item) route in [routes/shopRoutes.js](routes/shopRoutes.js) is commented out; [views/item.ejs](views/item.ejs) exists but is not yet wired up.
- `express.urlencoded` is registered twice in app.js (harmless duplication).


