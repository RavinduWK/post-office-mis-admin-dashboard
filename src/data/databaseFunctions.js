import {
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  getFirestore,
  getCountFromServer,
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

    if (postOfficeRegions.includes(regionID)) {
      mailItemData.status = "To be delivered";
    } else {
      mailItemData.status = "To be bundled";
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
  // Step 1: Fetch all mail items of the specified types
  const mailItemsQuery = query(
    collection(db, "MailServiceItem"),
    where("type", "in", ["normal post", "registered post", "logi post"]),
    where("status", "in", ["To be delivered", "Pending"])
  );

  const mailItemsSnapshot = await getDocs(mailItemsQuery);
  const allMailItems = mailItemsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  // Step 2 and 3: Filter mail items based on the RegionID from the Address collection and fetch address details
  const enhancedMailItems = [];

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
      const addressData = addressDocSnapshot.data();
      const regionID = addressData.RegionID;

      if (postofficeRegions.includes(regionID)) {
        enhancedMailItems.push({
          ...item,
          HouseNo: addressData.HouseNo,
          Address_line_1: addressData.Address_line_1,
          Address_line_2: addressData.Address_line_2,
          City: addressData.City,
        });
      }
    } else {
      console.warn(
        "Address not found for receiver_address_id:",
        item.receiver_address_id
      );
    }
  }

  return enhancedMailItems;
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

export async function updateAssignedPostmanAndStatus(itemId, postmanId) {
  try {
    // Reference to the specific mail item by its ID
    const mailItemRef = doc(db, "MailServiceItem", itemId);

    // Update the assigned_postman field with the provided postmanId and set the status to "assigned"
    await setDoc(
      mailItemRef,
      { assigned_postman: postmanId, status: "assigned" },
      { merge: true }
    );

    console.log(
      `Mail item ${itemId} updated with postman ${postmanId} and status set to assigned`
    );
  } catch (error) {
    console.error("Error updating assigned postman:", error);
    throw error;
  }
}

export async function fetchMainPostOfficeIdByDistrict(districtName) {
  const mainPostOfficeRef = doc(db, "MainPostOffice", districtName); // Directly use the district name as the UID
  const docSnapshot = await getDoc(mainPostOfficeRef);

  // If the document exists, return the ID from its data. Otherwise, return null.
  if (docSnapshot.exists()) {
    return docSnapshot.data().ID;
  }

  return null;
}

export async function updateMailItemStatus(mailItemId, newStatus) {
  const mailItemRef = doc(db, "MailServiceItem", mailItemId);
  await updateDoc(mailItemRef, { status: newStatus });
}

export async function fetchRatesForMailType(mailType) {
  const collectionRef = collection(db, "PostalRates");
  const queryRef = query(collectionRef, where("title", "==", "rates"));
  const snapshot = await getDocs(queryRef);

  if (snapshot.empty) {
    console.log("No matching documents.");
    return null;
  }

  let ratesData = null;
  snapshot.forEach((doc) => {
    if (doc.data()[mailType]) {
      ratesData = doc.data()[mailType];
    }
  });

  return ratesData;
}

export async function getEmployeeCount() {
  return (await getCountFromServer(collection(db, "employees"))).data().count;
}

export async function getMailCount() {
  return (await getCountFromServer(collection(db, "MailServiceItem"))).data()
    .count;
}

export async function getRegisteredAddresses() {
  return (await getCountFromServer(collection(db, "Address"))).data().count;
}

export async function getRegions() {
  return (await getCountFromServer(collection(db, "Region"))).data().count;
}

export async function getRevenueData() {
  const collectionRef = collection(db, "MailServiceItem");
  const queryRef = query(collectionRef);

  let normalPostRevenue = 0;
  let registeredPostRevenue = 0;
  let logiPostRevenue = 0;
  let fastTrackCourierRevenue = 0;
  let acceptedMoneyOrdersRevenue = 0;

  const snapshot = await getDocs(queryRef);
  if (snapshot.empty) {
    return [
      normalPostRevenue,
      registeredPostRevenue,
      logiPostRevenue,
      fastTrackCourierRevenue,
      acceptedMoneyOrdersRevenue,
    ];
  }

  const today = new Date();
  
  snapshot.forEach((doc) => {
    const data = doc.data();

    if(isSameDay(today, data.timestamp.toDate())){
      if (data.type === "normal post") {
        normalPostRevenue += parseInt(data.cost);
      } else if (data.type === "registered post") {
        registeredPostRevenue += parseInt(data.cost);
      } else if (data.type === "logi post") {
        logiPostRevenue += parseInt(data.cost);
      } else if (data.type === "fast track courier") {
        fastTrackCourierRevenue += parseInt(data.cost);
      } else if (data.type === "money order") {
        acceptedMoneyOrdersRevenue += parseInt(data.cost);
      }
    }
  });

  return [
    normalPostRevenue,
    registeredPostRevenue,
    logiPostRevenue,
    fastTrackCourierRevenue,
    acceptedMoneyOrdersRevenue,
  ];
}

export async function getTotalRevenue() {
  const collectionRef = collection(db, "MailServiceItem");
  const queryRef = query(collectionRef);

  const snapshot = await getDocs(queryRef);
  if (snapshot.empty) {
    return "0 LKR";
  }

  let revenue = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    revenue += parseInt(data.cost);
  });

  return revenue.toLocaleString("en-US") + " LKR";
}

export async function getCustomerCount() {
  const collectionRef = collection(db, "MailServiceItem");
  const queryRef = query(collectionRef);

  const snapshot = await getDocs(queryRef);
  if (snapshot.empty) {
    return "0";
  }

  let theSet = new Set();

  snapshot.forEach((doc) => {
    const data = doc.data();
    theSet.add(data.recipient_name);
    if (data.sender_name !== undefined) {
      theSet.add(data.sender_name);
    }
  });

  return theSet.size.toLocaleString("en-US");
}

export async function getDataForLineChart() {
  const collectionRef = collection(db, "MailServiceItem");

  let normalPostDates = [];
  let registeredPostDates = [];
  let logiPostDates = [];
  let fastTrackCourierDates = [];
  let acceptedMoneyOrdersDates = [];

  const queryRef = query(collectionRef);

  const snapshot = await getDocs(queryRef);
  if (snapshot.empty) {
    let nowDate = new Date();
    return [
      nowDate.getFullYear() +
        "/" +
        nowDate.getMonth() +
        "/" +
        nowDate.getDate(),
      1,
      [],
      [],
      [],
      [],
      [],
    ];
  }

  let minDate = new Date("2070-01-01");
  let maxDate = new Date("1970-01-01");

  snapshot.forEach((doc) => {
    const data = doc.data();
    const date = data.timestamp.toDate();

    if (minDate.getTime() > date.getTime()) {
      minDate = date;
      console.log(date);
      console.log(minDate);
    }
    if (maxDate.getTime() < date.getTime()) {
      maxDate = date;
    }

    if (data.type === "normal post") {
      normalPostDates.push(date);
    } else if (data.type === "registered post") {
      registeredPostDates.push(date);
    } else if (data.type === "logi post") {
      logiPostDates.push(date);
    } else if (data.type === "fast track courier") {
      fastTrackCourierDates.push(date);
    } else if (data.type === "money orders") {
      acceptedMoneyOrdersDates.push(date);
    }
  });

  let normalPostCount = [];
  let registeredPostCount = [];
  let logiPostCount = [];
  let fastTrackCourierCount = [];
  let acceptedMoneyOrdersCount = [];

  let checkUntilThisTime = new Date(maxDate.getTime());
  checkUntilThisTime.setHours(0);
  checkUntilThisTime.setMinutes(0, 0, 0);
  checkUntilThisTime.setDate(checkUntilThisTime.getDate() + 1);

  let i = 0;
  for (
    let currentDate = new Date(minDate.getTime());
    currentDate.getTime() < checkUntilThisTime.getTime();
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    let nCount = 0;
    let rCount = 0;
    let lCount = 0;
    let fCount = 0;
    let aCount = 0;

    normalPostCount.push(0);
    registeredPostCount.push(0);
    logiPostCount.push(0);
    fastTrackCourierCount.push(0);
    acceptedMoneyOrdersCount.push(0);

    for (let n = 0; n < normalPostDates.length; n++) {
      if (isSameDay(currentDate, normalPostDates[n])) {
        ++nCount;
      }
    }
    for (let r = 0; r < registeredPostDates.length; r++) {
      if (isSameDay(currentDate, registeredPostDates[r])) {
        ++rCount;
      }
    }
    for (let l = 0; l < logiPostDates.length; l++) {
      if (isSameDay(currentDate, logiPostDates[l])) {
        ++lCount;
      }
    }
    for (let f = 0; f < fastTrackCourierDates.length; f++) {
      if (isSameDay(currentDate, fastTrackCourierDates[f])) {
        ++fCount;
      }
    }
    for (let a = 0; a < acceptedMoneyOrdersDates.length; a++) {
      if (isSameDay(currentDate, acceptedMoneyOrdersDates[a])) {
        ++aCount;
      }
    }

    normalPostCount[i] = nCount;
    registeredPostCount[i] = rCount;
    logiPostCount[i] = lCount;
    fastTrackCourierCount[i] = fCount;
    acceptedMoneyOrdersCount[i] = aCount;

    ++i;
  }

  let returnArr = [];
  returnArr.push(
    minDate.getFullYear() +
      "/" +
      (minDate.getMonth() + 1) +
      "/" +
      minDate.getDate()
  );
  returnArr.push(
    Math.round((maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24) + 1)
  );
  returnArr.push(normalPostCount);
  returnArr.push(registeredPostCount);
  returnArr.push(logiPostCount);
  returnArr.push(fastTrackCourierCount);
  returnArr.push(acceptedMoneyOrdersCount);

  let nowDate = new Date();
  console.log(
    Math.round(
      (maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24) + 1
    ) +
      " : " +
      nowDate.getMonth() +
      " : " +
      maxDate +
      " : " +
      minDate
  );

  return returnArr;
}

export async function getDailyServices() {
  let retarr = [0, 0, 0, 0, 0, 0];
  const collectionRef = collection(db, "MailServiceItem");
  const queryRef = query(collectionRef);

  const snapshot = await getDocs(queryRef);
  if (snapshot.empty) {
    return retarr;
  }

  let nowDate = new Date();

  snapshot.forEach((doc) => {
    const data = doc.data();
    const date = data.timestamp.toDate();

    if (isSameDay(nowDate, date)) {
      if (data.type === "normal post") {
        retarr[0]++;
      } else if (data.type === "registered post") {
        retarr[1]++;
      } else if (data.type === "logi post") {
        retarr[2]++;
      } else if (data.type === "fast track courier") {
        retarr[3]++;
      } else if (data.type === "money order") {
        if(data.paid===false){
          retarr[4]++;
        }else if(data.paid===true){
          retarr[5]++;
        }
      }
    }
  });

  return retarr;
}

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
