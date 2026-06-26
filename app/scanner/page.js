"use client";

import {
  useEffect,
  useState
} from "react";

import { useRouter } from "next/navigation";

import Footer from
"../components/Footer";

import toast from "react-hot-toast";


import {

  Upload,

  FileText,

  Languages,

  Files,

  Sheet,

} from "lucide-react";

export default function
ScannerPage() {

  const router =
    useRouter();

  const [user, setUser] =
    useState(null);
  
  const [checkingUser, setCheckingUser] =
    useState(true);

  const [loading,
  setLoading] =
    useState(false);

  const [statusMessage,
  setStatusMessage] =
    useState("");
  
  const [dragActive,
  setDragActive] =
    useState(false);

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {

            setCheckingUser(false);

            return;

          }

          const res =
            await fetch(
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

        } finally {

          setCheckingUser(false);

        }

      };

    fetchUser();

  }, []);

  if (checkingUser) {

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
            fontSize: "22px",
            fontWeight: "600",
            color: "#18392b",
          }}
        >
          Loading AI Scanner...
        </p>

      </div>

    );

  }

  const fetchUser = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

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

      setUser(data.user);

    } catch (error) {

      console.log(error);

    }

  };

  const handlePayment =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const orderRes =
          await fetch(
            "/api/create-order",
            {
              method: "POST",

              headers: {
                Authorization: `Bearer ${token}`,
              },

            }
          );

        const orderData =
          await orderRes.json();

        const options = {

          key:
            process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

          amount:
            orderData.order.amount,

          currency:
            "INR",

          name:
            "Sanghvi Consultancy",

          description:
            "AI Scanner Premium",

          order_id:
            orderData.order.id,

          handler: async function (response) {

            try {

              const token =
                localStorage.getItem("token");

              const verifyRes =
                await fetch(
                  "/api/verify-payment",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",

                      Authorization:
                        `Bearer ${token}`,
                    },

                    body: JSON.stringify({

                      razorpay_payment_id:
                        response.razorpay_payment_id,

                      razorpay_order_id:
                        response.razorpay_order_id,

                      razorpay_signature:
                        response.razorpay_signature,

                    }),
                  }
                );

              const data =
                await verifyRes.json();

              console.log(data);

              if (data.success) {

                alert(
                  "Premium Activated Successfully"
                );

                window.location.href =
                  "/dashboard";

              } else {

                alert(
                  data.message
                );

              }

            } catch (error) {

              console.log(error);

              alert(
                "Payment verification failed"
              );

            }

          },

          theme: {
            color:
              "#0c3b2e",
          },

        };

        const razor =
          new window.Razorpay(
            options
          );

        razor.open();

      } catch (error) {

        console.log(error);

      }

  };

  const convertLedger =
    async (
      fileUrl,
      fileName,
      language,
      mimeType
    ) => {

      try {

        setLoading(true);
        setStatusMessage(
          "AI is extracting ledger data..."
        );

        const token =
          localStorage.getItem(
            "token"
          );
        
        console.log(token);

        const res =
          await fetch(
            "/api/convert-ledger",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,

              },

              body: JSON.stringify({

                fileUrl,
                fileName,
                language,
                mimeType,

              }),

            }
          );

        const data =
          await res.json();

        if (data.success) {

          setStatusMessage(
            "Excel generated successfully!"
          );

          toast.success(
            "Ledger converted successfully!"
          );

          setStatusMessage(
            "Conversion completed successfully!"
          );

          setTimeout(() => {

            window.location.reload();

          }, 2000); 
        }else {

          toast.error(
            data.message
          );

        }

      } catch (error) {

        console.log(error);

        setStatusMessage(
          "Conversion failed"
        );

        toast.error(
          "Conversion failed"
        )

      } finally {

        setLoading(false);

      }

    };
    
    if (
      user &&
      !user.isPremium
    ) {

      return (

        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#d9d0be",
          }}
        >

          <div
            style={{
              background:
                "white",

              padding: "clamp(25px,5vw,50px)",

              borderRadius:
                "24px",

              textAlign:
                "center",

              width: "100%",
              maxWidth: "420px",

            }}
          >

            <h1
              style={{
                fontSize: "clamp(30px,7vw,42px)",
              }}
            >
              Unlock AI Scanner
            </h1>

            <p
              style={{
                marginTop: "10px",
              }}
            >
              Premium AI-powered
              financial scanner
            </p>

            <h2
              style={{
                marginTop: "20px",
                fontSize: "clamp(28px,6vw,38px)",
              }}
            >
              ₹299/month
            </h2>

            <button

              onClick={
                handlePayment
              }

              style={{

                width: "100%",

                marginTop: "30px",

                background:
                  "#0c3b2e",

                color: "white",

                border: "none",

                padding:
                  "14px 30px",

                borderRadius:
                  "14px",

                fontSize: "18px",

                cursor: "pointer",

              }}
            >

              Upgrade Now

            </button>

          </div>

        </div>

      );

    }

  return (

    <>
    {
      loading && (

        <div
          style={{

            position:
              "fixed",

            top: 0,

            left: 0,

            width: "100%",

            height: "100%",

            background:
              "rgba(0,0,0,0.65)",

            zIndex: 9999,

            display: "flex",

            flexDirection:
              "column",

            alignItems:
              "center",

            justifyContent:
              "center",

            color:
              "white",

          }}
        >

          <div
            style={{

              width: "70px",

              height: "70px",

              border:
                "8px solid #ffffff40",

              borderTop:
                "8px solid white",

              borderRadius:
                "50%",

              animation:
                "spin 1s linear infinite",

              marginBottom:
                "25px",

            }}
          />

          <h1
            style={{
              fontSize: "clamp(28px,6vw,36px)",
              marginBottom: "12px",
            }}
          >

            Processing Ledger

          </h1>

          <p
            style={{
              fontSize: "clamp(16px,4vw,20px)",
            }}
          >

            {statusMessage}

          </p>

          <style jsx>{`

            @keyframes spin {

              0% {
                transform:
                  rotate(0deg);
              }

              100% {
                transform:
                  rotate(360deg);
              }

            }

          `}</style>

        </div>

      )
    }

      <div
        style={{
          minHeight: "100vh",
          background: "#d9cfbd",
          padding: "clamp(20px, 5vw, 60px)",
        }}
      >

        <h1
          style={{
            fontSize: "clamp(42px, 8vw, 72px)",
            marginBottom: "20px",
          }}
        >

          AI Accounting Portal

        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 3vw, 22px)",
            marginBottom: "60px",
            maxWidth: "900px",
            lineHeight: "1.6",
          }}
        >

          Upload documents,
          convert Gujarati,
          Hindi and Marwadi
          ledger books into
          structured English
          Excel sheets using
          AI-powered accounting
          automation.

        </p>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",

            gap: "30px",
          }}
        >

          {/* CARD 1 */}

          <div className="dashboard-card">

            <h2
                style={{

                  display: "flex",

                  alignItems: "center",

                  gap: "12px",

                }}
              >

                <Upload size={32} />

                Upload Documents

            </h2>

            <p
              style={{
                marginBottom: "20px",
              }}
            >
              Upload invoices,
              GST PDFs, bank
              statements and
              accounting files
              securely.
            </p>

            <input
              id="upload-documents"
              type="file"
              disabled={loading}
              style={{
                display: "none",
              }}

              onChange={async (e) => {

                try {

                  const selectedFile =
                    e.target.files[0];
                  
                  setLoading(true);

                  setStatusMessage(
                    "Uploading file securely..."
                  );

                  if (!selectedFile) return;

                  const token =
                    localStorage.getItem(
                      "token"
                    );

                  const formData =
                    new FormData();

                  formData.append(
                    "file",
                    selectedFile
                  );

                  formData.append(
                    "category",
                    "Document"
                  );

                  formData.append(
                    "token",
                    token
                  );

                  const res =
                    await fetch(
                      "/api/upload-document",
                      {

                        method: "POST",

                        body: formData,

                      }
                    );

                  const data =
                    await res.json();

                  if (data.success) {

                    toast.success(
                      "Document uploaded successfully"
                    )

                    setLoading(false);

                  } else {

                    toast.error("Upload failed")

                    setLoading(false);

                  }

                } catch (error) {

                  console.log(error);

                  toast.error(
                    "Upload failed"
                  );

                  setLoading(false);

                }

              }}
            />

            <div

              className={`
                upload-zone
                ${dragActive ? "drag-active" : ""}
              `}
              onDragEnter={(e) => {

                e.preventDefault();

                setDragActive(true);

              }}

              onDragOver={(e) => {

                e.preventDefault();

                setDragActive(true);

              }}

              onDragLeave={(e) => {

                e.preventDefault();

                setDragActive(false);

              }}

              onDrop={async (e) => {

                e.preventDefault();

                setDragActive(false);

                try {

                  const selectedFile =
                    e.dataTransfer.files[0];

                  if (!selectedFile) return;

                  setLoading(true);

                  setStatusMessage(
                    "Uploading file securely..."
                  );

                  const token =
                    localStorage.getItem(
                      "token"
                    );

                  const formData =
                    new FormData();

                  formData.append(
                    "file",
                    selectedFile
                  );

                  formData.append(
                    "category",
                    "Document"
                  );

                  formData.append(
                    "token",
                    token
                  );

                  const res =
                    await fetch(
                      "/api/upload-document",
                      {

                        method: "POST",

                        body: formData,

                      }
                    );

                  const data =
                    await res.json();

                  if (data.success) {

                    toast.success(
                      "Document uploaded successfully"
                    );

                  } else {

                    toast.error(
                      "Upload failed"
                    );

                  }

                } catch (error) {

                  console.log(error);

                  toast.error(
                    "Upload failed"
                  );

                } finally {

                  setLoading(false);

                }

              }}

            >

              <label
                className="premium-button"

                htmlFor="upload-documents"

                style={{

                  display:
                    "inline-block",

                  padding:
                    "14px 28px",

                  background:
                    "#18392b",

                  color:
                    "white",

                  borderRadius:
                    "12px",

                  cursor:
                    "pointer",

                  fontWeight:
                    "600",

                  fontSize:
                    "17px",

                }}
              >

                Upload File

              </label>

              <p
                style={{

                  marginTop:
                    "18px",

                  color:
                    "#666",

                  fontSize:
                    "15px",

                }}
              >

                Drag & drop files here
                or click upload

              </p>

            </div>

          </div>

          {/* CARD 2 */}

          <div className="dashboard-card">

            <h2
              style={{

                display: "flex",

                alignItems: "center",

                gap: "12px",

              }}
            >

              <Languages size={32} />

              Gujarati → English

            </h2>

            <p
              style={{
                marginBottom: "20px",
              }}
            >
              Convert Gujarati
              ledger books into
              clean English Excel
              sheets automatically.
            </p>

            <input
              id="upload-gujarati"
              type="file"
              disabled={loading}
              style={{
                display: "none",
              }}

              onChange={async (e) => {

                try {

                  const selectedFile =
                    e.target.files[0];

                  setLoading(true);

                  setStatusMessage(
                    "Uploading ledger..."
                  );

                  if (!selectedFile) return;

                  const token =
                    localStorage.getItem(
                      "token"
                    );

                  const formData =
                    new FormData();

                  formData.append(
                    "file",
                    selectedFile
                  );

                  formData.append(
                    "language",
                    "Gujarati"
                  );

                  formData.append(
                    "token",
                    token
                  );

                  const res =
                    await fetch(
                      "/api/upload-conversion",
                      {

                        method: "POST",

                        body: formData,

                      }
                    );

                  const data =
                    await res.json();

                  if (data.success) {

                    toast.success(
                      "Gujarati ledger uploaded successfully"
                    );

                    await convertLedger(

                      data.conversion
                        .originalFileUrl,

                      data.conversion
                        .fileName,

                      "Gujarati",

                      selectedFile.type

                    );

                  } else {

                    toast.error("Upload failed")

                  }

                } catch (error) {

                  console.log(error);

                  toast.error(
                    "Upload failed"
                  );

                  setLoading(false);

                }

              }}
            />
            <label
              className="premium-button"

              htmlFor="upload-gujarati"

              style={{

                display:
                  "inline-block",

                padding:
                  "12px 24px",

                background:
                  "#18392b",

                color:
                  "white",

                borderRadius:
                  "12px",

                cursor:
                  "pointer",

                fontWeight:
                  "600",

                marginTop:
                  "10px",

              }}
            >

              Upload File

            </label>

          </div>

          {/* CARD 3 */}

          <div className="dashboard-card">

            <h2
              style={{

                display: "flex",

                alignItems: "center",

                gap: "12px",

              }}
            >

              <Languages size={32} />

              Hindi → English

            </h2>

            <p
              style={{
                marginBottom: "20px",
              }}
            >
              AI-powered Hindi
              accounting conversion
              and ledger extraction.
            </p>

            <input

              id="upload-hindi"
              type="file"
              disabled={loading}
              style={{
                display: "none",
              }}

              onChange={async (e) => {

                try {

                  const selectedFile =
                    e.target.files[0];
                  
                  setLoading(true);
                  
                  setStatusMessage(
                    "Uploading ledger..."
                  );

                  if (!selectedFile) return;

                  const token =
                    localStorage.getItem(
                      "token"
                    );

                  const formData =
                    new FormData();

                  formData.append(
                    "file",
                    selectedFile
                  );

                  formData.append(
                    "language",
                    "Hindi"
                  );

                  formData.append(
                    "token",
                    token
                  );

                  const res =
                    await fetch(
                      "/api/upload-conversion",
                      {

                        method: "POST",

                        body: formData,

                      }
                    );

                  const data =
                    await res.json();

                  if (data.success) {

                    toast.success(
                      "Hindi ledger uploaded successfully"
                    );

                    await convertLedger(

                      data.conversion
                        .originalFileUrl,

                      data.conversion
                        .fileName,

                      "Hindi",

                      selectedFile.type

                    );

                  } else {

                    toast.error("Upload failed")

                  }

                } catch (error) {

                  console.log(error);

                  toast.error(
                    "Upload failed"
                  );

                  setLoading(false);

                }

              }}
            />
            <label
              className="premium-button"

              htmlFor="upload-hindi"

              style={{

                display:
                  "inline-block",

                padding:
                  "12px 24px",

                background:
                  "#18392b",

                color:
                  "white",

                borderRadius:
                  "12px",

                cursor:
                  "pointer",

                fontWeight:
                  "600",

                marginTop:
                  "10px",

              }}
            >

              Upload File

            </label>

          </div>

          {/* CARD 4 */}

          <div className="dashboard-card">

            <h2
              style={{

                display: "flex",

                alignItems: "center",

                gap: "12px",

              }}
            >

              <Languages size={32} />

              Marwadi → English

            </h2>

            <p
              style={{
                marginBottom: "20px",
              }}
            >
              Convert handwritten
              Marwadi books into
              structured digital
              accounting data.
            </p>

            <input

              id="upload-marwadi"
              type="file"
              disabled={loading}
              style={{
                display: "none",
              }}

              onChange={async (e) => {

                try {

                  const selectedFile =
                    e.target.files[0];

                  setLoading(true);
                  
                  setStatusMessage(
                    "Uploading ledger..."
                  );

                  if (!selectedFile) return;

                  const token =
                    localStorage.getItem(
                      "token"
                    );

                  const formData =
                    new FormData();

                  formData.append(
                    "file",
                    selectedFile
                  );

                  formData.append(
                    "language",
                    "Marwadi"
                  );

                  formData.append(
                    "token",
                    token
                  );

                  const res =
                    await fetch(
                      "/api/upload-conversion",
                      {

                        method: "POST",

                        body: formData,

                      }
                    );

                  const data =
                    await res.json();

                  if (data.success) {

                    toast.success(
                      "Marwadi ledger uploaded successfully"
                    );

                    await convertLedger(

                      data.conversion
                        .originalFileUrl,

                      data.conversion
                        .fileName,

                      "Marwadi",

                      selectedFile.type

                    );

                  } else {

                    toast.error("Upload failed")

                  }

                } catch (error) {

                  console.log(error);

                  toast.error(
                    "Upload failed"
                  );

                  setLoading(false);

                }

              }}
            />
            <label
              className="premium-button"

              htmlFor="upload-marwadi"

              style={{

                display:
                  "inline-block",

                padding:
                  "12px 24px",

                background:
                  "#18392b",

                color:
                  "white",

                borderRadius:
                  "12px",

                cursor:
                  "pointer",

                fontWeight:
                  "600",

                marginTop:
                  "10px",

              }}
            >

              Upload File

            </label>

          </div>

          {/* CARD 5 */}

          <div className="dashboard-card">

            <h2
              style={{

                display: "flex",

                alignItems: "center",

                gap: "12px",

                marginBottom: "20px",

              }}
            >

              <Files size={32} />

              My Documents

            </h2>

            <p
              style={{
                marginBottom: "20px",
              }}
            >
              View all uploaded
              ledger files and
              accounting documents.
            </p>

            <button
              className="premium-button"

              disabled={loading}
              onClick={() => {

                router.push(
                  "/my-documents"
                );

              }}

              style={{

                padding:
                  "12px 22px",

                background:
                  "#18392b",

                color:
                  "white",

                border:
                  "none",

                borderRadius:
                  "10px",

                opacity:
                  loading ? 0.6 : 1,

                cursor:
                  loading
                    ? "not-allowed"
                    : "pointer",


                fontWeight:
                  "600",

              }}
            >

              Open Documents

            </button>

          </div>

          {/* CARD 6 */}

          <div className="dashboard-card">

            <h2
              style={{

                display: "flex",

                alignItems: "center",

                gap: "12px",

                marginBottom: "20px",

              }}
            >

              <Sheet size={32} />

              Converted Excel Files

            </h2>

            <p
              style={{
                marginBottom: "20px",
              }}
            >
              View and download all
              converted Excel sheets.
            </p>

            <button
              className="premium-button"

              disabled={loading}

              onClick={() => {

                router.push(
                  "/converted-files"
                );

              }}

              style={{

                padding:
                  "12px 22px",

                background:
                  "#18392b",

                color:
                  "white",

                border:
                  "none",

                borderRadius:
                  "10px",

                opacity:
                  loading ? 0.6 : 1,

                cursor:
                  loading
                    ? "not-allowed"
                    : "pointer",


                fontWeight:
                  "600",

              }}
            >

              Open Converted Files

            </button>

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

}