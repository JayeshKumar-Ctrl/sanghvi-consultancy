"use client";

import {
  useEffect,
  useState
} from "react";

import Footer from
"../components/Footer";

export default function
ConvertedFilesPage() {

  const [files, setFiles] =
    useState([]);

  useEffect(() => {

    const fetchFiles =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await fetch(
              "/api/my-conversions",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          if (data.conversions) {

            const completedFiles =
              data.conversions.filter(
                (item) =>
                  item.status ===
                  "Completed"
              );

            setFiles(
              completedFiles
            );

          }

        } catch (error) {

          console.log(error);

        }

      };

    fetchFiles();

  }, []);

  return (

    <>

      <div
        style={{
          padding: "60px",
          background: "#d9d0be",
          minHeight: "100vh",
        }}
      >

        <h1
          style={{
            fontSize: "52px",
            marginBottom: "40px",
          }}
        >

          Converted Excel Files

        </h1>

        <div
          style={{
            display: "grid",
            gap: "25px",
          }}
        >

          {
            files.map(
              (item) => (

              <div
                key={item._id}

                style={{
                  background:
                    "white",

                  padding:
                    "30px",

                  borderRadius:
                    "24px",
                }}
              >

                <h2>
                  {item.fileName}
                </h2>

                <p>
                  Language:
                  {" "}
                  {item.language}
                </p>

                <button

                  onClick={() => {

                    window.open(

                      item.convertedExcelUrl,

                      "_blank",

                      "noopener,noreferrer"

                    );

                  }}

                  style={{

                    display:
                      "inline-block",

                    marginTop:
                      "15px",

                    background:
                      "#18392b",

                    color:
                      "white",

                    padding:
                      "10px 18px",

                    borderRadius:
                      "10px",

                    textDecoration:
                      "none",

                    border:
                      "none",

                    cursor:
                      "pointer",

                  }}
                >

                  Download Excel

                </button>

              </div>

            ))
          }

        </div>

      </div>

      <Footer />

    </>

  );

}