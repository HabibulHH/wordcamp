import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { Spinner } from "react-bootstrap";

function Calender() {
  let allViews = Object.keys(Views).map((k) => Views[k]);
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const result = axios.get(
      `https://central.wordcamp.org/?rest_route=/wp/v2/wordcamps&_embed&per_page=10&page=${1}`
    );

    result.then((res) => {
      console.log(res.data);
      let _processedData = [];
      res.data.map((data) =>
        _processedData.push({
          title: data.title.rendered,
          start: moment.unix(data["Start Date (YYYY-mm-dd)"]).format("llll"),
          end: moment.unix(data["End Date (YYYY-mm-dd)"]).format("llll"),
          id: data.id,
          location: data.location,
          url: data.URL,
        })
      );
      setEvents(_processedData);
      let count = res.headers["x-wp-totalpages"];
      count = count / 10;
      console.log(count);
      let axiosCalls = [];
      let processedData = [];

      for (let i = 1; i < count; i++) {
        axiosCalls.push(
          axios.get(
            `https://central.wordcamp.org/?rest_route=/wp/v2/wordcamps&_embed&per_page=100&page=${i}`
          )
        );
      }
      axios
        .all(axiosCalls)
        .then(
          axios.spread((...responses) => {
            console.log(responses.length);
            responses.map((item) => {
              item.data.map((data) =>
                processedData.push({
                  title: data.title.rendered,
                  start: moment
                    .unix(data["Start Date (YYYY-mm-dd)"])
                    .format("llll"),
                  end: moment
                    .unix(data["End Date (YYYY-mm-dd)"])
                    .format("llll"),
                  id: data.id,
                  location: data.location,
                  url: data.URL,
                })
              );
            });
            setEvents(processedData);
            console.log("full data loaded");
          })
        )
        .catch((errors) => {
          console.log(errors);
        });
    });
  }, []);
  return (
    <div>
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
