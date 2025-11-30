// CSV EXPORT
export const exportToCSV = (rows, filename) => {
  const headers = Object.keys(rows[0]).join(",");
  const values = rows.map((row) => Object.values(row).join(",")).join("\n");

  const csvContent = headers + "\n" + values;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

// PDF EXPORT (simple)
export const exportToPDF = (data) => {
  const printContent = `
    <h1>Sales Report</h1>
    <table border="1" cellpadding="6" cellspacing="0">
      <tr>
        <th>ID</th><th>Date</th><th>Product</th><th>Qty</th><th>Total</th>
      </tr>
      ${data
        .map(
          (d) =>
            `<tr>
              <td>${d.id}</td>
              <td>${d.date}</td>
              <td>${d.product}</td>
              <td>${d.quantity}</td>
              <td>${d.total}</td>
            </tr>`
        )
        .join("")}
    </table>
  `;

  const win = window.open("", "_blank");
  win.document.write(printContent);
  win.print();
  win.close();
};
