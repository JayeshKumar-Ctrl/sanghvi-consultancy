"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  const [isLoggedIn,
  setIsLoggedIn] =
    useState(false);

  const [isAdmin,
  setIsAdmin] =
    useState(false);

  const [loading,
  setLoading] =
    useState(false);

  const checkUser =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        // NO TOKEN

        if (!token) {

          setIsLoggedIn(false);

          setIsAdmin(false);

          setLoading(false);

          return;

        }

        // TOKEN EXISTS

        setIsLoggedIn(true);

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

        // INVALID TOKEN

        if (!data.user) {

          localStorage.removeItem(
            "token"
          );

          setIsLoggedIn(false);

          setIsAdmin(false);

          setLoading(false);

          return;

        }

        // VALID USER

        setIsLoggedIn(true);

        if (
          data.user.email ===
          process.env
          .NEXT_PUBLIC_ADMIN_EMAIL
        ) {

          setIsAdmin(true);

        } else {

          setIsAdmin(false);

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    checkUser();

    // WHEN USER RETURNS
    // FROM OTHER PAGE

    window.addEventListener(
      "focus",
      checkUser
    );

    // WHEN PAGE CHANGES

    window.addEventListener(
      "pageshow",
      checkUser
    );

    return () => {

      window.removeEventListener(
        "focus",
        checkUser
      );

      window.removeEventListener(
        "pageshow",
        checkUser
      );

    };

  }, [pathname]);

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    setIsLoggedIn(false);

    setIsAdmin(false);

    window.location.href = "/";

  };

  if (loading) {

    return (

      <div
        style={{
          height: "110px",
          background: "#d7d9d0",
        }}
      />

    );

  }

  return (

    <div className="navbar">

      {/* LEFT LOGO */}

      <a
        href={
          isLoggedIn
          ? "#dashboard"
          : "#home"
        }
        className="logo"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >

        <div className="logo-circle">
          SCS
        </div>

        <div>

          <h3>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            SANGHVI
          </h3>

          <h3>
            CONSULTANCY
          </h3>

          <h3>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            SERVICES
          </h3>

        </div>

      </a>

      {/* CENTER LINKS */}

      <div className="nav-links">

        <a href="#home">
          Home
        </a>

        <a href="#news">
          News
        </a>

        <a href="#services">
          Services
        </a>

        <a href="#sip">
          SIP Calculator
        </a>

        <a href="#scanner">
          AI Scanner
        </a>

        <a href="#about">
          About
        </a>

        <a href="#contact">
          Contact
        </a>

      </div>

      {/* RIGHT BUTTONS */}

      <div className="nav-buttons">

        {
          !isLoggedIn ? (

            <>

              <Link
                href="/login"
                className="btn-outline"
              >

                Login

              </Link>

              <Link
                href="/book-consultation"
                className="btn-primary"
              >

                Book a Consultant

              </Link>

            </>

          ) : (

            <>

              {
                isAdmin ? (

                  <Link
                    href="/admin"
                    className="btn-outline"
                  >

                    Admin Panel

                  </Link>

                ) : (

                  <Link
                    href="/dashboard"
                    className="btn-outline"
                  >

                    Dashboard

                  </Link>

                )
              }

              <button
                onClick={handleLogout}
                className="btn-primary"
              >

                Logout

              </button>

            </>

          )
        }

        <a
          href="https://wa.me/918247564764"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >

          WhatsApp

        </a>

      </div>

    </div>

  );

}