import "App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row } from "react-bootstrap";
import Calender from "./components/calender";
import Nav from "./Nav";
const App = () => (
  <>
    <Nav />
    <Container>
      <Row>
        <Calender />
      </Row>
    </Container>
  </>
);

export default App;
