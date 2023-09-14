import React from "react";

const ViewFeedback = () => {
  const feedbacks = [
    {
      name: "Alice",
      email: "alice@example.com",
      feedback: "Great service!",
      ratings: 5,
      date: "2023-09-10",
      isRead: false,
    },
    {
      name: "Bob",
      email: "bob@example.com",
      feedback: "Average experience.",
      ratings: 3,
      date: "2023-09-09",
      isRead: false,
    },
    {
      name: "Charlie",
      email: "charlie@example.com",
      feedback: "I loved the friendly staff!",
      ratings: 4,
      date: "2023-09-08",
      isRead: false,
    },
    {
      name: "Dave",
      email: "dave@example.com",
      feedback: "Not satisfied with the service.",
      ratings: 2,
      date: "2023-09-07",
      isRead: false,
    },
    {
      name: "Eve",
      email: "eve@example.com",
      feedback: "Excellent!",
      ratings: 5,
      date: "2023-09-06",
      isRead: false,
    },
  ];

  const markAsRead = (index) => {
    feedbacks[index].isRead = true;
    console.log(`Feedback from ${feedbacks[index].name} marked as read`);
  };

  return (
    <div style={{ padding: "20px", width: "95%" }}>
      <h2>Customer Feedback</h2>
      {feedbacks.map((feedback, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            margin: "10px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            fontSize: "18px",
            marginBottom: "20px",
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
          <button
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: feedback.isRead ? "#ccc" : "#28a745",
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
      ))}
    </div>
  );
};

export default ViewFeedback;
