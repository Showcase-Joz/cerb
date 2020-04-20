<template>
  <label
    id="createNew"
    class="item item-create"
    tabindex="-1"
    v-on:keyup.enter.prevent="sendCreate"
    @keyup.esc="clearInputs"
  >
    <span class="create-title">
      Create a new
      <strong>{{ this.$parent.$parent.$data.id }}</strong>
      {{ this.$parent.$parent.$data.id === "Name" ? "for this namespace" : "" }}
    </span>
    <div class="form-group">
      <input
        v-model="formResponses.createNewItem"
        v-on:input="handleInput"
        @blur="$v.formResponses.createNewItem.$touch()"
        class="create-input"
        name="newItem"
        :placeholder="
          'Start typing here to create a new ' + this.$parent.$parent.$data.id
        "
        type="text"
      />
      <button
        class="add-created"
        :class="{
          invalid: $v.formResponses.createNewItem.$error,
          valid:
            !$v.formResponses.createNewItem.$error &&
            $v.formResponses.createNewItem.$dirty
        }"
        type="submit"
        @click="sendCreate($event)"
        :disabled="
          $v.formResponses.createNewItem.$error ||
            !$v.formResponses.createNewItem.$dirty ||
            this.spinner
        "
      >
        Add {{ this.$parent.$parent.$data.id }}
        <LoadingSpinner v-if="this.spinner" />
      </button>
    </div>
    <div class="errors">
      <p
        class="form-field-msg"
        v-if="!$v.formResponses.createNewItem.minLength"
      >
        Please add a New {{ this.$parent.$parent.$data.id }} with at least
        {{ $v.formResponses.createNewItem.$params.minLength.min }}
        characters.
      </p>
      <p
        class="form-field-msg"
        v-if="!$v.formResponses.createNewItem.maxLength"
      >
        Please add a New {{ this.$parent.$parent.$data.id }} with no more than
        {{ $v.formResponses.createNewItem.$params.maxLength.max }}
        characters.
      </p>
      <p
        class="form-field-msg"
        v-if="
          !$v.formResponses.createNewItem.required &&
            $v.formResponses.createNewItem.$dirty
        "
      >
        New {{ this.$parent.$parent.$data.id }} must not be empty!
      </p>
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
import { mapGetters } from "vuex";
import LoadingSpinner from "../helpers/LoadingSpinner";
const initialMeta = "metadata/";
// const andFilter = "?filter=";
const hasValueLength = value => value.length >= 1;
const strDefPattern = helpers.regex("strDefPattern", /^[\d+\w+^.^-]+$/);
export default {
  name: "CreateItem",
  components: {
    LoadingSpinner
  },
  data() {
    return {
      formResponses: {
        createNewItem: ""
      },
      passedNS: null
    };
  },
  validations: {
    formResponses: {
      createNewItem: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(200),
        hasValueLength,
        strDefPattern
      }
    }
  },
  methods: {
    handleInput: function(event) {
      const element = event.target;
      const value = element.value;
      this.$v.formResponses.createNewItem.$touch();

      return (this.formResponses.createNewItem = value
        .replace(/[^a-zA-Z0-9]/g, ".")
        .toLowerCase());
    },
    async sendCreate(event) {
      if (
        this.formResponses.createNewItem.length > 0 &&
        this.$parent.$parent.$data.id === "Namespace"
      ) {
        const createNsString =
          initialMeta + "namespaces/" + this.formResponses.createNewItem;
        await this.$store.dispatch("createItem/createNS", createNsString, {
          root: true
        });
        // // return FILTERED NS or CREATED NS as result
        // const fetchSearchedQuery =
        // 	initialMeta + "namespaces" + andFilter + this.formResponses.createNewItem;
        // this.$store.dispatch(
        // 	"updateNotice",
        // 	{
        // 		code: "valid",
        // 		message: `Filtering the Namespaces with ${this.formResponses.createNewItem}`
        // 	},
        // 	{ root: true }
        // );
        // this.$store.dispatch("namespace/getNS", fetchSearchedQuery);
        await this.blurCreate(event);
      } else if (
        this.formResponses.createNewItem.length > 0 &&
        this.$parent.$parent.$data.id === "Name"
      ) {
        const createNString =
          initialMeta +
          this.selectedNamespace +
          "/" +
          this.formResponses.createNewItem;
        await this.$store.dispatch("createItem/createN", createNString, {
          root: true
        });
        await this.blurCreate(event);
      } else {
        console.log("not sending data");
      }
    },
    clearInputs: function() {
      this.formResponses.createNewItem = "";
    },
    blurCreate(event) {
      setTimeout(() => {
        event.target.blur();
      }, 1500);
    }
  },
  computed: {
    ...mapGetters({
      selectedNamespace: "namespace/selectedNamespace",
      createdNamespace: "createItem/createdNamespace",
      createdName: "createItem/createdName",
      spinner: "spinner"
    })
  }
};
</script>
<style lang="scss" scoped>
.dashboard-main {
  .item.item-create {
    @mixin button-before {
      content: "";
      border-bottom: 1px solid white;
      bottom: -8px;
      right: 0px;
      position: absolute;
      transition: none;
      width: 100%;
    }

    background-color: shade($color2, $shade25);
    color: $color1;
    cursor: pointer;
    display: grid;
    grid-template-areas: "create-title";
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    opacity: 0.6;

    .create-title {
      grid-area: create-title;
    }

    .form-group {
      display: none;
      flex-direction: row;
      grid-area: form-group;
      position: relative;

      .create-input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid tint($color1, $tint100);
        bottom: -1px;
        color: tint($color1, $tint100);
        display: block;
        flex-grow: 2;
        font-size: large;
        margin: $spacingDefault;
        padding: calc(#{$spacingDefault} / 3);
        position: relative;

        &:focus {
          &::placeholder {
            opacity: 0.5;
          }
        }
        &::placeholder {
          color: tint($color2, $tint75);
          font-size: inherit;
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
        min-width: 160px;
        padding: 0 $spacingDefault;
        position: relative;
        right: $spacingDefault;
        text-align: start;
        text-transform: uppercase;

        &:focus {
          box-shadow: 0 0 2px 1.5px tint($color2, $tint100);
        }

        &:disabled,
        &:disabled:hover {
          background-color: tint($color2, $tint10);
          color: shade($color2, $shade75);
          font-weight: $heavy;
          opacity: 0.95;
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

        button {
          &:hover {
            background-color: tint($color2, $tint25);
          }
          &::before {
            @include button-before;
          }
          &:hover::before {
            @include button-before;
            bottom: -8px;
          }
          &:disabled {
            cursor: not-allowed;
          }
        }

        button.invalid {
          background-color: $invalid;
          bottom: 0px;
          cursor: not-allowed;
          text-decoration: line-through;
          transition: all 350ms ease-in;

          &::before {
            @include button-before;
            bottom: -8px;
          }
        }

        button.valid {
          background-color: $color2;
          color: tint($color2, $tint100);
          padding-right: 2.5rem;
          transition: all 350ms ease-in;

          &::before {
            @include button-before;
          }

          &::after {
            content: "{...}";
          }

          &:hover {
            background-color: $color2;
            color: tint($color1, $tint100);
            font-weight: $heavy;
            transition: all ease-in 250ms;
          }
        }

        @include for-size(phone-up) {
          flex-flow: wrap;
          justify-content: center;
          min-height: 140px;

          .create-input {
            border-bottom: none;
            flex-grow: 0;
            margin: 0;
            width: 95%;
          }

          .add-created {
            right: unset;
            text-align: center;
            width: 95%;
          }

          button.valid,
          button.invalid {
            &::before {
              border-bottom: none;
            }
          }
        }
      }

      .errors {
        display: block;

        .form-field-msg {
          color: tint($color2, $tint25);
          font-size: $font-normal;
          margin: 0;
          padding: $spacingDefault;
          text-align: right;
        }
      }
    }

    &:focus-within {
      button {
        &.add-created.invalid {
          bottom: -2px;
          transition: none;
        }
        &.add-created.valid {
          bottom: -2px;
          transition: none;
        }
        &:disabled {
          bottom: -2px;
          transition: none;
        }
      }
    }

    &:hover {
      button {
        &.add-created.invalid {
          bottom: -1px;
          transition: none;
        }
        &.add-created.valid {
          bottom: -1px;
          transition: none;
        }
        &:disabled {
          bottom: -1px;
          transition: none;
        }
      }
    }
  }
}
</style>
