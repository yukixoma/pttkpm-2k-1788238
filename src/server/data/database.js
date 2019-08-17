const fs = require("fs");
const path = require("path");
const store = require("./store/Cua_hang.json");
const tvDir = path.join(__dirname, "tv");

const database = {
  store: store,
  tv: []
};

fs.readdir(tvDir, (err, tvs) => {
  if (err) console.log(`error ${err}`);
  else {
    tvs.forEach(tv => {
      fs.readFile(path.join(tvDir, tv), "utf-8", (err, content) => {
        database.tv.push(JSON.parse(content));
      });
    });
  }
});

function WriteTv(tv) {
  fs.writeFileSync(`${tvDir}/${tv.Ma_so}.json`, JSON.stringify(tv), "utf-8");
}
const DatabaseProcess = {
  database: database,
  WriteTv: WriteTv
};
module.exports = DatabaseProcess;
