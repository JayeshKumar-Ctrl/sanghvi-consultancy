"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import ProtectedRoute from
"../components/ProtectedRoute";

import Footer from
"../components/Footer";

import toast from
"react-hot-toast";

import { useRouter }
from "next/navigation";

export default function Dashboard() {

  const router =
    useRouter();

  const [consultations,
  setConsultations] =
    useState([]);

  const [user,
  setUser] =
    useState(null);

  const [loading,
  setLoading] =
    useState(true);

  const [showProfile,
  setShowProfile] =
    useState(false);

  const [userData,
  setUserData] =
    useState(null);

  const [editMode,
  setEditMode] =
    useState(false);

  const [showSettings,
  setShowSettings] =
    useState(false);

  const [notifications,
  setNotifications] =
    useState(true);

  const [showUpgradePopup,
  setShowUpgradePopup] =
    useState(false);

  const [showPasswordModal,
  setShowPasswordModal] =
    useState(false);

  const [passwordData,
  setPasswordData] =
    useState({

      currentPassword: "",

      newPassword: "",

    });

  const [editedUser,
  setEditedUser] =
    useState({

      fullName: "",

      email: "",

      company: "",

      phone: "",

    });

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          // USER DATA

          const userRes =
            await fetch(
              "/api/me",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const userData =
            await userRes.json();

          if (userData.user) {

            setUser(
              userData.user
            );

            setUserData(
              userData.user
            );

            setEditedUser({

              fullName:
                userData.user.fullName || "",

              email:
                userData.user.email || "",

              company:
                userData.user.company || "",

              phone:
                userData.user.phone || "",

            });

          }

          // CONSULTATIONS

          const consultationRes =
            await fetch(
              "/api/my-consultations",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const consultationData =
            await consultationRes.json();

          if (
            consultationData
            .consultations
          ) {

            setConsultations(
              consultationData
              .consultations
            );

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchData();

  }, []);

  if (loading) {

    return (

      <div
        style={{

          minHeight:
            "100vh",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          fontSize:
            "42px",

          fontWeight:
            "700",

          background:
            "#d9cfbd",

          color:
            "#18392b",

        }}
      >

        Loading Dashboard...

      </div>

    );

  }

  return (

    <ProtectedRoute>

      <>

        <div
          style={{
            minHeight: "100vh",
            background:"#d9cfbd",
            padding:
              "clamp(20px, 5vw, 60px)",
          }}
        >

          {/* HEADER */}

          <div
            style={{
              marginBottom: "50px",
            }}
          >

            <h1
              style={{

                fontSize:
                  "clamp(42px, 8vw, 68px)",

                marginBottom:
                  "16px",

                color: "#18392b",

              }}
            >

              Welcome back,
              {" "}
              {user?.fullName}

            </h1>

            <p
              style={{
                fontSize:
                  "clamp(16px, 3vw, 22px)",

                    color:"#555",

              }}
            >

              {user?.email}

            </p>

          </div>

          {/* TOP GRID */}

          <div
            style={{

              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",

              gap: "30px",

              marginBottom:
                "70px",

            }}
          >

            {/* PROFILE */}

            <div

              className="dashboard-card"

              onClick={() => {

                setShowProfile(true);

              }}

              style={{
                cursor: "pointer",
              }}
            >

              <h2>
                My Profile
              </h2>

              <p>
                View your account
                information and
                registered details.
              </p>

            </div>

            {/* PLAN */}

            <div className="dashboard-card">

              <h2>
                Plan Details
              </h2>

              <p>
                Current Plan:
                {" "}

                <strong>
                  {user?.planType}
                </strong>
              </p>

            </div>

            {/* SETTINGS */}

            <div

              className="dashboard-card"

              onClick={() => {

                setShowSettings(true);

              }}

              style={{
                cursor: "pointer",
              }}
            >

              <h2>
                Settings
              </h2>

              <p>
                Manage preferences,
                notifications and
                account controls.
              </p>

            </div>

            {/* AI SCANNER */}

            <div

              className="dashboard-card"

              onClick={() => {

                if (
                  user?.isPaid
                ) {

                  router.push(
                    "/scanner"
                  );

                } else {

                  setShowUpgradePopup(true);

                }

              }}

              style={{
                cursor: "pointer",
              }}
            >

              <h2>
                AI Scanner Access
              </h2>

              <p>
                Upload Gujarati
                ledger books and
                automate accounting.
              </p>

            </div>

            {/* PAYMENT */}

            <div className="dashboard-card">

              <h2>
                Payment History
              </h2>

              <p>
                View invoices,
                payment records and
                transaction details.
              </p>

            </div>

            {/* BOOK CONSULTATION */}

            <div className="dashboard-card">

              <h2>
                Book Consultant
              </h2>

              <p
                style={{
                  marginBottom:
                    "20px",
                }}
              >
                Need expert advice?
                Book a consultation.
              </p>

              <Link
                href="/book-consultation"
              >

                <button
                  style={{

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

                    fontWeight:
                      "bold",

                  }}
                >

                  Book Now

                </button>

              </Link>

            </div>

          </div>

          {/* CONSULTATIONS */}

          <div>

            <h2
              style={{
                fontSize:
                  "44px",

                marginBottom:
                  "30px",
              }}
            >

              My Consultations

            </h2>

            {
              consultations.length === 0

              ? (

                <p>
                  No consultations
                  booked yet.
                </p>

              )

              : (

                consultations.map(
                  (item) => (

                  <div
                    key={item._id}

                    className="dashboard-card"

                    style={{
                      marginBottom:
                        "24px",
                    }}
                  >

                    <h3
                      style={{
                        marginBottom:
                          "14px",
                      }}
                    >

                      {
                        item.service
                      }

                    </h3>

                    <p
                      style={{
                        marginBottom:
                          "16px",
                      }}
                    >

                      {
                        item.message
                      }

                    </p>

                    <button
                      style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "12px",
                        fontWeight: "bold",

                        background:
                          item.status === "Approved"
                            ? "#1f7a1f"
                            : item.status === "Rejected"
                            ? "#d62828"
                            : "#f59e0b",

                        color: "white",
                      }}
                    >
                      {
                        item.status === "Approved"
                          ? "Completed"
                          : item.status === "Rejected"
                          ? "Rejected"
                          : "Pending"
                      }
                    </button>

                  </div>

                ))

              )
            }

          </div>

        </div>

        {/* PROFILE MODAL */}

        {
          showProfile &&
          userData && (

            <div

              onClick={(e) => {

                if (
                  e.target ===
                  e.currentTarget
                ) {

                  setShowProfile(false);

                }

              }}

              style={{

                position:
                  "fixed",

                inset: 0,

                background:
                  "rgba(0,0,0,0.45)",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                zIndex:
                  9999,

              }}
            >

              <div

                className="dashboard-modal"

                onClick={(e) => {

                  e.stopPropagation();

                }}

                style={{

                  width:
                    "90%",

                  maxWidth:
                    "700px",

                  background:
                    "white",

                  borderRadius:
                    "28px",

                  padding:
                    "40px",

                  maxHeight:
                    "90vh",

                  overflowY:
                    "auto",

                  position:
                    "relative",

                  boxShadow:
                    "0 20px 70px rgba(0,0,0,0.2)",

                }}
              >

                {/* CLOSE */}

                <button

                  onClick={() => {

                    setShowProfile(false);

                  }}

                  style={{

                    position:
                      "absolute",

                    top: "20px",

                    right: "20px",

                    border:
                      "none",

                    background:
                      "#eee",

                    width:
                      "40px",

                    height:
                      "40px",

                    borderRadius:
                      "50%",

                    cursor:
                      "pointer",

                    fontSize:
                      "18px",

                    fontWeight:
                      "700",

                  }}
                >

                  X

                </button>

                <h1
                  style={{

                    fontSize:
                      "clamp(28px,6vw,42px)",

                    marginBottom:
                      "20px",

                    color:
                      "#18392b",

                  }}
                >

                  My Profile

                </h1>

                {/* BUTTONS */}

                <div
                style={{
                display:"flex",
                gap:"14px",
                flexWrap:"wrap",
                marginBottom:"25px",
                }}
                >

                  <button

                    onClick={() => {

                      setEditMode(
                        !editMode
                      );

                    }}

                    style={{

                      padding:
                        "10px 20px",

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

                      fontWeight:
                        "600",

                    }}
                  >

                    {
                      editMode
                        ? "Cancel Editing"
                        : "Edit Profile"
                    }

                  </button>

                  {
                    editMode && (

                      <button

                        onClick={async () => {

                          try {

                            const token =
                              localStorage.getItem(
                                "token"
                              );

                            const res =
                              await fetch(
                                "/api/update-profile",
                                {

                                  method: "PUT",

                                  headers: {

                                    "Content-Type":
                                      "application/json",

                                    Authorization:
                                      `Bearer ${token}`,

                                  },

                                  body:
                                    JSON.stringify({

                                      fullName:
                                        editedUser.fullName,

                                      companyName:
                                        editedUser.company,

                                    }),

                                }
                              );

                            const data =
                              await res.json();

                            if (data.success) {

                              setUserData(
                                data.user
                              );

                              setUser(
                                data.user
                              );

                              setEditedUser({

                                fullName:
                                  data.user.fullName || "",

                                email:
                                  data.user.email || "",

                                company:
                                  data.user.company || "",

                                phone:
                                  data.user.phone || "",

                              });

                              setEditMode(false);

                              toast.success(
                                "Profile updated successfully"
                              );

                            } else {

                              toast.error(
                                data.message ||
                                "Update failed"
                              );

                            }

                          } catch (error) {

                            console.log(error);

                            toast.error(
                              "Profile update failed"
                            );

                          }

                        }}

                        style={{

                          padding:
                            "10px 20px",

                          border:
                            "none",

                          borderRadius:
                            "12px",

                          background:
                            "#1f7a1f",

                          color:
                            "white",

                          cursor:
                            "pointer",

                          fontWeight:
                            "600",

                        }}
                      >

                        Save Changes

                      </button>

                    )
                  }

                </div>

                {/* FIELDS */}

                <div
                  style={{
                    display: "grid",
                    gap: "18px",
                  }}
                >

                  {/* FULL NAME */}

                  <div>

                    <strong>
                      Full Name:
                    </strong>

                    {
                      editMode ? (

                        <input

                          value={
                            editedUser.fullName
                          }

                          onChange={(e) => {

                            setEditedUser({

                              ...editedUser,

                              fullName:
                                e.target.value,

                            });

                          }}

                          style={{

                            width:
                              "100%",

                            padding:
                              "12px",

                            marginTop:
                              "10px",

                            borderRadius:
                              "10px",

                            border:
                              "1px solid #ccc",

                            fontSize:
                              "16px",

                          }}
                        />

                      ) : (

                        <p>
                          {userData.fullName}
                        </p>

                      )
                    }

                  </div>

                  {/* EMAIL */}

                  <div>

                    <strong>
                      Email:
                    </strong>

                    <p
                      style={{

                        marginTop:
                          "10px",

                        padding:
                          "12px",

                        background:
                          "#f3f3f3",

                        borderRadius:
                          "10px",

                        color:
                          "#666",

                      }}
                    >

                      {userData.email}

                    </p>

                  </div>

                  {/* COMPANY */}

                  <div>

                    <strong>
                      Company Name:
                    </strong>

                    {
                      editMode ? (

                        <input

                          value={
                            editedUser.company
                          }

                          onChange={(e) => {

                            setEditedUser({

                              ...editedUser,

                              company:
                                e.target.value,

                            });

                          }}

                          style={{

                            width:
                              "100%",

                            padding:
                              "12px",

                            marginTop:
                              "10px",

                            borderRadius:
                              "10px",

                            border:
                              "1px solid #ccc",

                            fontSize:
                              "16px",

                          }}
                        />

                      ) : (

                        <p>
                          {
                            userData.company ||
                            "Not Added"
                          }
                        </p>

                      )
                    }

                  </div>

                  {/* PHONE */}

                  <div>

                    <strong>
                      Phone Number:
                    </strong>

                    {
                      editMode ? (

                        <input

                          value={editedUser.phone}

                          onChange={(e)=>{

                            setEditedUser({

                              ...editedUser,

                              phone:e.target.value,

                            });

                          }}

                          style={{

                            width:"100%",

                            padding:"12px",

                            marginTop:"10px",

                            borderRadius:"10px",

                            border:"1px solid #ccc",

                            fontSize:"16px",

                          }}

                        />

                      ) : (

                        <p>

                          {userData.phone || "Not Added"}

                        </p>

                      )
                    }

                  </div>

                </div>

              </div>

            </div>

          )
        }

        {
          showSettings && (

            <div

              onClick={(e) => {

                if (
                  e.target ===
                  e.currentTarget
                ) {

                  setShowSettings(false);

                }

              }}

              style={{

                position:
                  "fixed",

                inset: 0,

                background:
                  "rgba(0,0,0,0.45)",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                zIndex:
                  9999,

              }}
            >

              <div

                className="dashboard-modal"

                onClick={(e) => {

                  e.stopPropagation();

                }}

                style={{

                  width:
                    "90%",

                  maxWidth:
                    "600px",

                  background:
                    "white",

                  borderRadius:
                    "28px",

                  padding:
                    "40px",

                  position:
                    "relative",

                }}
              >

                <button

                  onClick={() => {

                    setShowSettings(false);

                  }}

                  style={{

                    position:
                      "absolute",

                    top: "20px",

                    right: "20px",

                    border:
                      "none",

                    background:
                      "#eee",

                    width:
                      "40px",

                    height:
                      "40px",

                    borderRadius:
                      "50%",

                    cursor:
                      "pointer",

                    fontWeight:
                      "700",

                  }}
                >

                  X

                </button>

                <h1
                  style={{

                    fontSize:
                      "clamp(28px,6vw,40px)",

                    marginBottom:
                      "30px",

                    color:
                      "#18392b",

                  }}
                >

                  Settings

                </h1>

                {/* NOTIFICATIONS */}

                <div
                  style={{
                    marginBottom: "25px",
                  }}
                >

                  <h3>
                    📩 Notifications
                  </h3>

                  <button

                    onClick={() => {

                      setNotifications(
                        !notifications
                      );

                    }}

                    style={{

                      marginTop:
                        "10px",

                      padding:
                        "10px 18px",

                      border:
                        "none",

                      borderRadius:
                        "12px",

                      background:
                        notifications
                          ? "#18392b"
                          : "#ddd",

                      color:
                        notifications
                          ? "white"
                          : "black",

                      cursor:
                        "pointer",

                    }}
                  >

                    {
                      notifications
                        ? "Enabled"
                        : "Disabled"
                    }

                  </button>

                </div>

                {/* SESSION ACTIVITY */}

                <div
                  style={{
                    marginBottom: "25px",
                  }}
                >

                  <h3>
                    🖥️ Session Activity
                  </h3>

                  <div
                    style={{
                      marginTop: "14px",
                      lineHeight: "2",
                      color: "#555",
                    }}
                  >

                    <p>

                      <strong>
                        Last Login:
                      </strong>

                      {" "}
                      Today

                    </p>

                    <p>

                      <strong>
                        Current Device:
                      </strong>

                      {" "}
                      Desktop

                    </p>

                    <p>

                      <strong>
                        Browser:
                      </strong>

                      {" "}
                      Chrome

                    </p>

                  </div>

                </div>

                {/* CHANGE PASSWORD */}

                <div
                  style={{
                    marginBottom: "25px",
                  }}
                >

                  <h3>
                    🔐 Change Password
                  </h3>

                  <button

                    onClick={() => {

                      setShowPasswordModal(true);

                    }}

                    style={{

                      marginTop:
                        "10px",

                      padding:
                        "10px 18px",

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

                    Change Password

                  </button>

                </div>

                {/* LOGOUT ALL */}

                <div>

                  <h3>
                    🚪 Logout All Devices
                  </h3>

                  <button

                    onClick={() => {

                      localStorage.removeItem(
                        "token"
                      );

                      window.location.href =
                        "/login";

                    }}

                    style={{

                      marginTop:
                        "10px",

                      padding:
                        "10px 18px",

                      border:
                        "none",

                      borderRadius:
                        "12px",

                      background:
                        "#d62828",

                      color:
                        "white",

                      cursor:
                        "pointer",

                    }}
                  >

                    Logout All

                  </button>

                </div>

              </div>

            </div>

          )
        }
        {
          showPasswordModal && (

            <div

              onClick={(e) => {

                if (
                  e.target ===
                  e.currentTarget
                ) {

                  setShowPasswordModal(false);

                }

              }}

              style={{

                position:
                  "fixed",

                inset: 0,

                background:
                  "rgba(0,0,0,0.45)",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                zIndex:
                  99999,

              }}
            >

              <div

                className="dashboard-modal"

                onClick={(e) => {

                  e.stopPropagation();

                }}

                style={{

                  width:
                    "90%",

                  maxWidth:
                    "500px",

                  background:
                    "white",

                  borderRadius:
                    "28px",

                  padding:
                    "40px",

                  position:
                    "relative",

                }}
              >

                <button

                  onClick={() => {

                    setShowPasswordModal(false);

                  }}

                  style={{

                    position:
                      "absolute",

                    top: "20px",

                    right: "20px",

                    border:
                      "none",

                    background:
                      "#eee",

                    width:
                      "40px",

                    height:
                      "40px",

                    borderRadius:
                      "50%",

                    cursor:
                      "pointer",

                    fontWeight:
                      "700",

                  }}
                >

                  X

                </button>

                <h1
                  style={{

                    fontSize:
                      "clamp(26px,6vw,34px)",

                    marginBottom:
                      "25px",

                    color:
                      "#18392b",

                  }}
                >

                  Change Password

                </h1>

                {/* CURRENT PASSWORD */}

                <input

                  type="password"

                  placeholder="Current Password"

                  value={
                    passwordData.currentPassword
                  }

                  onChange={(e) => {

                    setPasswordData({

                      ...passwordData,

                      currentPassword:
                        e.target.value,

                    });

                  }}

                  style={{

                    width:
                      "100%",

                    padding:
                      "14px",

                    border:
                      "1px solid #ccc",

                    borderRadius:
                      "12px",

                    marginBottom:
                      "18px",

                  }}
                />

                {/* NEW PASSWORD */}

                <input

                  type="password"

                  placeholder="New Password"

                  value={
                    passwordData.newPassword
                  }

                  onChange={(e) => {

                    setPasswordData({

                      ...passwordData,

                      newPassword:
                        e.target.value,

                    });

                  }}

                  style={{

                    width:
                      "100%",

                    padding:
                      "14px",

                    border:
                      "1px solid #ccc",

                    borderRadius:
                      "12px",

                    marginBottom:
                      "22px",

                  }}
                />

                <button

                  onClick={async () => {

                    try {

                      const token =
                        localStorage.getItem(
                          "token"
                        );

                      const res =
                        await fetch(
                          "/api/change-password",
                          {

                            method: "PUT",

                            headers: {

                              "Content-Type":
                                "application/json",

                              Authorization:
                                `Bearer ${token}`,

                            },

                            body:
                              JSON.stringify(
                                passwordData
                              ),

                          }
                        );

                      const data =
                        await res.json();

                      if (data.success) {

                        toast.success(
                          "Password changed successfully"
                        );

                        setShowPasswordModal(false);

                        setPasswordData({

                          currentPassword: "",

                          newPassword: "",

                        });

                      } else {

                        toast.error(
                          data.message
                        );

                      }

                    } catch (error) {

                      console.log(error);

                      toast.error(
                        "Password change failed"
                      );

                    }

                  }}

                  style={{

                    width:
                      "100%",

                    padding:
                      "14px",

                    border:
                      "none",

                    borderRadius:
                      "12px",

                    background:
                      "#18392b",

                    color:
                      "white",

                    fontWeight:
                      "600",

                    cursor:
                      "pointer",

                  }}
                >

                  Update Password

                </button>

              </div>

            </div>

          )
        }

        {
          showUpgradePopup && (

            <div

              onClick={(e) => {

                if (
                  e.target ===
                  e.currentTarget
                ) {

                  setShowUpgradePopup(false);

                }

              }}

              style={{

                position:
                  "fixed",

                inset: 0,

                background:
                  "rgba(0,0,0,0.45)",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                zIndex:
                  99999,

              }}
            >

              <div

                className="dashboard-modal"

                onClick={(e) => {

                  e.stopPropagation();

                }}

                style={{

                  width:
                    "90%",

                  maxWidth:
                    "500px",

                  background:
                    "white",

                  borderRadius:
                    "28px",

                  padding:
                    "40px",

                  textAlign:
                    "center",

                  position:
                    "relative",

                }}
              >

                <button

                  onClick={() => {

                    setShowUpgradePopup(false);

                  }}

                  style={{

                    position:
                      "absolute",

                    top: "20px",

                    right: "20px",

                    border:
                      "none",

                    background:
                      "#eee",

                    width:
                      "40px",

                    height:
                      "40px",

                    borderRadius:
                      "50%",

                    cursor:
                      "pointer",

                    fontWeight:
                      "700",

                  }}
                >

                  X

                </button>

                <h1
                  style={{

                    fontSize:
                      "clamp(26px,6vw,36px)",

                    marginBottom:
                      "20px",

                    color:
                      "#18392b",

                  }}
                >

                  Upgrade Required

                </h1>

                <p
                  style={{

                    fontSize:
                      "18px",

                    color:
                      "#555",

                    marginBottom:
                      "30px",

                    lineHeight:
                      "1.8",

                  }}
                >

                  AI Scanner Access
                  is available only
                  for Premium users.

                </p>

                <button

                  onClick={() => {

                    router.push(
                      "/scanner"
                    );

                  }}

                  style={{

                    padding:
                      "14px 26px",

                    border:
                      "none",

                    borderRadius:
                      "14px",

                    background:
                      "#18392b",

                    color:
                      "white",

                    fontWeight:
                      "600",

                    cursor:
                      "pointer",

                    fontSize:
                      "16px",

                  }}
                >

                  Upgrade to Premium

                </button>

              </div>

            </div>

          )
        }

        <Footer />

      </>

    </ProtectedRoute>

  );

}