<template>
  <div class="about page">
    <h1>About Typhon UI</h1>
    <br />
    <h3>Development Log</h3>
    <div class="log-wrapper">
      <ul>
        <li>
          <details class="update">
            <summary>15/05/20</summary>
            <ol>
              <li>
                re-coloured come of the main colours, improving the contrasts
                slightly
              </li>
              <li>responsive styling for soft/filter icons</li>
              <li>
                updated search &amp; type components, adjusting to new layout
                (with icons)
              </li>
              <li>
                deisgned a few [static] icons for sort/filter, added to
                viewControls over 600px breakpoint
              </li>
              <li>replaced all the Auth component styles to match the app</li>
              <li>
                updated all of the Auth components with Vuelidate validations to
                match other form(s) functonality
              </li>
            </ol>
          </details>
        </li>
        <li>
          <details class="update">
            <summary>07/05/20</summary>
            <ol>
              <li>added transitions to filter/sort group</li>
              <li>added type only action buttons - code to follow</li>
              <li>
                created the three (additional) components needed for
                sort/filter, and added filterText to group
              </li>
              <li>
                created a set of UI buttons with various flavours and uses
              </li>
              <li>
                added total/count component to main nav elements which gives
                user an idea of the array lengths during each step of the
                process. also pre-requ for lazyload "more" items, again giving
                user feedback on current lengths.
              </li>
              <li>
                added a details view (based on lorenzo request). This view is
                allowed when an event has true/true on
                haslargedetails/weredetailsfound and the view will display the
                content of a detail - WHEN I CAN WORKOUT WHAT A DETAIL "SHOULD"
                ACTUALLY LOOK LIKE.
              </li>
              <li>
                refactored NS and N.vue methods to improve readability/usability
                (from dev prospective) and performance.
              </li>
              <li>added UX spinners to the create card and delete modal's</li>
              <li>
                refactored the highlighter (green ring around active/previously
                active card) which got rid of a few bugs and made it easier to
                add to future components too.
              </li>
              <li>
                added another "settings" button, based on certain viewports only
              </li>
            </ol>
          </details>
        </li>
        <li>
          <details class="update">
            <summary>24/04/20</summary>
            <ol>
              <li>
                added UX for response 200 on NS/N create - "data already exists"
              </li>
              <li>
                fixed a failed api call (bug) when returning to a previous (not
                last local) name.
              </li>
              <li>
                created outline framework for new sort/filter selector buttons -
                found next to the search feature
              </li>
              <li>
                added escape key to clear values in "search content" and
                "createNS/N" - shortcut keys
              </li>
              <li>
                improved some highlight styling on notice overlays, to aid user
                to understand the action. default timeout's now 2 seconds as
                well
              </li>
              <li>
                re-wrote currentNamespaces/Names getters to now include a
                filtered data value, which keeps original data in
                currentNamespaces/Names, while presenting the filtered results.
                removes necessity for additional api calls
              </li>
              <li>
                all searching (filter's) on Names/Events are now done locally
                (from cached data). saving on unnecessary XHR when displaying
                results. a step closes to PWA off-line mode!
              </li>
            </ol>
          </details>
        </li>
        <li>
          <details class="update">
            <summary>17/04/20</summary>
            <ol>
              <li>
                re-wrote a lot of the POST views/components; converting methods
                into actions; generally cleaning up the code and reducing file
                sizes
              </li>
              <li>debugged the post types error msg, no longer on show 24/7</li>
              <li>improved the post submit styling</li>
              <li>added loading spinner to post submit</li>
              <li>improved the UX on a post's sequence of actions</li>
              <li>
                added color styles to the noticeMessage {neutral (automatic
                action), invalid (failed action) and valid (user action)
              </li>
              <li>
                improved UX for erroring in the UI; user now has to clear an
                error overlay, giving more time for user to compute a failled
                action
              </li>
              <li>updated some base states to reflect above item's defaults</li>
              <li>
                added view scrollbars to about, in order to view off the page
                content
              </li>
            </ol>
            <hr />
            <ol>
              <li>
                NEED TO APPEND (TO AN ARRAY) POST ACTIONS IN THE POST VIEW SO
                THE USER CAN SEE A TRAIL OF PREVIOUS POST ACTIONS
              </li>
            </ol>
          </details>
        </li>
        <li>
          <details class="update">
            <summary>10/04/20</summary>
            <ol>
              <li>
                ALT + COMMAND (mac) now gives "search content" focus - shortcut
                keys
              </li>
              <li>
                added a modal component with a bit of variable automation in the
                css based on modal type [success, danger, warning].
              </li>
              <li>
                added event filter (search) so user can narrow down content
                based on description. also shows conditional count in event
                static card (top left one).
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
.about.page {
  height: 100%;
  overflow-y: overlay;
}
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
