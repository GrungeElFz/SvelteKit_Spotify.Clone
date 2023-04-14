<script lang="ts">
	import { Button } from '$components';
	import logo from '$assets/Spotify_White.Logo.png';
	import cover from '$assets/PFP_01000111.N.png';
</script>

<div class="wrapper">
	<div class="content">
		<img src={logo} class="logo" alt="Spotify" />
		<h1>This is H1 tags</h1>
		<p>This is P tags, This is P tags, This is P tags.</p>
		<div class="buttons">
			<Button
				element="a"
				variant="outline"
				href="https://www.spotify.com/"
				target="_blank"
				rel="noopener noreferrer">Sign Up</Button
			>
			<Button element="a" href="api/auth/login">Login</Button>
		</div>
	</div>
	<div class="cover">
		<img src={cover} alt="0x01000111 artist cover" />
	</div>
</div>
