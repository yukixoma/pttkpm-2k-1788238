const express = require("express");
const router = express.Router();
const axios = require("axios");
const { serverPort } = require("../../../port-config.json");
const ViewProcess = require("../view.js");
const LogicProcess = require("../logic.js");

router.get("/", async (req, res) => {
  let response = await axios.get(`http://localhost:${serverPort}/`);
  let { data } = response;
  let { tv, store } = data;
  res.render("GuestMainScreen", {
    Header: store.Ten + `- Khách tham quan`,
    Notification: `<div class='alert alert-info'>Danh sách ${
      tv.length
    } Tivi</div>`,
    TvGroupList: ViewProcess.TvGroupListGenerator(store.Danh_sach_Nhom_Tivi),
    TvList: ViewProcess.TvListGenerator(tv)
  });
});

router.post("/", async (req, res) => {
  const response = await axios.get(`http://localhost:${serverPort}`);
  const { data } = response;
  let { tv, store } = data;
  const { functionCode } = req.body;
  if (functionCode == "SearchByName") {
    const { keyword } = req.body;
    tv = LogicProcess.SearchByName(keyword, tv);
  }
  if (functionCode == "SearchByPrice") {
    const { price } = req.body;
    tv = LogicProcess.SearchByPrice(price, tv);
  }

  if (functionCode == "SearchByGroupKey") {
    const { groupKey } = req.body;
    tv = LogicProcess.SearchByGroupKey(groupKey, tv);
  }

  res.render("GuestMainScreen", {
    Header: store.Ten + `- Khách tham quan`,
    Notification: `<div class='alert alert-info'>Danh sách ${
      tv.length
    } Tivi</div>`,
    TvGroupList: ViewProcess.TvGroupListGenerator(store.Danh_sach_Nhom_Tivi),
    TvList: ViewProcess.TvListGenerator(tv)
  });
});

module.exports = router;
