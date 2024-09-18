import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function FinancialGoals() {
  const [goals, setGoals] = useState({
    small_purchase_budget: "",
    big_purchase_budget: "",
    expensive_purchase_goal: "",
    user_id: "7fae18c3-a346-4e8a-8069-4bfda99b5db3",
  });
  const history = useNavigate();

  const handleChange = (e) => {
    setGoals({ ...goals, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("financial_goals")
        .insert([goals]);
      if (error) throw error;
      history("/purchase");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Set Your Financial Goals</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="small_purchase_budget"
          placeholder="Budget for small purchases (days/hrs)"
          onChange={handleChange}
          required
        />
        <input
          name="big_purchase_budget"
          placeholder="Budget for big purchases (days/hrs)"
          onChange={handleChange}
          required
        />
        <input
          name="expensive_purchase_goal"
          placeholder="Most expensive purchase goal (days/hrs)"
          onChange={handleChange}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => history.goBack()}>
          Go Back
        </button>
      </form>
    </div>
  );
}

export default FinancialGoals;
