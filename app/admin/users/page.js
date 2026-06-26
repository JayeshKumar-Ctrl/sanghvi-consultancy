"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function UsersPage() {

  const [users,
  setUsers] =
    useState([]);

  const [loading,
  setLoading] =
    useState(true);

  const router =
    useRouter();

  useEffect(() => {

    const fetchUsers =
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

          const userRes =
            await fetch(
              "/api/me",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const userData =
            await userRes.json();

          if (
            userData.user.email !==
            process.env
            .NEXT_PUBLIC_ADMIN_EMAIL
          ) {

            router.push("/");

            return;

          }

          const res =
            await fetch(
              "/api/all-users",
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
            data.success &&
            Array.isArray(
                data.users
            )
            ) {

            setUsers(
                data.users
            );

            } else {

            setUsers([]);

            }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchUsers();

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
          Loading Users...
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

          fontWeight:
            "600",

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

        Users Data

      </h1>

      {

        Array.isArray(users) &&
        users.map((item) => (

          <div

            className="user-card"

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

            <h2
              style={{

                fontSize:
                  "clamp(24px,5vw,34px)",

                marginBottom:
                  "10px",

              }}
            >

              {item.fullName}

            </h2>

            <p
              style={{
                marginTop: "8px",
                wordBreak: "break-word",
              }}
            >
              <strong>Email:</strong>{" "}
              {item.email}
            </p>

            <p
              style={{
                marginTop: "8px",
              }}
            >
              <strong>Phone:</strong>{" "}
              {item.phone}
            </p>

            <p
              style={{
                marginTop: "8px",
              }}
            >
              <strong>Company:</strong>{" "}
              {item.company || "N/A"}
            </p>

            <p
              style={{
                marginTop: "8px",
              }}
            >
              <strong>Plan:</strong>{" "}

              <span
                style={{
                  color:
                    item.planType === "Premium"
                      ? "green"
                      : "#18392b",
                  fontWeight: "700",
                }}
              >
                {item.planType}
              </span>

            </p>

            <button

              className="user-plan-btn"

              onClick={async () => {

                try {

                  const newPlan =

                    item.planType ===
                    "Premium"

                      ? "Free"

                      : "Premium";

                  const res =
                    await fetch(

                      "/api/admin/update-plan",

                      {

                        method:
                          "POST",

                        headers: {

                          "Content-Type":
                            "application/json",

                        },

                        body:
                          JSON.stringify({

                            userId:
                              item._id,

                            plan:
                              newPlan,

                          }),

                      }

                    );

                  const data =
                    await res.json();

                  if (data.success) {

                    setUsers((prev) =>

                      prev.map((u) =>

                        u._id ===
                        item._id

                          ? {

                              ...u,

                              planType:
                                newPlan,

                            }

                          : u

                      )

                    );

                  } else {

                    alert(
                      data.message
                    );

                  }

                } catch (error) {

                  console.log(
                    error
                  );

                  alert(
                    "Something went wrong"
                  );

                }

              }}

              style={{

                marginTop:
                  "20px",

                padding:
                  "12px 24px",

                border:
                  "none",

                borderRadius:
                  "12px",

                background:

                  item.planType ===
                  "Premium"

                    ? "#d62828"

                    : "#18392b",

                color:
                  "white",

                cursor:
                  "pointer",

                fontWeight:
                  "600",

              }}
            >

              {

                item.planType ===
                "Premium"

                  ? "Remove Premium"

                  : "Make Premium"

              }

            </button>

          </div>

        ))

      }

    </div>

  );

}