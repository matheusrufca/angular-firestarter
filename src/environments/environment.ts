// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCC6BU5ufoN-frSuAs2j_5LZA7ZHVpaXTY",
    authDomain: "pwa-dummy-boilerplate.firebaseapp.com",
    databaseURL: "https://pwa-dummy-boilerplate.firebaseio.com",
    projectId: "pwa-dummy-boilerplate",
    storageBucket: "pwa-dummy-boilerplate.appspot.com",
    messagingSenderId: "250182784680"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
