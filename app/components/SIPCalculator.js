"use client";

import { useState, useEffect } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function SIPCalculator() {

  const [monthly, setMonthly] =
    useState(15000);

  const [years, setYears] =
    useState(15);

  const [rate, setRate] =
    useState(12);

  const [isLoggedIn,
  setIsLoggedIn] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {

      setIsLoggedIn(true);

    }

  }, []);

  const handleProtectedSlider =
    (setter, value) => {

      // NOT LOGGED IN
      if (!isLoggedIn) {

        alert(
          "Please login to use SIP Calculator."
        );

        window.location.href =
          "/login";

        return;
      }

      // LOGGED IN
      setter(value);

    };

  const months = years * 12;

  const r = rate / 100 / 12;

  let total = 0;

  let invested = 0;

  let data = [];

  for (let i = 1; i <= months; i++) {

    total =
      (total + monthly) * (1 + r);

    invested += monthly;

    if (i % 12 === 0) {

      data.push({
        year: i / 12,
        total: Math.round(total),
        invested: invested
      });

    }

  }

  const finalValue = total;

  const CustomTooltip = ({
    active,
    payload,
    label
  }) => {

    if (
      active &&
      payload &&
      payload.length
    ) {

      const invested =
        payload.find(
          p => p.dataKey ===
          "invested"
        )?.value;

      const total =
        payload.find(
          p => p.dataKey ===
          "total"
        )?.value;

      return (

        <div className="tooltip">

          <p>Year {label}</p>

          <p>
            Invested:
            {" "}
            ₹
            {" "}
            {(invested / 100000)
              .toFixed(2)}
            {" "}
            L
          </p>

          <p>
            Value:
            {" "}
            ₹
            {" "}
            {(total / 100000)
              .toFixed(2)}
            {" "}
            L
          </p>

        </div>

      );

    }

    return null;

  };

  return (

    <div id="sip" className="sip">

      {/* TOP CARD */}

      <div className="sip-top-card">

        <p className="small-label">
          PROJECTED GROWTH
        </p>

        <h2>
          ₹
          {" "}
          {(finalValue / 100000)
            .toFixed(2)}
          {" "}
          L
        </h2>

      </div>

      <h1 className="sip-title">
        SIP Calculator
      </h1>

      <p className="sip-desc">

        Plan your monthly SIP and
        visualize long-term growth.

      </p>

      <div className="sip-container">

        {/* INPUT CARD */}

        <div className="sip-card">

          {/* MONTHLY */}

          <div className="sip-row">

            <div className="label">
              Monthly Investment
            </div>

            <div className="value">
              ₹
              {" "}
              {monthly.toLocaleString()}
            </div>

          </div>

          <input
            type="range"
            min="500"
            max="200000"
            step="500"
            value={monthly}
            onChange={(e) =>
              handleProtectedSlider(
                setMonthly,
                +e.target.value
              )
            }
          />

          {/* YEARS */}

          <div className="sip-row">

            <div className="label">
              Investment Duration
            </div>

            <div className="value">
              {years} years
            </div>

          </div>

          <input
            type="range"
            min="1"
            max="30"
            value={years}
            onChange={(e) =>
              handleProtectedSlider(
                setYears,
                +e.target.value
              )
            }
          />

          {/* RATE */}

          <div className="sip-row">

            <div className="label">
              Expected Return (p.a.)
            </div>

            <div className="value">
              {rate}%
            </div>

          </div>

          <input
            type="range"
            min="1"
            max="30"
            value={rate}
            onChange={(e) =>
              handleProtectedSlider(
                setRate,
                +e.target.value
              )
            }
          />

        </div>

        {/* GRAPH */}

        <div className="sip-chart">

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <AreaChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.2}
              />

              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
              />

              <YAxis hide />

              <Tooltip
                content={
                  <CustomTooltip />
                }
              />

              <Area
                type="monotone"
                dataKey="invested"
                stroke="#c55a3d"
                fill="#f3c1b0"
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="total"
                stroke="#1f3d2b"
                fill="#cde3d5"
                strokeWidth={3}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}