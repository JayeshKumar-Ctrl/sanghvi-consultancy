"use client";

import {
  useState,
} from "react";

import { useRouter }
from "next/navigation";

import toast from "react-hot-toast";

export default function ForgotPasswordPage() {

  const router =
    useRouter();

  const [email,
  setEmail] =
    useState("");

  const [otp,
  setOtp] =
    useState("");

  const [newPassword,
  setNewPassword] =
    useState("");

  const [otpSent,
  setOtpSent] =
    useState(false);

  const [loading,
  setLoading] =
    useState(false);

  // SEND OTP

  const sendOtp =
    async () => {

      try {

        setLoading(true);

        const res =
          await fetch(
            "/api/forgot-password",
            {

              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  email,
                }),
            }
          );

        const data =
          await res.json();

        if (data.success) {

          toast.success(data.message);

        } else {

          toast.error(data.message);

        }

        if (
          data.success
        ) {

          setOtpSent(
            true
          );

        }

      } catch (error) {

        console.log(error);

        toast.error("Something went wrong. Please try again.");

      } finally {

        setLoading(false);

      }

    };

  // RESET PASSWORD

  const resetPassword =
    async () => {

      try {

        setLoading(true);

        const res =
          await fetch(
            "/api/reset-password",
            {

              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({

                  email,

                  otp,

                  newPassword,

                }),
            }
          );

        const data =
          await res.json();

        if (data.success) {

          toast.success(data.message);

        } else {

          toast.error(data.message);

        }

        // REDIRECT

        if (
          data.success
        ) {

          router.push(
            "/login"
          );

        }

      } catch (error) {

        console.log(error);

        toast.error("Something went wrong. Please try again.");

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      style={{

        minHeight:
          "100vh",

        background:
          "#d9cfbd",

        display:
          "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        padding:
          "clamp(16px,4vw,30px)",

      }}
    >

      <form

        onSubmit={(e) => {

          e.preventDefault();

          if (otpSent) {

            resetPassword();

          } else {

            sendOtp();

          }

        }}
          style={{

            width:
              "100%",

            maxWidth:
              "500px",

            background:
              "white",

            borderRadius:
              "35px",

            padding:
              "clamp(24px,5vw,50px)",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",

            boxSizing: 
              "border-box",

          }}
        
      >

        <h1
          style={{

            fontSize:
              "clamp(34px,8vw,52px)",

            marginBottom:
              "10px",

            color:
              "#111",

          }}
        >

          Forgot Password

        </h1>

        <p
          style={{

            color:
              "#666",

            marginBottom:
              "35px",

            fontSize:
              "clamp(15px,3vw,18px)",

          }}
        >

          Reset your password securely.

        </p>

        {/* EMAIL */}

        <input

          type="email"

          autoComplete="email"

          required

          placeholder="Enter your email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          style={{

            width:
              "100%",

            padding:
              "18px",

            borderRadius:
              "14px",

            border:
              "1px solid #ccc",

            fontSize:
              "16px",

            marginBottom:
              "20px",

            outline:
              "none",

          }}
        />

        {/* OTP SECTION */}

        {
          otpSent && (

            <>

              <input

                type="text"

                autoComplete="one-time-code"

                inputMode="numeric"

                required

                placeholder="Enter OTP"

                value={otp}

                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }

                style={{

                  width:
                    "100%",

                  padding:
                    "18px",

                  borderRadius:
                    "14px",

                  border:
                    "1px solid #ccc",

                  fontSize:
                    "16px",

                  marginBottom:
                    "20px",

                  outline:
                    "none",

                }}
              />

              <input

                type="password"

                required

                autoComplete="new-password"

                placeholder="New Password"

                value={
                  newPassword
                }

                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }

                style={{

                  width:
                    "100%",

                  padding:
                    "18px",

                  borderRadius:
                    "14px",

                  border:
                    "1px solid #ccc",

                  fontSize:
                    "16px",

                  marginBottom:
                    "25px",

                  outline:
                    "none",

                }}
              />

            </>

          )
        }

        {/* BUTTON */}

        <button

          type="submit"

          disabled={loading}

          style={{

            width:
              "100%",

            padding:
              "18px",

            border:
              "none",

            borderRadius:
              "18px",

            background:
              "#18392b",

            color:
              "white",

            fontSize:
              "clamp(16px,3vw,18px)",

            fontWeight:
              "600",

            cursor: loading ? "not-allowed" : "pointer",

            opacity: loading ? 0.7 : 1,

          }}
        >

          {
            loading
              ? "Please wait..."
              : otpSent
              ? "Reset Password"
              : "Send OTP"
          }

        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >

          Remember your password?{" "}

          <span
            onClick={() => router.push("/login")}
            style={{
              color: "#18392b",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >

            Sign In

          </span>

        </p>

      </form>

    </div>

  );

}