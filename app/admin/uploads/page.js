"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function UploadUsersPage() {

  const [users,
  setUsers] =
    useState([]);

  const router =
    useRouter();

  useEffect(() => {

    fetch(
      "/api/upload-users"
    )

      .then((res) =>
        res.json()
      )

      .then((data) => {

        if (
          data.success
        ) {

          setUsers(
            data.users
          );

        }

      });

  }, []);

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

          padding:
            "12px 24px",

          border:
            "none",

          borderRadius:
            "14px",

          background:
            "#18392b",

          color:
            "white",

          marginBottom:
            "30px",

          cursor:
            "pointer",

        }}
      >

        ← Back to Admin

      </button>

      <h1
        style={{

          fontSize:
            "72px",

          marginBottom:
            "50px",

        }}
      >

        AI Scanner Uploads

      </h1>

      <div
        style={{

          display:
            "grid",

          gap:
            "25px",

        }}
      >

        {

          users.map(
            (user, index) => (

              <div

                key={index}

                onClick={() => {

                  router.push(

                    `/admin/uploads/${user.userId}`

                  );

                }}

                style={{

                  background:
                    "white",

                  padding:
                    "35px",

                  borderRadius:
                    "30px",

                  cursor:
                    "pointer",

                  border:
                    "2px solid #18392b",

                }}
              >

                <h2
                  style={{

                    fontSize:
                      "38px",

                    color:
                      "#18392b",

                  }}
                >

                  {
                    user.uploadedBy
                  }

                </h2>

                <p
                  style={{

                    fontSize:
                      "22px",

                    marginTop:
                      "10px",

                  }}
                >

                  {
                    user.userEmail
                  }

                </p>

              </div>

            )
          )

        }

      </div>

    </div>

  );

}