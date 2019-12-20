<template>
  <div class="form-wrapper search-input">
    <form id="formMetaSearch" @submit.prevent="collectInputs">
      <div class="form-group">
        <div
          class="input-with-label"
          :class="{
            invalid: $v.formResponses.namespace.$error,
            valid:
              !$v.formResponses.namespace.$error &&
              $v.formResponses.namespace.$dirty
          }"
        >
          <label
            for="namespace"
            :class="{
              hasValue: $v.formResponses.namespace.hasValueLength
            }"
            >Search content...</label
          >
          <input
            id="searchInput"
            type="text"
            name="namespace"
            v-model="formResponses.namespace"
            v-on:input="cleanInputs"
            @blur="$v.formResponses.namespace.$touch(), onBlur()"
            @focus="onFocus()"
            @keyup.enter="clearContent"
          />
        </div>
        <p class="form-field-msg" v-if="!$v.formResponses.namespace.maxLength">
          Please add a Namespace with no more than
          {{ $v.formResponses.namespace.$params.maxLength.max }}
          characters.
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import { maxLength, helpers } from "vuelidate/lib/validators";
const hasValueLength = value => value.length >= 1;
const strDefPattern = helpers.regex("strDefPattern", /^[\d+\w+^.^-]+$/);
let metaObj = {};

export default {
  name: "search-input",
  props: {
    clearSearchValue: {
      type: Boolean
    }
  },
  data() {
    return {
      hasFocus: false,
      formResponses: {
        namespace: ""
      }
    };
  },
  validations: {
    formResponses: {
      namespace: {
        maxLength: maxLength(200),
        hasValueLength,
        strDefPattern
      }
    }
  },
  methods: {
    cleanInputs: function() {
      this.formResponses.namespace = this.formResponses.namespace
        .replace(/\s/g, ".")
        .toLowerCase();
      this.collectInputs();
    },
    collectInputs: function() {
      if (!this.$v.formResponses.namespace.$error) {
        metaObj = {
          namespace: this.formResponses.namespace
        };
        // send up to parent
        this.$emit("handleMeta", metaObj);
      } else if (
        this.formResponses.namespace.trim() === "" &&
        this.formResponses.namespace.length < 1
      ) {
        metaObj = {
          namespace: ""
        };
        this.$emit("handleMeta", metaObj);
      }
    },
    clearContent: function() {
      document.getElementById("searchInput").value = "";
      document.activeElement.blur();
      document.getElementById("createNew").focus();
      this.$emit("keyup", true);
    },
    onFocus() {
      this.hasFocus = true;
    },
    onBlur() {
      this.hasFocus = false;
    }
  }
};
</script>
<style lang="scss" src="@/styles/_form.scss"></style>
<style lang="scss" scoped>
.form-wrapper.search-input {
  // border: 1px $color2 solid;
  grid-area: search-input;
  max-height: 62px;
  padding: $spacingDefault;

  #formMetaSearch {
    .form-group {
      .input-with-label {
        border-bottom: 1px solid
          rgba($color: shade($color1, $shade90), $alpha: 0.2);
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
        }
      }
    }
  }
}
</style>
