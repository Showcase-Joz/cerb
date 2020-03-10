<template>
  <nav id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/get">Get</router-link>
    <router-link to="/post">Post</router-link>
    <router-link to="/about">About</router-link>
    <!-- log state button -->
    <router-link id="log-state-off" v-if="!authUser" to="/login">Login</router-link>
    <router-link id="log-state-on" v-if="authUser" to="/logout">Logout</router-link>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "TopNav",
	computed: {
		...mapGetters({
			authUser: "authorisation/authUser"
		})
	}
};
</script>

<style lang="scss" scoped>
#nav {
	align-items: center;
	display: grid;
	font-size: medium;
	grid-template-columns: repeat(auto-fit, minmax(max-content, 50px));
	justify-content: center;
	padding: 15px 20px 0px;

	@include for-size(phone-up) {
		font-size: large;
		grid-gap: 3px;
		grid-template-rows: repeat(auto-fit, minmax(max-content, 50px));
		grid-template-columns: repeat(2, 1fr);

		padding: 5px;

		& > * {
			align-items: center;
			display: grid;
			height: 50px;

			&:hover {
				background-color: $color2;
				color: $color1;
			}
		}
	}

	a {
		color: inherit;
		font-weight: bold;
		padding: 0 5px;
		position: relative;
		text-decoration: none;
		z-index: 1;

		&::before {
			background-color: $color1;
			content: "";
			display: block;
			height: 100%;
			position: absolute;
			transform: scale(0, 1);
			transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.72, 1.775);
			width: 100%;
			z-index: 0;
		}

		&:hover::before {
			left: 0;
			transform: scale(1,1);
			transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.72, 1.775);
			z-index: -1;
		}

		&.router-link-exact-active {
			color: $color1;
			cursor: not-allowed;
		}

		&.router-link-exact-active:hover {
      color: $color2;
      text-decoration: line-through;
		}

		&.router-link-exact-active:hover::before {
			border: none;
		}

		@include for-size(phone-up) {
			padding: initial;

			&:hover {
				color: tint($color2, $tint100);
				text-decoration: none;
			}
		}

		@include for-size(tablet-landscape-up) {
			&::before {
				content: none;
			}

			&:hover::before {
				content: none;
			}

			&::after {
				background-color: white;
				content: "";
				display: block;
				height: 2px;
				position: initial;
				transition: width 0.3s;
				width: 0;
				z-index: initial;
			}

			&:hover::after {
				transition: width 0.3s;
				width: 100%;
			}

			&.router-link-exact-active:hover {
        color: shade($color1, $shade10);
        
				&::after {
					background-color: shade($color1, $shade10);
				}
			}
		}
	}

	[id^="log-state"] {
		display: inline-block;
		position: absolute;
		right: 1rem;

		@include for-size(phone-up) {
			display: grid;
			grid-column-start: 2;
			grid-row-end: 1;
			position: relative;
			right: initial;
		}
	}
}
</style>
