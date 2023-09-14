import { getFirestore, doc, getDoc } from "firebase/firestore";

async function getUserRole(userId) {
  try {
    const db = getFirestore();
    const userDoc = await getDoc(doc(db, "employees", userId));
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      console.error("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user role:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    return null;
  }
}

export default getUserRole;
