import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { ref, onValue, off } from "firebase/database";
import { realtimeDB, db } from "../../config/firebase";
import InfoBox from "../../components/CustomComponents/InfoBox";

const MonitorPostman = () => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [lastClickedMarkerId, setLastClickedMarkerId] = useState(null);

  const fetchEmployeeDetails = async (postmanId) => {
    const employeeRef = doc(db, "employees", postmanId);
    const employeeDoc = await getDoc(employeeRef);

    if (employeeDoc.exists()) {
      return employeeDoc.data();
    } else {
      console.error("No such document!");
      return null;
    }
  };

  useEffect(() => {
    const userLocationRef = ref(realtimeDB, "userLocation");

    const listener = onValue(
      userLocationRef,
      (snapshot) => {
        const locationsData = [];
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          locationsData.push({
            id: childSnapshot.key,
            lat: data.lat,
            lng: data.long,
          });
        });
        setLocations(locationsData);
      },
      (error) => {
        console.error("Error fetching user locations:", error);
      }
    );

    return () => off(userLocationRef, "value", listener);
  }, [realtimeDB]);

  useEffect(() => {
    if (lastClickedMarkerId) {
      fetchEmployeeDetails(lastClickedMarkerId).then((data) => {
        setEmployeeDetails(data);
      });
    }
  }, [lastClickedMarkerId]);

  useEffect(() => {
    if (maps && map && locations.length > 0) {
      markers.forEach((marker) => marker.setMap(null));

      const newMarkers = locations.map((location) => {
        const isGreen = location.id === lastClickedMarkerId;
        const markerColor = isGreen ? "green" : "red"; // Set marker color based on whether it's the last clicked marker
        const marker = new maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          title: location.id,
          icon: {
            url: `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`, // Use markerColor for icon color
          },
          map: map,
        });

        marker.addListener("click", () => {
          setLastClickedMarkerId(location.id); // Update the last clicked marker ID
        });

        return marker;
      });

      setMarkers(newMarkers);

      const bounds = new maps.LatLngBounds();
      newMarkers.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });
      map.fitBounds(bounds);
    }
  }, [locations, maps, map, lastClickedMarkerId]);

  const handleInfoBoxClose = () => {
    setLastClickedMarkerId(null); // Clear the last clicked marker when the info box is closed
    setEmployeeDetails(null);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          setMap(map);
          setMaps(maps);
        }}
      ></GoogleMapReact>
      {employeeDetails && (
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <InfoBox
            location={
              locations.find((loc) => loc.id === lastClickedMarkerId) || {}
            }
            employeeData={employeeDetails}
            onClose={handleInfoBoxClose}
          />
        </div>
      )}
    </div>
  );
};

export default MonitorPostman;
