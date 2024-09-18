import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function PurchaseDecision() {
  const [userDetails, setUserDetails] = useState(null);
  const [purchase, setPurchase] = useState({
    item: "",
    category: "",
    price: "",
  });
  const [decision, setDecision] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const { data, error } = await supabase
      .from("user_details")
      .select("*")
      .single();
    if (error) alert(error.message);
    else setUserDetails(data);
  };

  const handleChange = (e) => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
  };

  const calculateTimeEquivalent = () => {
    const hourlyRate =
      userDetails.monthly_salary / (userDetails.working_hours * 5 * 4);
    const hoursRequired = purchase.price / hourlyRate;
    return hoursRequired;
  };

  const makeDecision = () => {
    const timeEquivalent = calculateTimeEquivalent();
    const yearsLeft = 60 - userDetails.age;
    const hoursLeft = yearsLeft * 365 * 24;
    const percentageOfLifeLeft = (timeEquivalent / hoursLeft) * 100;

    setDecision({
      timeEquivalent,
      percentageOfLifeLeft,
      recommendation:
        percentageOfLifeLeft < 0.0001
          ? "Consider buying"
          : "Reconsider purchase",
    });
  };

  const handleSubmit = async (e) => {
    console.log("this is called");
    e.preventDefault();
    makeDecision();
    // Save purchase decision to Supabase
    // await supabase.from("purchases").insert([{ ...purchase, ...decision }]);
  };

  return (
    <div>
      <h2>Purchase Decision</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="item"
          placeholder="Item"
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price (in Rupees)"
          onChange={handleChange}
          required
        />
        <button type="submit">Calculate</button>
      </form>
      {decision && (
        <div>
          <p>Time equivalent: {decision.timeEquivalent.toFixed(5)} hours</p>
          <p>
            Percentage of life left: {decision.percentageOfLifeLeft.toFixed(5)}%
          </p>
          <p>Recommendation: {decision.recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default PurchaseDecision;
