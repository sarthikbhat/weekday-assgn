import React from "react";

const Card = ({ job }) => {
  const getEstimatedSalary = (minSal, maxSal) => {
    if (!minSal) return `${maxSal}L`;
    if (!maxSal) return `${minSal}L`;
    else return `${minSal}L - ${maxSal}L`;
  };

  return (
    <div className="card-outer">
      <div className="company-header">
        <img src={job.logoUrl} alt={job.logoUrl.split("/").pop()} />
        <div className="company-text-details">
          <div className="comp-info">
            <h3 className="comp-name">{job.companyName}</h3>
            <h2 className="comp-position caps">{job.jobRole}</h2>
          </div>
          <p className="comp-location caps">{job.location}</p>
        </div>
      </div>

      <div className="estimated-salary">
        Estimated Salary: {job.salaryCurrencyCode}{" "}
        {getEstimatedSalary(job.minJdSalary, job.maxJdSalary)} ✅
      </div>

      <h3 className="job-desc-header">Job Description:</h3>
      <div className="job-desc">{job.jobDetailsFromCompany}</div>
      <div className="show-more">Show More</div>

      <h2 className="min-exp-header">Minimum Experience</h2>
      <p className="min-exp">{job.minExp || 0} years</p>
      <button className="apply-button">
        <a className="no-decoration" rel="noreferrer" href={job?.jdLink} target="_blank">
          ⚡Easy Apply
        </a>
      </button>
      <button className="referral-button">Ask for referral </button>
    </div>
  );
};

export default Card;
