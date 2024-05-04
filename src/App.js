import { useEffect } from "react";
import "./App.css";
import Filters from "./components/Filters/Filters";
import Header from "./components/Header/Header";

function App() {
  // useEffect(() => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const body = JSON.stringify({
  //     limit: 10,
  //     offset: 0,
  //   });

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body,
  //   };

  //   fetch(
  //     "https://api.weekday.technology/adhoc/getSampleJdJSON",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <>
      <Header />
      <Filters />
    </>
  );
}

export default App;
