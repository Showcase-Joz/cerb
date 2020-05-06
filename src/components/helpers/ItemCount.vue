<template>
  <div class="count" v-if="this.counts.totalCount > 0">
    <span>
      <strong>{{counts.count}}</strong>/
    </span>
    {{counts.totalCount}}
  </div>
</template>

<script>
export default {
	name: "ItemCount",
	props: {
		counts: {
			type: Object,
			default: null
		}
	}
};
</script>

<style lang="scss" scoped>
.count {
	bottom: 1px;
	color: shade($color1, $tint25);
	font-size: xx-small;
  left: 2px;
	position: absolute;

	& > span {
		align-items: unset;
		display: unset;
		justify-content: unset;

		& > strong {
			color: rgba(tint($color2, $tint100), 0.7);
			font-size: small;
			padding-inline-end: 1px;
		}
	}

	@include for-size(tablet-portrait-up) {
    animation: 2.25s ease-in 1s normal popin;
		background: $invalid;
		border-radius: 50%;
		color: tint($color2, $tint100);
		font-weight: 500;
		height: 30px;
    left: unset;
		padding: 4px;
		right: -10px;
		text-align: center;
    top: -3px;
    transform: rotate(-360deg) scale(0.4);
    transition: transform .5s ease-out;
		width: 35px;
		z-index: 50;

		& > span {
			align-items: center;
			display: flex;
			justify-content: center;

			& > strong {
				color: unset;
				display: block;
				font-size: larger;
			}
    }
    
    &:hover {
      cursor: none;
      transition: transform .5s ease-in;
      transform: rotate(395deg) scale(1);
    }
  }
	@keyframes popin {
    0% {
      transform: rotate(15deg) scale(0.4);
    }
		20% {
			transform: rotate(15deg) scale(1.25);
    }
    29% {
			transform: rotate(15deg) scale(0.9);
    }
    35% {
			transform: rotate(15deg) scale(1.1);
		}
		50% {
			opacity: 1;
			transform: rotate(15deg) scale(1);
    }
    85% {
      transform: rotate(15deg) scale(1);
    }
    97% {
      transform: rotate(-360deg) scale(0.3);
    }
    100% {
      transform: scale(0.4);
    }
	}
}
</style>