const express = require("express");
const app = express();
const DatabaseProcess = require("./data/database");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.all("/", (req, res) => {
  res.send(DatabaseProcess.database);
});

app.post("/emp/tvList", (req, res) => {
  const { store, tv } = DatabaseProcess.database;
  const { Danh_sach_Nhom_Tivi } = req.body;

  const tvListByEmp = tv.filter(tv => {
    return Danh_sach_Nhom_Tivi.some(group => group.Ma_so == tv.Nhom_Tivi.Ma_so);
  });
  const data = {
    store: store,
    tv: tvListByEmp
  };

  res.send(data);
});

app.post("/emp/sell", (req, res) => {
  const { tv, quantity, emp } = req.body;
  const newSell = {
    Ngay: new Date(),
    So_luong: quantity,
    Don_gia_Ban: tv.Don_gia_Ban,
    Tien: tv.Don_gia_Ban * quantity,
    Nhan_vien: {
      Ma_so: emp.Ma_so,
      Ho_ten: emp.Ho_ten
    }
  };
  tv.Danh_sach_Ban_hang.push(newSell);
  DatabaseProcess.WriteTv(tv);
  res.send("New sell is written to database");
});

module.exports = app;
