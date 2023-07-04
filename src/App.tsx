import { useState } from "react";
import "./App.css";
import { DatePicker } from "./DatePicker";

function App() {
  const [date, setDate] = useState(() => new Date());

  return (
    <div className="App">
      <h1>{date.toDateString()}</h1>
      <DatePicker value={date} onChange={setDate} />
    </div>
  );
}

export default App;
