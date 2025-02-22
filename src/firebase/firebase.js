import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBsaFHoXVL6755FKF3mX_Zj5Mwizuatggg",
    authDomain: "fastcentralhub.firebaseapp.com",
    projectId: "fastcentralhub",
    storageBucket: "fastcentralhub.appspot.com",
    messagingSenderId: "799301595665",
    appId: "1:799301595665:web:d3a1f79f6ca161f58677b0",
    measurementId: "G-C2XBKD4KNV"
};


firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;