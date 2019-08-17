function SearchByName(keyword, tvList) {
  keyword = keyword.toUpperCase();
  return tvList.filter(tv => tv.Ten.toUpperCase().includes(keyword));
}

function SearchByGroupKey(groupKey, tvList) {
  return tvList.filter(tv => tv.Nhom_Tivi.Ma_so == groupKey);
}

function SearchByPrice(price, tvList) {
  const min = price - 500000;
  const max = price + 500000;
  return tvList.filter(tv => tv.Don_gia_Ban >= min && tv.Don_gia_Ban <= max);
}

function GetTvInStock(tv) {
  const totalIn = tv.Danh_sach_Nhap_hang.reduce((total, IN) => {
    return total + IN.So_luong;
  }, 0);
  const totalOut = tv.Danh_sach_Ban_hang.reduce((total, OUT) => {
    return total + OUT.So_luong;
  }, 0);
  return totalIn - totalOut;
}

function SearchTv(searchString, tvList) {
  const result = [];
  if (isNaN(searchString)) {
    result = SearchByGroupKey(searchString, tvList);
    if (result.length == 0) result = SearchByName(searchString, tvList);
  } else {
    result = SearchByPrice(parseInt(searchString), tvList);
  }
  return result;
}

const LogicProcess = {
  SearchTv,
  SearchByName,
  SearchByPrice,
  SearchByGroupKey,
  GetTvInStock
};

module.exports = LogicProcess;
