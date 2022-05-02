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

    let userId = user.uid;

    let data = await getUsersData(userId);
    if (data.lists) {
        data.lists.push(listPreview);
    }
    const userRef = doc(db, 'users', userId);
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

// Remove a specific list from displaying on a user's lists page
async function removeFromUsersLists(user, listId) {
    if (!user) {
        return undefined;
    }

    let userId = user.uid;

    let data = await getUsersData(userId);
    let updatedList;

    if (data.lists) {
        updatedList = data.lists.filter((list) => list.id != listId);
    }

    const userRef = doc(db, 'users', userId);

    console.log('Updated user list, removed list Id:', listId);

    return setDoc(
        userRef,
        {
            user,
            lists: updatedList,
        },
        { merge: true }
    );
}

async function getUsersData(userId) {
    const docRef = doc(db, 'users', userId);
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

export {
    setFirestoreList,
    getFirestoreList,
    getUsersData,
    removeFromUsersLists,
};
