import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAhdtSbJxT5vWILaPJpXyl7YI9s--NnKB8",
  authDomain: "todo-app-9e63e.firebaseapp.com",
  projectId: "todo-app-9e63e",
  storageBucket: "todo-app-9e63e.appspot.com",
  messagingSenderId: "328218786856",
  appId: "1:328218786856:web:124316d40239a05d16c91d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
