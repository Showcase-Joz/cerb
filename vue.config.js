module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/_variables.scss";'
      }
    }
  },

  productionSourceMap: false,

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: "default",
      overrideEndpoint: false,
      region: "eu-west-1",
      bucket: "typhon-ui",
      createBucket: true,
      staticHosting: true,
      staticIndexPage: "index.html",
      staticErrorPage: "index.html",
      assetPath: "dist",
      assetMatch: "**",
      deployPath: "/",
      acl: "authenticated-read",
      pwa: true,
      pwaFiles: "index.html,service-worker.js,manifest.json",
      enableCloudfront: false,
      pluginVersion: "4.0.0-rc3",
      uploadConcurrency: 5
    }
  }
};
