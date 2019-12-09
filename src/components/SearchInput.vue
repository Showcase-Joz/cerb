<template>
  <div class="form-wrapper search-input">
    <form id="formMetaNameSpaces" @submit.prevent="collectInputs">
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
            >Namespace</label
          >
          <input
            type="text"
            name="namespace"
            v-model="formResponses.namespace"
            v-on:input="cleanInputs"
            @blur="$v.formResponses.namespace.$touch(), onBlur()"
            @focus="onFocus()"
          />
        </div>
        <p class="form-field-msg" v-if="!$v.formResponses.namespace.maxLength">
          Please add a Namespace with no more than
          {{ $v.formResponses.namespace.$params.maxLength.max }}
          characters.
        </p>
        <p
          class="form-field-msg"
          v-if="
            !$v.formResponses.namespace.required &&
              $v.formResponses.namespace.$dirty
          "
        >
          Namespace must not be empty!
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import { required, maxLength, helpers } from "vuelidate/lib/validators";
const hasValueLength = value => value.length >= 1;
const strDefPattern = helpers.regex("strDefPattern", /^[\d+\w+^.^-]+$/);
let metaObj = {};
export default {
  name: "search-input",
  data() {
    return {
      uiState: "submit issue",
      noErrors: false,
      hasFocus: false,
      formResponses: {
        namespace: ""
      }
    };
  },
  validations: {
    formResponses: {
      namespace: {
        required,
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
      this.noErrors = !this.$v.formResponses.$invalid;
      metaObj = {
        namespace: this.formResponses.namespace
      };
      if (this.noErrors) {
        this.uiState = "form submitted!";
        // send up to parent
        this.$emit("handleMeta", metaObj);
      } else {
        console.warn("There is a form submission error: ", metaObj);
      }
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
.search-input {
  grid-area: search-input;
  
  .form-wrapper {
    border: 1px $color2 solid;
    height: max-content;
    overflow-y: hidden;
    padding: $spacingLarge;

    .form-group {
      margin-top: $spacingLarge !important;
    }
  }
}
</style>
