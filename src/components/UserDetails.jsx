import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function UserDetails() {
  const [details, setDetails] = useState({
    job: "",
    working_hours: "",
    company: "",
    position: "",
    age: "",
    monthly_salary: "",
    user_id: "7fae18c3-a346-4e8a-8069-4bfda99b5db3",
  });
  const history = useNavigate();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data, error } = await supabase
        .from("user_details")
        .insert([details]);
      console.log(data);
      console.log(details);
      console.log(error);
      if (error) throw error;
      history("/goals");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Welcome to Time Budgeter</h2>
      <form onSubmit={handleSubmit}>
        <input name="job" placeholder="Job" onChange={handleChange} required />
        <input
          name="working_hours"
          placeholder="Working Hours"
          onChange={handleChange}
          required
        />
        <input
          name="company"
          placeholder="Company"
          onChange={handleChange}
          required
        />
        <input
          name="position"
          placeholder="Position"
          onChange={handleChange}
          required
        />
        <input name="age" placeholder="Age" onChange={handleChange} required />
        <input
          name="monthly_salary"
          placeholder="Monthly Salary"
          onChange={handleChange}
          required
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default UserDetails;
