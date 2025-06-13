import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", email: "", password: ""
  });
  
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    // add your code here guys
  };

  return (
    <div>
      // code goes here!!
    </div>
  );
}