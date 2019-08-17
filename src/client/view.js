const LogicProcess = require("./logic");

function TvGroupListGenerator(list) {
  let listHtml = "";
  list.forEach(Nhom_Tivi => {
    listHtml += `<form method='post'>
        <input name='functionCode' type='hidden' value='SearchByGroupKey'/>  
        <input name='groupKey' type='hidden' value='${Nhom_Tivi.Ma_so}'/> 
        <button type='submit' class='btn btn-primary' >${Nhom_Tivi.Ten}</button>
       </form>`;
  });
  return `<div class="row">${listHtml}</div>`;
}

function TvListGenerator(list) {
  let listHtml = "";
  list.forEach(Tivi => {
    let inStock = LogicProcess.GetTvInStock(Tivi);
    let status = inStock == 0 ? "Vừa hết hàng !" : "Còn hàng";
    let img = `<img src='/img/${
      Tivi.Ma_so
    }.png' style='width:150px;height:150px;'/>`;
    let info = `<div class='btn' style='text-align:left'>
                     ${Tivi.Ten}
                     <br />${Tivi.Don_gia_Ban}
                     <br /><b><i>${status}</i></b>
                </div>`;
    listHtml += `<div class='col-md-3' style='margin-bottom:10px' >
                    ${img}
                    ${info}
                </div>`;
  });
  return `<div class="row">${listHtml}</div>`;
}

function TvListGeneratorEmp(list) {
  let listHtml = "";
  list.forEach(Tivi => {
    let inStock = LogicProcess.GetTvInStock(Tivi);
    let status = inStock == 0 ? "Vừa hết hàng !" : "Còn hàng";
    let img = `<img src='/img/${
      Tivi.Ma_so
    }.png' style='width:150px;height:150px;'/>`;
    let info = `<div class='btn' style='text-align:left'>
                     ${Tivi.Ten}
                     <br />${Tivi.Don_gia_Ban}
                     <br /><b><i>${status}</i></b>
                </div>`;
    let sellFunction =
      inStock == 0
        ? ""
        : `<form method='post'>   
               <input name='functionCode' type='hidden' value='Sell' />  
               <input name='tvCode' type='hidden' value='${Tivi.Ma_so}' />  
               <input name='quantity' required='required' autocomplete='off' 
                      style='border:none;border-bottom:solid 1px blue'
                     type='number' min='1'  max='${inStock}' value='1' />  
                    </form>`;

    listHtml += `<div class='col-md-3' style='margin-bottom:10px' >
                    ${img}
                    ${info}
                    ${sellFunction}
                </div>`;
  });
  return `<div class="row">${listHtml}</div>`;
}

const ViewProcess = {
  TvGroupListGenerator,
  TvListGenerator,
  TvListGeneratorEmp
};

module.exports = ViewProcess;
