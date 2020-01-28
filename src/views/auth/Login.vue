<template>
  <div>
    <h3>You are now logged {{ !signedIn ? "out" : "in" }} as user</h3>
    <transition name="fade">
      <form v-if="!signedIn" id="loginForm" @submit.prevent="signIn">
        <div class="form-group username">
          <div
            class="input-with-label"
            :class="{
              invalid: $v.formResponses.username.$error,
              valid:
                !$v.formResponses.username.$error &&
                $v.formResponses.username.$dirty
            }"
          >
            <label
              for="username"
              :class="{
                hasValue: $v.formResponses.username.hasValueLength
              }"
              >Username</label
            >
            <input
              v-model="formResponses.username"
              @blur="$v.formResponses.username.$touch()"
              type="text"
              name="username"
            />
          </div>
          <p
            class="form-field-msg"
            v-if="
              !$v.formResponses.username.required &&
                $v.formResponses.username.$dirty
            "
          >
            Username must not be empty!
          </p>
        </div>
        <div class="form-group password">
          <div
            class="input-with-label"
            :class="{
              invalid: $v.formResponses.password.$error,
              valid:
                !$v.formResponses.password.$error &&
                $v.formResponses.password.$dirty
            }"
          >
            <label
              for="password"
              :class="{
                hasValue: $v.formResponses.password.hasValueLength
              }"
              >Password</label
            >
            <input
              v-model="formResponses.password"
              @blur="$v.formResponses.password.$touch()"
              type="password"
              name="password"
            />
          </div>
          <p
            class="form-field-msg"
            v-if="
              !$v.formResponses.password.required &&
                $v.formResponses.password.$dirty
            "
          >
            Password must not be empty!
          </p>
        </div>

        <div class="submit">
          <input type="submit" value="Login" class="btn btn-submit" />
          <router-link to="/register">Register</router-link>
        </div>
      </form>
    </transition>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { required } from "vuelidate/lib/validators";
const hasValueLength = value => value.length >= 1;
export default {
  name: "login",
  data() {
    return {
      formResponses: {
        username: "joz@showcaseimagery.com",
        password: "!Wired1755"
      },
      signedIn: false
    };
  },
  validations: {
    formResponses: {
      username: {
        required,
        hasValueLength
      },
      password: {
        required,
        hasValueLength
      }
    }
  },
  created() {
    if (this.$store.state.signedIn) {
      this.signedIn = true;
    }
  },
  async beforeCreate() {
    try {
      await Auth.currentAuthenticatedUser()
        .then(user => {
          if (user) {
            user = this.$store.state.user = user;
            this.$store.state.signedIn = !!user;
            this.signedIn = !!user;
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    signIn: function() {
      Auth.signIn(this.formResponses.username, this.formResponses.password)
        .then(user => {
          // console.log(user);
          this.$store.state.signedIn = !!user;
          this.$store.state.user = user;
          this.signedIn = !!user;
          // this.currentUserInfo();
          console.warn("logged in!");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" src="@/styles/_form.scss" scoped></style>
<style lang="scss" src="@/styles/animations/_fade.scss" scoped></style>
<style lang="scss" src="@/styles/buttons/_defaultButton.scss" scoped></style>
<style lang="scss" scoped>
#loginForm {
  border: 1px $color2 solid;
  display: grid;
  grid-template-areas:
    "username"
    "password"
    "..."
    "..."
    "..."
    "submit";
  grid-template-columns: 1fr;
  grid-template-rows: repeat(
    auto-fill,
    minmax(auto, minmax(max-content, 50px))
  );
  grid-gap: 1rem;
  height: 320px;
  margin: $spacingLarge auto;
  max-width: max-content;
  padding: $spacingLarge;

  @include for-size(phone-small) {
    padding: $spacingDefault;
  }

  & .username {
    grid-area: username;
  }

  & .password {
    grid-area: password;
  }

  & .submit {
    grid-area: submit;

    & * {
      display: grid;
      grid-template-columns: 1fr;
      width: 100%;
    }

    & > :first-of-type {
      margin-bottom: calc(#{$spacingDefault} / 3);
    }

    & a {
      color: $color1;
      font-size: smaller;
      text-transform: lowercase;
    }
  }
}
</style>
