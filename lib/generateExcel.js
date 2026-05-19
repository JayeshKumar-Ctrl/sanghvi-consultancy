import * as XLSX from "xlsx";

export async function generateExcel(data) {

  const workbook =
    XLSX.utils.book_new();

  const worksheet =
    XLSX.utils.aoa_to_sheet([]);

  // TITLE
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      [
        "DAILY LEDGER SHEET (रोजमेल / बही-खाता)"
      ],
    ],
    {
      origin: "A1",
    }
  );

  // HEADERS
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      [
        "S.No.",
        "Account Head / Description (Hindi)",
        "English Translation",
        "Amount",

        "",

        "S.No.",
        "Account Head / Description (Hindi)",
        "English Translation",
        "Amount",
      ],
    ],
    {
      origin: "A4",
    }
  );

  // SECTION TITLES
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      [
        "",
        "CREDIT SIDE (JAMA)",
        "",
        "",

        "",

        "",
        "DEBIT SIDE (UDHAAR)",
        "",
        "",
      ],
    ],
    {
      origin: "A3",
    }
  );

  const creditRows =
    data.creditSide || [];

  const debitRows =
    data.debitSide || [];

  const maxRows = Math.max(
    creditRows.length,
    debitRows.length
  );

  const finalRows = [];

  for (let i = 0; i < maxRows; i++) {

    const credit =
      creditRows[i] || {};

    const debit =
      debitRows[i] || {};

    finalRows.push([

      i + 1,
      credit.nameHindi || "",
      credit.nameEnglish || "",
      Number(credit.amount || 0)
        .toLocaleString("en-IN"),

      "",

      i + 1,
      debit.nameHindi || "",
      debit.nameEnglish || "",
      Number(debit.amount || 0)
        .toLocaleString("en-IN"),

    ]);

  }

  XLSX.utils.sheet_add_aoa(
    worksheet,
    finalRows,
    {
      origin: "A5",
    }
  );

  // TOTALS
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      [
        "",
        "",
        "TOTAL CREDIT (जमा)",
        data.totalCredit || "",

        "",

        "",
        "",
        "TOTAL DEBIT (नामे)",
        data.totalDebit || "",
      ],
    ],
    {
      origin: `A${maxRows + 6}`,
    }
  );

  // COLUMN WIDTHS
  worksheet["!cols"] = [

    { wch: 8 },
    { wch: 35 },
    { wch: 40 },
    { wch: 15 },

    { wch: 5 },

    { wch: 8 },
    { wch: 35 },
    { wch: 40 },
    { wch: 15 },

  ];

  // MERGES
  worksheet["!merges"] = [

    {
      s: { r: 0, c: 0 },
      e: { r: 0, c: 8 },
    },

    {
      s: { r: 2, c: 1 },
      e: { r: 2, c: 3 },
    },

    {
      s: { r: 2, c: 6 },
      e: { r: 2, c: 8 },
    },

  ];

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Ledger"
  );

  const excelBuffer =
    XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

  return excelBuffer;

}