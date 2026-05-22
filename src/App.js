// Import the schedule data from the JSON file — you can use it like a regular JS array
import scheduleData from './schedule_data.json';

// TODO: Build your Frosh Week Schedule page here

function formatTime(time) {
  if (!time || !time.trim()) return '';
  // Handle "13:30:00 a1/p1" format
  if (time.includes('a1/p1') || time.includes('p1')) {
    const parts = time.trim().split(' ')[0].split(':');
    let hours = parseInt(parts[0]);
    const minutes = parts[1];
    const isPM = hours >= 12;
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${isPM ? 'PM' : 'AM'}`;
  }
  return time.trim();
}

function EventCard({ event }) {
  return (
    <div className={`event-card color-${event.Color}`}>
      <div className="event-time">
        {formatTime(event['Start Time'])}
        {event['End Time'] && ` → ${formatTime(event['End Time'])}`}
      </div>
      <div className="event-name">{event['Event Name']}</div>
      {event['Event Location'] && (
        <div className="event-location">📍 {event['Event Location']}</div>
      )}
      {event['Event Description'] && (
        <div
          className="event-desc"
          dangerouslySetInnerHTML={{ __html: event['Event Description'] }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>F!ROSH Week 2T6 🎉</h1>
      {Object.entries(scheduleData).map(([day, events]) => (
        <div key={day} className="day-section">
          <h2 className="day-heading">{day}</h2>
          <div className="events-list">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
