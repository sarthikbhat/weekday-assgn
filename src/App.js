import React, { useCallback, useState } from "react";
import "./App.css";
import Filters from "./components/Filters/Filters";
import Header from "./components/Header/Header";
import Jobs from "./components/Jobs/Jobs";

const defaultFilterValue = {
  roles: [],
  employees: [],
  experience: -1,
  salary: -1,
  remote: [],
  tech_stack: [],
  companies: "",
};

function App() {
  const [filterValues, setFilterValues] = useState(defaultFilterValue);

  // Bridge to send data between two siblings
  const sendDataToComp = useCallback((values) => {
    setFilterValues({ ...values });
  },[]);

  return (
    <main>
      <Header />
      <Filters sendDataToComp={sendDataToComp} />
      <Jobs filters={filterValues} />
    </main>
  );
}

export default App;
