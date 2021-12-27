// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAa8PzXu7iXq2HX3ziv6l3Xn4hhgornBAU',
  authDomain: 'challenge--firabase.firebaseapp.com',
  databaseURL: 'https://challenge--firabase-default-rtdb.firebaseio.com',
  projectId: 'challenge--firabase',
  storageBucket: 'challenge--firabase.appspot.com',
  messagingSenderId: '445980019308',
  appId: '1:445980019308:web:158a9b395a5de6a739e649',
  measurementId: 'G-99KF7DPT8Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
