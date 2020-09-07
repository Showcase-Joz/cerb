<template>
  <div>
    <!-- signin form -->
    <div id="login">
      <br />
      <h4>Login to Typhon</h4>
      <br />
      <form @keyup.enter="usersignin">
        <div class="form-group">
          <div
            class="input-with-label email"
            :class="{
              invalid: $v.signinEmail.$error && $v.signinEmail.$dirty,
              valid:
                (!$v.signinEmail.$error && $v.signinEmail.$dirty) ||
                !$v.signinEmail.$invalid
            }"
          >
            <label
              for="email"
              :class="{
                hasValue: $v.signinEmail.hasValueLength
              }"
              >Email</label
            >
            <input
              v-model="signinEmail"
              type="email"
              name="email"
              @blur="$v.signinEmail.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <span class="form-field-msg" v-if="!$v.signinEmail.minLength">
            Your email is more than
            {{ $v.signinEmail.$params.minLength.min }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.signinEmail.maxLength">
            Your email is less than
            {{ $v.signinEmail.$params.maxLength.max }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.signinEmail.email">
            {{
              !$v.signinEmail.minLength || !$v.signinEmail.maxLength
                ? "and"
                : "Your"
            }}
            email address looks malformed!
          </span>
          <span
            class="form-field-msg"
            v-if="!$v.signinEmail.required && $v.signinEmail.$dirty"
            >Your email shouldn't be empty!</span
          >
        </div>

        <div class="form-group">
          <div
            class="input-with-label password"
            :class="{
              invalid: $v.signinPassword.$error && $v.signinPassword.$dirty,
              valid:
                (!$v.signinPassword.$error && $v.signinPassword.$dirty) ||
                !$v.signinPassword.$invalid
            }"
          >
            <label
              for="password"
              :class="{
                hasValue: $v.signinPassword.hasValueLength
              }"
              >Password</label
            >
            <input
              v-model="signinPassword"
              type="password"
              name="password"
              @blur="$v.signinPassword.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <span class="form-field-msg" v-if="!$v.signinPassword.minLength">
            Your password is
            {{ $v.signinPassword.$params.minLength.min }}
            characters or longer.
          </span>
          <span class="form-field-msg" v-if="!$v.signinPassword.maxLength">
            Your password is less than
            {{ $v.signinPassword.$params.maxLength.max }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.signinPassword.pasDefPattern">
            {{
              !$v.signinPassword.minLength || !$v.signinPassword.maxLength
                ? "and"
                : "Your"
            }}
            password looks malformed!
          </span>
          <span
            class="form-field-msg"
            v-if="!$v.signinPassword.required && $v.signinPassword.$dirty"
            >Your password is empty, duh!</span
          >
        </div>
        <div class="form-group">
          <Notice v-if="this.showNotice" />
        </div>
        <div class="form-group">
          <button
            class="btn-sign-small-auth-valid"
            :disabled="
              ($v.signinEmail.$error && $v.signinEmail.$dirty) ||
                ($v.signinPassword.$error && $v.signinPassword.$dirty) ||
                this.spinner
            "
            @click="usersignin"
            type="submit"
          >
            Sign In
            <LoadingSpinner v-if="this.spinner" />
          </button>
        </div>
      </form>
      <transition appear name="fade-in">
        <ErrorOutput />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  email,
  required,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";
import ErrorOutput from "../authorisation/helpers/ErrorOutput";
import Notice from "../helpers/NoticeOutput";
import LoadingSpinner from "../helpers/LoadingSpinner";
// used to prevent UI covering user input when field has been completed
const hasValueLength = value => value.length >= 1;
const pasDefPattern = helpers.regex(
  "pasDefPattern",
  /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,200}$/
);
export default {
  name: "signin",
  components: {
    LoadingSpinner,
    ErrorOutput,
    Notice
  },
  beforeMount() {
    if (this.registerConfirmEmail !== "") {
      this.signinEmail = this.registerConfirmEmail;
    }
  },
  data() {
    return {
      signinEmail: "",
      signinPassword: "",
      loading: false,
      hasFocus: false,
      successURL: "<router-link to='/login'>About</router-link>"
    };
  },
  validations: {
    signinEmail: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(200),
      hasValueLength,
      email
    },
    signinPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(200),
      hasValueLength,
      pasDefPattern
    }
  },
  methods: {
    async usersignin() {
      // check both fields are filled in
      this.loading = true;
      await this.$store;
      this.$store
        .dispatch("authorisation/signin", {
          email: this.signinEmail,
          password: this.signinPassword
        })
        .then(() => {
          if (this.authUser) {
            this.$store.dispatch("updateNotice", null);
            this.$store.dispatch("spinner", false);
            this.$router.push("/");
          }
        });
      this.loading = false;
      return false;
    },
    onFocus() {
      this.hasFocus = true;
    },
    onBlur() {
      this.hasFocus = false;
    }
  },
  computed: {
    ...mapGetters({
      authUser: "authorisation/authUser",
      registerConfirmEmail: "authorisation/registerConfirmEmail",
      showNotice: "showNotice",
      spinner: "spinner"
    })
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
<style lang="scss" src="@/styles/animation/_fade-in.scss" scoped></style>
<style lang="scss" scoped>
#login {
  display: block;

  form {
    .input-with-label {
      min-height: 50px;
    }
  }
}
</style>
