import React, { useEffect, useState } from "react";
import Card from "../../shared/Card";
import "./Jobs.css";

const Jobs = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setfilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const checkIfFilters = (filters) => {
    if (!!filters.roles.length) return true;
    if (!!filters.employees.length) return true;
    if (!!filters.remote.length) return true;
    if (!!filters.tech_stack.length) return true;
    if (!!filters.companies.length) return true;
    if (!!filters.experience >= 0) return true;
    if (!!filters.salary >= 0) return true;
    return false;
  };

  const handleScroll = () => {
    if (isLoading) return;

    const totalHeight = document.documentElement.offsetHeight;
    const scrollledHeight =
      window.innerHeight + document.documentElement.scrollTop;

    const scrollLeftPercent =
      ((totalHeight - scrollledHeight) / totalHeight) * 100;

    if (scrollLeftPercent <= 30) fetchData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const fetchData = () => {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setJobs([...jobs, ...result.jdList]);
        setfilteredJobs([...jobs, ...result.jdList]);
        setIsLoading(false);
        setOffset(offset + 10);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(checkIfFilters(filters)){
      Object.keys(filters).map((elm) => {
        switch (elm) {
          case "roles":
            break;
          case "experience":
            break;
          case "employees":
            break;
          case "salary":
            break;
          case "companies":
            console.log(filters["companies"]);
            const tempFilteredJobs = jobs.filter(
              (job) =>
                job.companyName &&
                job?.companyName
                  .toLowerCase()
                  .includes(filters?.companies.toLowerCase())
            );
            setfilteredJobs(tempFilteredJobs);
            break;
          case "remote":
            break;
          case "tech_stack":
            break;
          default:
            break;
        }
        // console.log(elm);
      });
    }
    else setfilteredJobs(jobs);
  }, [filters]);

  return (
    <section className="jobs-section">
      {filteredJobs.map((job) => {
        return <Card job={job} key={job.jdUid} />;
      })}
    </section>
  );
};

export default Jobs;
