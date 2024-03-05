let countries=document.querySelectorAll("form select");
let fromselected=document.querySelector("#from");
let toselected=document.querySelector("#to");
let input=document.querySelector(".textInput");

const sortedKeys = Object.keys(countryList).sort();
const sortedCountryList = {};
for (let key of sortedKeys) {
  sortedCountryList[key] = countryList[key];
}

for(let select of countries)
{
    for(let country in sortedCountryList){
        let option=document.createElement("option");
        option.value=country;
        option.innerText=country;
        if(select.name=="from" && country==="USD"){
            option.selected=true;
        }
        else if(select.name=="to" && country==="BDT"){
            option.selected=true;
        }
        select.append(option);
        select.addEventListener("change", (event) => {
            let countryCode=event.target.value;
            let countryname=sortedCountryList[countryCode];
            let image=event.target.parentElement.parentElement.querySelector(".image img");
            image.src=`https://flagsapi.com/${countryname}/shiny/64.png`;
        });
    }
}

let submit=document.querySelector(".submitbtn");
submit.addEventListener("click", (event) => {
    event.preventDefault();
    let from = fromselected.value;
    let to = toselected.value;
    let amount = document.querySelector(".textInput").value;
    (async () => {
        let response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from.toLowerCase()}/${to.toLowerCase()}.json`);
        let data = await response.json();
        let output=data[to.toLowerCase()]*input.value;
        document.querySelector(".output").innerText=output;
    })();
});


