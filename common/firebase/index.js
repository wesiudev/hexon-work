import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const db = getFirestore(app);

const storage = getStorage(app);

const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

export async function pushSession(data) {
  const productDocRef = doc(collection(db, "sessions"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function pushAssistantMessage(data) {
  const productDocRef = doc(collection(db, "assistantMessages"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}

export async function getPublicSessions() {
  const productDocRef = collection(db, "publicSessions");
  const querySnapshot = await getDocs(productDocRef);
  const sessions = [];
  querySnapshot.forEach((doc) => {
    sessions.push({ ...doc.data(), id: doc.id });
  });
  return sessions;
}
export async function pushSessionMessage(data, sessionId) {
  const productDocRef = doc(collection(db, "publicSessions"), sessionId);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const newData = {
      ...currentData,
      messages: [...currentData.messages, data],
    };
    await updateDoc(productDocRef, newData);
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
      messages: [data],
    });
    return productDocRef;
  }
}
export async function createSession(data) {
  const productDocRef = doc(collection(db, "publicSessions"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      messages: [],
    });
    return productDocRef;
  }
}

export async function getAssistantMessages() {
  try {
    const leadsRef = collection(db, "assistantMessages");
    const leadsSnapshot = await getDocs(leadsRef);
    const leads = [];

    leadsSnapshot.forEach((doc) => {
      const lead = doc.data();
      lead.id = doc.id;
      leads.push(lead);
    });

    return leads;
  } catch (error) {
    console.error("Error getting leads:", error);
    throw error;
  }
}

export async function pushSecondLead(data) {
  const productDocRef = doc(collection(db, "secondLeads"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}

export async function getSecondLeads() {
  try {
    const leadsRef = collection(db, "secondLeads");
    const leadsSnapshot = await getDocs(leadsRef);
    const leads = [];

    leadsSnapshot.forEach((doc) => {
      const lead = doc.data();
      lead.id = doc.id;
      leads.push(lead);
    });

    return leads;
  } catch (error) {
    console.error("Error getting leads:", error);
    throw error;
  }
}
export async function pushLead(data) {
  const productDocRef = doc(collection(db, "leads"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function pushMessage(data) {
  const productDocRef = doc(collection(db, "messages"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function getLeads() {
  try {
    const leadsRef = collection(db, "leads");
    const leadsSnapshot = await getDocs(leadsRef);
    const leads = [];

    leadsSnapshot.forEach((doc) => {
      const lead = doc.data();
      lead.id = doc.id;
      leads.push(lead);
    });

    return leads;
  } catch (error) {
    console.error("Error getting leads:", error);
    throw error;
  }
}
export async function getMessages() {
  try {
    const leadsRef = collection(db, "messages");
    const leadsSnapshot = await getDocs(leadsRef);
    const messages = [];

    leadsSnapshot.forEach((doc) => {
      const lead = doc.data();
      lead.id = doc.id;
      messages.push(lead);
    });

    return messages;
  } catch (error) {
    console.error("Error getting leads:", error);
    throw error;
  }
}
export async function updateMessage(id, data) {
  const docRef = doc(collection(db, "messages"), id);
  await updateDoc(docRef, data);
  return docRef;
}
export async function updateSecondLead(id, data) {
  const docRef = doc(collection(db, "secondLeads"), id);
  await updateDoc(docRef, data);
  return docRef;
}

export async function deleteSecondLead(id) {
  const docRef = doc(collection(db, "secondLeads"), id);
  await deleteDoc(docRef);
  return docRef;
}
export async function updateLead(id, data) {
  const docRef = doc(collection(db, "leads"), id);
  await updateDoc(docRef, data);
  return docRef;
}

export async function deleteLead(id) {
  const docRef = doc(collection(db, "leads"), id);
  await deleteDoc(docRef);
  return docRef;
}
export async function updateApplication(id, data) {
  const docRef = doc(collection(db, "employees"), id);
  await updateDoc(docRef, data);
  return docRef;
}
export async function updateCourse(id, data) {
  const docRef = doc(collection(db, "courses"), id);
  await updateDoc(docRef, data);
  return docRef;
}
export async function pushCourse(data) {
  const productDocRef = doc(collection(db, "courses"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function pushEmployee(data) {
  const productDocRef = doc(collection(db, "employees"), data.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...data,
      createdAt: Date.now(),
    });
    return productDocRef;
  }
}
export async function getLinks() {
  const linksRef = collection(db, "links");
  const linksSnapshot = await getDocs(linksRef);
  const links = [];

  linksSnapshot.forEach((doc) => {
    const link = doc.data();
    link.id = doc.id;
    links.push(link);
  });

  return links;
}
export async function getLinksById(id) {
  const linksRef = collection(db, "links");
  const linksSnapshot = await getDocs(linksRef);
  const links = [];

  linksSnapshot.forEach((doc) => {
    const link = doc.data();
    link.id = doc.id;
    links.push(link);
  });

  return links.find((link) => link.id === id);
}
export async function getInviteById(id) {
  const linksRef = collection(db, "links");
  const linksSnapshot = await getDocs(linksRef);
  const links = linksSnapshot.docs.map((doc) => doc.data());
  const datas = links.map((link) => link.data);
  return datas[0]?.filter((link) => link.link.includes(id))[0];
}
export async function pushLinks(data) {
  const linkDocRef = doc(collection(db, "links"), data.id);
  await setDoc(linkDocRef, {
    ...data,
    createdAt: Date.now(),
  });
  return linkDocRef;
}
export async function fetchLinks() {
  const linksRef = collection(db, "links");
  const querySnapshot = await getDocs(linksRef);
  const links = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return links;
}

function replaceById(array, newObj) {
  return array?.map((item) =>
    item.link.includes(newObj.link) ? newObj : item
  );
}

export async function updateLink(linkId, updatedLink) {
  const linksRef = collection(db, "links");
  const linksSnapshot = await getDocs(linksRef);
  const links = linksSnapshot.docs
    .map((doc) => doc.data())
    .filter((link) => link.data.some((l) => l.link.includes(linkId)));
  let newObject = {
    link: `https://hexon.work/invite/${linkId}`,
    ...updatedLink,
  };

  let updatedArray = replaceById(links[0]?.data, newObject);

  await updateDoc(doc(db, "links", links[0]?.id), {
    data: updatedArray,
  });
}

export async function deleteLink(id) {
  await deleteDoc(doc(db, "links", id));
}

export { provider, storage, auth, app };
