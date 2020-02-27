<template>
	<span
		class="version"
		:title="'Current version of Typhon is: ' + this.currentVersion"
	>v{{ this.currentVersion }}</span>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "appVersion",
	computed: {
		...mapGetters({
			currentVersion: "appInfo/currentVersion"
		})
	}
};
</script>

<style lang="scss" scoped>
span.version {
	color: tint($color2, $tint90);
	cursor: help;
	font-size: 10px;
	height: fit-content;
	margin-inline-start: 2px;
	text-transform: none;
	transform: translate(-10px, 20px) rotate(90deg);
}
</style>