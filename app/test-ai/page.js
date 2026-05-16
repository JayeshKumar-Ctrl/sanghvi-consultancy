"use client";

import { useState }
from "react";

export default function
TestAIPage() {

  const [result,
  setResult] =
    useState("");

  const handleTest =
    async () => {

      const res =
        await fetch(
          "/api/extract-ledger",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              imageUrl:
"https://res.cloudinary.com/dvsk4uo7x/image/upload/v1778341488/scs-documents/h9npkhccqvyacisuwerb.png",

              language:
                "Gujarati",

            }),

          }
        );

      const data =
        await res.json();

      setResult(
        data.response
      );

    };

  return (

    <div
      style={{
        padding: "60px",
      }}
    >

      <button
        onClick={handleTest}
      >

        Test AI

      </button>

      <pre
        style={{
          marginTop: "40px",
          whiteSpace:
            "pre-wrap",
        }}
      >

        {result}

      </pre>

    </div>

  );

}