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

  useEffect(() => {

    if (!params?.id)
      return;

    fetch(

      `/api/user-uploads/${params.id}`

    )

      .then((res) =>
        res.json()
      )

      .then((data) => {

        if (
          data.success
        ) {

          setUploads(
            data.uploads
          );

        }

      });

  }, [params]);

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

      <h1
        style={{

          fontSize:
            "60px",

          marginBottom:
            "50px",

        }}
      >

        User Uploads

      </h1>

      {

        uploads.map(
          (item, index) => (

            <div

              key={index}

              style={{

                background:
                  "white",

                padding:
                  "30px",

                borderRadius:
                  "30px",

                marginBottom:
                  "25px",

                border:
                  "2px solid #18392b",

              }}
            >

              <h2>

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

      }

    </div>

  );

}