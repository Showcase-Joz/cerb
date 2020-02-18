<template>
	<div id="app">
		<Header />
		<router-view />
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./components/Header";
export default {
	name: "app",
	components: {
		Header
	},
	beforeUpdate() {
		// clear error message from current view
		if (this.errMessage) {
			this.$store.dispatch("setError", null);
		}
	},
	// attempt to login user from session
	async created() {
    await this.$store.dispatch("fetchUser");
    
	},
	computed: {
		...mapGetters(["errMessage"])
	}
};
</script>

<style lang="scss">
*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

#app {
	color: tint($color2, $tint10);
	display: grid;
	font-family: $primary-font-family;
	grid-template-columns: 1fr;
	grid-template-rows: minmax(auto, max-content) minmax(auto, max-content);
	min-width: $minViewport;
	text-align: center;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.split-view {
	display: grid;
	grid-template-columns: minmax(max-content, auto);
	grid-auto-rows: minmax(100px, auto);
	grid-template-areas:
		"form-wrapper"
		"sent-fetch-wrapper";

	@include for-size(desktop-up) {
		grid-template-columns: minmax(max-content, 1fr);
		grid-template-areas: "form-wrapper sent-fetch-wrapper";
		column-gap: 1rem;

		&.append-grid {
			grid-template-columns: minmax(max-content, 1fr) minmax(auto, 1fr);
		}
	}
}

.view-atfold {
	grid-area: view-atfold;
	margin-bottom: $spacingDefault;
}

h1 {
	font-size: 2.5rem;
	text-transform: uppercase;
}

h4 {
	color: $color1;
}

.status-setting {
	// align-items: center;
	cursor: help;
	display: grid;
	height: 100%;
	// justify-items: center;
	min-width: 20px;
	position: relative;
	width: 100%;

	&::after {
		border-radius: calc(#{$borderRadius} / 2);
		content: "";
		height: inherit;
		position: absolute;
		width: inherit;
	}

	&::after.status-red {
		@extend .status-setting::after;
		background-color: $invalid;
	}

	&::after.status-green {
		@extend .status-setting::after;
		background-color: $valid;
	}
}

// scrollbars

::-webkit-scrollbar-track-piece:start {
	/* Select the top half (or left half) or scrollbar track individually */
}

::-webkit-scrollbar-thumb:window-inactive {
	/* Select the thumb when the browser window isn't in focus */
}

::-webkit-scrollbar-button:horizontal:decrement:hover {
	/* Select the down or left scroll button when it's being hovered by the mouse */
}

::-webkit-scrollbar {
	width: 12px;
}

::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
}

::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

// Animations

@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
@keyframes fadeOutSpecial {
	0% {
		opacity: 1;
		height: inherit;
	}
	100% {
		opacity: 0;
		height: 0;
		margin: 0;
	}
}
</style>
