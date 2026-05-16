"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function ConsultationsPage() {

  const [consultations,
  setConsultations] =
    useState([]);

  const [loading,
  setLoading] =
    useState(true);

  const router =
    useRouter();

  useEffect(() => {

    const fetchConsultations =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {

            router.push(
              "/login"
            );

            return;

          }

          const res =
            await fetch(
              "/api/all-consultations",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          if (
            data.consultations
          ) {

            setConsultations(
              data.consultations
            );

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchConsultations();

  }, []);

  const updateStatus =
    async (
      consultationId,
      newStatus
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await fetch(
            "/api/update-consultation-status",
            {

              method: "PUT",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,

              },

              body:
                JSON.stringify({

                  consultationId,

                  status:
                    newStatus,

                }),

            }
          );

        const data =
          await res.json();

        if (data.success) {

          setConsultations(

            consultations.map(
              (item) =>

                item._id ===
                consultationId

                ? {

                    ...item,

                    status:
                      newStatus,

                  }

                : item
            )

          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  if (loading) {

    return (

      <div
        style={{

          minHeight:
            "100vh",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          fontSize:
            "42px",

          fontWeight:
            "700",

          background:
            "#d9cfbd",

        }}
      >

        Loading Consultations...

      </div>

    );

  }

  return (

    <div
      style={{

        minHeight:
          "100vh",

        background:
          "#d9cfbd",

        padding:
          "60px",

      }}
    >

      <button

        onClick={() => {

          router.push(
            "/admin"
          );

        }}

        style={{

          marginBottom:
            "30px",

          padding:
            "12px 24px",

          border:
            "none",

          borderRadius:
            "12px",

          background:
            "#18392b",

          color:
            "white",

          cursor:
            "pointer",

        }}
      >

        ← Back to Admin

      </button>

      <h1
        style={{

          fontSize:
            "64px",

          marginBottom:
            "40px",

        }}
      >

        Consultation Bookings

      </h1>

      {

        consultations.length === 0

        ? (

          <div
            style={{

              background:
                "white",

              padding:
                "40px",

              borderRadius:
                "28px",

            }}
          >

            No consultation bookings found.

          </div>

        )

        : (

          consultations.map(
            (item) => (

              <div

                key={item._id}

                style={{

                  background:
                    "white",

                  padding:
                    "35px",

                  borderRadius:
                    "28px",

                  marginBottom:
                    "25px",

                }}
              >

                <h2>
                  {
                    item.fullName
                  }
                </h2>

                <p>

                  <strong>
                    Email:
                  </strong>

                  {" "}
                  {
                    item.email
                  }

                </p>

                <p>

                  <strong>
                    Phone:
                  </strong>

                  {" "}
                  {
                    item.phone
                  }

                </p>

                <p>

                  <strong>
                    Service:
                  </strong>

                  {" "}
                  {
                    item.service
                  }

                </p>

                <p>

                  <strong>
                    Message:
                  </strong>

                  {" "}
                  {
                    item.message
                  }

                </p>

                <p>

                  <strong>
                    Status:
                  </strong>

                  {" "}

                  <span
                    style={{

                      color:

                        item.status ===
                        "Approved"

                        ? "green"

                        : item.status ===
                          "Rejected"

                        ? "red"

                        : "#18392b",

                      fontWeight:
                        "700",

                    }}
                  >

                    {
                      item.status
                    }

                  </span>

                </p>

                <div
                  style={{

                    display:
                      "flex",

                    gap:
                      "15px",

                    marginTop:
                      "20px",

                  }}
                >

                  <button

                    onClick={() => {

                      updateStatus(
                        item._id,
                        "Approved"
                      );

                    }}

                    style={{

                      padding:
                        "12px 24px",

                      border:
                        "none",

                      borderRadius:
                        "12px",

                      background:
                        "green",

                      color:
                        "white",

                      cursor:
                        "pointer",

                    }}
                  >

                    Approve

                  </button>

                  <button

                    onClick={() => {

                      updateStatus(
                        item._id,
                        "Rejected"
                      );

                    }}

                    style={{

                      padding:
                        "12px 24px",

                      border:
                        "none",

                      borderRadius:
                        "12px",

                      background:
                        "#d62828",

                      color:
                        "white",

                      cursor:
                        "pointer",

                    }}
                  >

                    Reject

                  </button>

                </div>

              </div>

            )
          )

        )

      }

    </div>

  );

}