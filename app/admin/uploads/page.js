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

  const [loading, setLoading] = useState(true);

  const router =
    useRouter();

  useEffect(() => {

    fetch("/api/upload-users")

      .then((res) => res.json())

      .then((data) => {

        if (data.success) {

          setUsers(data.users);

        }

      })
      .finally(() => {

        setLoading(false);

      });

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
          Loading Uploads...
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
            "clamp(36px,8vw,72px)",

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

                className="upload-user-card"

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
                    "clamp(20px,4vw,35px)",

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
                      "clamp(24px,5vw,38px)",

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
                      "clamp(16px,3vw,22px)",

                    marginTop:
                      "10px",

                    wordBreak: "break-word",

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