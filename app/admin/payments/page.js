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

        Loading Payments...

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
                "40px",

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
                    Plan:
                  </strong>

                  {" "}
                  {
                    item.plan
                  }

                </p>

                <p>

                  <strong>
                    Amount:
                  </strong>

                  {" "}
                  ₹
                  {
                    item.amount
                  }

                </p>

                <p>

                  <strong>
                    Status:
                  </strong>

                  {" "}
                  {
                    item.paymentStatus
                  }

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