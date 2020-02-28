<template>
  <div class="get-view page">
    <div class="view-atfold">
      <h1>This is a GET page</h1>
      <p v-if="!resultBoolean">
        Please complete this form to GET data to the API for testing purposes
      </p>
    </div>

    <div class="split-view" :class="{ 'append-grid': this.resultBoolean }">
      <GetForm v-on:handleGet="retainGet" v-bind:resultSwitch="resultBoolean" />
      <GetFormOutput
        v-bind:passedGet="passedGet"
        v-bind:getResponse="getResponse"
        v-bind:resultSwitch="resultBoolean"
      />
    </div>
  </div>
</template>

<script>
import GetForm from "../components/form/GetForm";
import GetFormOutput from "../components/GetFormOutput";

export default {
  name: "Get",
  data() {
    return {
      resultBoolean: false,
      passedGet: {},
      getString: "",
      getQuery: "",
      getType: false,
      getResponse: {}
    };
  },
  components: {
    GetForm,
    GetFormOutput
  },
  methods: {
    retainGet: function(getObj) {
      this.passedGet = getObj[0];
      this.getType = getObj[1];
      this.setGetFetchVariables();
    },
    createGetString: function() {
      // this.getString = JSON.stringify(this.passedGet);
      // console.log(this.getString);
      const stagingBodyGetString = Object.keys(this.passedGet)
        .map(key => this.passedGet[key])
        .join("/");
      // console.log("stagingBodyGetString: ", stagingBodyGetString);
      return (this.getString = stagingBodyGetString);
    },
    createGetQuery: function() {
      const stagingBodyGetQuery = Object.keys(this.passedGet)
        .map(key => key + "=" + this.passedGet[key])
        .join("&");
      // console.log("stagingBodyGetQuery: ", stagingBodyGetQuery);

      return (this.getQuery = stagingBodyGetQuery);
    },
    setGetFetchVariables: function() {
      const stringSuffix = this.createGetString();
      const querySuffix = this.createGetQuery();

      if (this.getType === false) {
        const stringPrefix = "events/";
        this.fetchGet(stringPrefix, stringSuffix);
      } else if (this.getType === true) {
        const queryPrefix = "events?";
        this.fetchGet(queryPrefix, querySuffix);
      }
    },
    fetchGet: function(prefix, suffix) {
      console.log("test ", prefix + suffix);

     this.$http.get(prefix + suffix).then(
        response => {
          console.log(response);
          if (response.status === 200) {
            this.resultBoolean = true;
            this.getResponse = response;
          } else if (response.status !== 200) {
            this.resultBoolean = false;
          }
        },
        error => {
          console.log("Error: ", error);
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.get-view {
  padding: $spacingDefault;
}
</style>
