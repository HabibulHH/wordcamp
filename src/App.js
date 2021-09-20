import "App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row } from "react-bootstrap";
import "../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
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
