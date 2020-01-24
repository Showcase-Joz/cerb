<template>
  <div>
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
          <a>Sign up</a>
        </div>
      </form>
    </transition>

    <transition name="fade">
      <form v-if="signedIn" id="logoutForm" @submit.prevent="signOut">
        <!-- {{ this.$store.state.user }} -->
        <h3>You are now logged i as user</h3>
        <em>{{ this.$store.state.session }}</em>
        <br />
        <!-- <strong>{{ this.$store.getters.collectSessionToken }}</strong> -->
        <div class="submit">
          <input type="submit" value="Logout" class="btn btn-submit" />
        </div>
      </form>
    </transition>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { Auth } from "aws-amplify";
const hasValueLength = value => value.length >= 1;

export default {
  name: "formInput",
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
  methods: {
    signIn: function() {
      Auth.signIn(this.formResponses.username, this.formResponses.password)
        .then(user => {
          console.log(user);
          this.$store.state.signedIn = !!user;
          this.$store.state.user = user;
          this.signedIn = true;
          this.$store.state.token = user.signInUserSession.idToken.jwtToken;
          this.currentUserInfo();
        })
        .catch(err => console.log(err));
    },
    signOut: function() {
      Auth.signOut()
        .then(data => {
          this.$store.state.signedIn = !!data;
          this.$store.state.user = null;
          console.log(data);
          this.signedIn = false;
        })
        .catch(err => console.log(err));
    },
    currentUserInfo: function() {
      Auth.currentSession()
        .then(sessionData => {
          console.log(sessionData);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss" src="@/styles/_form.scss" scoped></style>
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

#logoutForm {
  height: 320px;
  position: relative;

  & .submit {
    bottom: 0;
    position: absolute;
    transform: translateX(50%);
    width: 50%;
  }
}

.btn {
  align-self: end;
  border: none;
  background-color: #555;
  color: #fff;
  display: inline-block;
  grid-area: submit;
  font-size: larger;
  height: min-content;
  padding: 7px 20px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
}
.btn-submit {
  background-color: $color1;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave {
  // opacity: 1;
}
.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
</style>
