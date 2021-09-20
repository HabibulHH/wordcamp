
import React  from "react";
import ReactDom from "react-dom";
import Nav  from "../index";

it('Nav renders without crashing..',()=>{
 const div = document.createElement("div");
 ReactDom.render(<Nav></Nav>,div);
 ReactDom.unmountComponentAtNode(div);
})