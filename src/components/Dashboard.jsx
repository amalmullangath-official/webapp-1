import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Dashboard() {
  const [recentPurchases, setRecentPurchases] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    fetchRecentPurchases();
  }, []);

  const fetchRecentPurchases = async () => {
    try {
      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      setRecentPurchases(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    history.push("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Recent Purchases</h3>
      <ul>
        {recentPurchases.map((purchase, index) => (
          <li key={index}>
            {purchase.item} - {purchase.price} rupees (Time equivalent:{" "}
            {purchase.timeEquivalent.toFixed(2)} hours)
          </li>
        ))}
      </ul>
      <button onClick={() => history.push("/purchase")}>
        Make New Purchase Decision
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
