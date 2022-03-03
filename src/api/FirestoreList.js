import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
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
initializeApp(firebaseConfig);
const db = getFirestore();

async function setFirestoreList(title, description, listArr, user) {
    const timeCreated = Date.now();
    if (listArr.length > 0) {
        try {
            const docRef = await addDoc(collection(db, 'lists'), {
                title,
                description,
                listArr,
                user,
                timeCreated,
            });
            console.log('Document added, ID: ', docRef.id);
            addToUsersLists(user, docRef.id);
            return docRef.id;
        } catch (e) {
            console.error('Error adding doc: ', e);
        }
    } else {
        console.log('List empty');
    }
}

async function addToUsersLists(user, listRef) {
    let id;

    if (user) {
        id = user.uid;
    } else {
        user = null;
        id = 'default';
        console.log('Added list to non-logged in users list');
    }

    const listArr = await getUsersLists(id);
    listArr.push(listRef);
    const userRef = doc(db, 'users', id);
    setDoc(
        userRef,
        {
            user,
            lists: listArr,
        },
        { merge: true }
    );
    console.log('Adding to users list', listRef);
}

async function getUsersLists(id) {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data());
        return docSnap.data().lists;
    } else {
        console.log('User: ' + id + ' does not have any lists');
        return [];
    }
}

async function getFirestoreList(ref) {
    const docRef = doc(db, 'lists', ref);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log('Doesnt exist');
        return {};
    }
}

export { setFirestoreList, getFirestoreList };
