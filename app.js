const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const fromselect=document.querySelectorAll(".from-container select");
const toselect=document.querySelectorAll(".to-container select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from-container select");
const toCurr=document.querySelector(".to-container select");
const msg=document.querySelector(".exchange")
const result=document.querySelector(".result")
const printResult=document.querySelector(".print-result")

for(let select of fromselect){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD") {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

}

for(let select of toselect){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        
        if(select.name==="to" && currCode==="INR") {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
  
  
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img")
    img.src=newSrc;
};
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".from-container input");
let amtVal=amount.value;
if(amtVal==="" || amtVal<1){
    amtVal=1
    amount.value=1;}


    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    // console.log(url);

    let response= await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    let data = await response.json();
    // console.log(data);

    const exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; // Extract exchange rate
    console.log(`${fromCurr.value} to ${toCurr.value}`, "Exchange Rate is:", exchangeRate); // Exchange Rate will be printed on console

    let finalAmount = amtVal * exchangeRate;
    msg.innerText =`${finalAmount} ${toCurr.value}`;  
    printResult.innerText=`*${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}*`; 
});

 

