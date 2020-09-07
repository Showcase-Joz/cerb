<template>
  <div class="nav-wrapper">
    <div
      class="button_container"
      :class="{ active: this.navOpen }"
      id="toggle"
      @click="handleNav"
    >
      <span class="top"></span>
      <span class="middle"></span>
      <span class="bottom"></span>
    </div>
    <div class="overlay" :class="{ open: this.navOpen }" id="overlay">
      <nav id="nav" class="overlay-menu" @click="handleClose()">
        <router-link to="/">Home</router-link>
        <router-link id="dashboard" to="/dashboard">Dashboard</router-link>
        <router-link to="/get">Get</router-link>
        <router-link to="/post">Post</router-link>
        <router-link to="/about">About</router-link>
        <!-- log state button -->
        <router-link id="log-state-off" v-if="!authUser" to="/login"
          >Login</router-link
        >
        <router-link id="log-state-on" v-if="authUser" to="/logout"
          >Logout</router-link
        >
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TopNav",
  data() {
    return {
      navOpen: false
    };
  },
  methods: {
    handleNav: function() {
      this.navOpen = !this.navOpen;
    },
    handleClose: function() {
      if (this.navOpen) {
        setTimeout(() => {
          this.handleNav();
        }, 150);
      }
    }
  },
  computed: {
    ...mapGetters({
      authUser: "authorisation/authUser"
    })
  }
};
</script>

<style lang="scss" scoped>
.button_container {
  position: fixed;
  top: 1rem;
  left: 1rem;
  height: 27px;
  width: 35px;
  cursor: pointer;
  z-index: 9999;
  transition: opacity 0.25s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 0.7;
  }

  // how the button looks when active
  &.active {
    .top {
      transform: translateY(11px) translateX(0) rotate(45deg);
      background: $unknown;
    }
    .middle {
      opacity: 0;
      background: $unknown;
    }

    .bottom {
      transform: translateY(-11px) translateX(0) rotate(-45deg);
      background: $unknown;
    }
  }

  // how the button looks by default
  span {
    background: $color1;
    border: none;
    height: 5px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.35s ease;
    cursor: pointer;

    &:nth-of-type(2) {
      top: 11px;
    }

    &:nth-of-type(3) {
      top: 22px;
    }
  }
}

// full screen cover for nav - HIDDEN
.overlay {
  position: fixed;
  background: $color2;
  top: 0;
  left: 0;
  width: 100%;
  height: 0%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.35s, visibility 0.35s, height 0.35s;
  overflow: hidden;

  // full screen cover for nav - VISIBLE
  &.open {
    opacity: 1;
    visibility: visible;
    height: 100%;
    z-index: 9998;

    // li {
    // 	animation: fadeInRight 0.5s ease forwards;
    // 	animation-delay: 0.35s;

    // 	&:nth-of-type(2) {
    // 		animation-delay: 0.4s;
    // 	}
    // 	&:nth-of-type(3) {
    // 		animation-delay: 0.45s;
    // 	}
    // 	&:nth-of-type(4) {
    // 		animation-delay: 0.5s;
    // 	}
    // }
  }

  #nav {
    align-items: center;
    display: grid;
    font-size: large;
    grid-gap: 3rem;
    grid-template-rows: repeat(auto-fit, minmax(50px, auto));
    grid-template-columns: repeat(2, 1fr);
    height: 80vh;
    justify-content: center;
    margin: 12vh 6vw;

    a {
      align-items: center;
      // background-color: shade($color2, $shade25);
      color: white;
      display: grid;
      font-size: calc(#{$font-normal} * 2);
      height: 100%;
      letter-spacing: $letter-spacing;
      position: relative;
      text-decoration: none;
      top: calc(#{$matched-linespacing} * -1);
      width: 100%;
      -webkit-tap-highlight-color: transparent;

      &::before {
        animation: animate-menu-item-out 0.8s
          cubic-bezier(0.895, 0.03, 0.685, 0.22);
        background-color: $color1;
        border-radius: $borderRadius;
        content: "";
        @include position-center;
        top: $matched-linespacing;
        transform: scale(0, 0);
        transition: all 0.7s linear 0.2;
        z-index: -1;
      }
      &:hover::before {
        animation: animate-menu-item 0.5s cubic-bezier(0.895, 0.03, 0.685, 0.22);
        border: $color2 double 6px;
        transform: scale(1, 1);
        transition: all 0.3s linear 0.2;
      }

      &::after {
        animation: animate-menu-item-line-out 0.6s ease-in;
        content: "";
        border-bottom: solid 2px $color2;
        @include position-center;
        transition: all 0.25s ease-in-out;
        z-index: -1;
      }
      &:hover::after {
        animation: animate-menu-item-line 0.8s ease-out forwards 0.5s;
        transition: all 0.5s ease-in-out 1.2s;
      }
    }
  }
}

@keyframes animate-menu-item {
  0% {
    border: none;
    opacity: 0;
    transform: scale(0.01, 0.005);
  }
  60% {
    opacity: 1;
    transform: scale(1, 0.005);
  }
  90% {
    border: initial;
    transform: scale(1, 1.1);
  }
  93% {
    transform: scale(1, 0.93);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes animate-menu-item-out {
  0% {
    transform: scale(1, 1);
  }
  20% {
    transform: scale(1, 0.93);
  }
  55% {
    transform: scale(1, 1.1);
  }
  75% {
    opacity: 1;
    transform: scale(1, 0.005);
  }
  100% {
    opacity: 0;
    transform: scale(0.01, 0.005);
  }
}

@keyframes animate-menu-item-line {
  0% {
    transform: scaleX(0)
      translateY(calc(-50% + (#{$matched-linespacing} / 1.65)));
  }
  100% {
    transform: scaleX(0.75)
      translateY(calc(-50% + (#{$matched-linespacing} / 1.65)));
  }
}

@keyframes animate-menu-item-line-out {
  0% {
    transform: scaleX(0.75)
      translateY(calc(-50% + (#{$matched-linespacing} / 1.65)));
  }
  100% {
    transform: scaleX(0)
      translateY(calc(-50% + (#{$matched-linespacing} / 1.65)));
  }
}

// @include for-size(tablet-portrait-up) {
// .nav-wrapper #nav {
// 	align-items: center;
// 	display: grid;
// 	font-size: medium;
// 	grid-template-columns: repeat(auto-fit, minmax(max-content, 50px));
// 	justify-content: center;
// 	padding: 15px 20px 0px;

// 		font-size: large;
// 		grid-gap: 3px;
// 		grid-template-rows: repeat(auto-fit, minmax(max-content, 50px));
// 		grid-template-columns: repeat(2, 1fr);

// 		padding: 5px;

// 		& > * {
// 			align-items: center;
// 			display: grid;
// 			height: 50px;

// 			&:hover {
// 				background-color: $color2;
// 				color: $color1;
// 			}
// 		}

// 	a {
// 		color: inherit;
// 		font-weight: bold;
// 		padding: 0 5px;
// 		position: relative;
// 		text-decoration: none;
// 		z-index: 1;

// 		&::before {
// 			background-color: $color1;
// 			content: "";
// 			display: block;
// 			height: 100%;
// 			position: absolute;
// 			transform: scale(0, 1);
// 			transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.72, 1.775);
// 			width: 100%;
// 			z-index: 0;
// 		}

// 		&:hover::before {
// 			left: 0;
// 			transform: scale(1, 1);
// 			transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.72, 1.775);
// 			z-index: -1;
// 		}

// 		&.router-link-exact-active {
// 			color: $color1;
// 			cursor: not-allowed;
// 		}

// 		&.router-link-exact-active:hover {
// 			color: $color2;
// 			text-decoration: line-through;
// 		}

// 		&.router-link-exact-active:hover::before {
// 			border: none;
// 		}

// 		@include for-size(phone) {
// 			padding: initial;

// 			&:hover {
// 				color: tint($color2, $tint100);
// 				text-decoration: none;
// 			}
// 		}

// 		@include for-size(tablet-landscape-up) {
// 			&::before {
// 				content: none;
// 			}

// 			&:hover::before {
// 				content: none;
// 			}

// 			&::after {
// 				background-color: white;
// 				content: "";
// 				display: block;
// 				height: 2px;
// 				position: initial;
// 				transition: width 0.3s;
// 				width: 0;
// 				z-index: initial;
// 			}

// 			&:hover::after {
// 				transition: width 0.3s;
// 				width: 100%;
// 			}

// 			&.router-link-exact-active:hover {
// 				color: shade($color1, $shade10);

// 				&::after {
// 					background-color: shade($color1, $shade10);
// 				}
// 			}
// 		}
// 	}

// 	[id^="log-state"] {
// 		display: inline-block;
// 		position: absolute;
// 		right: 1rem;

// 		@include for-size(phone) {
// 			display: grid;
// 			grid-column-start: 2;
// 			grid-row-end: 1;
// 			position: relative;
// 			right: initial;
// 		}
//   }
// }
// }

// possibly have dash button as double width
// #dashboard {
// 	grid-column-start: 1;
// 	grid-column-end: 3;
// 	grid-row-start: 1;
//       grid-row-end:auto;
// }

[id^="log-state"] {
  display: inline-block;
  grid-column-start: 2;
  grid-row-end: 1;
  position: absolute;
  // right: 1rem;

  // @include for-size(phone) {
  // 	display: grid;
  // 	grid-column-start: 2;
  // 	grid-row-end: 1;
  // 	position: relative;
  // 	right: initial;
  // }
}
</style>
