<template>
  <div class="about page">
    <h1>About Typhon UI</h1>
    <br />
    <h3>Development Log</h3>
    <div class="log-wrapper">
      <ul>
        <li>
          <details class="update">
            <summary>14/04/20</summary>
            <ol>
              <li>
                added a modal component with a bit of variable automation in the
                css based on modal type [success, danger, warning].
              </li>
              <li>
                added event filter (search) so user can narrow down content based on description. also shows conditional count in event static card (top left one).
              </li>
              <li>
                added action button spinner animation while awaiting api
                response
              </li>
              <li>
                hooked the modal into delete actions on the namespace and name
                views (the only deleteable content).
              </li>
              <li>re-wrote some stuff - search, methods and actions.</li>
              <li>
                removed some console bugs caused by the auto highlight feature
                when arary item was deleted.
              </li>
              <li>
                updated the "create" box (NS &amp; N) with a better (small
                mobile) breakpoint. improved layout and added spinner animation
                when awaiting api response.
              </li>
              <li>removed all outline styles; will reapply as UX demands/1</li>
              <li>refactored methods that pass-through the modal</li>
              <li>improved modal conditional handling</li>
              <li>tidied up namespaces.vue and names.vue</li>
            </ol>
          </details>
        </li>
        <li>
          <details class="update">
            <summary>03/04/20</summary>
            <ol>
              <li>
                set initial filter method to desc date. ++ ceated "...ago"
                default timestamp element view.
              </li>
            </ol>
          </details>
        </li>
        <li>
          <details class="update">
            <summary>00/00/00</summary>
            <ol>
              <li>DUMMY</li>
            </ol>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  mounted() {
    setTimeout(() => {
      const active = document.querySelector("details");
      active.setAttribute("open", "");
    }, 2500);
  }
};
</script>

<style lang="scss" scoped>
.log-wrapper {
  display: grid;
  grid-template-columns: 0.8fr;
  justify-content: center;
  padding-top: 5rem;

  & ul {
    list-style-type: none;
    & > li {
      border-bottom: $color2 dashed 1px;
      border-bottom-left-radius: 15px;
      border-top-left-radius: 20px;
      border-left: $color1 solid 3px;
      margin-bottom: $spacingDefault;
      padding: $spacingDefault calc(#{$spacingDefault} / 2);
      text-align: start;
      width: 100%;
    }
  }

  details {
    cursor: pointer;

    &[open] summary {
      border-bottom: $color1 dashed 2px;
    }

    &:not([open]) {
      opacity: 0.3;
    }

    summary {
      border-bottom: 1px solid $unknown;
      width: max-content;
    }
    & ol {
      counter-reset: update;
      list-style-type: none;

      & li {
        margin-left: $spacingDefault;

        &::before {
          counter-increment: update;
          content: counter(update) ").";
        }
      }
    }
  }
}
</style>
