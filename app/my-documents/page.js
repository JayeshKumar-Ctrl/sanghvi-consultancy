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

        }

      };

    fetchDocuments();

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

          My Uploaded Documents

        </h1>

        <div
          style={{
            display: "grid",
            gap: "25px",
          }}
        >

          {
            documents.map(
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
                  Type:
                  {" "}
                  {item.category}
                </p>

                <button

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
          }

        </div>

      </div>

      <Footer />

    </>

  );

}