const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");
const apiKey = 'XQR4IDXVRCA1FJBWA6THZPJNJ7DFP22YFK'


const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);

// Glowy Hover Effect Ends
let currentNetwork = 1;
let networks = [{},{1:"/IMG/Arb.png"},{2:"/IMG/OP.png"},{3:"/IMG/Matic.png"},{4:"/IMG/zksync.png"},{5:"/IMG/Eth.png"},{6:"/IMG/linea.png"}];
let hsl = [{},{1:204},{2:353},{3:262},{4:0},{5:0},{6:0}];
const address = document.querySelector('.address');
let filter1 = document.querySelector('.filter-1');
let filter2 = document.querySelector('.filter-2');
let results = document.querySelector('.results');
let loading = document.querySelector('.loading');
let ethPrice = document.querySelector('.eth-price');
let priceLoader = document.querySelector('.loader');
let refershPrice = document.querySelector('.refresh-price');
let networkImg1 = document.querySelector('.network-img1');
let networkImg2 = document.querySelector('.network-img2');
let popUp = document.querySelector('.pop-up');
let r1 = document.querySelector('.r1');


function runQuery() {
  console.clear();
  loading.style.display = "block";
if (address.value!=""){
  setTimeout(function(){
    if (filter1.value!="Please Select"){
      if (filter2.value!="Please Select"){
        if (address.value.slice(0,2)=="0x"&&address.value.length==42){
          let constructURL = `https://api.etherscan.io/api?module=account&action=balance&address=${address.value}&tag=latest&apikey=${apiKey}`
          fetch(constructURL).then(response=>response.json()).then(data=>{if(!isNaN(data.result)){r1.innerHTML=((data.result)/Math.pow(10,18)*1).toFixed(5)+" ETH"}else{r1.innerHTML = data.result}}).catch(error=>r1.innerHTML = error);
          results.style.display = "block";
          loading.style.display = "none";
        } else {
          loading.style.display = "none";
          alert("Invalid or Incomplete address!");
        }}
        else{
          loading.style.display = "none";
          alert("Please select txn type!");
      }}
      else {
        loading.style.display = "none";
        alert("Please select search method!");
    }
  },3000)
} else {
  alert("Address can't be Empty!");
  loading.style.display = "none";
}}

function getETHPrice(){
    priceLoader.style.display = 'block';
    refershPrice.style.display = 'none';
  const ethURL = 'https://api.etherscan.io/api?module=stats&action=ethprice'
  fetch(ethURL)
  .then(response=>response.json())
  .then((data2)=>{
    ethPrice.innerHTML += (data2.result.ethusd);
    priceLoader.style.display = 'none';})
    .catch((error)=>{console.log('Error getting ETH Price.',error); ethPrice.innerHTML = "ETH Price: $ ⚠";priceLoader.style.display = 'none';refershPrice.style.display = 'block';});
}

function closePopup(e){
    if(e!=0){
        console.log(e)
        currentNetwork = e;
        networkImg1.src = Object.values(networks[e]);
        networkImg2.src = Object.values(networks[e]);
        popUp.style.display = 'none'
    }else {
        popUp.style.display = 'none';
    }    
}
function showPopup(){
    popUp.style.display = 'block'
}

// Modify CSS with JS

let r = document.querySelector('.card:nth-child(1)')

function changeHSL(e) {
    // Get the styles (properties and values) for the root
    let rs = getComputedStyle(r);
    // Alert the value of the --blue variable
    r.style.setProperty('--hue',Object.values(hsl[e]));
    console.log(Object.values(hsl[e]))
}

