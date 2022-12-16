import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3h0hacmfoIIqQvFq8DEY7ueljRBSXxqU",
  authDomain: "fir-starwars-9cb49.firebaseapp.com",
  projectId: "fir-starwars-9cb49",
  storageBucket: "fir-starwars-9cb49.appspot.com",
  messagingSenderId: "415393658167",
  appId: "1:415393658167:web:1f0d6f86dd27a868afd6b2",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getPeople = async () => {
  const querySnapshot = await getDocs(collection(db, "people"));
  const people = [];
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    people.push(doc.data());
  });
  return people;
};

export const addPerson = async (name, height, mass) => {
  try {
    const docRef = await addDoc(collection(db, "people"), {
      name,
      height,
      mass,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
