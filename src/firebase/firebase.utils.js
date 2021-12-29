import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyAENNb5AM39eDnbq_REntt6VTexZ2Ummus",
  authDomain: "crwn-db-5b4f4.firebaseapp.com",
  projectId: "crwn-db-5b4f4",
  storageBucket: "crwn-db-5b4f4.appspot.com",
  messagingSenderId: "778032525364",
  appId: "1:778032525364:web:ce8a81b045237152485a61",
  measurementId: "G-JLY56EDK1R",
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // 1.if user dosent exist just return function wont do anything;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // 2. Setup a userRef using firestore.doc and the user unique id that we get from logging in
  const snapShot = await userRef.get();
  // 3. Setup a snapShot wich means fake object that we get from userRef.
  // wich includes a refrence exists and it shows true or false. also use await for userRef before snapshot

  if (!snapShot.exists) {
    // After that we check if snapshots exists is true wich means that users uid exist on the database,
    // Then we wanna create a user into our database.

    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // We get email and name from user object that logged in,create a date when we will upload it

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
      //after that we care the user on our database using userRef under the users specific id of the user and put the data inside
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
  // returning useRef if we need it anywhere.
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google auth and provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
//google
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
