"use client"
import React, { useState } from "react";
import "./globals.css";
import Values from "values.js";

import { AppBar, Button, InputAdornment, TextField, Typography, createTheme } from "@mui/material/";

import '@fontsource/roboto/300.css';

export default function App() {

  const [colorCode, setColorCode] = useState(new Values("#008cff"));
  const [compColorCode, setCompColorCode] = useState(new Values("#ff7300"));

  return (
    <div style={{backgroundImage: `url(
      "https://www.sumairbashir.com/beams-components-24fbfee2.png"
    )`}}>

      <AppBar position="sticky" style={{backgroundColor: "#ffffff", color: "#000000"}}>
        <div className="appBar">
        <Typography variant="h3" gutterBottom>Color Palette Generator</Typography>
        </div>
      </AppBar>

      <div className="line"></div>
        
      <div className="App">

        <div className="inputRowContainer">

          <div>
            <Input handleGenerate={(event) => {
              event.preventDefault();
              setColorCode(new Values("#" + event.target.elements.colorCode.value));
              setCompColorCode(getComplementaryColor(new Values("#" + event.target.elements.colorCode.value)));
              console.log(compColorCode.hex);
            }} />
          </div>

          <div className="chosenColorDiv">
            <Typography variant="h6" gutterBottom> Selected Color</Typography>
            <Square color={colorCode} />
          </div>

          <div className="chosenColorDiv">
            <Typography variant="h6" gutterBottom>Complementary Color</Typography>
            <Square color={compColorCode} />
          </div>

        </div>

      <Typography variant="h6" gutterBottom>Tints and Shades</Typography>

      <Typography variant="body1" gutterBottom>
      In color theory, a tint is a mixture of a color with white, which increases lightness, 
      while a shade is a mixture with black, which increases darkness. Both processes affect the 
      resulting color mixture's relative saturation.<br/><br/>
      This website generates different tints and shades by mixing the respective colors for 
      tint and shade at 10% gradations. 
      </Typography>

      <Typography variant="h6" gutterBottom>Complementary Color</Typography>
      <Typography variant="body1" gutterBottom>
      The colors that is on the opposite side of the given color on the color wheel. This combination 
      of colors provides a high contrast and high impact color combination. Together, these colors 
      will appear brighter and more prominent. 
      </Typography>
      
      <SquareTints color={colorCode} />
      
      <SquareShades color={colorCode} />

      <SquareTints color={compColorCode} />
      <SquareShades color={compColorCode} />
      </div>
    </div>
  );
}

function Input({handleGenerate}){

  const button = (props) => (<button {...props} type="submit"/>);

  return(
      <form onSubmit={handleGenerate} className="input">
        
        <div className="textField">
          <TextField label="Color Code"
            variant="filled" type="text"
            defaultValue="008cff" name="colorCode"
            InputProps={{
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            }} />
        </div>

        <div className="button">
          <Button variant="outlined" component={button} size="medium">Generate</Button>
        </div>
      
      </form>
  )
}

function Square({color}){

  return (
    <div className="square" style={{backgroundColor: color.hexString(), color: getFontColor(color.rgb)}}>
      <Typography variant="subtitle1">{color.hexString()}</Typography>
    </div>
  );
}

function SquareTints({color}){

  let tints = color.tints(10);

  return (

    <div className="colorBlock">
      <Typography variant="h5" gutterBottom>Tints</Typography>
      <div className="squareContainer">
        {tints.map((tint, index) => <Square color={tint} index={index} />)}
      </div>
    </div>
  );
}

function SquareShades({color}){

  let shades = color.shades(10);

  return (

    <div className="colorBlock">
      <Typography variant="h5" gutterBottom>Shades</Typography>
      <div className="squareContainer">
        {shades.map(shade => <Square color={shade} />)}
      </div>
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