import { initializeApp } from "firebase/app";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    connectAuthEmulator
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    connectFirestoreEmulator,
} from "firebase/firestore";
import { generateKeywords } from "./service";
import { AddDocument } from "./service";
// config
const firebaseConfig = {
    apiKey: "AIzaSyBGMNP1YJ6U6gkYeKVk-m0A6xnQ5vhxI_s",
    authDomain: "chat-app-c9efd.firebaseapp.com",
    projectId: "chat-app-c9efd",
    storageBucket: "chat-app-c9efd.appspot.com",
    messagingSenderId: "891911904916",
    appId: "1:891911904916:web:c999691e00e2c881c39e81",
    measurementId: "G-YS1PECK1XH"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
// config localhost 

// connectAuthEmulator(auth, "http://localhost:9099")


// if (window.location.hostname === 'localhost') {
//     connectFirestoreEmulator(db, 'localhost', 8080);
//     connectStorageEmulator(storage, "localhost", 9199);
// }

//  authentication-related function of google
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        // add value to dataBase
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await AddDocument('users', {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                photoURL: user.photoURL,
                keyWorks: generateKeywords(user.displayName)
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
        console.error(err.stack);
    }

};
export { signInWithGoogle, auth, db, storage } 
