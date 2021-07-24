let base = "RUB"
let target = "USD"

let loaderTimer = null

const data = []
const dataRev = []

const selectLeft = document.querySelector("#select-left");
const selectRight = document.querySelector("#select-right");
const selektse = document.querySelectorAll(".select-value");

let leftInput = document.querySelector(".left-input")
let rightInput = document.querySelector(".right-input")

const buttnonLeftAll = document.querySelectorAll(".buttons-left")
const buttnonRightAll = document.querySelectorAll(".buttons-right")

const leftParagraph = document.querySelector(".left-paragraph")
const rightParagraph = document.querySelector(".right-paragraph")


const arrow = document.querySelector(".arrow-img")

const showLoader = () => {
    loaderTimer = setTimeout(() => {
      document.querySelector(".overlay").classList.remove("hidden");
      loaderTimer = null;
    }, 500);
  };
  
  const hideLoader = () => {
    if (loaderTimer !== null) {
      clearTimeout(loaderTimer);
      loaderTimer = null;
    }
    document.querySelector(".overlay").classList.add("hidden");
  };




const getAvailableCurrencies = async () => {
    const response = await fetch("https://api.exchangerate.host/symbols")
    const data = await response.json()
    return Object.keys(data.symbols);
    
}


const getRates = async() => {
    const responseDirect = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${target}`)
    const dataDirect = await responseDirect.json()
    const rate = dataDirect.rates[target]
    
 
    const responseRev = await fetch(`https://api.exchangerate.host/latest?base=${target}&symbols=${base}`)
    const dataRev = await responseRev.json()
    const rateRev = dataRev.rates[base] 
    
    return [rate,rateRev]
 }
 
 buttnonLeftAll.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        base = btn.innerText 
        mathematicalFunctionCalculation ()
        console.log(base);
    }) 
 })
   
 buttnonRightAll.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        target = btn.innerText
        mathematicalFunctionCalculation ()
        console.log(target);
    })
 })

arrow.addEventListener("click",()=>{
    const reverseButton = base
    base = target
    target = reverseButton 
    mathematicalFunctionCalculation()
})

selectLeft.addEventListener("change",(event)=>{
    base = event.target.value
    mathematicalFunctionCalculation()
    console.log(base);
})

selectRight.addEventListener("change",(event)=>{
    target = event.target.value
    mathematicalFunctionCalculation()
    console.log(target);
})

function matCalcInputLeft() {
    const resultLeftInput = leftInput.value
    rightInput.value = data[0] * resultLeftInput 
}

function matCalcInputRight() {
    const resultRightInput = rightInput.value
    leftInput.value = dataRev[1] * resultRightInput
}

leftInput.addEventListener("keyup",()=>{  
    matCalcInputLeft()
})

rightInput.addEventListener("keyup",()=>{
    matCalcInputRight()
})


 
function mathematicalFunctionCalculation () {
     console.log(`Две валюты для взаимодействия: `, base, target)
     const btnActiveLeft = document.querySelector(`#btn-active-left-${base}`)
     const btnActiveRight = document.querySelector(`#btn-active-right-${target}`)

     const deliteLeftActivClass = document.querySelector('.box-left .activ');

     if (deliteLeftActivClass) {
       deliteLeftActivClass.classList.remove('activ');
     }
   
     if (btnActiveLeft) {
        btnActiveLeft.classList.add('activ');
     } else {
       selectLeft.classList.add('activ');
     }
   
     const deliteRightActivClass = document.querySelector('.box-right .activ');
     if (deliteRightActivClass) {
       deliteRightActivClass.classList.remove('activ');
     }
   
     if (btnActiveRight) {
        btnActiveRight.classList.add('activ');
     } else {
       selectRight.classList.add('activ');
     }
     
     showLoader();
     getRates(base,target)
     .then((rates)=>{
    rightInput.value = rates[0] * leftInput.value
    data.push(rates[0],rates[1])
    dataRev.push(rates[1],rates[0])
    leftParagraph.innerText = `1 ${base} = ${rates[0]} ${target}`
    rightParagraph.innerText = `1 ${target} = ${rates[1]} ${base}`  
    hideLoader();  
     })
 }     

 


function firstStart (){
    getAvailableCurrencies()
.then((listOfCurrencies) => {
    selektse.forEach((select) => {
      const filterSymbols = listOfCurrencies.filter((el) => el !== 'RUB' && el !== 'USD' && el !== 'EUR' && el !== 'GBP');
      for (let i = 0; i < filterSymbols.length; i += 1) {
        const optionCreate = document.createElement('option');
        optionCreate.innerText = filterSymbols[i];
        optionCreate.value = filterSymbols[i];
        select.append(optionCreate);
      }
    });
  }); 
  mathematicalFunctionCalculation();
}


firstStart();  







