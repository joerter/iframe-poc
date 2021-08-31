/**
 * Require Browsersync
 */
const browserSync = require('browser-sync');


const app = browserSync.create('app');
const innerApp = browserSync.create('innerApp');

app.init({
    server: "app",
    files: ["app/*.html", "app/css/*.css"],
    port: 8080,
});

innerApp.init({
    server: "inner-app",
    files: ["inner-app/*.html", "inner-app/css/*.css"],
    port: 8081,
    ui: {
      port: 30004,
    },
    open: false
});
