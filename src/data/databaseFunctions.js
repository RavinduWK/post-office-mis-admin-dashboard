import {
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";

export async function getLatestMailId() {
  const docRef = doc(db, "metadata", "mailService");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().latestId + 1;
  } else {
    return 100000; // Default value if "metadata" document doesn't exist
  }
}

export async function createMailItem(
  mailId,
  formState,
  type,
  assignedPostman,
  receptionistID,
  securityNumber
) {
  const mailItemData = {
    ...formState,
    accepted_receptionist: receptionistID,
    type: type,
    assigned_postman: assignedPostman,
    delivery_attempts: [],
    status: "Pending",
    timestamp: new Date(),
  };

  if (securityNumber) {
    mailItemData.security_number = securityNumber;
  }

  return setDoc(doc(db, "MailServiceItems", mailId), mailItemData);
}

export async function getAssignedPostman(recipientAddressId) {
  const addressDocRef = doc(db, "Address", recipientAddressId);
  const addressDocSnapshot = await getDoc(addressDocRef);

  if (addressDocSnapshot.exists()) {
    const recipientRegionId = addressDocSnapshot.data().RegionID;
    const postmanQuery = query(
      collection(db, "employees"),
      where("role", "==", "postman"),
      where("region", "==", recipientRegionId)
    );
    const postmanQuerySnapshot = await getDocs(postmanQuery);

    if (postmanQuerySnapshot.docs.length > 0) {
      return postmanQuerySnapshot.docs[0].id;
    }
  }

  return "";
}

export async function fetchUserID() {
  try {
    const user = auth.currentUser;

    if (user) {
      return user.uid;
    } else {
      console.error("No user logged in!");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}