# Typhon UI
######--(cerberusvue)

## Description
User Interface for Typhon. There is currently a CodePipleline in place that uses the last build as the S3 bucket reference.
___
## Environment setup

If you are happy with the command line, skip to the next section

<div style="margin: 30px 20px 15px; font-size: x-large;">OR</div>

```
npm install -g @vue/cli
```
Taken from [Vue CLI Docs](https://cli.vuejs.org/guide/installation.html)

>You may need to check for any environment variables within the file structure, as there **may** be instances that are local to yourself!

___
## Project setup
Download the repo to your local machine with...
```
ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/typhon-ui
```
...then (to install local dependencies), type...
```
npm install
```

___
### Compiles and hot-reloads for development
```
npm run serve
```

<div style="margin: 30px 20px 15px; font-size: x-large;">OR</div>

...when completed, type...
```
vue ui
```
...to initiate the interface.
Dashboard>>>Serve>>>Run Task, then Go to Task, to open in your browser

___
### Compiles and minifies for production
```
npm run build
```

___
### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
