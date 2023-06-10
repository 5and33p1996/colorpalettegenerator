"use client"
import React, { useState } from "react";
import "./globals.css";
import Values from "values.js";
import { SketchPicker } from "react-color";

export default function App() {

  const [colorCode, setColorCode] = useState(new Values("#008cff"));
  const [compColorCode, setCompColorCode] = useState(new Values("#ff7300"));

  return (
    <div className="App">
      <h1>Color Palette Generator</h1>
      <Input handleGenerate={(event) => {
        event.preventDefault();
        setColorCode(new Values("#" + event.target.elements.colorCode.value));
        setCompColorCode(getComplementaryColor(new Values("#" + event.target.elements.colorCode.value)));
        console.log(compColorCode.hex);
      }}/>
      <p> Selected Color</p>
      <ChosenColor color={colorCode}/>
      <h3>The following are tints</h3>
      <SquareTints color={colorCode}/>
      <h3>The following are shades</h3>
      <SquareShades color={colorCode}/>

      <p>Complementary Color - {compColorCode.hex}</p>
      <ChosenColor color={compColorCode} />

      <h3>The following are tints</h3>
      <SquareTints color={compColorCode}/>
      <h3>The following are shades</h3>
      <SquareShades color={compColorCode}/>
    </div>
  );
}

function Input({handleGenerate}){

  return(
    <div className="input">
      <form onSubmit={handleGenerate}>
        <input type="text" defaultValue="008cff" name="colorCode"/>
        <button type="submit">Generate</button>
      </form>
    </div>
  )
}

function ChosenColor({color}){

  return(
    <div className="chosencolor">
      <div className="square" style={{backgroundColor: color.hexString()}}>
      </div>
    </div>
  )
}

function Square({color, index}){

  return (
    <div className="square" style={{backgroundColor: color.hexString(), color: getFontColor(color.rgb)}}>
      <p>{color.hexString()}</p>
    </div>
  );
}

function SquareTints({color}){

  let tints = color.tints(10);

  return (
    <div className="squareContainer">
      {tints.map((tint, index) => <Square color={tint} index={index}/>)}
    </div>
  );
}

function SquareShades({color}){

  let shades = color.shades(10);

  return (
    <div className="squareContainer">
      {shades.map(shade => <Square color={shade} />)}
    </div>
  );
}


function getFontColor(rgb){

  let brigthness = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);

  if(brigthness > 125){
    return "000000";
  }
  
  return "#ffffff";
}

function getComplementaryColor(color){

  let complementaryColor = color.rgb.map(v => 255 - v);
  
  return new Values("#" + complementaryColor[0].toString(16).padStart(2, '0') + 
                      complementaryColor[1].toString(16).padStart(2,'0') + 
                      complementaryColor[2].toString(16).padStart(2,'0'));
}