import React, { useState } from "react";
import { useEffect } from "react";
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

  const sendDataToComp = (values) => {
    setFilterValues({...values});
  };

  return (
    <main>
      <Header />
      <Filters sendDataToComp={sendDataToComp} />
      <Jobs filters={filterValues} />
    </main>
  );
}

export default App;
