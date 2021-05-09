import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAUqpEiCTVAPGVB_9z3YG3pjQ4pijqBRHg',
  authDomain: 'omdb-nominations-ce73c.firebaseapp.com',
  databaseURL: 'https://omdb-nominations-ce73c-default-rtdb.firebaseio.com',
  projectId: 'omdb-nominations-ce73c',
  storageBucket: 'omdb-nominations-ce73c.appspot.com',
  messagingSenderId: '687596246105',
  appId: '1:687596246105:web:f7e43d8a7594fd8e818d48',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export async function getNominationLeaders() {
  const nomsSnapshot = await db.ref().once('value');
  const noms = await nomsSnapshot.val();
  return noms;
}

export function submitNoms(state) {
  const userRef = db.ref();
  userRef.update(state);
}
