<template>
  <div class="modal" :class="this.verifyModal.modalOptions.type">
    <div class="modal-wrapper">
      <div class="modal-wrapper-topbar">
        <div class="modal-title">{{ this.verifyModal.modalOptions.title }}</div>
        <div @click="handleClose" class="modal-x" title="close this window">
          <button>X</button>
        </div>
      </div>
      <div class="modal-content">
        {{ this.verifyModal.modalOptions.content }}
      </div>
      <div class="modal-wrapper-buttonsbar">
        <div class="modal-btn-default">
          <button
            @click="handleClose"
            :disabled="
              this.spinner && !this.verifyModal.modalOptions.type === 'warning'
            "
            :data-title="this.verifyModal.modalOptions.leftAction"
            :data-title-confirm="
              this.verifyModal.modalOptions.leftActionConfirm
            "
            :class="{ 'data-matched': this.leftActionMatch }"
          ></button>
        </div>
        <div class="modal-btn-danger">
          <button
            @click="handleDelete"
            :disabled="this.spinner"
            :data-title="this.verifyModal.modalOptions.rightAction"
            :data-title-confirm="
              this.verifyModal.modalOptions.rightActionConfirm
            "
            :class="{ 'data-matched': this.rightActionMatch }"
          >
            <LoadingSpinner v-if="this.spinner" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoadingSpinner from "../helpers/LoadingSpinner";
export default {
  name: "modal",
  components: {
    LoadingSpinner
  },
  methods: {
    async handleClose() {
      await this.$store.dispatch(
        "namespace/getNS",
        `${this.verifyModal.server.initialMeta}${this.verifyModal.server.maxLimit}`
      );
      await this.$store.dispatch("resetModal", null);
    },
    async handleDelete() {
      if (this.verifyModal.actionID === "Namespace") {
        // sends delete command
        await this.$store.dispatch(
          "deletedItem/deleteNS",
          `${this.verifyModal.server.initialMeta}/${this.verifyModal.deleteItem}`
        );
        if (this.searchedContent === this.verifyModal.deleteItem) {
          this.$store.dispatch("search/storedSearch", "", { root: true });
        }
        // refreshes the view after delete
        await this.$store.dispatch(
          "namespace/getNS",
          `${this.verifyModal.server.initialMeta}${this.verifyModal.server.maxLimit}`
        );
      } else if (this.verifyModal.actionID === "Name") {
        // sends delete command
        await this.$store.dispatch(
          "deletedItem/deleteN",
          `${this.verifyModal.initialMeta}/${this.verifyModal.deleteItem}`
        );
      }
    }
  },
  computed: {
    ...mapGetters({
      spinner: "spinner",
      verifyModal: "verifyModal",
      showModal: "showModal",
      searchedContent: "search/searchedContent"
    }),
    leftActionMatch: function() {
      if (
        this.verifyModal.modalOptions.leftAction ===
        this.verifyModal.modalOptions.leftActionConfirm
      ) {
        return true;
      } else {
        return false;
      }
    },
    rightActionMatch: function() {
      if (
        this.verifyModal.modalOptions.rightAction ===
        this.verifyModal.modalOptions.rightActionConfirm
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
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

  & {
    .modal-wrapper-topbar {
      background-color: $unknown;
      border-bottom-color: shade($unknown, $shade25);
    }
  }

  &.success {
    .modal-wrapper-topbar {
      background-color: $valid;
      border-bottom-color: shade($valid, $shade25);
    }
  }

  &.danger {
    .modal-wrapper-topbar {
      background-color: $invalid;
      border-bottom-color: shade($invalid, $shade25);
    }
  }

  &.warning {
    .modal-wrapper-topbar {
      background-color: $warning;
      border-bottom-color: shade($warning, $shade25);
    }
  }

  div[class$="btn-success"] {
    position: relative;
    @include success;
  }

  div[class$="btn-default"] {
    position: relative;
    @include default;
  }

  div[class$="btn-danger"] {
    position: relative;
    @include danger;
  }

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
      @include btn;
    }

    .modal-wrapper-topbar {
      border-bottom-width: calc(#{$borderRadius} / 1.25);
      border-bottom-style: ridge;
      border-bottom-color: inherit;
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
        font-size: inherit;
        font-weight: $heavy;
        justify-self: start;
        padding-left: 1rem;

        @include for-size(phone-small) {
          font-size: small;
        }
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

    & {
      .modal-wrapper-topbar {
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

      @include for-size(phone-small) {
        hyphens: auto;
        word-break: break-all;
      }
    }

    .modal-wrapper-buttonsbar {
      align-self: center;
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
        // overflow: hidden;
        // padding: $spacingDefault calc(#{$spacingDefault} / 2);

        & button {
          line-height: $matched-linespacing;
          padding: 0 calc(#{$spacingDefault} / 2);
          text-align: center;
        }
      }
    }
  }
}
</style>
