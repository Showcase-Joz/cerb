<template>
  <div class="view-controls" title="WIP - sort/filter types">
    <div class="vc-item" id="filterText" @click="restrictData($event)">
      <img src="~@/assets/typhon-filter-text-0.5x.png" alt="filter by text" />
      <span>Filter Text</span>
    </div>
    <div class="vc-item" id="ascDesc" @click="restrictData($event)">
      <img src="~@/assets/typhon-text-order-0.5x.png" alt="sort ascending/descending" />
      <span>Asc/Desc Order</span>
    </div>
    <div class="vc-item" id="type" @click="restrictData($event)">
      <img src="~@/assets/typhon-filter-type-0.5x.png" alt="type selection" />
      <span>Sort Type</span>
    </div>
    <div class="vc-item" id="dateRange" @click="restrictData($event)">
      <img src="~@/assets/typhon-date-range-0.5x.png" alt="filter to date range" />
      <span>Date Range</span>
    </div>
  </div>
</template>

<script>
export default {
	name: "View-Controls",
	methods: {
		restrictData: function(event) {
			this.$emit("switchRestrict", event.target.closest(".vc-item").id);
		}
	}
};
</script>

<style lang="scss" scoped>
.view-controls {
  align-items: center;
	background-color: $color2;
	color: tint($color2, $tint50);
	cursor: help;
	display: grid;
	font-variant-caps: all-petite-caps;
	grid-area: view-controls;
	grid-template-columns: repeat(4, minmax(50px, 1fr));
	grid-template-rows: 1fr;
	grid-gap: 1px;

	height: 62px;
	line-height: 1;
	z-index: 100;

	& img {
		display: none;
	}

	@include for-size(tablet-portrait-up) {
		background-color: tint($color2, $tint100);
		border-bottom: 1px solid tint($color2, $tint75);
		color: tint($color2, $tint50);
		column-gap: 1vw;
		font-size: $font-clamp1;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: 1fr auto;
		// margin-inline-end: $spacingDefault;
		// margin-inline-start: -$spacingDefault;
		padding-inline-end: $spacingDefault;

		.vc-item {
			align-self: center;
			display: grid;
			justify-content: space-evenly;
			justify-items: center;
			width: 100%;

			img {
				height: auto;
				min-width: 25px;
				max-width: 50px;
				width: 100%;
				object-fit: cover;
			}
		}

		& img {
			display: block;
		}
		& span {
			display: none;
		}
	}

	@media screen and (min-width: 600px) and (max-width: 700px) {
		grid-gap: 1vw;
		grid-template-columns: repeat(2, 25px);
		grid-template-rows: 1fr 1fr;
		justify-content: space-around;
		justify-self: stretch;
		padding-inline-start: 2vw;
	}

	@include for-size(tablet-landscape-up) {
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: 1fr;
	}
}
</style>
