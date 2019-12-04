<template>
  <div
    class="form-wrapper"
    :class="{
      'rollup-form': !this.hasFocus === true && this.resultSwitch === true
    }"
  >
    <form id="formPost" @submit.prevent="collectInputs">
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
        <p class="form-field-msg" v-if="!$v.formResponses.namespace.minLength">
          Please add a Namespace with at least
          {{ $v.formResponses.namespace.$params.minLength.min }}
          characters.
        </p>
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
      <div class="form-group">
        <div
          class="input-with-label"
          :class="{
            invalid: $v.formResponses.name.$error,
            valid: !$v.formResponses.name.$error && $v.formResponses.name.$dirty
          }"
        >
          <label
            for="name"
            :class="{
              hasValue: $v.formResponses.name.hasValueLength
            }"
            >Name</label
          >
          <input
            v-model="formResponses.name"
            v-on:input="cleanInputs"
            @blur="$v.formResponses.name.$touch(), onBlur()"
            @focus="onFocus()"
            type="text"
            name="name"
          />
        </div>

        <p class="form-field-msg" v-if="!$v.formResponses.name.minLength">
          Please add a name with at least
          {{ $v.formResponses.name.$params.minLength.min }}
          characters.
        </p>
        <p class="form-field-msg" v-if="!$v.formResponses.name.maxLength">
          Please add a name with no more than
          {{ $v.formResponses.name.$params.maxLength.max }}
          characters.
        </p>
        <p
          class="form-field-msg"
          v-if="!$v.formResponses.name.required && $v.formResponses.name.$dirty"
        >
          Name must not be empty!
        </p>
      </div>

      <DescriptionTextArea
        @changeDescription="formResponses.description = $event"
        @updateFocus="hasFocus = $event"
      />

      <div class="form-group">
        <div class="radio-group">
          <div class="radio">
            Debug
            <input
              type="radio"
              id="debug"
              value="debug"
              v-model="formResponses.type"
              @blur="$v.formResponses.type.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <div class="radio">
            Error
            <input
              type="radio"
              id="error"
              value="error"
              v-model="formResponses.type"
              @blur="$v.formResponses.type.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <div class="radio">
            Info
            <input
              type="radio"
              id="info"
              value="info"
              v-model="formResponses.type"
              @blur="$v.formResponses.type.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <div class="radio">
            Warning
            <input
              type="radio"
              id="warning"
              value="warning"
              v-model="formResponses.type"
              @blur="$v.formResponses.type.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
        </div>

        <p
          class="group-field-msg"
          v-if="$v.formResponses.type.$dirty"
          :class="{
            hidden: $v.formResponses.type.required
          }"
        >
          Please select a type for the log entry!
        </p>
      </div>
      <input type="submit" value="Submit" class="btn" />
      {{ this.passedMessage }}
    </form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";
import DescriptionTextArea from "../form/form-elements/DescriptionTextArea";
// used to prevent UI covering user input when field has been completed
const hasValueLength = value => value.length >= 1;
const strDefPattern = helpers.regex("strDefPattern", /^[\d+\w+^.^-]+$/);
let newPost = {};

export default {
  name: "PostForm",
  components: {
    DescriptionTextArea
  },
  props: {
    passedMessage: {
      type: String
    },
    resultSwitch: {
      type: Boolean
    }
  },
  data() {
    return {
      uiState: "submit issue",
      noErrors: false,
      formResponses: {
        namespace: "",
        name: "",
        type: null,
        description: ""
      },
      hasFocus: false
    };
  },
  validations: {
    formResponses: {
      namespace: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(200),
        hasValueLength,
        strDefPattern
      },
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(200),
        hasValueLength,
        strDefPattern
      },
      type: {
        required
      }
    }
  },
  methods: {
    cleanInputs: function(event) {
      const element = event.target;
      const dataKey = element.name;
      Object.keys(this.formResponses).forEach(key => {
        if (key === dataKey) {
          return (this.formResponses[dataKey] = element.value
            .replace(/\s/g, ".")
            .toLowerCase());
        }
      });
    },
    collectInputs: function() {
      this.noErrors = !this.$v.formResponses.$invalid;
      newPost = {
        namespace: this.formResponses.namespace,
        name: this.formResponses.name,
        type: this.formResponses.type,
        description: this.formResponses.description
      };
      if (this.noErrors) {
        this.uiState = "form submitted!";
        // send up to parent
        this.$emit("handlePost", newPost);
      } else {
        console.warn("There is a form submission error: ", newPost);
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
<style lang="scss" src="@/styles/_form.scss" scoped></style>
<style lang="scss" scoped>
.form-wrapper {
  border: 1px $color2 solid;
  margin-bottom: $spacingLarge;
  overflow-y: hidden;
  padding: $spacingLarge;

  &.rollup-form {
    height: 100px;
    transition: height 0.75s ease-in;
  }

  &:not(.rollup-form) {
    height: 100%;
    transition: height 0.75s;
  }

  @include for-size(desktop-up) {
    &.rollup-form,
    &:focus-within {
      height: inherit;
    }
  }
}
.btn {
  display: inline-block;
  border: none;
  background-color: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
}
</style>
