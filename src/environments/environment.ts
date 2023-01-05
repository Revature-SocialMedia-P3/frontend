// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {secrets} from "../../secrets";

export const environment = {
  production: false,
  withCredentials: true,
  baseUrl: "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
  },
  firebaseConfigAuth: {
    apiKey: secrets["auth-api-key"],
    authDomain: "revature-p3.firebaseapp.com",
    projectId: "revature-p3",
    storageBucket: "revature-p3.appspot.com",
    messagingSenderId: "820220163459",
    appId: "1:820220163459:web:eef72f7fca6a675e0632b6",
    measurementId: "G-QWDV21TNXQ"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
