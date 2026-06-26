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

  const [loading, setLoading] = useState(true);

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

        } finally {

          setLoading(false);

        }

      };

    fetchFiles();

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

          background: "#d9d0be",

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
          Loading Converted Files...
        </p>

      </div>

    );

  }

  return (

    <>

      <div
        style={{
          padding: "clamp(20px,5vw,60px)",
          background: "#d9d0be",
          minHeight: "100vh",
        }}
      >

        <h1
          style={{
            fontSize: "clamp(34px,8vw,52px)",
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
            files.length === 0 ? (

              <div
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "20px",
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >

                No converted files available.

              </div>

            ) : (
              files.map(
                (item) => (

                <div

                  className="converted-file-card"

                  key={item._id}

                  style={{
                    background:
                      "white",

                    padding:
                      "clamp(20px,4vw,30px)",

                    borderRadius:
                      "24px",
                  }}
                >

                  <h2

                    style={{

                      fontSize: "clamp(22px,5vw,32px)",

                      wordBreak: "break-word",

                    }}

                  >

                    {item.fileName}
                  </h2>

                  <p>
                    Language:
                    {" "}
                    {item.language}
                  </p>

                  <button

                    className="download-excel-btn"

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
            )
          }

        </div>

      </div>

      <Footer />

    </>

  );

}