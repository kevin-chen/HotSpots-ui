import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SpotCard from "../../components/Card/Card";

import "./home.css";

import axios from "axios";

export default function Home() {

  const [spots, setSpots] = useState(undefined);
  const [, setError] = useState(undefined);

  const [refresh] = useState(undefined);

  const history = useHistory();

  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  function navigateToPage(path) {
    history.push(path);
  }

  useEffect(() => {
    axios
      .get(`${apiServerUrl}/spots/list`) // Gets the spots from our api
      .then((response) => {
        //Waits for the response of the .get, once it gets the values it does below
        console.log(response.data);
        console.log("getting values"); // Remove later, testing
        if (response.data) {
          console.log("api sent data"); // Remove later, testing
          setSpots(response.data);
        }
        console.log("At the end"); // Remove later, testing
      })
      .catch((error) => {
        //If an error is thrown this catch puts up a warning instead
        console.log(error);
        console.log("You didnt get the value RIPS"); // Remove later, testing
        setError(error);
      });
  }, [refresh]);

  return (
    <body>
      <div className="home_header">          {/*Displays the title "Locations" and a back button */}
        <h1>HotSpots</h1>
        {isAuthenticated ? (
          <button
            className="page-button"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </button>
        ) : (
          <button onClick={() => loginWithRedirect()} className="page-button">
            Log In / Sign Up
          </button>
        )}
      </div>

      <div className="intro">
        <p className="quote">
          "Crowdsourcing study spaces for students by students"
        </p>
        <p className="dev-names">
          Tiffany Chan, Kevin Chen, Kevin Iza, Kathy Pan
        </p>
      </div>

      <div className="button-container">
        <button
          onClick={() => navigateToPage("/createspot")}
          className="page-button"
        >
          Add New Spot
        </button>
      </div>

      <div className="grid-container"> 
        {spots ? spots.map((spot) => (
          <div key={spot["_id"]["$oid"]} className="grid-item" onClick={() => navigateToPage(`/spots/${spot["_id"]["$oid"]}`)}>
            <SpotCard
              component={spot.component}
              height={spot.height}
              image={spot.spotImage}
              name={spot.spotName}
              address={spot.spotAddress}
            />
          </div>
        )) : (
          <div className="rooms-empty">
            <p>Sorry there are no Locations right now... Come back later </p>
          </div>
        )}
      </div>
      
      {/*
      <div className="button-container" >
        <button
          onClick={() => navigateToPage('/viewreviews')}
          className="page-button"
        >
          Check Reviews Page -- Remove this button later
        </button> 
      </div>
      */}

      {/*
      <div className="button-container" >
        <button
          onClick={() => navigateToPage('/updatespotfactors')}
          className="page-button"
        >
          Update Spot Factors -- Still Testing
        </button> 
      </div>
      */}

    </body>
  );
}
