const EventCard = ({ eventId, users }) => {
  const formatedDate = getDateInfo(eventId);

  return (
    <div className='event-card'>
      <header>
        <h3>{formatedDate}</h3>
      </header>
    </div>
  );
};

function getDateInfo(eventId) {
  const day = eventId.substring(0, 2);
  const month = eventId.substring(2, 4);
  const time = eventId.substring(4, 6);
  const activity = eventId.substring(8);
  return `${day}.${month}. ${time}:00h / ${activity}`;
}

export default EventCard;
