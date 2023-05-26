# Spotify Clone, built by SvelteKit

I ❤️ [Svelte](https://kit.svelte.dev/), why don't you? 👀

## Creating a project

#### [Vite](https://vitejs.dev/guide/) Initialize

```
npm create svelte@latest

✅ Skeleton project
✅ TypeScript syntax
✅ ESLint for code linting
✅ Prettier for code formatting
✅ Playwright for browser testing
✅ Vitest for unit testing
```

## Adapter

Install with `npm i -D @sveltejs/adapter-vercel` ; then , add the adapter to `svelte.config.js`

```JavaScript
import adapter from '@sveltejs/adapter-vercel';

export default {
    kit: {
        adapter: adapter({
            // Deployment configuration
        })
    }
};
```

## Spotify Web API

#### [List of Scopes :](https://developer.spotify.com/documentation/web-api/concepts/scopes)

##### Images

- `ugc-image-upload`

##### Spotify Connect

- `user-read-playback-state`
- `user-modify-playback-state`
- `user-read-currently-playing`

##### Playback

- `app-remote-control`
- `streaming`

##### Playlists

- `playlist-read-private`
- `playlist-read-collaborative`
- `playlist-modify-private`
- `playlist-modify-public`

##### Follow

- `user-follow-modify`
- `user-follow-read`

##### Listening History

- `user-read-playback-position`
- `user-top-read`
- `user-read-recently-played`

##### Library

- `user-library-modify`
- `user-library-read`

##### Users

- `user-read-email`
- `user-read-private`
