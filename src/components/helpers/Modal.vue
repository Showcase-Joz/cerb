<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-wrapper-topbar">
        <div class="modal-title">Title</div>
        <div class="modal-x" title="close this window">
          <button>X</button>
        </div>
      </div>
      <div class="modal-content">blurb</div>
      <div class="modal-wrapper-buttonsbar">
        <div class="modal-ok">
          <button>OK</button>
        </div>
        <div class="modal-cancel">
          <button>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "modal"
};
</script>

<style lang="scss" scoped>
.modal {
	align-content: center;
	background-color: rgba($color2, 0.8);
	display: grid;
	grid-template-columns: minmax(100px, 80vw);
	grid-template-rows: minmax(200px, 30vh);
	height: 100vh;
	justify-content: center;
	position: absolute;
	width: 100vw;
	z-index: 999999;

	.modal-wrapper {
		align-self: center;
		background-color: shade($color2, $shade50);
		border: calc(#{$borderRadius} / 1.25) ridge $color2;
		grid-template-columns: 1fr;
		// grid-template-rows: min-content max-content min-content;
		grid-template-areas:
			"modal-wrapper-topbar"
			"modal-content"
			"modal-wrapper-buttonsbar";

		& button {
			all: initial;
			cursor: pointer;
			font-family: $primary-font-family;
			font-size: $font-normal;
		}

		.modal-wrapper-topbar {
			background-color: $color1;
			border-bottom: calc(#{$borderRadius} / 1.25) ridge $color1;
			display: grid;
			grid-area: modal-wrapper-topbar;
			grid-template-columns: 1fr 30px;
			justify-items: center;
			letter-spacing: $letter-spacing;
			margin: 2px 1px 0px;
			text-transform: uppercase;

			div[class$="-title"] {
				align-self: center;
				color: tint($color1, $tint100);
				font-weight: $heavy;
			}
			div[class$="-x"] {
				font-size: calc(#{$font-size-xl} * 1.2);
				justify-self: center;
				padding-right: 2px;
				width: 100%;

				button {
					border-left: solid 1px rgba(shade($color2, $shade100), 0.3);
					color: $color2;

					text-align: center;
					width: inherit;

					&:hover {
						color: tint($color2, $tint100);
						font-weight: $heavy;
					}
				}
			}
		}

		.modal-content {
			align-items: center;
			color: tint($color2, $tint100);
			display: grid;
			grid-area: modal-content;
			height: fit-content;
			letter-spacing: calc(#{$letter-spacing} / 2);
			padding: calc(#{$spacingDefault} / 2) $spacingDefault;
			min-height: 100px;
			text-align: left;
		}

		.modal-wrapper-buttonsbar {
			display: grid;
			grid-area: modal-wrapper-buttonsbar;
			grid-gap: calc(#{$spacingDefault} * 2);
      grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
      grid-template-rows: 40px;
			justify-items: center;
			padding: $spacingDefault;

			& > div {
        display: grid;
				grid-gap: calc(#{$spacingDefault} * 2);
				min-width: 100%;
        // padding: $spacingDefault calc(#{$spacingDefault} / 2);
        
        & button {
          text-align: center;

          &:hover {
            background-color: pink;
          }
        }
			}

			div[class$="-ok"] {
				background-color: $valid;

				& button {
				}
			}
			div[class$="-cancel"] {
				background-color: $invalid;
			}
		}
	}
}
</style>