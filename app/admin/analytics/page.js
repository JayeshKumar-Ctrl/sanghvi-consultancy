"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function AnalyticsPage() {

  const [stats,
  setStats] =
    useState({

      totalUsers: 0,

      premiumUsers: 0,

      consultations: 0,

      uploads: 0,

      payments: 0,

      revenue: 0,

    });

  const [loading,
  setLoading] =
    useState(true);

  const router =
    useRouter();

  useEffect(() => {

    const fetchAnalytics =
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

          // USERS

          const usersRes =
            await fetch(
              "/api/all-users",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const usersData =
            await usersRes.json();

          // CONSULTATIONS

          const consultationsRes =
            await fetch(
              "/api/all-consultations",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const consultationsData =
            await consultationsRes.json();

          // UPLOADS

          const uploadsRes =
            await fetch(
              "/api/all-uploads",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const uploadsData =
            await uploadsRes.json();

          // PAYMENTS

          const paymentsRes =
            await fetch(
              "/api/all-payments",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const paymentsData =
            await paymentsRes.json();

          // CALCULATE REVENUE

          let totalRevenue = 0;

          if (paymentsData.payments) {

            paymentsData.payments.forEach(
              (payment) => {

                totalRevenue +=
                  payment.amount;

              }
            );

          }

          setStats({

            totalUsers:
              usersData.users
              ?.length || 0,

            premiumUsers:

              usersData.users
              ?.filter(
                (u) => u.isPaid
              ).length || 0,

            consultations:

              consultationsData
              .consultations
              ?.length || 0,

            uploads:

              uploadsData.uploads
              ?.length || 0,

            payments:

              paymentsData.payments
              ?.length || 0,

            revenue:
              totalRevenue,

          });

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchAnalytics();

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

        Loading Analytics...

      </div>

    );

  }

  const analyticsCards = [

    {
      title:
        "Total Users",

      value:
        stats.totalUsers,
    },

    {
      title:
        "Premium Users",

      value:
        stats.premiumUsers,
    },

    {
      title:
        "Consultations",

      value:
        stats.consultations,
    },

    {
      title:
        "Uploads",

      value:
        stats.uploads,
    },

    {
      title:
        "Payments",

      value:
        stats.payments,
    },

    {
      title:
        "Revenue",

      value:
        `₹${stats.revenue}`,
    },

  ];

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
            "50px",

        }}
      >

        Analytics

      </h1>

      <div
        style={{

          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",

          gap:
            "30px",

        }}
      >

        {

          analyticsCards.map(
            (card, index) => (

              <div

                key={index}

                style={{

                  background:
                    "white",

                  padding:
                    "40px",

                  borderRadius:
                    "28px",

                }}
              >

                <h2
                  style={{

                    fontSize:
                      "28px",

                    marginBottom:
                      "18px",

                    color:
                      "#18392b",

                  }}
                >

                  {
                    card.title
                  }

                </h2>

                <h1
                  style={{

                    fontSize:
                      "54px",

                  }}
                >

                  {
                    card.value
                  }

                </h1>

                {/* PROGRESS BAR */}

                <div
                  style={{

                    width:
                      "100%",

                    height:
                      "12px",

                    background:
                      "#eee",

                    borderRadius:
                      "999px",

                    marginTop:
                      "20px",

                  }}
                >

                  <div
                    style={{

                      width:
                        "70%",

                      height:
                        "100%",

                      background:
                        "#18392b",

                      borderRadius:
                        "999px",

                    }}
                  />

                </div>

              </div>

            )
          )

        }

      </div>

    </div>

  );

}