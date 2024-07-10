
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyCgU4EX5wBrd9Vy7l6zGXb2LGC_9uKNDBA",
    authDomain: "task-management-system-10ec8.firebaseapp.com",
    databaseURL: "https://task-management-system-10ec8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "task-management-system-10ec8",
    storageBucket: "task-management-system-10ec8.appspot.com",
    messagingSenderId: "456912992733",
    appId: "1:456912992733:web:70e3de6442449fd2bede34",
    measurementId: "G-WFFZNYTQ20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);