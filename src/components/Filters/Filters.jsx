import CustomInput from "../../shared/CustomInput";
import { options } from "../../assets/static/options.js";
import "./Filters.css";

const Filters = () => {
  return (
    <section className="filter-outer-box">
      <CustomInput type="select" placeholder="Roles" options={options.roles} />
      <CustomInput
        type="select"
        placeholder="Number Of Employees"
        short="No Of Employees"
        options={options.employees}
      />
      <CustomInput
        type="select"
        placeholder="Experience"
        options={options.experience}
      />
      <CustomInput
        type="select"
        placeholder="Remote"
        options={options.remote}
      />
      <CustomInput type="select" placeholder="Tech Stack" options={options} />
      <CustomInput
        type="select"
        placeholder="Minimum Base Pay Salary"
        short="Min Base Pay"
        options={options.salary}
      />
      <CustomInput
        type="text"
        placeholder="Search Company Name"
        short="Company Name"
      />
    </section>
  );
};

export default Filters;
