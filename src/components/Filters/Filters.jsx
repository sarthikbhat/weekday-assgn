import CustomInput from "../../shared/CustomInput";
import { options } from "../../assets/static/options.js";
import "./Filters.css";
import { useEffect, useState } from "react";

const defaultFilterValue = {
  roles: [],
  employees: [],
  experience: -1,
  salary: -1,
  remote: [],
  tech_stack: [],
  companies: "",
};

const Filters = ({ sendDataToComp }) => {
  const [filterValues, setFilterValues] = useState(defaultFilterValue);
  const [displayTechStack, setDisplayTechStack] = useState(false);

  const handleFilterInput = (type, value) => {
    if (type === "roles") {
      const indexOfTypeEngg = value.findIndex((e) => e.type === "Engineering");
      setDisplayTechStack(indexOfTypeEngg != -1);
    }

    if(type==="companies") value=value;
    else if (Array.isArray(value)) {
      value = value.map((val) => val.value);
    } else {
      value = value?.value || -1;
    }

    const stateUpdate = filterValues;
    stateUpdate[type] = value;

    setFilterValues(stateUpdate);
    sendDataToComp(stateUpdate);
  };

  useEffect(() => {
    if (!displayTechStack) {
      handleFilterInput("tech_stack", []);
    }
  }, [displayTechStack]);

  return (
    <section className="filter-outer-box">
      <CustomInput
        isMulti={true}
        handleFilterInput={handleFilterInput}
        name="roles"
        type="select"
        placeholder="Roles"
        options={options.roles}
      />
      <CustomInput
        isMulti={true}
        handleFilterInput={handleFilterInput}
        name="employees"
        type="select"
        placeholder="Number Of Employees"
        short="No Of Employees"
        options={options.employees}
      />
      <CustomInput
        isMulti={false}
        handleFilterInput={handleFilterInput}
        name="experience"
        type="select"
        placeholder="Experience"
        options={options.experience}
      />
      <CustomInput
        isMulti={true}
        handleFilterInput={handleFilterInput}
        name="remote"
        type="select"
        placeholder="Remote"
        options={options.remote}
      />
      {displayTechStack && (
        <CustomInput
          isMulti={true}
          handleFilterInput={handleFilterInput}
          name="tech_stack"
          type="select"
          placeholder="Tech Stack"
          options={options.tech_stack}
        />
      )}
      <CustomInput
        isMulti={false}
        handleFilterInput={handleFilterInput}
        name="salary"
        type="select"
        placeholder="Minimum Base Pay Salary"
        short="Min Base Pay"
        options={options.salary}
      />
      <CustomInput
        isMulti={true}
        handleFilterInput={handleFilterInput}
        name="companies"
        type="text"
        placeholder="Search Company Name"
        short="Company Name"
      />
    </section>
  );
};

export default Filters;
