import { useState, useEffect } from "react";
import { query, onSnapshot, collection, where } from "firebase/firestore"; // Ensure you have firebase imports set up
import { db } from "../config/firebase"; // Adjust path to your firebase config file

export const useAddressSuggestions = (city) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (city) {
      const q = query(collection(db, "Address"), where("City", "==", city));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const suggestions = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const formattedAddress = `${data.HouseNo}, ${data.Address_line_1}, ${data.Address_line_2}, ${data.Address_line_3}, ${data.City}`;
          suggestions.push(formattedAddress);
        });
        setSuggestions(suggestions);
      });

      return () => unsubscribe();
    }
  }, [city]);

  return suggestions;
};
