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

  const addressDocRef = doc(db, "Address", formState.receiver_address_id);
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

export async function fetchMailItems(postofficeRegions) {
  console.log(postofficeRegions);

  // Step 1: Fetch all mail items of the specified types
  const mailItemsQuery = query(
    collection(db, "MailServiceItem"),
    where("type", "in", ["normal post", "registered post", "logi post"])
  );
  const mailItemsSnapshot = await getDocs(mailItemsQuery);
  const allMailItems = mailItemsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  // Step 2 and 3: Filter mail items based on the RegionID from the Address collection
  const filteredMailItems = [];
  for (let item of allMailItems) {
    console.log("Processing receiver_address_id:", item.receiver_address_id);

    // Skip items with an undefined receiver_address_id
    if (!item.receiver_address_id) {
      console.warn("Skipped item with undefined receiver_address_id:", item);
      continue; // Skip to the next iteration of the loop
    }

    const addressDocRef = doc(db, "Address", item.receiver_address_id);
    const addressDocSnapshot = await getDoc(addressDocRef);
    if (addressDocSnapshot.exists()) {
      const regionID = addressDocSnapshot.data().RegionID;
      if (postofficeRegions.includes(regionID)) {
        filteredMailItems.push(item);
      }
    } else {
      console.warn(
        "Address not found for receiver_address_id:",
        item.receiver_address_id
      );
    }
  }

  return filteredMailItems;
}

export async function fetchPostmenForPostOffice(postOfficeId) {
  const postmenQuery = query(
    collection(db, "employees"),
    where("role", "==", "postman"),
    where("postoffice", "==", postOfficeId)
  );
  const postmenSnapshot = await getDocs(postmenQuery);
  return postmenSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function fetchSupervisorPostOfficeId() {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user logged in!");
    }

    // Fetch the supervisor's document from the employees collection
    const supervisorDocRef = doc(db, "employees", user.uid);
    const supervisorDocSnap = await getDoc(supervisorDocRef);

    if (!supervisorDocSnap.exists()) {
      throw new Error("Supervisor not found!");
    }

    // Retrieve the postoffice field from the supervisor's document
    return supervisorDocSnap.data().postoffice;
  } catch (error) {
    console.error("Error fetching supervisor's post office ID:", error);
    return null;
  }
}

export async function fetchEmployeeNameById(employeeId) {
  try {
    // Fetch the employee's document using the provided ID
    const employeeDocRef = doc(db, "employees", employeeId);
    const employeeDocSnap = await getDoc(employeeDocRef);

    if (!employeeDocSnap.exists()) {
      throw new Error("Employee not found!");
    }

    // Retrieve the name field from the employee's document
    return employeeDocSnap.data().name;
  } catch (error) {
    console.error("Error fetching employee's name:", error);
    return null;
  }
}

export async function updateAssignedPostman(itemId, postmanId) {
  try {
    // Reference to the specific mail item by its ID
    const mailItemRef = doc(db, "MailServiceItem", itemId);

    // Update the assigned_postman field with the provided postmanId
    await setDoc(mailItemRef, { assigned_postman: postmanId }, { merge: true });

    console.log(`Mail item ${itemId} updated with postman ${postmanId}`);
  } catch (error) {
    console.error("Error updating assigned postman:", error);
    throw error;
  }
}
