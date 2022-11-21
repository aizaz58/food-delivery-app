
import {getApp,getApps,initializeApp}from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyDS7O8ecbfNCjQUL0Is8JDFOrQnyUj8WtE",
    authDomain: "food-delivery-app-1c578.firebaseapp.com",
    databaseURL: "https://food-delivery-app-1c578-default-rtdb.firebaseio.com",
    projectId: "food-delivery-app-1c578",
    storageBucket: "food-delivery-app-1c578.appspot.com",
    messagingSenderId: "805120485459",
    appId: "1:805120485459:web:808c1c2ac16a10dba03ea6",
    measurementId: "G-PDXVHDJ4KJ"
  };

  const app= getApps.length>0? getApp():initializeApp(firebaseConfig)
  const fireStore=getFirestore(app)
  const storage=getStorage(app)

  export {app,fireStore,storage}