// Import the schedule data from the JSON file — you can use it like a regular JS array
import scheduleData from './schedule_data.json';

// TODO: Build your Frosh Week Schedule page here

function App() {
  const days = Object.keys(scheduleData);

  return (
    <div>
      <h1>F!ROSH Week 2T6</h1>
      {days.map(day => (
        <h2 key={day}>{day}</h2>
      ))}
    </div>
  );
}

export default App;
