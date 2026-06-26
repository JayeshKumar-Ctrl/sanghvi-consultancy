"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Image from "next/image";
import toast from "react-hot-toast";

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

      toast.success(data.message);

      console.log(data);

      if (res.ok) {

        window.location.href = "/login";

      }

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <div className="auth-page">

        <div className="auth-card">

          <div className="auth-logo">

            <Image
                src="/logo.png"
                alt="Sanghvi Consultancy"
                width={110}
                height={110}
                className="auth-logo-image"
              
              />

            <div>
              <h3>SANGHVI</h3>
              <h3>CONSULTANCY</h3>
              <h3>SERVICES</h3>
            </div>

          </div>

          <h1
            style={{
              fontSize: "clamp(34px,8vw,52px)",
            }}
          >
            Create your account
          </h1>

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
                autoComplete="name"
                placeholder="Enter your full name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Email</label>

              <input
                type="email"
                autoComplete="email"
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
                autoComplete="new-password"
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
                autoComplete="company"
                placeholder="Enter company name"
                onChange={handleChange}
              />
            </div>

            <div className="auth-input-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                autoComplete="tel"
                placeholder="Enter phone number"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="auth-button"
              type="submit"
              disabled={loading}
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