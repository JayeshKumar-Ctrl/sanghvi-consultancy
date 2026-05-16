"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await fetch(
        "/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      alert(data.message);

      console.log(data);

      // SAVE TOKEN
      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );
         window.location.href =
           "/";

      }

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
              <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SANGHVI</h3>
              <h3>CONSULTANCY</h3>
              <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SERVICES</h3>
            </div>

          </div>

          <h1>Sign in</h1>

          <span className="auth-subtext">
            Use your email and password.
          </span>

          <form
            className="auth-form"
            onSubmit={handleLogin}
          >

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

            <div
              style={{
                textAlign: "right",
                marginTop: "-10px",
                marginBottom: "20px",
              }}
            >

              <Link
                href="/forgot-password"
                style={{
                  color: "#18392b",
                  fontWeight: "600",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >

                Forgot Password?

              </Link>

            </div>

            <button
              className="auth-button"
              type="submit"
            >

              {
                loading
                ? "Signing in..."
                : "Sign in →"
              }

            </button>

          </form>

          <div className="auth-bottom-text">

            New here?{" "}

            <Link href="/signup">
              Create an account
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}