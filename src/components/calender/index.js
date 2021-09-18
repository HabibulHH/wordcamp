import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";

function Calender() {
  let allViews = Object.keys(Views).map((k) => Views[k]);

  const localizer = momentLocalizer(moment);
  const [count, setCount] = useState(0);
  const [events, setEvents] = useState([]);
  console.log(Views);
  useEffect(() => {
    const result = axios.get(
      "https://api.wordpress.org/events/1.0/?location=Seattle"
    );
    result.then(({ data }) => {
      console.log(data.event);
      setEvents(data.events);
    });
  });
  return (
    <div>
      <p>All events around...</p>
      {/* <p>
        {events && events.length > 0 ? `${JSON.stringify(events[0])}` : "No"}
      </p> */}
      <Calendar
        localizer={localizer}
        events={[
          {
            id: 0,
            title: "All Day Event very long title",
            allDay: true,
            start: new Date(2012, 3, 0),
            end: new Date(2021, 3, 1),
          },
          {
            id: 1,
            title: "Word camp",
            start: new Date(),
            end: new Date(2021, 11, 10),
          },
        ]}
        defaultDate={new Date(2015, 3, 1)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={allViews}
        step={6}
        showMultiDayTimes
      />
    </div>
  );
}

export default Calender;

const localizer = momentLocalizer(moment);
