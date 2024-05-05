export const checkIfCompanyName = (job, filter) => {
  if (filter?.companies && !!filter?.companies.length) {
    return job?.companyName?.toLowerCase().includes(filter?.companies);
  }
  return true;
};

export const checkIfRoles = (job, filter) => {
  if (filter?.roles && !!filter?.roles.length) {
    return filter?.roles?.includes(job?.jobRole);
  }
  return true;
};

export const checkIfExperience = (job, filter) => {
  if (filter?.experience && filter?.experience > -1) {
    if (!job.minExp) return filter?.experience <= job?.maxExp;
    if (!job.maxExp) return filter?.experience >= job?.minExp;
    else {
      return (
        filter?.experience >= job?.minExp && filter?.experience <= job?.maxExp
      );
    }
  }
  return true;
};

export const checkIfSalary = (job, filter) => {
  if (filter?.salary && filter?.salary > -1) {
    if (!job.minJdSalary) return filter?.salary <= job?.maxJdSalary;
    if (!job.maxJdSalary) return filter?.salary >= job?.minJdSalary;
    else {
      return (
        filter?.salary >= job?.minJdSalary && filter?.salary <= job?.maxJdSalary
      );
    }
  }
  return true;
};

export const checkIfRemote = (job, filter) => {
  if (filter?.remote && !!filter?.remote.length) {
    if (filter?.remote?.includes("remote")) {
      return job.location === "remote";
    } else if (filter?.remote?.includes("in-office")) {
      return job.location !== "remote";
    } else return true;
  }
  return true;
};

export const checkIfTechStack = (job, filter) => {
  // Not sufficient data to apply filter on this category
  return true;
};

export const checkIfEmployees = (job, filter) => {
  // Not sufficient data to apply filter on this category
  return true;
};
