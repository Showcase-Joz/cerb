<template>
  <transition appear name="slide-right">
    <div class="form-wrapper switch-input">
      <form
        id="formMetaSearch"
        @submit.prevent="collectInputs"
        @keyup.esc="clearInputs"
      >
        <div class="form-group">
          <div
            ref="searchParent"
            class="input-with-label"
            :class="{
              invalid: $v.searchString.$error,
              valid: !$v.searchString.$error && $v.searchString.$dirty
            }"
          >
            <label
              ref="searchLabel"
              for="searchString"
              :class="{
                hasValue: $v.searchString.hasValueLength
              }"
              >Search content..</label
            >
            <input
              type="text"
              name="searchString"
              v-model="searchString"
              v-on:input="cleanInputs"
              @blur="$v.searchString.$touch()"
            />
            <transition name="fade-in">
              <button
                v-if="this.clearBtn"
                class="btn btn-error"
                :disabled="!this.clearBtn"
                @click.stop.prevent="clearSearch($event)"
              >
                clear
              </button>
            </transition>
          </div>
          <p class="form-field-msg" v-if="!$v.searchString.maxLength">
            Please add a searchString with no more than
            {{ $v.searchString.$params.maxLength.max }}
            characters.
          </p>
        </div>
      </form>
    </div>
  </transition>
</template>
<script>
import { maxLength, helpers } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { tickPlus } from "../../variables";
const hasValueLength = value => value.length >= 1;
const strDefPattern = helpers.regex("strDefPattern", /^[\d+\w+^.^-]+$/);
export default {
  name: "switch-input",
  // created() {
  //   if (this.searchedContent !== "") {
  //     this.$store.dispatch("search/storedSearch", "");
  //   }
  // },
  updated() {
    this.$refs.searchParent.classList.remove("invalid");
  },
  data() {
    return {
      searchString: "",
      lastNamespace: "",
      lastName: "",
      clearBtn: false
    };
  },
  validations: {
    searchString: {
      maxLength: maxLength(200),
      hasValueLength,
      strDefPattern
    }
  },
  methods: {
    cleanInputs: function(event) {
      const element = event.target;
      const value = element.value;
      this.$v.searchString.$touch();
      this.searchString = value.replace(/[^a-zA-Z0-9]/g, ".").toLowerCase();
      this.collectInputs();
    },
    // storeSearch: function() {},
    collectInputs: function() {
      if (!this.$v.searchString.$error) {
        // this.storeSearch();
        this.$store.dispatch("search/storedSearch", this.searchString);
      } else if (
        this.searchString.trim() === "" ||
        this.$v.searchString.hasValueLength === false
      ) {
        this.clearSearch();
      }
      this.clearBtn = true;
    },
    clearInputs: function() {
      this.searchString = "";
      this.$store.dispatch("search/storedSearch", this.searchString);
    },
    clearSearch: function() {
      setTimeout(() => {
        this.$refs.searchLabel.blur();
        this.$refs.searchParent.classList.remove("invalid", "valid");
      }, tickPlus);
      this.clearInputs();
    }
  },
  computed: {
    ...mapGetters({
      searchedContent: "search/searchedContent"
    })
  },
  watch: {
    searchedContent(newVal) {
      if (newVal.length > 0) {
        this.searchString = newVal;
        this.clearBtn = true;
      } else {
        this.searchString = "";
        this.clearBtn = false;
      }
    }
  }
};
</script>
<style lang="scss" src="@/styles/_form.scss"></style>
<style lang="scss" src="@/styles/animation/_slide-right.scss" scoped></style>
<style lang="scss" src="@/styles/animation/_fade-in-out.scss" scoped></style>
<style lang="scss" scoped>
.form-wrapper.switch-input {
  // border: 1px $color2 solid;
  border-bottom: 1px solid rgba($color: shade($color1, $shade90), $alpha: 0.2);
  background-color: tint($color2, $tint100);
  grid-area: switch-input;
  margin-left: $spacingDefault;
  max-height: 62px;
  padding: $spacingDefault;

  #formMetaSearch {
    .form-group {
      .input-with-label {
        border: inherit;
        margin-left: -$spacingDefault;
        // padding-left: $spacingDefault;
        text-transform: initial;

        &:focus-within label:not(input) {
          text-transform: uppercase;
          transition: all 300ms ease-out, font-size 500ms ease-out 300ms;
        }

        &.invalid:focus-within {
          border-bottom: 1px solid rgba($color: $warning, $alpha: 1);
        }

        &.invalid {
          border-bottom: 1px solid rgba($color: $invalid, $alpha: 1);
        }

        &.valid:focus-within,
        &.valid {
          border-bottom: 1px solid rgba($color: $valid, $alpha: 1);
          margin-left: -$spacingDefault;
          // padding-left: $spacingDefault;
        }
      }
      .input-with-label input {
        margin-right: 70px;
      }
    }
  }
  .btn-error {
    @include general;
    position: absolute;
    top: -10px;
    right: 0;
    z-index: 5;
  }
}
</style>
