"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "next/navigation";

export default function UserUploads() {

  const params =
    useParams();

  const [uploads,
  setUploads] =
    useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!params?.id)
      return;

    fetch(`/api/user-uploads/${params.id}`)

      .then((res) => res.json())

      .then((data) => {

        if (data.success) {

          setUploads(data.uploads);

        }

      })

      .finally(() => {

        setLoading(false);

      });

  }, [params]);


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
          Loading User Uploads...
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

      <h1
        style={{

          fontSize:
            "clamp(34px,8vw,60px)",

          marginBottom:
            "50px",

        }}
      >

        User Uploads

      </h1>

      {
        uploads.length === 0 ? (

          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
            }}
          >

            No uploads found.

          </div>

        ) : (

          uploads.map(
            (item, index) => (

              <div

                className="user-upload-card"

                key={index}

                style={{

                  background:
                    "white",

                  padding:
                    "clamp(20px,4vw,30px)",

                  borderRadius:
                    "30px",

                  marginBottom:
                    "25px",

                  border:
                    "2px solid #18392b",

                }}
              >

                <h2
                  style={{
                    fontSize: "clamp(22px,5vw,32px)",
                    wordBreak: "break-word",
                  }}
                >

                  {
                    item.fileName
                  }

                </h2>

                <p>

                  Type:
                  {" "}

                  {
                    item.category
                  }

                </p>

                <p>

                  Upload Date:
                  {" "}

                  {

                    new Date(

                      item.createdAt

                    ).toLocaleString()

                  }

                </p>

                <a

                  href={
                    item.fileUrl
                  }

                  target="_blank"
                >

                  <button

                    className="view-file-btn"

                    style={{

                      marginTop:
                        "15px",

                      padding:
                        "12px 20px",

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

                    View File

                  </button>

                </a>

              </div>

            )
          )
        )

      }

    </div>

  );

}