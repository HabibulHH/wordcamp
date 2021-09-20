
import React  from "react";
import ReactDom from "react-dom";
import Calender  from "../index";

it('Calender renders without crashing..',()=>{
 const div = document.createElement("div");
 ReactDom.render(<Calender></Calender>,div);
 ReactDom.unmountComponentAtNode(div);
})