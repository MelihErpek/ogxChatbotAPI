const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { google } = require("googleapis");
const keys = require("./ogx.json");
var Product = require("./Models/Product");

const app = express();
const url =
  "mongodb+srv://melihnode:meliherpek1@cluster0.g1oel.mongodb.net/OGX?authSource=admin&replicaSet=atlas-77ie5j-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

app.use(cors());

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.log("Mongoose ile bağlantı kuruldu.");
  }
);
// Google Sheets API Auth
const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize(function (err, tokens) {
  if (err) {
    console.error("Error authorizing Google Sheets:", err);
    return;
  }
  console.log("Connected to Google Sheets API");
});

app.get("/addData", (req, res) => {
  const sheets = google.sheets({ version: "v4", auth: client });

  let data = [
    // Örnek veri
    ["John", "Doe", "johndoe@gmail.com"],
  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    },
    (err, result) => {
      if (err) {
        console.error("Error writing to Google Sheets:", err);
        res.status(500).send("Google Sheets Error");
      } else {
        res.status(200).send("Data added to Google Sheets");
      }
    }
  );
});
app.get("/",(req,res)=>{
  res.json({ success: true });
    
})
app.get("/biotin", async (req, res) => {
  try {
    await Product.create({
      Name: "Biotin&Collagen",
    });

    const sheets = google.sheets({ version: "v4", auth: client });
    const tarih = new Date();
    const gun = String(tarih.getDate()).padStart(2, '0');
    const ay = String(tarih.getMonth() + 1).padStart(2, '0');
    const yil = tarih.getFullYear();
    let data = [
      [gun + "." + ay + "." + yil, "Biotin&Collagen"],
    ];

    const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU";
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "A1",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
app.get("/coconut", async (req, res) => {
  Product.create({
    Name: "Coconut Curls",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri
    [gun + "." + ay + "." + yil, "Coconut Curls"],
  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});
app.get("/brazil", async (req, res) => {
  await Product.create({
    Name: "Brazilian Keratin Smooth",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri
    [gun + "." + ay + "." + yil, "Brezilian Keratin Smooth"],
  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});
app.get("/kukui", async (req, res) => {
  await Product.create({
    Name: "Kukui Oil",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri
    [gun + "." + ay + "." + yil, "Kukui Oil"],
  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});
app.get("/coconutmiracle", async (req, res) => {
  await Product.create({
    Name: "Coconut Miracle Oil",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri 
    [gun + "." + ay + "." + yil, "Coconut Miracle Oil"],

  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});
app.get("/argan", async (req, res) => {
  await Product.create({
    Name: "Argan Oil Of Morocco",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri
    [gun + "." + ay + "." + yil, "Argan Oil Of Morocco"],  
  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});
app.get("/coconutmilk", async (req, res) => {
  await Product.create({
    Name: "Coconut Milk",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri
    [gun + "." + ay + "." + yil, "Coconut Milk"],

  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});
app.get("/apple", async (req, res) => {
  await Product.create({
    Name: "Apple Cider Vinegar",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri
    [gun + "." + ay + "." + yil, "Apple Cider Vinegar"],
  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});
app.get("/charcoal", async (req, res) => {
  await Product.create({
    Name: "Charcoal Detox",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri
    [gun + "." + ay + "." + yil, "Charcoal Detox"],
  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});
app.get("/keratin", async (req, res) => {
  await Product.create({
    Name: "Keratin Oil",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri
    [gun + "." + ay + "." + yil, "Keratin Oil"],
  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});
app.get("/purple", async (req, res) => {
  await Product.create({
    Name: "Purple Toning",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri
    [gun + "." + ay + "." + yil, "Purple Toning"],

  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});
app.get("/orchid", async (req, res) => {
  await Product.create({
    Name: "Orchid Oil",
  });
  const sheets = google.sheets({ version: "v4", auth: client });
  const tarih = new Date();
  const gun = tarih.getDate();
  const ay = tarih.getMonth() + 1;
  const yil = tarih.getFullYear();
  let data = [
    // Örnek veri
    [gun + "." + ay + "." + yil, "Orchid Oil"],
  ];

  const sheetId = "1voHweMkFYpu1cn6d6YrawSb88_5DNQfNqE8xrz7g1PU"; // Google Sheets URL'inden alabilirsiniz
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: sheetId,
      range: "A1", // Hangi hücreden başlayacağını belirtin
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data,
      },
    }
    // (err, result) => {
    //   if (err) {
    //     console.error("Error writing to Google Sheets:", err);
    //     res.status(500).send("Google Sheets Error");
    //   } else {
    //     res.status(200).send("Data added to Google Sheets");
    //   }
    // }
  );
  res.json({ success: true });
});

app.listen(5000, () => console.log("5000 portunda çalışıyor"));
