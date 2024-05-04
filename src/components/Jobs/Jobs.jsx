import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "../../shared/Card";
import "./Jobs.css";

const Jobs = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setfilteredJobs] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [filterType, setFilterType] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const isDataFetched = useRef(false);

  const checkIfFilters = (filterz) => {
    if (filterz && !!Object.keys(filterz).length) {
      if (!!filterz.roles.length) return true;
      if (!!filterz.employees.length) return true;
      if (!!filterz.remote.length) return true;
      if (!!filterz.tech_stack.length) return true;
      if (!!filterz.companies.length) return true;
      if (filterz.experience >= 0) return true;
      if (filterz.salary >= 0) return true;
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
        setIsLoading(false);
      });
  }, [jobs, offset]);

  //scroll handler to fetch data at 70% of the scroll or when 30% scroll is lef to bottom
  const handleScroll = useCallback(() => {
    if (isLoading) return;
    if (checkIfFilters(filterData)) return;
    if (checkIfFilters(filters.data)) return;

    const totalHeight = document.documentElement.offsetHeight;
    const scrollledHeight =
      window.innerHeight + document.documentElement.scrollTop;

    const scrollLeftPercent =
      ((totalHeight - scrollledHeight) / totalHeight) * 100;

    if (scrollLeftPercent <= 30) fetchData();
  }, [fetchData,filterData,isLoading,filters.data]);



  // helper function to apply filters
  const applyFilters = useCallback(() => {
    if (checkIfFilters(filterData)) {
      let allDataFiltered = [];
      let jobz = [];
      // let companyFilteredJobs = [];
      console.log(filteredJobs);
      if (!!filteredJobs.length) {
        jobz = [...filteredJobs];
      } else jobz = [...jobs];
      console.log(jobz);
      console.log(allDataFiltered);
      // log
      // if (!!filterData?.companies?.length) {
      //   companyFilteredJobs = jobs.filter(
      //     (job) =>
      //       job.companyName &&
      //       job?.companyName
      //         .toLowerCase()
      //         .includes(filterData?.companies.toLowerCase())
      //   );
      //   allDataFiltered = [...companyFilteredJobs];
      //   console.log(allDataFiltered);
      //   jobz = [...allDataFiltered];
      // } else {
      // }
      // Object.keys(filterData).forEach((key) => {
      switch (filterType) {
        case "roles":
          if (!!filterData?.roles?.length) {
            const roleFilteredJobs = jobz.filter(
              (job) =>
                job.jobRole &&
                filterData?.roles.includes(job?.jobRole.toLowerCase())
            );
            console.log(roleFilteredJobs);
            allDataFiltered = [...roleFilteredJobs];
          }
          break;
        case "experience":
          if (filterData?.experience >= 0) {
            const expFilteredJobs = jobz.filter((job) => {
              if (
                filterData?.experience >= job?.minExp &&
                filterData?.experience <= job?.maxExp
              ) {
                return true;
              }
              return false;
            });
            console.log(expFilteredJobs);
            allDataFiltered = [...allDataFiltered, ...expFilteredJobs];
          }
          break;
        case "employees":
          break;
        case "salary":
          break;
        case "companies":
          if (!!filterData?.companies?.length) {
            const companyFilteredJobs = jobz.filter(
              (job) =>
                job.companyName &&
                job?.companyName
                  .toLowerCase()
                  .includes(filterData?.companies.toLowerCase())
            );
            console.log(companyFilteredJobs);
            allDataFiltered = [...allDataFiltered, ...companyFilteredJobs];
          }
          break;
        case "remote":
          break;
        case "tech_stack":
          break;
        default:
          break;
      }
      // if (!!allDataFiltered.length) {
      // allDataFiltered = [...allDataFiltered,...companyFilteredJobs];
      // allDataFiltered = allDataFiltered.filter(
      //   (value, index, self) =>
      //     index === self.findIndex((t) => t.jdUid === value.jdUid)
      // );
      console.log(allDataFiltered);
      setfilteredJobs(allDataFiltered);
      // } else setfilteredJobs(companyFilteredJobs);
      // });
      // });
    } else {
      setfilteredJobs(jobs);
    }
  }, [jobs, filterData, filterType, filteredJobs]);

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
  }, [filterData, applyFilters]);

  useEffect(() => {
    applyFilters();
  }, [jobs, applyFilters]);

  useEffect(() => {
    setFilterData({ ...filters.data });
    setFilterType(filters.filter);
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
