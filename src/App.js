import { useRef, useCallback, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker
} from "@react-google-maps/api";

import Search from './Search.js';

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

//Menara Maybank
const center = {
  lat: 3.1475463703411526,
  lng: 101.69949228179496,
};

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [position, setPosition] = useState(center);

  //const [history, setPosition] = useState([]);
  //first part, display. after user select place from dropdown, push the selection, place name (description) into [history array]
  //how to display the list on ui (to do list)
  //second part, interaction. make the list clickable, when click will move marker to desired location - 1, onClick

  //refactor, remove unnecessary variables, cleanup - 2
  //convert every function into arrow function, remove function change to const
  //split components into different file (list.js), search.js
  //remove unnecessary React keyword.

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    setPosition({ lat, lng });
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <h1>Assignment</h1>

      <Search panTo={panTo} />
      
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onLoad={onMapLoad}
        >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}

export default App;