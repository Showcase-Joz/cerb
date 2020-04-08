<template>
  <div class="about page">
    <h1>About Typhon UI</h1>
    <br />
    <h3>Development Log</h3>
    <div class="log-wrapper">
      <ul>
        <li>
          <details class="update">
            <summary>00/00/00</summary>
            DUMMY
          </details>
        </li>
        <li>
          <details class="update">
            <summary>08/04/20</summary>
            <ol>
              <li>added a modal component with a bit of variable automation in the css based on modal type [success, danger, warning].</li>
              <li>hooked the modal into delete actions on the namespace and name views (the only deleteable content).</li>
              <li>re-wrote some stuff - search, methods and actions.</li>
              <li>removed soem console bugs caused by the auto highlight feature when arary item was deleted.</li>
            </ol>
          </details>
        </li>

        <li>
          <details class="update">
            <summary>03/04/20</summary>
            ++ set initial filter method to desc date.
            ++ ceated "...ago" default timestamp element view
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.log-wrapper {
	display: grid;
	grid-template-columns: 0.8fr;
	justify-content: center;
	padding-top: 5rem;

	& ul {
		counter-reset: update;
		list-style-type: none;

		& li {
			border-bottom: $color2 dashed 1px;
			border-bottom-left-radius: 15px;
			border-top-left-radius: 20px;
			border-left: $color1 solid 3px;
			margin-bottom: $spacingDefault;
			padding: $spacingDefault calc(#{$spacingDefault} / 2);
			text-align: start;
			width: 100%;

			&::before {
				counter-increment: update;
				content: counter(update);
				left: -20px;
				position: absolute;
			}
		}
	}
}
</style>
