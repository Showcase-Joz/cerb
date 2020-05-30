<template>
  <transition appear name="slide-right">
    <div class="switch-input">
      <div class="title">Filter by Type</div>
      <div class="type">
        <button class="btn btn-general-debug">debug</button>
      </div>
      <div class="type">
        <button class="btn btn-general-error">error</button>
      </div>
      <div class="type">
        <button class="btn btn-general-info">info</button>
      </div>
      <div class="type">
        <button class="btn btn-general-warning">warning</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
	name: "type-input"
};
</script>

<style lang="scss" src="@/styles/animation/_slide-right.scss" scoped></style>
<style lang="scss" scoped>
.switch-input {
	align-items: center;
	background-color: tint($color2, $tint100);
	border-bottom: 1px solid rgba($color: shade($color1, $shade90), $alpha: 0.2);
	display: grid;
	grid-area: switch-input;
	grid-template-rows: 1fr;
	grid-template-columns: repeat(4, minmax(auto, 1fr));
	justify-items: start;
	height: 62px;
	padding-left: calc(#{$spacingDefault} / 2);
	padding-right: calc(#{$spacingDefault} / 2);
	padding-top: $spacingDefault;
	position: relative;
	column-gap: 1rem;
	max-width: 100%;
	min-width: fit-content;
	width: unset;

	// @include for-size(tablet-portrait-up) {
	//   grid-template-columns: repeat(4, minmax(auto, 1fr));
	// }
	@include for-size(tablet-portrait-up) {
		grid-template-columns: repeat(4, minmax(auto, 1fr));
		margin-left: $spacingDefault;
		padding-left: unset;
		padding-right: $spacingDefault;
	}

	& .title {
		color: tint($color2, $tint50);
		font-size: 0.5rem;
		justify-self: start;
		letter-spacing: calc(#{$letter-spacing} * 1.5);
		position: absolute;
		margin-left: 5px;
		margin-top: $spacingDefault;
		transform: translateY(-100%);
		text-transform: uppercase;
		top: 0;
	}
	.type {
		width: -webkit-fill-available;

		@include for-size(tablet-portrait-up) {
			width: unset;
		}

		.btn {
			@include btn;
			
			z-index: 5;
			&[class*="-general"] {
				@include general;
				font-size: clamp(14px, 2.5vw, 2rem);
				width: inherit;
				@include for-size(tablet-portrait-up) {
					font-size: clamp(16px, 1.2vw, 2.8rem);
					width: unset;
				}
			}
		}
	}
}
</style>
