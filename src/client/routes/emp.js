const express = require("express");
const router = express.Router();
const session = require("express-session");
const axios = require("axios");
const { serverPort } = require("../../../port-config.json");
const ViewProcess = require("../view.js");
const LogicProcess = require("../logic.js");

router.use(session({ secret: "123456" }));

router.all("/", async (req, res) => {
  const response = await axios.get(`http://localhost:${serverPort}/`);
  const { data } = response;
  const { store } = data;
  if (req.body.username) {
    const { username, password } = req.body;
    const emp = store.Danh_sach_Nhan_vien_Ban_hang.find(nv => {
      return nv.Ten_Dang_nhap == username && nv.Mat_khau == password;
    });
    if (emp) req.session.emp = emp;
    res.redirect("/emp/main");
  } else res.render("EmpLoginScreen", { Notification: "" });
});

router.all("/main", async (req, res) => {
  const { emp } = req.session;
  let totalPay = 0;
  if (!emp) res.redirect("/emp");
  else {
    const response = await axios.post(
      `http://localhost:${serverPort}/emp/tvList`,
      emp
    );
    const { data } = response;
    let { store, tv } = data;
    const { functionCode } = req.body;

    if (functionCode == "SearchByName") {
      const { keyword } = req.body;
      tv = LogicProcess.SearchByName(keyword, tv);
    }

    if (functionCode == "SearchByGroupKey") {
      const { groupKey } = req.body;
      tv = LogicProcess.SearchByGroupKey(groupKey, tv);
    }

    if (functionCode == "Sell") {
      const { tvCode } = req.body;

      const quantity = parseInt(req.body.quantity);
      tv = tv.filter(tv => tv.Ma_so == tvCode);
      totalPay = tv[0].Don_gia_Ban * quantity;
      const sellData = {
        tv: tv[0],
        quantity: quantity,
        emp: emp
      };
      await axios.post(`http://localhost:${serverPort}/emp/sell`, sellData);
    }
    let Notification =
      functionCode == "Sell"
        ? `<div class='alert alert-info'>Tiền phải trả  ${totalPay}</div>`
        : `<div class='alert alert-info'>Danh sách ${tv.length} Tivi</div>`;

    res.render("EmpMainScreen", {
      Header: `${store.Ten} Nhân viên ${emp.Ho_ten}`,
      Notification: Notification,
      TvGroupList: ViewProcess.TvGroupListGenerator(emp.Danh_sach_Nhom_Tivi),
      TvList: ViewProcess.TvListGeneratorEmp(tv)
    });
  }
});

module.exports = router;
