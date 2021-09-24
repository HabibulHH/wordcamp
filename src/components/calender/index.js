import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { Spinner } from "react-bootstrap";
import { WORD_CAMP_API } from "../../consts";
function Calender() {
  let allViews = Object.keys(Views).map((k) => Views[k]);
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const getDataFromWp = async (pagenum = 1) => {
    const fetchData = async () => {
      const response = await axios.get(`${WORD_CAMP_API}=${pagenum}`);
      return response;
    };

    return fetchData();
  };
  useEffect(() => {
    let counts = 0;
    let _processedData = [];
    const fetchData = async () => {
      const response = await getDataFromWp(1);
      let processedData = [];
      response.data.map((data) =>
        processedData.push({
          title: data.title.rendered,
          start: moment.unix(data["Start Date (YYYY-mm-dd)"]).format("llll"),
          end: moment.unix(data["End Date (YYYY-mm-dd)"]).format("llll"),
          id: data.id,
          location: data.location,
          url: data.URL,
        })
      );
      counts = response.headers["x-wp-totalpages"];
      count == 0 ? setCount(counts) : 0;
      if (count == 0) setEvents(events.concat(processedData));
      return response;
    };

    if (count == 0) fetchData();
  }, []);

  useEffect(() => {
    let processedData = [];
    if (count > 0) {
      const call_stack = async function () {
        let promises = [];
        for (let i = 1; i <= count; i++) {
          promises.push(getDataFromWp(i));
        }
        let results = await Promise.all(promises);
        return results;
      };
      const promisedResult = call_stack();
      promisedResult.then((results) => {
        results.map((item) => {
          item.data.map((data) =>
            processedData.push({
              title: data.title.rendered,
              start: moment
                .unix(data["Start Date (YYYY-mm-dd)"])
                .format("llll"),
              end: moment.unix(data["End Date (YYYY-mm-dd)"]).format("llll"),
              id: data.id,
              location: data.location,
              url: data.URL,
            })
          );
        });
        setEvents(processedData);
      });
    }
  }, [count]);
  return (
    <div>
      {events && events.length > 0 ? (
        ""
      ) : (
        <div data-testid="spinner">
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </div>
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
  return { count, load };
}

export default Calender;
