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
            const listPreview = {
                id: docRef.id,
                title,
                description,
                timeCreated,
                listArr,
            };
            addToUsersLists(user, listPreview);
            return docRef.id;
        } catch (e) {
            console.error('Error adding doc: ', e);
        }
    } else {
        console.log('List empty');
    }
}

async function addToUsersLists(user, listPreview) {
    if (!user) {
        return undefined;
    }

    let id = user.uid;

    const data = await getUsersData(id);
    if (data.lists) {
        data.lists.push(listPreview);
    }
    const userRef = doc(db, 'users', id);
    setDoc(
        userRef,
        {
            user,
            lists: data.lists,
        },
        { merge: true }
    );
    console.log('Adding to users list', listPreview);
}

async function getUsersData(id) {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data());
        return docSnap.data();
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

export { setFirestoreList, getFirestoreList, getUsersData };
