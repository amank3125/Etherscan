const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");
const apiKeyETH = 'XQR4IDXVRCA1FJBWA6THZPJNJ7DFP22YFK';
const apiKeyOP = 'Z71G4FH9YR46YGBPFR4I2QR5FTCWBZUP26';
const apiKeyMatic = 'BZ1AYU5DPIXEXER5U4T3EK6A24Y91VE9E8';
const apiKeyArb = 'PACQBWENHHPB482GAPNANPN88F6HR15QWX';
const apiKeyLinea = 'YM7PGJYH78USZHDJXAC8HRCQMAM2IGTIYS';
const oklinkAPI = '49c943c5-1f13-4c33-8985-15af7bf1aff0';


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
const address = document.querySelector('.address');
let networksImages = [{},{1:"/IMG/Eth.png"},{2:"/IMG/OP.png"},{3:"/IMG/Matic.png"},{4:"/IMG/zksync.png"},{5:"/IMG/Arb.png"},{6:"/IMG/linea.png"}];
let hue = [{},{1:204},{2:353},{3:262},{4:0},{5:0},{6:0}];
let saturation = [{},{1:'87%'},{2:'100%'},{3:'71%'},{4:0},{5:0},{6:0}];
let lightness = [{},{1:'55%'},{2:'51%'},{3:'58%'},{4:'95%'},{5:'67%'},{6:'100%'}];

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
let popUpContainer = document.querySelector('.pop-up-container');
let balance = document.querySelector('.balance');
let usdValue = document.querySelector('.usdValue');
let cointicker = " ETH";


function getETHPrice(){
  priceLoader.style.display = 'block';
  refershPrice.style.display = 'none';
const ethURL = 'https://api.etherscan.io/api?module=stats&action=ethprice'
fetch(ethURL)
.then(response=>response.json())
.then((data2)=>{
  ethPrice.innerHTML += (data2.result.ethusd);
  priceLoader.style.display = 'none';})
  .catch((error)=>{console.log('Error getting ETH Price.',error); ethPrice.innerHTML = "ETH Price: $ â ";priceLoader.style.display = 'none';refershPrice.style.display = 'block';});

}

function runQuery() {
  console.clear();
  loading.style.display = "block";
if (address.value!=""){
  setTimeout(function(){
    if (filter1.value!="Please Select"){
      if (filter2.value!="Please Select"){
        if (address.value.slice(0,2)=="0x"&&address.value.length==42){
          let network = [{},
            { eth:`https://api.etherscan.io/api?module=account&action=balance&address=${address.value}&tag=latest&apikey=${apiKeyETH}`},
            { op:`https://api-optimistic.etherscan.io/api?module=account&action=balance&address=${address.value}&tag=latest&apikey=${apiKeyOP}`},
            { matic:`https://api.polygonscan.com/api?module=account&action=balance&address=${address.value}&apikey=${apiKeyMatic}`},
            { zksync:``},
            { arb:`https://api.arbiscan.io/api?module=account&action=balance&address=${address.value}&tag=latest&apikey=${apiKeyArb}`},
            { linea:`https://api.lineascan.build/api?module=account&action=balance&address=${address.value}&apikey=${apiKeyLinea}`}
          ];
          
          fetch(Object.values(network[currentNetwork])).then(response=>response.json()).then(data=>{if(!isNaN(data.result)){balance.innerHTML=((data.result)/Math.pow(10,18)*1).toFixed(5) + cointicker}else{balance.innerHTML = data.result}}).catch(error=>balance.innerHTML = error);
          results.style.display = "block";
          loading.style.display = "none";
          usdValue.innerHTML = (balance.innerHTML.replace(' ETH',''))*(ethPrice.innerHTML.replace('ETH Price: $',''));
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



function closePopup(e){
  console.clear();
  networkImg1.disabled = "false"
  networkImg1.style.opacity = 1;
    if(e!=0){
        currentNetwork = e;
        currentNetwork = e;
        networkImg1.src = Object.values(networksImages[e]);
        networkImg2.src = Object.values(networksImages[e]);
        popUpContainer.style.display = 'none';
        results.style.display = 'none'
        usdValue.innerHTML = 0;
    }else {
        popUpContainer.style.display = 'none';
    }    
    if(e==3){
        cointicker = " MATIC";
    } else {
        cointicker = " ETH";
    }
}
function showPopup(){
        popUpContainer.style.display = 'block';
        popUp.style.display = 'block';
        networkImg1.disabled = "true"
}

// Modify CSS with JS

let r = document.querySelector('.card:nth-child(1)')

function changeHSL(e) {
    // Get the styles (properties and values) for the root
    let rs = getComputedStyle(r);
    // Alert the value of the --blue variable
    r.style.setProperty('--hue',Object.values(hue[e]));
    r.style.setProperty('--saturation',Object.values(saturation[e]));
    r.style.setProperty('--lightness',Object.values(lightness[e]));
}

function testZksync(){
    fetch(`https://www.oklink.com/api/v5/explorer/address/information-evm?chainShortName=eth&address=${address.value}`, {
    headers: {
      'Ok-Access-Key': oklinkAPI,
      'Content-type': 'application/json'
    }
  })
    .then(response=>response.json()).then(data=>console.log(data.data[0].balance)).catch(error=>console.log(error));
};
