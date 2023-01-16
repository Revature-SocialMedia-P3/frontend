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
    'Access-Control-Allow-Origin': '*',
  },
  firebaseConfigNotification: {
    apiKey: "AIzaSyDw5x74A-5a15CS2eVm1D3cgUAbldoklOg",
    authDomain: "highscoreio.firebaseapp.com",
    projectId: "highscoreio",
    storageBucket: "highscoreio.appspot.com",
    messagingSenderId: "117107557485",
    appId: "1:117107557485:web:13019bbac818470c5d6b64",
    measurementId: "G-HCVFP0MHCH",
    vapidKey: "BI1RoYZ88s_GwCUr_NvEeW7StgIVzpe0G2HxOFCubWBQM3u7N_VfyLubHWfMHQuBtXw2_kCzzLi7m7eyG9wmrmw"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
