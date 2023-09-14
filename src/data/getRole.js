import { getFirestore, doc, getDoc } from "firebase/firestore";

async function getUserRole(userId) {
  try {
    const db = getFirestore();
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      console.error(`No such user!: ${userId}`);
      return null;
    }
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
}

export default getUserRole;
