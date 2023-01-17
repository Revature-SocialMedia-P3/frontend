export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: "http://highscoreappebs-env.eba-nf46h7px.us-east-2.elasticbeanstalk.com",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Authorization": <string>localStorage.getItem("Authorization"),
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
