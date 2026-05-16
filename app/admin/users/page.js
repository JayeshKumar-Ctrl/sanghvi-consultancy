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

        Loading Users...

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

          fontWeight:
            "600",

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

        Users Data

      </h1>

      {

        Array.isArray(users) &&
        users.map((item) => (

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

            <h2
              style={{

                fontSize:
                  "34px",

                marginBottom:
                  "10px",

              }}
            >

              {item.fullName}

            </h2>

            <p>
              <strong>
                Email:
              </strong>
              {" "}
              {item.email}
            </p>

            <p>
              <strong>
                Phone:
              </strong>
              {" "}
              {item.phone}
            </p>

            <p>
              <strong>
                Company:
              </strong>
              {" "}
              {
                item.company ||
                "N/A"
              }
            </p>

            <p>
              <strong>
                Plan:
              </strong>
              {" "}
              {item.planType}
            </p>

            <button

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