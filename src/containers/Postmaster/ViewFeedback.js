import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useTheme } from "@mui/material";

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    // Fetch feedback data from Firestore
    const fetchData = async () => {
      try {
        const feedbacksCollection = collection(db, "Feedback");
        const querySnapshot = await getDocs(feedbacksCollection);

        console.log("HAHAHAHAHAHAHAHAHAHAHA");
        const fetchedFeedbacks = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.Name || "",
            email: data.Email || "",
            feedback: data.Feedback || "",
            ratings: data.Rating || 0,
            date: data.Date || "",
            isRead: data.isRead || false,
          };
        });

        setFeedbacks(fetchedFeedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchData();
  }, []);

  const markAsRead = async (index) => {
    try {
      // Update the 'isRead' field for the feedback in Firestore
      const feedbackToUpdate = feedbacks[index];
      const feedbackRef = doc(db, "Feedback", feedbackToUpdate.id);
      await updateDoc(feedbackRef, {
        isRead: true,
        readTimestamp: serverTimestamp(),
      });

      // Update the local state
      const updatedFeedbacks = [...feedbacks];
      updatedFeedbacks[index].isRead = true;
      setFeedbacks(updatedFeedbacks);
    } catch (error) {
      console.error("Error marking feedback as read:", error);
    }
  };

  // Separate read and unread feedbacks
  const readFeedbacks = feedbacks.filter((feedback) => feedback.isRead);
  const unreadFeedbacks = feedbacks.filter((feedback) => !feedback.isRead);

  return (
    <div style={{ padding: "20px", width: "95%" }}>
      <h2>Customer Feedback</h2>
      {unreadFeedbacks.map((feedback, index) => (
        <div
          key={feedback.id || index}
          style={{
            backgroundColor: theme.palette.background.feedbacks,
            padding: "20px",
            margin: "10px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            fontSize: "18px",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          <div>
            <strong>Name:</strong> {feedback.name}
          </div>
          <div>
            <strong>Email:</strong> {feedback.email}
          </div>
          <div>
            <strong>Feedback:</strong> {feedback.feedback}
          </div>
          <div>
            <strong>Ratings:</strong> {"⭐".repeat(feedback.ratings)}
          </div>
          <div>
            <strong>Date:</strong> {feedback.date}
          </div>
          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => markAsRead(index)}
              disabled={feedback.isRead}
            >
              Mark as Read
            </button>
          </div>
        </div>
      ))}
      {readFeedbacks.map((feedback, index) => (
        <div
          key={feedback.id || index}
          style={{
            backgroundColor: theme.palette.background.feedbacksRead,
            padding: "20px",
            margin: "10px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            fontSize: "18px",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          <div>
            <strong>Name:</strong> {feedback.name}
          </div>
          <div>
            <strong>Email:</strong> {feedback.email}
          </div>
          <div>
            <strong>Feedback:</strong> {feedback.feedback}
          </div>
          <div>
            <strong>Ratings:</strong> {"⭐".repeat(feedback.ratings)}
          </div>
          <div>
            <strong>Date:</strong> {feedback.date}
          </div>
          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <span style={{ color: "brown" }}>Seen</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewFeedback;
