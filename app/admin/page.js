"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function AdminPage() {

  const [loading,
  setLoading] =
    useState(true);

  const [user,
  setUser] =
    useState(null);

  const router =
    useRouter();

  useEffect(() => {

    const checkAdmin =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {

            window.location.href =
              "/login";

            return;

          }

          const res =
            await fetch(
              "/api/me",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          if (!data.user) {

            window.location.href =
              "/login";

            return;

          }

          if (
            data.user.email !==
            process.env
            .NEXT_PUBLIC_ADMIN_EMAIL
          ) {

            alert(
              "Access Denied"
            );

            window.location.href =
              "/";

            return;

          }

          setUser(
            data.user
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    checkAdmin();

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
          Loading Admin Panel...
        </p>

      </div>

    );

  }

  const cards = [

    {
      title:
        "Users Data",

      route:
        "/admin/users",
    },

    {
      title:
        "AI Scanner Uploads",

      route:
        "/admin/uploads",
    },

    {
      title:
        "Payment Management",

      route:
        "/admin/payments",
    },

    {
      title:
        "Consultation Bookings",

      route:
        "/admin/consultations",
    },

    {
      title:
        "Notifications",

      route:
        "/admin/notifications",
    },

    {
      title:
        "Analytics",

      route:
        "/admin/analytics",
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
          "clamp(20px,5vw,60px)",

      }}
    >

      <h1
        style={{

          fontSize:
            "clamp(36px,8vw,72px)",

          marginBottom:
            "10px",

        }}
      >

        Admin Panel

      </h1>

      <p
        style={{

          fontSize:
            "clamp(18px,4vw,24px)",

          marginBottom:
            "50px",

        }}
      >

        Welcome,
        {" "}
        {user?.fullName}

      </p>

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

          cards.map(
            (card, index) => (

              <div

                className="admin-dashboard-card"

                key={index}

                onClick={() => {

                  router.push(
                    card.route
                  );

                }}

                style={{

                  background:
                    "white",

                  padding:
                    "clamp(24px,5vw,50px)",

                  borderRadius:
                    "30px",

                  cursor:
                    "pointer",

                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease",

                  border:
                    "2px solid #18392b",

                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",

                  color:
                    "#18392b",

                }}

                onMouseEnter={(e) => {

                  e.currentTarget.style.transform =
                    "translateY(-10px)";

                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.15)";

                  e.currentTarget.style.background =
                    "#18392b";

                  e.currentTarget.style.color =
                    "white";

                }}

                onMouseLeave={(e) => {

                  e.currentTarget.style.transform =
                    "translateY(0px)";

                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.08)";

                  e.currentTarget.style.background =
                    "white";

                  e.currentTarget.style.color =
                    "#18392b";

                }}
              >

                <h2
                  style={{

                    fontSize:
                      "34px",

                    color:
                      "inherit",

                    transition:
                      "0.3s",

                  }}
                >

                  {card.title}

                </h2>

              </div>

            )
          )

        }

      </div>

    </div>

  );

}