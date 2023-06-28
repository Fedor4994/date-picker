import { useState } from "react";
import "./App.css";
import { DatePicker } from "./DatePicker";

function App() {
  const [date, setDate] = useState(() => new Date());

  return (
    <div className="App">
      {date.toString().slice(0, 15)}
      <DatePicker value={date} onChange={setDate} />
    </div>
  );
}

export default App;
