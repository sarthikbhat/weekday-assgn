import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "../../shared/Card";
import "./Jobs.css";
import notFound from "../../assets/images/not-found.svg";
import {
  checkIfCompanyName,
  checkIfEmployees,
  checkIfExperience,
  checkIfRemote,
  checkIfRoles,
  checkIfSalary,
  checkIfTechStack,
} from "../../utils/CommonUtils";
import Error from "../Error/Error";

const Jobs = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [filteredJobs, setfilteredJobs] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const isDataFetched = useRef(false);

  const checkIfFilters = (filterz) => {
    if (filterz && !!Object.keys(filterz).length) {
      if (!!filterz?.roles.length) return true;
      if (!!filterz?.employees.length) return true;
      if (!!filterz?.remote.length) return true;
      if (!!filterz?.tech_stack.length) return true;
      if (!!filterz?.companies.length) return true;
      if (filterz?.experience >= 0) return true;
      if (filterz?.salary >= 0) return true;
    }
    return false;
  };

  const fetchData = useCallback(() => {
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
        let tempJobs = jobs;
        tempJobs = [...tempJobs, ...result.jdList];
        setJobs(tempJobs);
        setIsLoading(false);
        setOffset(offset + 10);
      })
      .catch((error) => {
        console.error(error);
        setError("Api Error Occured, please try again");
        setJobs([]);
      });
  }, [jobs, offset]);

  //scroll handler to fetch data at 70% of the scroll or when 30% scroll is lef to bottom
  const handleScroll = useCallback(() => {
    if (isLoading) return;
    if (checkIfFilters(filterData)) return;
    if (checkIfFilters(filters)) return;

    const docElement = document.documentElement;
    const totalHeight = docElement.offsetHeight;
    const scrollledHeight = window.innerHeight + docElement.scrollTop;

    const scrollLeft = (totalHeight - scrollledHeight) / totalHeight;
    const scrollLeftPercent = scrollLeft * 100;

    if (scrollLeftPercent <= 30) fetchData();
  }, [fetchData, filterData, isLoading, filters]);

  // helper function to apply filters
  const applyFilters = useCallback(() => {
    if (checkIfFilters(filterData)) {
      const allDataFiltered = jobs.filter((job) => {
        return (
          checkIfRoles(job, filterData) &&
          checkIfCompanyName(job, filterData) &&
          checkIfExperience(job, filterData) &&
          checkIfSalary(job, filterData) &&
          checkIfTechStack(job, filterData) &&
          checkIfEmployees(job, filterData) &&
          checkIfRemote(job, filterData)
        );
      });
      console.log(allDataFiltered);
      if (!!allDataFiltered.length) setfilteredJobs(allDataFiltered);
      else setfilteredJobs(null);
    } else {
      setfilteredJobs(jobs);
    }
  }, [jobs, filterData]);

  // Lifecycle hooks for change detections and initial data render

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, applyFilters, handleScroll]);

  useEffect(() => {
    if (isDataFetched.current) return;
    isDataFetched.current = true;
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    applyFilters();
  }, [jobs, filterData, applyFilters]);

  useEffect(() => {
    setFilterData({ ...filters });
  }, [filters]);

  return (
    <section className="hero">
      {error && <Error errorText={error} />}
      <div className="jobs-section">
        {filteredJobs ? (
          filteredJobs.map((job) => {
            return <Card job={job} key={job.jdUid} />;
          })
        ) : (
          <div className="not-found-box">
            <img className="not-found" src={notFound} alt="not-found" />
            <h3>No Jobs available for this category at the moment</h3>
          </div>
        )}
      </div>
      {(isLoading && filteredJobs) && <div className="loader-circle"></div>}
    </section>
  );
};

export default Jobs;
