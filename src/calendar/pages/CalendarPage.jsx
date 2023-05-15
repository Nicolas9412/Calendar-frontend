import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CalendarEvent,
  Navbar,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../components";
import { localizer, getMessagesES } from "../../helpers";
import { useEffect, useState } from "react";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    console.log({ viewChanged: event });
  };

  const eventStyleGetter = (event) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return { style };
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onSelectEvent={onSelect}
        onDoubleClickEvent={onDoubleClick}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
