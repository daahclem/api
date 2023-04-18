import React from "react";
import "../App.css";
import marvelfamily from "../img/marvelfamily.jpg";
import "./Home.css"

const Home = () => {
  return (
    <>
      <div className="container">
      <h1>Marvel Comic Explorer <br></br><span className="spanname">Using the Marvel Developer API</span></h1>
        <br>
        </br>
        <img className="imgmarvel" src={marvelfamily} alt= "marvel family"/>
        <br>
        </br>
        <br>
        </br>
        <p className="lead">
        The Marvel Comics Browser project aims to create a user-friendly application that allows users to explore and browse 
        through all the comics ever released by Marvel, sorted from newest to oldest. 
        The application leverages the Marvel Developer API (https://developer.marvel.com/) to fetch the required data and 
        provide an interactive user experience. The application also allows users to search for comics by character (e.g., Deadpool). 
        </p>
      </div>
    </>
  );
};

export default Home;