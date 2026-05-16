"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function NotificationsPage() {

  const [notifications,
  setNotifications] =
    useState([]);

  const [loading,
  setLoading] =
    useState(true);

  const router =
    useRouter();

  useEffect(() => {

    const generateNotifications =
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

          let allNotifications =
            [];

          // USERS

          if (usersData.users) {

            usersData.users.forEach(
              (user) => {

                allNotifications.push({

                  type:
                    "user",

                  message:
                    `${user.fullName} registered a new account.`,

                });

              }
            );

          }

          // CONSULTATIONS

          if (
            consultationsData.consultations
          ) {

            consultationsData.consultations.forEach(
              (consultation) => {

                allNotifications.push({

                  type:
                    "consultation",

                  message:
                    `${consultation.fullName} booked a consultation.`,

                });

              }
            );

          }

          // UPLOADS

          if (uploadsData.uploads) {

            uploadsData.uploads.forEach(
              (upload) => {

                allNotifications.push({

                  type:
                    "upload",

                  message:
                    `${upload.uploadedBy} uploaded ${upload.fileName}.`,

                });

              }
            );

          }

          setNotifications(
            allNotifications
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    generateNotifications();

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

        Loading Notifications...

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

        Notifications

      </h1>

      {

        notifications.length === 0

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

            No notifications found.

          </div>

        )

        : (

          notifications.map(
            (item, index) => (

              <div

                key={index}

                style={{

                  background:
                    "white",

                  padding:
                    "30px",

                  borderRadius:
                    "24px",

                  marginBottom:
                    "20px",

                }}
              >

                <h2
                  style={{

                    fontSize:
                      "22px",

                    color:
                      "#18392b",

                  }}
                >

                  {
                    item.message
                  }

                </h2>

              </div>

            )
          )

        )

      }

    </div>

  );

}