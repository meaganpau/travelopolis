# Travelopolis

A travel journal app. People sign up, create **trips**, and write **journals** (rich text) for each trip. Anyone can read the public pages, and only the owner can change their own trips and journals.

Built with React (Create React App), Express, and MongoDB (via Mongoose).

## How the pieces fit together

Running the app locally means running **three separate programs**. All three need to be up at the same time:

| Program | What it is | How to start it | Port |
| --- | --- | --- | --- |
| MongoDB | the database | `brew services start mongodb-community@8.3` (once, see below) | 27017 |
| `yarn server` | the Express API | in a terminal | 3050 |
| `yarn client` | the React app (dev server) | in a second terminal | 3000 |

`yarn start` runs the last two together in one terminal.

The React app asks for data at `/api/...`, and the `"proxy"` setting in `package.json` forwards those requests to the API on port 3050. **`yarn server` does not start MongoDB.** It only connects to it.

## Run it locally

You need **Node 20.19 or newer** (`.nvmrc` says 24) and Yarn 1.

### One-time setup

1. **Install the dependencies:**

   ```
   yarn
   ```

2. **Install and start MongoDB** (needs [Homebrew](https://brew.sh)):

   ```
   brew tap mongodb/brew
   brew trust mongodb/brew
   brew update
   brew install mongodb-community@8.3
   brew services start mongodb-community@8.3
   ```

   `brew services` keeps MongoDB running in the background, so this is a one-time step. Check it with `brew services list` (it should say `started`).

3. **Create your `.env` file:**

   ```
   cp .env.example .env
   ```

   Then fill in `TOKEN_SECRET` and `REACT_APP_TINYMCE_API_KEY` (see [Environment variables](#environment-variables)). The other defaults work locally.

4. **Load some sample data** (optional, but handy):

   ```
   yarn seeds
   ```

   This creates three sample users, a few trips and some journals. You can then log in as `meagan@example.com` with the password `testing`.

   > **Careful:** `yarn seeds` first **deletes** all users, trips and journals in whatever database `MONGODB_URI` points to. To protect you, it refuses to run unless `MONGODB_URI` points at a local MongoDB. (You can override that with `SEED_ALLOW_REMOTE=true yarn seeds`, but only do that on purpose.)

### Every time you want to work on it

MongoDB should already be running (`brew services list`). Then:

```
yarn start
```

Open http://localhost:3000. Or run the two halves in separate terminals with `yarn server` and `yarn client`.

`yarn server` restarts by itself when you change a server file, but **not** when you edit `.env`. After changing `.env`, stop it with `Ctrl+C` and start it again. If the API can't reach the database it exits after 5 seconds with a message saying so.

### Looking at the database

[MongoDB Compass](https://www.mongodb.com/products/tools/compass) is a free app for browsing the data (`brew install --cask mongodb-compass`). Connect to `mongodb://127.0.0.1:27017`. The data is in the `tripJournals` database.

### Trying the production build locally (optional)

```
yarn build
yarn server
```

The Express server also serves the built app, so it is at http://localhost:3050.

## Environment variables

They live in a file called `.env` in the project's top-level folder. It is not committed to git. `.env.example` is the template.

| Variable | What it does | Local value |
| --- | --- | --- |
| `PORT` | Port for the Express API. Must match `"proxy"` in `package.json`. | `3050` |
| `MONGODB_URI` | Where the database is. | `mongodb://127.0.0.1:27017/tripJournals` |
| `TOKEN_SECRET` | Secret used to sign login tokens. Anyone who knows it can pretend to be any user, so keep it private and use a different one in production. | any long random string (`.env.example` has a command to make one) |
| `REACT_APP_TINYMCE_API_KEY` | API key for the TinyMCE rich text editor, from https://www.tiny.cloud (a free account works). The editor is loaded from Tiny Cloud, so it won't work without a key, and your site's domains (and `localhost`) need to be listed as approved domains in your Tiny account. The key is baked into the built React app. | your key |

The React dev server's port (3000) is set in the `client` script in `package.json`, not in `.env`. If both used `PORT`, the API and the React app would fight over the same port.

The server also still reads a `config/` folder (gitignored) if a value isn't in the environment. That is a leftover from the original setup; `.env` is the way to go.

## Scripts

| Command | What it does |
| --- | --- |
| `yarn start` | Runs the API and the React app together (development) |
| `yarn server` | Runs only the API (auto-restarts when server files change) |
| `yarn client` | Runs only the React app on port 3000 |
| `yarn seeds` | Empties and reloads the database with sample data (local MongoDB only) |
| `yarn build` | Builds the React app into `build/` |
| `yarn test` | Runs the tests |

## How the API is protected

- Logging in gives a token that is valid for **30 days**. After that the user has to log in again.
- Creating, editing and deleting trips and journals needs a logged-in user, and you can only change **your own** trips and journals (a journal belongs to whoever owns its trip).
- Public pages (`/api/users/slug/...`, trips and journals lists) never include email addresses or password hashes. Only `/api/users/current` returns the logged-in user's own email.
- Passwords are hashed with bcrypt before they are saved.
- Journal content is HTML, so it is cleaned with [DOMPurify](https://github.com/cure53/DOMPurify) (`src/util/sanitize.js`) every time it is shown. This stops anyone from saving scripts in a journal that would run in other people's browsers. Embedded videos are only allowed from YouTube and Vimeo.

## Checking for vulnerable packages

Only six packages run on the server: `express`, `mongoose`, `bcrypt`, `jose`, `dotenv` and `config` (listed under `dependencies` in `package.json`). Everything else is used to build the React app on your computer and is listed under `devDependencies`. It never runs on the server.

```
yarn audit --groups dependencies    # what the live server runs (this is the one that matters)
yarn audit                          # everything, including build tools (long, mostly noise)
yarn outdated                       # what has newer versions
```

A vulnerability in a build tool can affect your laptop while you build, but it can't be reached through the website.

## Production

Deploying is not documented yet. It needs Node 20.19+ on the server (the server was originally on Node 12, which these dependencies no longer support).
