<template>
  <label class="item item-create">
    <span class="create-title">Create</span>
    <div class="form-group">
      <input
        v-model="formResponses.newNS"
        v-on:input="handleCreate"
        @blur="$v.formResponses.newNS.$touch()"
        class="create-input"
        name="namespace"
        placeholder="Create a new Namespace..."
        type="text"
      />
      <button
        class="add-created"
        :class="{
            invalid: $v.formResponses.newNS.$error,
            valid:
              !$v.formResponses.newNS.$error &&
              $v.formResponses.newNS.$dirty
          }"
        type="submit"
        @click="sendCreate"
        :disabled="$v.formResponses.newNS.$error"
      >Add</button>
    </div>
    <div class="errors">
      <p class="form-field-msg" v-if="!$v.formResponses.newNS.minLength">
        Please add a Namespace with at least
        {{ $v.formResponses.newNS.$params.minLength.min }}
        characters.
      </p>
      <p class="form-field-msg" v-if="!$v.formResponses.newNS.maxLength">
        Please add a Namespace with no more than
        {{ $v.formResponses.newNS.$params.maxLength.max }}
        characters.
      </p>
      <p
        class="form-field-msg"
        v-if="
            !$v.formResponses.newNS.required &&
              $v.formResponses.newNS.$dirty
          "
      >Namespace must not be empty!</p>
    </div>
  </label>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";
const initialMeta = "metadata/namespaces";
const hasValueLength = value => value.length >= 1;
const strDefPattern = helpers.regex("strDefPattern", /^[\d+\w+^.^-]+$/);
export default {
  name: "CreateItem",
  data() {
    return {
      formResponses: {
        newNS: ""
      }
    };
  },
  validations: {
    formResponses: {
      newNS: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(200),
        hasValueLength,
        strDefPattern
      }
    }
  },
  methods: {
    // select: function(event) {
    //         const targetId = event.target.childNodes;
    //         console.log(targetId); // returns 'foo'
    //     },
    handleCreate: function(event) {
      const element = event.target;
      const value = element.value;
      this.$v.formResponses.newNS.$touch();
      return (this.formResponses.newNS = value
        .replace(/\s/g, ".")
        .toLowerCase());
    },
    sendCreate: function() {
      if (this.formResponses.newNS !== null) {
        console.log("sending data", this.formResponses.newNS);
        this.$http.put(initialMeta + "/" + this.formResponses.newNS).then(
          response => {
            if (response.ok === true) {
              this.fetchNamespaces(initialMeta + "/" + this.formResponses.newNS);
            }
          }
        )
      } else {
        console.log("not sending data");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-main {
  .item.item-create {
    background-color: shade($color2, $shade25);
    color: $color1;
    cursor: default;
    display: grid;
    grid-template-areas: "create-title";
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    grid-template-columns: 1fr;
    opacity: 0.5;

    .create-title {
      grid-area: create-title;
    }

    .form-group {
      display: none;
      flex-direction: row;
      grid-area: form-group;
      position: relative;

      .create-input {
        border: none;
        border-bottom: 1px solid tint($color1, $tint100);
        background-color: transparent;
        color: tint($color1, $tint100);
        display: block;
        flex-grow: 2;
        font-size: large;
        // grid-area: create-input;
        margin: $spacingDefault;
        min-width: 95%;
        padding: calc(#{$spacingDefault} / 3);

        &:focus {
          outline: none;
        }
      }
      .add-created {
        background: $color2;
        border: none;
        border-radius: $borderRadius;
        color: tint($color1, $tint100);
        cursor: copy;
        height: 40px;
        letter-spacing: $letter-spacing;
        min-width: 40px;
        padding: 0 $spacingDefault;
        position: absolute;
        right: $spacingDefault;
        text-transform: uppercase;

        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px $neutral;
        }
      }
    }

    .errors {
      display: none;
    }

    &:hover,
    &:focus-within {
      background-color: $color1;
      color: tint($color1, $tint100);
      grid-template-areas:
        "create-title .."
        "form-group form-group";
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-column: 1 / span 2;
      grid-row: 1 / span 2;
      opacity: 1;
      transition: background-color 100ms ease-in;

      .create-title {
        font-size: $font-size-xl;
      }

      .form-group {
        display: flex;

        .create-input {
          margin-right: 130px;
        }

        button:disabled {
          cursor: not-allowed;
        }

        button.invalid {
          background-color: $invalid;
          cursor: not-allowed;
          text-decoration: line-through;
          transition: all 350ms ease-in;

          &:before {
            content: "";
            border-bottom: 1px solid white;
            bottom: -9px;
            right: 0px;
            position: absolute;
            transition: none;
            width: 120px;
          }
        }

        button.valid {
          background-color: tint($color2, $tint100);
          color: $color2;
          padding-right: 2.5rem;
          transition: all 350ms ease-in;

          &:before {
            content: "";
            border-bottom: 1px solid white;
            bottom: -9px;
            right: 0px;
            position: absolute;
            transition: none;
            width: 150px;
          }

          &:after {
            content: "{...}";
          }

          &:hover {
            background-color: $color2;
            color: tint($color1, $tint100);
            font-weight: 500;
            padding-right: $spacingLarge;
            transition: all ease-in 250ms;
          }
        }
      }

      .errors {
        display: block;

        .form-field-msg {
          color: tint($color2, $tint100);
          font-size: $font-normal;
          padding: $spacingDefault;
          text-align: right;
        }
      }
    }
  }
}
</style>