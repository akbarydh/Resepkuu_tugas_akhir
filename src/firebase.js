import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1SZVfKh6R1_1uDI3FlG9jqahIIFAlr74",
    authDomain: "resepku-54d4d.firebaseapp.com",
    projectId: "resepku-54d4d",
    storageBucket: "resepku-54d4d.firebasestorage.app",
    messagingSenderId: "422185880659",
    appId: "1:422185880659:web:a3ecd97c66fc6f83b88aa6"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export default app; // Ekspor default