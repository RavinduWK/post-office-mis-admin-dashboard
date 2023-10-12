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

export async function fetchPostOfficeRegions() {
  try {
    const user = auth.currentUser;
    console.log("User:", user);
    if (!user) {
      console.error("No user logged in!");
      return [];
    }

    // Fetch the recipient's document
    const recipientDocRef = doc(db, "employees", user.uid);
    const recipientDocSnap = await getDoc(recipientDocRef);
    console.log("Recipient Data:", recipientDocSnap.data());

    if (!recipientDocSnap.exists()) {
      console.error("Recipient not found!");
      return [];
    }

    // Fetch the postoffice field from the supervisor's document
    const postOfficeId = recipientDocSnap.data().postoffice;

    // Fetch the corresponding document from the Postoffice collection
    const postOfficeDocRef = doc(db, "Postoffice", postOfficeId);
    const postOfficeDocSnap = await getDoc(postOfficeDocRef);

    if (!postOfficeDocSnap.exists()) {
      console.error("Post office not found!");
      return [];
    }

    // Return the Regions field
    console.log(postOfficeDocSnap.data().Regions);
    return postOfficeDocSnap.data().Regions;
  } catch (error) {
    console.error("Error fetching post office regions:", error);
    return [];
  }
}

export async function getAssignedPostman(
  recipientAddressId,
  postofficeRegions
) {
  const addressDocRef = doc(db, "Address", recipientAddressId);
  const addressDocSnapshot = await getDoc(addressDocRef);

  if (addressDocSnapshot.exists()) {
    const recipientRegionId = addressDocSnapshot.data().RegionID;

    // Check if the recipientRegionId is in postofficeRegions
    if (postofficeRegions.includes(recipientRegionId)) {
      const postmanQuery = query(
        collection(db, "employees"),
        where("role", "==", "postman"),
        where("region", "==", recipientRegionId)
      );
      const postmanQuerySnapshot = await getDocs(postmanQuery);

      if (postmanQuerySnapshot.docs.length > 0) {
        return postmanQuerySnapshot.docs[0].id;
      } else {
        return "Pending";
      }
    } else {
      return "Not Assigned";
    }
  }

  // If the addressDocSnapshot doesn't exist, you can return a default value or handle it accordingly.
  console.error("Recipient address not found!");
  return "Error"; // Or any other default value you'd like to use
}

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
  postOfficeRegions,
  securityNumber
) {
  const mailItemData = {
    ...formState,
    accepted_receptionist: receptionistID,
    type: type,
    delivery_attempts: [],
    timestamp: new Date(),
  };

  if (securityNumber) {
    mailItemData.security_number = securityNumber;
  }

  const addressDocRef = doc(db, "Address", formState.recipient_address_id);
  const addressDocSnapshot = await getDoc(addressDocRef);

  if (addressDocSnapshot.exists()) {
    const regionID = addressDocSnapshot.data().RegionID;
    console.log(regionID);
    console.log(postOfficeRegions);

    console.log(postOfficeRegions.includes(regionID));

    if (postOfficeRegions.includes(regionID)) {
      mailItemData.status = "To be delivered";
    } else {
      mailItemData.status = "To be dispatched";
    }
    mailItemData.assigned_postman = assignedPostman;

    return setDoc(doc(db, "MailServiceItem", mailId), mailItemData);
  }
}

export async function updateLatestMailId(newId) {
  const docRef = doc(db, "metadata", "mailService");
  return setDoc(docRef, { latestId: newId }, { merge: true });
}
