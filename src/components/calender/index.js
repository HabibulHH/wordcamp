import axios from "axios";
import React, { useEffect, useState } from "react";
function Calender() {
  const [count, setCount] = useState(0);
  const [events, setEvents] = useState([]);
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
      <p>
        {events && events.length > 0
          ? events.length
          : "no events till now in this location"}
      </p>
    </div>
  );
}

export default Calender;
