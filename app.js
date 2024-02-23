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
let hue = [{},{1:0},{2:353},{3:262},{4:0},{5:204},{6:0}];
let saturation = [{},{1:'0'},{2:'100%'},{3:'75%'},{4:0},{5:'87%'},{6:0}];
let lightness = [{},{1:'67%'},{2:'51%'},{3:'59%'},{4:'95%'},{5:'55%'},{6:'0%'}];

let filter1 = document.querySelector('.filter-1');
let filter2 = document.querySelector('.filter-2');
let results = document.querySelector('.results');
let loading = document.querySelector('.loading');
let balanceLoader = document.querySelector('.balance-loader');
let ethPrice = document.querySelector('.eth-price');
var totalSpent = document.querySelector('.totalSpent');
let priceLoader = document.querySelector('.loader');
let refershPrice = document.querySelector('.refresh-price');
let networkImg1 = document.querySelector('.network-img1');
let networkImg2 = document.querySelector('.network-img2');
let popUp = document.querySelector('.pop-up');
let popUpContainer = document.querySelector('.pop-up-container');
let balance = document.querySelector('.balance');
let usdValue = document.querySelector('.usdValue');
let mainHeading = document.querySelector('.main__heading');
let statement = document.querySelector('.statement');
let cointicker = " ETH";
var network;
let counter = 0;
var totalGasSpent = 0;


function getETHPrice(){
  priceLoader.classList.toggle('closed');
  refershPrice.classList.toggle('closed');
const ethURL = 'https://api.etherscan.io/api?module=stats&action=ethprice'
fetch(ethURL)
.then(response=>response.json())
.then((data2)=>{ if(data2.result.ethusd!=undefined){
  console.log(Number(data2.result.ethusd).toFixed(2));
  ethPrice.innerHTML = `ETH Price: $${Number(data2.result.ethusd).toFixed(2)}`;
  priceLoader.classList.toggle('closed');}else {"ETH Price: $ ⚠";priceLoader.classList.toggle('closed');refershPrice.classList.toggle('closed');}})
  .catch((error)=>{console.log('Error getting ETH Price.',error);ethPrice.innerHTML = "ETH Price: $ ⚠";priceLoader.classList.toggle('closed');refershPrice.classList.toggle('closed');});
};

function whatToDo(){
      if(filter2.value=='Balance'){
        getBalanceOf();
        if (counter!==0){results.classList.toggle('closed')};
        if (counter!==0){statement.classList.remove('closed')};
      } else if(filter2.value=='Internal Txn'){
        getTransactionsOf();
        if (counter!==0){results.classList.remove('closed')};
        if (counter!==0){statement.classList.toggle('closed')};
      } else if(filter2.value=='ERC-20 Txn'){
        alert('ERC-20 Txn Search is Coming Soon 😴');
      } else if(filter2.value=='ERC-1155 Txn'){
        alert('ERC-1155 Txn Search Coming Soon 😴');
      } else if(filter2.value=='ERC-721 Txn'){
        alert('ERC-721 Txn Search Coming Soon 😴');
      }
};


function getBalanceOf() { //This is the main function that fetches ERC address ETH balance form blockchain
  console.clear();
  balance.innerHTML=0;
  loading.classList.toggle('closed');
  balance.classList.toggle('closed');
if (address.value!=""){
  if (filter1.value!="Please Select"){
    if (filter2.value!="Please Select"){
      if (address.value.slice(0,2)=="0x"&&address.value.length==42){  
        if(balance.innerHTML==0){balanceLoader.classList.remove('closed');} else {balanceLoader.classList.add('closed');}
  setTimeout(function(){

      network = [{},
            { Etherscan:`https://api.etherscan.io/api?module=account&action=balance&address=${address.value}&tag=latest&apikey=${apiKeyETH}`},
            { 'Optimism Scan':`https://api-optimistic.etherscan.io/api?module=account&action=balance&address=${address.value}&tag=latest&apikey=${apiKeyOP}`},
            { 'Matic Scan':`https://api.polygonscan.com/api?module=account&action=balance&address=${address.value}&apikey=${apiKeyMatic}`},
            { 'ZkSync Scan':``},
            { Arbscan:`https://api.arbiscan.io/api?module=account&action=balance&address=${address.value}&tag=latest&apikey=${apiKeyArb}`},
            { 'Linea Scan':`https://api.lineascan.build/api?module=account&action=balance&address=${address.value}&apikey=${apiKeyLinea}`}
          ];    
          fetch(Object.values(network[currentNetwork])).then(response=>response.json()).then(data=>{if(!isNaN(data.result)){balance.innerHTML=((data.result)/Math.pow(10,18)*1).toFixed(5) + cointicker}else{balance.innerHTML = data.result}}).catch(error=>balance.innerHTML = error);
          if (counter==0){results.classList.toggle('closed');}
          counter = 1;
          balance.classList.toggle('closed');
          loading.classList.toggle('closed');
          if(balance.innerHTML==0){balanceLoader.classList.remove('closed');} else {balanceLoader.classList.add('closed');}
          setTimeout(function(){
            balanceLoader.classList.toggle('closed');
          },100)
          // usdValue.innerHTML = (balance.innerHTML.replace(' ETH',''))*(ethPrice.innerHTML.replace('ETH Price: $',''));
        },3000)} else {
          loading.classList.toggle('closed');
          alert("Invalid or Incomplete address!");
        }}
        else{
          loading.classList.toggle('closed');
          alert("Please select txn type!");
      }}
      else {
        loading.classList.toggle('closed');
        alert("Please select search method!");
    }
} else {
  alert("Address can't be Empty!");
  loading.classList.toggle('closed');
}}; // Main function ends



function closePopup(e){
  console.clear();
  networkImg1.classList.toggle('closed');
  networkImg1.style.opacity = 1;
    if(e!=0){
      network = [{},
        { Etherscan:`https://api.etherscan.io/api?module=account&action=balance&address=${address.value}&tag=latest&apikey=${apiKeyETH}`},
        { 'Optimism Scan':`https://api-optimistic.etherscan.io/api?module=account&action=balance&address=${address.value}&tag=latest&apikey=${apiKeyOP}`},
        { 'Matic Scan':`https://api.polygonscan.com/api?module=account&action=balance&address=${address.value}&apikey=${apiKeyMatic}`},
        { 'ZkSync Scan':``},
        { Arbscan:`https://api.arbiscan.io/api?module=account&action=balance&address=${address.value}&tag=latest&apikey=${apiKeyArb}`},
        { 'Linea Scan':`https://api.lineascan.build/api?module=account&action=balance&address=${address.value}&apikey=${apiKeyLinea}`}
      ];
        currentNetwork = e;
        currentNetwork = e;
        networkImg1.src = Object.values(networksImages[e]);
        networkImg2.src = Object.values(networksImages[e]);
        popUpContainer.classList.toggle('closed');
        popUp.classList.toggle('closed');
        mainHeading.innerHTML = Object.keys(network[e]);
        getETHPrice();
    }else {
        popUpContainer.classList.toggle('closed');
        popUp.classList.toggle('closed');
    }    
    if(e==3){
        cointicker = " MATIC";
    } else {
        cointicker = " ETH";
    }
};
function showPopup(){
        popUpContainer.classList.toggle('closed');
        popUp.classList.toggle('closed');
        networkImg1.classList.toggle('closed');
};

// Modify CSS with JS

let r = document.querySelector('.card:nth-child(1)')

function changeHSL(e) {
    // Get the styles (properties and values) for the root
    let rs = getComputedStyle(r);
    // Alert the value of the --blue variable
    r.style.setProperty('--hue',Object.values(hue[e]));
    r.style.setProperty('--saturation',Object.values(saturation[e]));
    r.style.setProperty('--lightness',Object.values(lightness[e]));
};

function testZksync(){
    fetch(`https://www.oklink.com/api/v5/explorer/address/information-evm?chainShortName=eth&address=${address.value}`, {
    headers: {
      'Ok-Access-Key': oklinkAPI,
      'Content-type': 'application/json'
    }
  })
    .then(response=>response.json()).then(data=>console.log(data.data[0].balance)).catch(error=>console.log(error));
};

function getTransactionsOf(){
  console.clear();
  balance.innerHTML=0;
  balance.classList.toggle('closed');
  loading.classList.toggle('closed');
  if (address.value!=""){
    if (filter1.value!="Please Select"){
      if (filter2.value!="Please Select"){
        if (address.value.slice(0,2)=="0x"&&address.value.length==42){  
          if(balance.innerHTML==0){balanceLoader.classList.remove('closed');} else {balanceLoader.classList.add('closed');}
    setTimeout(function(){
      fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address.value}&startblock=0&endblock=99999999&page=1&offset=10000&sort=desc&apikey=${apiKeyETH}`)
      .then(response => response.json())
      .then((data) => {
        var count = document.querySelector('.count');
        // var totalSpent = document.querySelector('.totalSpent');
        var txnValue = 0;
        const transactionTable = document.getElementById("transactionTable");
        const tbody = transactionTable.getElementsByTagName("tbody")[0];
      // console.log(data.result);   

        data.result.forEach(transaction => {
          txnValue+= 1*transaction.value;
        });
        totalSpent.innerHTML = '$ ',(txnValue/1e18).toFixed(4)*ethPrice.innerHTML.replace('ETH Price: $','');
        console.log('$ ',(txnValue/1e18).toFixed(4)*ethPrice.innerHTML.replace('ETH Price: $',''));
        data.result.forEach(transaction => {
        const row = tbody.insertRow();
        const blockNumberCell = row.insertCell(0);
        const timestampCell = row.insertCell(1);
        const hashCell = row.insertCell(2);
        const fromCell = row.insertCell(3);
        const toCell = row.insertCell(4);
        const valueCell = row.insertCell(5);
        counter++;
        count.innerHTML = 'Total Number of Transactions: '+counter;
        blockNumberCell.innerHTML = transaction.blockNumber;
        timestampCell.innerHTML = new Date(transaction.timeStamp * 1000).toLocaleString();
        hashCell.innerHTML = `<a href="https://etherscan.io/tx/${transaction.hash}" target="_blank">${transaction.hash}</a>`;
        fromCell.innerHTML = transaction.from;
        toCell.innerHTML = transaction.to;
        valueCell.innerHTML = (transaction.value / 1e18).toFixed(4); // Convert Wei to ETH and round to 4 decimal places
       });
      }).catch(error => console.error(error));
    results.classList.add('show');
    statement.classList.add('show');
    loading.classList.toggle('closed');
    setTimeout(function(){
      balanceLoader.classList.toggle('closed');
    },100);
},3000);
} else {
  loading.classList.toggle('closed');
  alert("Invalid or Incomplete address!");
}}
else{
  loading.classList.toggle('closed');
  alert("Please select txn type!");
}}
else {
loading.classList.toggle('closed');
alert("Please select search method!");
}
} else {
alert("Address can't be Empty!");
loading.classList.toggle('closed');
}};

