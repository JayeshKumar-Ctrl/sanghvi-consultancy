"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

export default function SignupPage() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    company: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const res = await fetch("/api/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      alert(data.message);

      console.log(data);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <div className="auth-page">

        <div className="auth-card">

          <div className="auth-logo">

            <div className="auth-logo-circle">
              SCS
            </div>

            <div>
              <h3>SANGHVI</h3>
              <h3>CONSULTANCY</h3>
              <h3>SERVICES</h3>
            </div>

          </div>

          <h1>Create your account</h1>

          <span className="auth-subtext">
            Takes under 30 seconds.
          </span>

          <form
            className="auth-form"
            onSubmit={handleSignup}
          >

            <div className="auth-input-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Company (optional)</label>

              <input
                type="text"
                name="company"
                placeholder="Enter company name"
                onChange={handleChange}
              />
            </div>

            <div className="auth-input-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="auth-button"
              type="submit"
            >
              {
                loading
                ? "Creating..."
                : "Create account →"
              }
            </button>

          </form>

          <div className="auth-bottom-text">

            Already have an account?{" "}

            <Link href="/login">
              Sign in
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}