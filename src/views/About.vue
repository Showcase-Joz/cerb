<template>
  <div class="about page">
    <h1>About Typhon UI</h1>
    <br />
    <h3>Development Log</h3>
    <div class="log-wrapper">
      <ul>
        <li>this is a log item 1</li>
        <li>this is a log item 2</li>
        <li>this is a log item 3</li>
        <li>this is a log item 4</li>
        <li>this is a log item 5</li>
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

  ul {
    counter-reset: update;
    list-style-type: none;

    li {
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
