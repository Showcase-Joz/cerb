<template>
	<div class="loading">
		<!-- <div class="content">Loading...</div> -->
		<div class="lds-ring-container">
			<div class="lds-ripple">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Loading"
};
</script>

<style lang="scss" src="@/styles/animation/_spinner.scss" scoped></style>
<style lang="scss" scoped>
.loading {
	align-items: center;
  background-color: rgba(tint($color2, $tint10), 0.85);
  cursor: progress;
	display: flex;
	height: 100%;
	justify-content: center;
	position: absolute;
	transition: background-color 1s ease-in;
	width: 100%;
	z-index: 999;

	.content {
		color: tint($color2, $tint100);
		font-size: calc(#{$font-size-xl} * 1.5);
		text-transform: uppercase;
	}
}
</style>