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
        <div class="modal-action-1">
          <button>ok</button>
        </div>
        <div class="modal-action-2">
          <button data-action-2="delete" data-confirm="are you sure?"></button>
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
  cursor: default;
  display: grid;
  grid-template-columns: minmax(100px, 80vw);
  grid-template-rows: minmax(200px, 30vh);
  height: 100vh;
  justify-content: center;
  justify-items: center;
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
	min-width: 250px;
	max-width: 500px;
	width: 100%;

    & button {
      @include default-btn;
    }

    .modal-wrapper-topbar {
      background-color: inherit;
      border-bottom-width: calc(#{$borderRadius} / 1.25);
      border-bottom-style: ridge;
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
        justify-self: start;
        padding-left: 1rem;
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
      padding: calc(#{$spacingDefault} / 2) calc(#{$spacingDefault} * 2);
	  min-height: 100px;
      text-align: left;
    }

    .modal-wrapper-buttonsbar {
      display: grid;
      grid-area: modal-wrapper-buttonsbar;
      grid-gap: $spacingDefault;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      grid-auto-rows: 40px;
      justify-items: center;
      padding: $spacingDefault;

      @include for-size(phone-small) {
        grid-gap: calc(#{$spacingDefault} / 2);
      }

      @include for-size(tablet-portrait-up) {
        grid-gap: $spacingLarge;
      }

      & > div {
        display: grid;
        grid-gap: calc(#{$spacingDefault} * 2);
        min-width: 100%;
        // padding: $spacingDefault calc(#{$spacingDefault} / 2);

        & button {
          padding: 0 calc(#{$spacingDefault} / 2);
          text-align: center;

          &:hover {
            background-color: pink;
          }
        }
      }

      div[class$="action-1"] {
        background-color: $valid;
      }

      div[class$="action-2"] {
        background-color: $invalid;
      }
    }
  }
  &.positive {
    .modal-wrapper-topbar {
      background-color: $color1;
      border-bottom-color: shade($color1, $shade25);
    }

    div[class$="action-1"] {
      background-color: $valid;

      & button {
        content: "ok";
      }
    }

    div[class$="action-2"] {
      background-color: $invalid;

      & button {
        content: "cancel";
      }
    }
  }

  &.negative {
    .modal-wrapper-topbar {
      background-color: $invalid;
      border-bottom-color: shade($invalid, $shade25);
    }

    div[class$="action-1"] {
      background-color: $unknown;
    }

    div[class$="action-2"] {
      background-color: $invalid;
      position: relative;

      & button::before {
        background-color: $invalid;
        bottom: 0;
        content: attr(data-action-2);
        font-weight: $heavy;
        left: 0;
        letter-spacing: calc(#{$letter-spacing} /2);
        padding: calc(1rem / 2);
        position: absolute;
        text-transform: uppercase;
        top: 0;
        right: 0;
      }

      & button:hover::after {
        background-color: $invalid;
        bottom: 0;
        content: attr(data-confirm);
        padding: calc(1rem / 2);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>