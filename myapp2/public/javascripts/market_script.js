window.onload=function(){
    var elBuyBtn=document.getElementById('button_buy_sell_li_a_buy');
    if(elBuyBtn){
        elBuyBtn.addEventListener('click',(e)=>{
            //기존 항목 제거 후 생성하기(start)
            var div_contents=document.getElementById('buysell_contents');
            var div_contents_p=document.getElementById('buy_sell_parents');
            var div_contents_new=document.createElement("div");
            div_contents_new.setAttribute('id','buysell_contents');
            div_contents_p.appendChild(div_contents_new);
            div_contents.parentNode.replaceChild(div_contents_new,div_contents);
            //기존 항목 제거 후 생성하기(end)
            var div_contents=document.getElementById('buysell_contents');
            var form = document.createElement("form");
            var input = document.createElement("input");
            form.setAttribute('name','buy_processForm');
            div_contents.appendChild(form);
            input.setAttribute('type','text');
            input.setAttribute('readonly','');
            input.setAttribute('value','항목');
            form.appendChild(input);
            var input2 = document.createElement("input");
            input2.setAttribute('type','text');
            input2.setAttribute('maxlength','10');
            input2.setAttribute('min','0');
            input2.setAttribute('autofocus','');
            input2.setAttribute('name','sell');
            input2.setAttribute('id','sell_price');
            input2.setAttribute('placeholder','가격');
            input2.setAttribute('style','background-color:rgba(255, 121, 121, 0.788)');
            input2.setAttribute('pattern','[0-9]+');
            // input2.setAttribute('oninvalid','invalid');
            // input2.setAttribute('oninput','invalid');
            input2.setAttribute('required','');
            form.appendChild(input2);
            var input2 = document.createElement("input");
            input2.setAttribute('type','text');
            input2.setAttribute('maxlength','10');
            input2.setAttribute('min','0');
            input2.setAttribute('autofocus','');
            input2.setAttribute('name','quantity');
            input2.setAttribute('id','quantity');
            input2.setAttribute('placeholder','수량');
            input2.setAttribute('style','background-color:rgba(255, 121, 121, 0.788)');
            input2.setAttribute('pattern','[0-9]+');
            // input2.setAttribute('oninvalid','invalid');
            // input2.setAttribute('oninput','invalid');
            input2.setAttribute('required','');
            form.appendChild(input2);
            var button = document.createElement("input");
            button.setAttribute('type','button');
            button.setAttribute('value','매수');
            button.setAttribute('onclick','buyyon()');
            form.appendChild(button);
            div_contents.appendChild(form);
        })//addEventListener
    }
    var elSellBtn=document.getElementById('button_buy_sell_li_a_sell');
    if(elSellBtn){
        elSellBtn.addEventListener('click',(e)=>{
            //기존 항목 제거 후 생성하기(start)
            var div_contents=document.getElementById('buysell_contents');
            var div_contents_p=document.getElementById('buy_sell_parents');
            var div_contents_new=document.createElement("div");
            div_contents_new.setAttribute('id','buysell_contents');
            div_contents_p.appendChild(div_contents_new);
            div_contents.parentNode.replaceChild(div_contents_new,div_contents);
            //기존 항목 제거 후 생성하기(end)
            var div_contents=document.getElementById('buysell_contents');
            var form = document.createElement("form");
            var input = document.createElement("input");
            form.setAttribute('name','buy_processForm');
            div_contents.appendChild(form);
            input.setAttribute('type','text');
            input.setAttribute('readonly','');
            input.setAttribute('value','항목');
            form.appendChild(input);
            var input2 = document.createElement("input");
            input2.setAttribute('type','text');
            input2.setAttribute('maxlength','10');
            input2.setAttribute('min','0');
            input2.setAttribute('autofocus','');
            input2.setAttribute('name','sell');
            input2.setAttribute('id','sell_price');
            input2.setAttribute('placeholder','가격');
            input2.setAttribute('style','background-color:rgb(136, 123, 255)');
            input2.setAttribute('pattern','[0-9]+');
            // input2.setAttribute('oninvalid','invalid');
            // input2.setAttribute('oninput','invalid');
            input2.setAttribute('required','');
            form.appendChild(input2);
            var input2 = document.createElement("input");
            input2.setAttribute('type','text');
            input2.setAttribute('maxlength','10');
            input2.setAttribute('min','0');
            input2.setAttribute('autofocus','');
            input2.setAttribute('name','quantity');
            input2.setAttribute('id','quantity');
            input2.setAttribute('placeholder','수량');
            input2.setAttribute('style','background-color:rgb(136, 123, 255)');
            input2.setAttribute('pattern','[0-9]+');
            // input2.setAttribute('oninvalid','invalid');
            // input2.setAttribute('oninput','invalid');
            input2.setAttribute('required','');
            form.appendChild(input2);
            var button = document.createElement("input");
            button.setAttribute('type','button');
            button.setAttribute('value','매도');
            button.setAttribute('onclick','sellyon()');
            form.appendChild(button);
            div_contents.appendChild(form);
        })//addEventListener
    }
    var elJumoonBtn=document.getElementById('button_buy_sell_li_a_jumoon');
    if(elJumoonBtn){
        elJumoonBtn.addEventListener('click',(e)=>{
            alert('아직 미구현');
        })//addEventListener
    }



}//window.onload

