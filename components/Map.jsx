import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";

function Map({ searchResults }) {
  const coordinates = searchResults.map((i) => ({
    longitude: i.long,
    latitude: i.lat,
  }));

  const center = getCenter(coordinates);
  const [location, setLocation] = useState({});
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 11,
    latitude: center.latitude,
    longitude: center.longitude,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/youssef36/ckuv3q7da4ulo18pccrwtgube"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((i) => (
        <div key={i.long}>
          <Marker
            longitude={i.long}
            offsetLeft={-20}
            offsetTop={-10}
            latitude={i.lat}
          >
            <p
              onClick={() => setLocation(i)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {location.long === i.long ? (
            <Popup
              onClose={() => setLocation({})}
              closeOnClick={true}
              latitude={i.lat}
              longitude={i.long}
            >
              {i.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
