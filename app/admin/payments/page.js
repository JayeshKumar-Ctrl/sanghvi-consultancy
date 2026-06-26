"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function PaymentsPage() {

  const [payments,
  setPayments] =
    useState([]);

  const [loading,
  setLoading] =
    useState(true);

  const router =
    useRouter();

  useEffect(() => {

    const fetchPayments =
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
              "/api/all-payments",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          if (data.payments) {

            setPayments(
              data.payments
            );

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchPayments();

  }, []);

  if (loading) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          background: "#d9cfbd",
        }}
      >

        <div className="loader"></div>

        <p
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#18392b",
          }}
        >
          Loading Payments...
        </p>

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
          "clamp(20px,5vw,60px)",

      }}
    >

      <button

        className="admin-back-btn"

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
            "clamp(34px,8vw,64px)",

          marginBottom:
            "40px",

        }}
      >

        Payment Management

      </h1>

      {

        payments.length === 0

        ? (

          <div
            style={{

              background:
                "white",

              padding:
                 "clamp(20px,5vw,40px)",

              borderRadius:
                "28px",

            }}
          >

            No payments found.

          </div>

        )

        : (

          payments.map(
            (item) => (

              <div

                className="payment-card"

                key={item._id}

                style={{

                  background:
                    "white",

                  padding:
                    "clamp(20px,4vw,35px)",

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

                <p
                  style={{
                    wordBreak: "break-word",
                  }}
                >

                  <strong>Email:</strong>{" "}

                  {item.email}

                </p>

                <p>

                  <strong>
                    Plan:
                  </strong>

                  {" "}
                  {
                    item.plan
                  }

                </p>

                <p>

                  <strong>Amount:</strong>{" "}

                  <span
                    style={{
                      color: "#18392b",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    ₹{item.amount}
                  </span>

                </p>

                <p>

                  <strong>Status:</strong>{" "}

                  <span
                    style={{
                      color:
                        item.paymentStatus === "Success"
                          ? "green"
                          : item.paymentStatus === "Failed"
                          ? "red"
                          : "#f59e0b",

                      fontWeight: "700",
                    }}
                  >
                    {item.paymentStatus}
                  </span>

                </p>

                <p>

                  <strong>
                    Payment Date:
                  </strong>

                  {" "}

                  {

                    new Date(
                      item.paidAt
                    ).toLocaleString()

                  }

                </p>

              </div>

            )
          )

        )

      }

    </div>

  );

}