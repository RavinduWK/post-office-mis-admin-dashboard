import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import InfoBox from "../../components/CustomComponents/InfoBox";

const GoogleMap = () => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [lastClickedMarker, setLastClickedMarker] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  const locations = [
    {
      lat: 5.949135252879287,
      lng: 80.54365186921235,
      name: "Mr. Saman Perera",
      email: "nimal.bandara@example.com",
      contact_number: "+94 71 123 4567",
    },
    {
      lat: 5.950020954763154,
      lng: 80.5468920023313,
      name: "Mr. Anura Jayawardena",
      email: "anura.jayawardena@example.com",
      contact_number: "+94 71 234 5678",
    },
    {
      lat: 5.949615453266514,
      lng: 80.54456382431822,
      name: "Mr. Priyantha Silva",
      email: "priyantha.silva@example.com",
      contact_number: "+94 71 345 6789",
    },
    {
      lat: 5.948679314215682,
      lng: 80.5418576940095,
      name: "Mr. Sunil Fernando",
      email: "sunil.fernando@example.com",
      contact_number: "+94 71 456 7890",
    },
    {
      lat: 5.950488841526736,
      lng: 80.5409039336791,
      name: "Mr. Lakshman Perera",
      email: "lakshman.perera@example.com",
      contact_number: "+94 71 567 8901",
    },
  ];

  useEffect(() => {
    if (lastClickedMarker) {
      markers.forEach((marker) => {
        marker.setIcon(null);
      });
      lastClickedMarker.setIcon({
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      });
    }
  }, [lastClickedMarker, markers]);

  const handleCloseInfoBox = () => {
    if (lastClickedMarker) {
      lastClickedMarker.setIcon(null);
    }
    setSelectedLocation(null);
  };

  const handleApiLoaded = (map, maps) => {
    setMap(map);
    setMaps(maps);

    const newMarkers = locations.map((location) => {
      const marker = new maps.Marker({
        position: location,
        map,
        title: location.name,
      });

      const infoWindow = new maps.InfoWindow({
        content: `<h4>${location.name}</h4>`,
      });

      marker.addListener("click", () => {
        setLastClickedMarker(marker);
        setSelectedLocation(location);
      });

      marker.addListener("mouseover", () => {
        infoWindow.open(map, marker);
      });

      marker.addListener("mouseout", () => {
        infoWindow.close();
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={locations[0]}
        defaultZoom={16}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      ></GoogleMapReact>
      {selectedLocation && (
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <InfoBox location={selectedLocation} onClose={handleCloseInfoBox} />
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
