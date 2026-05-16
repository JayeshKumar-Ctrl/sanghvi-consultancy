import * as XLSX from
"xlsx";

export async function
generateExcel(data) {

  // CREATE WORKSHEET

  const worksheet =
    XLSX.utils.json_to_sheet(
      data
    );

  // CREATE WORKBOOK

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Ledger"

  );

  // GENERATE BUFFER

  const excelBuffer =
    XLSX.write(
      workbook,
      {
        bookType:
          "xlsx",

        type:
          "buffer",
      }
    );

  return excelBuffer;

}