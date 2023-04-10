import { redirect } from '@sveltejs/kit';
import pkce from 'pkce-gen';
import type { RequestHandler } from './$types';
import { SPOTIFY_APP_CLIENT_ID, BASE_URL } from '$env/static/private';

/**
 * Generates a random string with a specified length using a set of possible characters.
 *
 * @param length The desired length of the random string.
 * @returns A randomly generated string.
 *
 * @documents
 * {@link https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow | Code Verifier },
 * {@link https://github.com/spotify/web-api-examples/blob/master/authentication/authorization_code/app.js | spotify/web-api-examples }
 *
 */
const generateRandomString = (length: number) => {
	let randomString = '';
	const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
	}
	return randomString;
};

const state = generateRandomString(16);
const challenge = pkce.create();
const scope =
	'ugc-image-upload user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private app-remote-control streaming user-read-email user-read-private user-library-modify user-library-read';

/**
 * Redirects the user to the Spotify authorization page.
 *
 * @remarks
 * A 'Redirect URIs' form needs to be registered in the app settings first in
 * {@link https://developer.spotify.com/dashboard | Dashboard} > App > Settings > Basic Information > Redirect URIs
 *
 * @document
 * {@link https://developer.spotify.com/documentation/web-api/tutorials/code-flow | Authorization Code Flow }
 *
 */
export const GET: RequestHandler = () => {
	throw redirect(
		307,
		`https://accounts.spotify.com/authorize?${new URLSearchParams({
			client_id: SPOTIFY_APP_CLIENT_ID,
			response_type: 'code',
			redirect_uri: `${BASE_URL}/api/auth/callback`,
			state,
			scope,
			code_challenge_method: 'S256',
			code_challenge: challenge.code_challenge
		})}`
	);
};
