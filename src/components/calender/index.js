import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { Spinner } from "react-bootstrap";

function Calender() {
  let allViews = Object.keys(Views).map((k) => Views[k]);
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = React.useState([]);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    const fetchData = async (pagenum = 1) => {
      const response = await axios.get(
        `https://central.wordcamp.org/?rest_route=/wp/v2/wordcamps&_embed&per_page=100&page=${pagenum}`
      );
      console.log(response);
      let _processedData = [];
      response.data.map((data) =>
        _processedData.push({
          title: data.title.rendered,
          start: moment.unix(data["Start Date (YYYY-mm-dd)"]).format("llll"),
          end: moment.unix(data["End Date (YYYY-mm-dd)"]).format("llll"),
          id: data.id,
          location: data.location,
          url: data.URL,
        })
      );
      let counts = response.headers["x-wp-totalpages"];
      console.log(counts);
      setCount(counts);
      setEvents(events.concat(_processedData));
    };

    fetchData();

    console.log(count);
    if (count > 0) {
      let pages = count / 10;
      console.log(pages);
      let promises = [];
      for (let i = 2; i < count; i++) {
        fetchData(i);
      }
      let res = Promise.all(fetchData);
    }
  }, [count]);
  return (
    <div id="spinner">
      {events && events.length > 0 ? (
        ""
      ) : (
        <>
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </>
      )}

      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          views={allViews}
          step={6}
          showAllEvents
          showMultiDayTimes
        />
      </div>
    </div>
  );
}

export default Calender;
