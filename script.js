const BASE_URL =
"https://v6.exchangerate-api.com/v6/cd9b09959f1901b56aab363c/latest"



  const dropdown = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector(".btn button");
  const fromCurr = document.querySelector(".from2 select");
  const toCurr = document.querySelector(".to2 select");
  const msg = document.querySelector(".msg");


  for(let select of dropdown)
  {
    for(let currCode in countryList)
    {
        
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
         
        if (select.name === "fromflag" && currCode === "USD") 
        {
            newOption.selected = "selected";
        } 
        if (select.name === "toflag" && currCode === "INR")
        {
            newOption.selected = "selected";
        }

          select.append(newOption);

        }

        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });
    }
  

    updateFlag=(element)=>{
        let currCode = element.value;
        let countryCode = countryList[currCode];
        // let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    }
    


    updateExchangeRate=async()=>{
        let amt = document.querySelector(".from input");
        let amtval = amt.value;

        if(amtval = '' || amtval<=0)
        {
            amtval=0;
        }

        const URL = `${BASE_URL}/${fromCurr.value}.json`;
        // const URL2 = `${BASE_URL}/${toCurr.value.toLowerCase()}.json`;

        
        let response = await fetch(URL.json);
        let data = await response.json();
        let rate = data[toCurr.value];

        console.log(rate*amtval);

        // let finalamt = amtval*rate;
        // msg.innerText = `1 ${fromCurr.value} = ${rate} ${toCurr.value}`;

        // let fAmt = document.querySelector(".to input");
        // fAmt = finalamt;

    }



    btn.addEventListener("click",(evt)=>{
        evt.preventDefault();
        updateExchangeRate();
    });