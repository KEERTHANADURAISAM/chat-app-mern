import {initializeApp} from 'firebase/app'
import {getAuth,GoogleAuthProvider } from 'firebase/auth'



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0eFhjV4mzKp20YCrBMFBLagadW3-_QBg",
    authDomain: "chat-app-c5254.firebaseapp.com",
    projectId: "chat-app-c5254",
    storageBucket: "chat-app-c5254.appspot.com",
    messagingSenderId: "900114585707",
    appId: "1:900114585707:web:449f408924d35a65cb392e"
  };

//   initialize app
const app = initializeApp(firebaseConfig)

const auth = getAuth();
const provider = new GoogleAuthProvider();

export {app, auth, provider}