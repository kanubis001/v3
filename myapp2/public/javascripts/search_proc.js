// 이름 눌렀을 때 상세내역 로딩
document.querySelectorAll('#list-list tr').forEach(function (el) {
    el.addEventListener('click', function () {
        var name=el.querySelector('td').textContent;
        var id = el.querySelector('td').textContent;
        console.log(name,id);
        getDetail(id);
        //getMore(id);
    });
  });
//목록 
document.getElementById('list-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var category = e.target.searchingCategory.value;
  var num = e.target.contents.value;
  console.log('cat?',category);
  console.log('num?',num);
  if (!num) {
    return alert('종목 번호를 입력하세요');
  }
  // if(category=='name'){

  // }
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {

    if (xhr.status === 200) {
      if(num.match(/\d/)){
        console.log(xhr.responseText);
        getList(num);
      }else{
        console.log('==========NaN=========');
        //숫자가 아닌경우 목록 출력하기
        var _getNum = JSON.parse(xhr.responseText);
        var tbody = document.querySelector('#list-list tbody');
        tbody.innerHTML = '';
        console.log(_getNum.StockCode);
        _getNum.map((_num)=>{
          var td_click = document.createElement("td");
          var td = document.createElement("td");
          var row = document.createElement('tr');
          td_click.addEventListener('click', function () {
              getDetail(_num.StockCode);
            //  await getMore(_num.StockCode);
          });
          td_click.textContent = _num.CompanyName;
          td_click.setAttribute('id','_click');
          row.appendChild(td_click);
          td = document.createElement('td');
          td.textContent = _num.StockCode;
          row.appendChild(td);
          td = document.createElement('td');
          td.textContent = _num.Market;
          row.appendChild(td);
          tbody.appendChild(row);
          console.log(_num.StockCode);
        })
      }
      
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', `/market/lists/${num}/${category}`); 
  //파라미터 넘김 이거 라우터가 받는다.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ category:category, num:num }));
  console.log('xhr',xhr);
  e.target.searchingCategory.value = '';
  e.target.contents.value = '';
});
function getList(num) {
    //리스트 출력.
  var xhr = new XMLHttpRequest();
  console.log("?:",xhr);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var lists = JSON.parse(xhr.responseText);
      var tbody = document.querySelector('#list-list tbody');
      tbody.innerHTML = '';
      lists.map(function (list) {
          var td = document.createElement("td");
          var td_click = document.createElement("td");
          var row = document.createElement('tr');
          td_click.addEventListener('click', function () {
              getDetail(list.StockCode);
            //  await getMore(list.StockCode);
          });
          td_click.textContent = list.CompanyName;
          td_click.setAttribute('id','_click');
          row.appendChild(td_click);
          td = document.createElement('td');
          td.textContent = list.StockCode;
          row.appendChild(td);
          td = document.createElement('td');
          td.textContent = list.Market;
          row.appendChild(td);
          tbody.appendChild(row);
          });
    } else {
          console.error("lll",xhr.responseText);
    }
  };
  xhr.open('GET', 'market/list/'+num);
  xhr.send();
}
  //상세정보
function getDetail(id) {
  console.log(id);
  console.log('2');
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      var details = JSON.parse(xhr.responseText);
      var tbody = document.querySelector('#detail-list tbody');
      console.log(tbody);
      tbody.innerHTML = '';
      details.map(function (detail) {
        console.log(detail)
        var row = document.createElement('tr');
        var td = document.createElement('td');
        td.textContent = detail.Category;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = detail.MainProduct;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = detail.GyulSanMonth;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = detail.Homepage;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = detail.President;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = detail.SangJangDay;
        row.appendChild(td);
        tbody.appendChild(row);
        getMore(detail.StockCode);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', 'market/details/' + id);
  xhr.send();
}
//세부항목 알아오기
function getMore(id) {
  console.log(id);
  console.log('2222');
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseTexte);
      var mores = JSON.parse(xhr.responseText);
      mores.map((more)=>{
        console.log("mores4:",more.highest_price);
        var MktP=document.getElementById('MarketPrice');
        var HtP=document.getElementById('HighestPrice');
        var HP=document.getElementById('HighPrice');
        var LtP=document.getElementById('LowestPrice');
        var LP=document.getElementById('LowPrice');
        var OP=document.getElementById('OriginPrice');
        var Per=document.getElementById('Per');
        var HP52=document.getElementById('52wHigh');
        var Amt=document.getElementById('SangjangAmount');
        var LP52=document.getElementById('52wLow');
        MktP.innerHTML='';
        HtP.innerHTML='';
        HP.innerHTML='';
        LtP.innerHTML='';
        LP.innerHTML='';
        OP.innerHTML='';
        Per.innerHTML='';
        HP52.innerHTML='';
        Amt.innerHTML='';
        LP52.innerHTML='';
        MktP.append(more.mrk_price);
        HtP.append(more.highest_price);
        HP.append(more.high_price);
        LtP.append(more.lowest_price);
        LP.append(more.low_price);
        OP.append(more.stock_price);
        Per.append(more.per);
        HP52.append(more.high52_price);
        Amt.append(more.amount);
        LP52.append(more.low52_price);
      })
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', 'market/more/' + id);
  xhr.send();
}