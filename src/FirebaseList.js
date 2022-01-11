import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC_om31A8pKat201vUtBJuPdW05uymiKkc',
    authDomain: 'you-should-watch.firebaseapp.com',
    projectId: 'you-should-watch',
    storageBucket: 'you-should-watch.appspot.com',
    messagingSenderId: '397958811506',
    appId: '1:397958811506:web:c652412b1b286a1168d7eb',
    measurementId: 'G-RX73GFVCC7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function setFirestoreList(listArr) {
    if (listArr.length > 0) {
        try {
            const docRef = await addDoc(collection(db, 'lists'), { listArr });
            console.log('Document added, ID: ', docRef.id);
            return docRef.id;
        } catch (e) {
            console.error('Error adding doc: ', e);
        }
    } else {
        console.log('List empty');
    }
}

async function getFirestoreList(ref) {
    const docRef = doc(db, 'lists', ref);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().listArr;
    } else {
        console.log('Doesnt exist');
        return [];
    }
}

export { setFirestoreList, getFirestoreList };
