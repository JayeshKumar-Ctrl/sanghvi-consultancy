"use client";

import {
  useEffect,
  useState
} from "react";

import Footer from
"../components/Footer";

export default function
MyDocumentsPage() {

  const [
    documents,
    setDocuments
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);


  useEffect(() => {

    const fetchDocuments =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await fetch(
              "/api/my-documents",
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
            data.documents
          ) {

            setDocuments(
              data.documents
            );

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(true);

        }
      };

    fetchDocuments();

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
          Loading Documents...
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

          My Uploaded Documents

        </h1>

        <div
          style={{
            display: "grid",
            gap: "25px",
          }}
        >

          {
            documents.length === 0 ? (

              <div
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "20px",
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >

                No uploaded documents found.

              </div>

            ) : (
              documents.map(
                (item) => (

                <div

                  className="document-card"

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
                    Type:
                    {" "}
                    {item.category}
                  </p>

                  <button

                    className="open-document-btn"

                    onClick={() => {

                      window.open(
                        item.fileUrl,
                        "_blank"
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

                      border:
                        "none",

                      cursor:
                        "pointer",

                    }}
                  >

                    Open Document

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