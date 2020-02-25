import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Bubbles from "./Bubbles";
import Bubble from "./Bubble";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {

    axiosWithAuth()
    // axios()
      .get("http://localhost:5000/api/colors")
      .then (response => {
        console.log("Bubble data retrieved:", response);
        setColorList(response.data);
      })
      .catch (error => {
        console.log("Could not retrieve bubble data:", error);
      })

  }, [])


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubble colors={colorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
