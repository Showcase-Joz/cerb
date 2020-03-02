<template>
	<header>
		<div class="header-wrapper">
			<h1>Typhon</h1>
			<AppVersion />
			<ConnectionStatus />
			<ConnectionDot />
		</div>
		<TopNav />
	</header>
</template>

<script>
import TopNav from "../navigation/TopNav.vue";
import AppVersion from "../header/AppVersion.vue";
import ConnectionStatus from "../header/ConnectionStatus.vue";
import ConnectionDot from "../header/ConnectionDot.vue";
export default {
	name: "Header",
	components: {
    TopNav,
    AppVersion,
    ConnectionStatus,
    ConnectionDot
	}
};
</script>

<style lang="scss" scoped>
header {
	background-color: $color2;
	color: tint($color2, $tint100);
	display: grid;
	grid-auto-rows: 1fr minmax(auto, max-content);
	min-height: 120px;
	padding: 10px;

	@include for-size(phone-up) {
		padding: initial;
	}

	.header-wrapper {
		display: grid;
		grid-template-columns: 1fr min-content;
		grid-template-rows: 1fr min-content;
		justify-self: center;
		margin: auto;
		width: max-content;

		& h1 {
			color: tint($color2, $tint100);
			margin-bottom: 3px;
			max-height: 42px;
		}
	}
}


</style>
