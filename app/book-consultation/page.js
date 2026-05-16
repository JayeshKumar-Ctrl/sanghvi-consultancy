"use client";

import { useState } from "react";

import Footer from
"../components/Footer";

import ProtectedRoute from
"../components/ProtectedRoute";

export default function
BookConsultationPage() {

  const [formData, setFormData] =
    useState({

      fullName: "",
      email: "",
      phone: "",
      service: "",
      message: "",

    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const res = await fetch(
          "/api/book-consultation",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,

            },

            body: JSON.stringify(
              formData
            ),

          }
        );

        const data =
          await res.json();

        console.log(data);

        if (data.success) {

          alert(
            "Consultation booked successfully"
          );

          setFormData({

            fullName: "",
            email: "",
            phone: "",
            service: "",
            message: "",

          });

        } else {

          alert(data.message);

        }

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <ProtectedRoute>

      <>
        <div className="consultation-page">

          <div className="consultation-container">

            <div className="consultation-top-logo">

              <div className="consultation-logo-circle">
                SCS
              </div>

              <div className="consultation-logo-text">
                <h3>SANGHVI</h3>
                <h3>CONSULTANCY</h3>
                <h3>SERVICES</h3>
              </div>

            </div>

            <div className="consultation-header">

              <span className="consultation-small-title">
                GET IN TOUCH
              </span>

              <h1>
                Let's talk
                <br />
                <span>numbers.</span>
              </h1>

              <p>
                Schedule a confidential
                consultation with our
                experts.
              </p>

            </div>

            <div className="consultation-card">

              <form
                className="consultation-form"
                onSubmit={handleSubmit}
              >

                <div className="consultation-row">

                  <div className="consultation-input-group">

                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                  <div className="consultation-input-group">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                </div>

                <div className="consultation-row">

                  <div className="consultation-input-group">

                    <label>
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                  <div className="consultation-input-group">

                    <label>
                      Service Required
                    </label>

                    <input
                      type="text"
                      name="service"
                      placeholder="GST Filing / Investment / Loan etc."
                      value={
                        formData.service
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                </div>

                <div className="consultation-input-group">

                  <label>
                    Message
                  </label>

                  <textarea
                    rows="6"
                    name="message"
                    value={
                      formData.message
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <button
                  className="consultation-btn"
                  type="submit"
                >

                  {
                    loading
                    ? "Submitting..."
                    : "Send message →"
                  }

                </button>

              </form>

            </div>

          </div>

        </div>

        <Footer />

      </>

    </ProtectedRoute>

  );
}