"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function Scanner() {

  const [user, setUser] =
    useState(null);

  const router = useRouter();

  const [showPopup, setShowPopup] =
    useState(false);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

        const res = await fetch(
          "/api/me",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        if (data.user) {

          setUser(data.user);

        }

      } catch (error) {

        console.log(error);

      }

    };

    fetchUser();

  }, []);

  const handleScannerAccess =
    () => {

      const token =
        localStorage.getItem(
          "token"
        );

      // NOT LOGGED IN

      if (!token) {

        router.push("/login");

        return;

      }

      // FREE USER

      if (
        user &&
        !user.isPaid
      ) {

        alert(
          "Upgrade to Premium to use AI Scanner."
        );

        return;

      }

      // PREMIUM USER

      router.push("/scanner");

    };

  return (

    <>

      <section
        id="scanner"
        className="scanner"
      >

        <div className="scanner-content">

          <h1>

            Scan a Manual Invoice.

            <br />

            Get a clean English
            {" "}

            <span>Excel</span>
            {" "}

            back.

          </h1>

          <p className="scanner-desc">

            Upload images or PDFs
            of handwritten or printed
            regional-language books.

            Our AI-powered scanner
            reads, translates and
            structures even messy data
            into a CA-ready table.

          </p>

          {
            user && (

              <p className="current-plan">

                Current Plan:
                {" "}

                {user.planType}

              </p>

            )
          }

          <div className="scanner-buttons">

            <button
              className="primary-btn"
              onClick={
                handleScannerAccess
              }
            >

              Open AI Scanner ⛶

            </button>

            {
              (!user || !user.isPaid) && (

                <button
                  className="outline-btn"

                  onClick={() => {

                    const token =
                      localStorage.getItem(
                        "token"
                      );

                    if (!token) {

                      router.push("/login");

                    } else {

                      setShowPopup(true);

                    }

                  }}
                >

                  Upgrade to Premium →

                </button>

              )
            }

          </div>

        </div>

        {/* PREVIEW */}

        <div className="scanner-preview">

          <p className="preview-title">

            Manual Invoice 

          </p>

          <p className="preview-meta">

            Debit · Credit · Balance · 

          </p>

          <p className="preview-meta">

            284 entries
            (auto-aligned)

          </p>

          <p className="preview-meta">

            100% English 

          </p>

          <div className="export">

            CSV / Excel /
            Editable Table

          </div>

        </div>

      </section>

      {/* PREMIUM POPUP */}

      {
        showPopup && (

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "rgba(0,0,0,0.55)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >

            <div
              style={{
                background: "white",
                width: "90%",
                borderRadius: "28px",
                padding: "clamp(20px,5vw,50px)",
                textAlign: "center",
                position: "relative",
                maxWidth: "520px",

              }}
            >

              {/* CLOSE */}

              <button

                onClick={() =>
                  setShowPopup(false)
                }

                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  border: "none",
                  background: "#eee",
                  width: "clamp(32px,8vw,40px)",
                  height: "clamp(32px,8vw,40px)",
                  borderRadius: "50%",
                  fontSize: "22px",
                  cursor: "pointer",
                }}
              >

                ×

              </button>

              <h1
                style={{
                  color: "#123524",
                  fontSize: "clamp(2rem, 6vw, 52px)",
                  fontWeight: "700",
                }}
              >

                Upgrade Required

              </h1>

              <p
                style={{
                  marginTop: "24px",
                  fontSize: "clamp(1rem, 4vw, 30px)",
                  color: "#444",
                  lineHeight: "1.6",
                }}
              >

                AI Scanner Access is
                available only for
                Premium users.

              </p>

              <button

                onClick={() => {

                  router.push("/scanner");

                }}

                style={{
                  marginTop: "40px",
                  background: "#123524",
                  color: "white",
                  border: "none",
                  padding:
                    "18px 40px",
                  borderRadius: "18px",
                  fontSize: "clamp(1rem, 3vw, 24px)",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >

                Upgrade to Premium

              </button>

            </div>

          </div>

        )
      }

    </>

  );

}