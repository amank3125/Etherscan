let address = document.querySelector('.address');
let result = document.querySelector('.result');
let btn = document.querySelector('.btn');
const api = '2VQQpKlDTJyrk82KN5zxEfOW3sT';
let networkID = 1;
const ipfs = 'https://ipfs.io/ipfs/';
let grid = document.querySelector('.grid');
// let nft1 = {
//     'floor':document.querySelector('.nft1_floor'),
//     'contract':document.querySelector('.nft1_contract'),
//     'desc':document.querySelector('.nft1_desc'),
//     'name':document.querySelector('.nft1_name'),
//     'img':document.querySelector('.nft1_img')
// };
// let nft2 = {
//     'floor':document.querySelector('.nft2_floor'),
//     'contract':document.querySelector('.nft2_contract'),
//     'desc':document.querySelector('.nft2_desc'),
//     'name':document.querySelector('.nft2_name'),
//     'img':document.querySelector('.nft2_img')
// };
// let nft3 = {
//     'floor':document.querySelector('.nft3_floor'),
//     'contract':document.querySelector('.nft3_contract'),
//     'desc':document.querySelector('.nft3_desc'),
//     'name':document.querySelector('.nft3_name'),
//     'img':document.querySelector('.nft3_img')
// };
// let nft4 = {
//     'floor':document.querySelector('.nft4_floor'),
//     'contract':document.querySelector('.nft4_contract'),
//     'desc':document.querySelector('.nft4_desc'),
//     'name':document.querySelector('.nft1_name'),
//     'img':document.querySelector('.nft4_img')
// };

function search(){
    console.clear();
    fetch(`https://api.chainbase.online/v1/account/nfts?chain_id=${networkID}&address=${address.value}&page=1&limit=5`,{
    method: "GET",
    headers:{
        'x-api-key':'2VQQpKlDTJyrk82KN5zxEfOW3sT',
        'accept': 'application/json'
    }
}).then(response=>response.json()).then((data)=>{
    console.log(data.data);

    nft1.img.src = data.data[0].image_uri.replace('ipfs',ipfs);
    nft1.name.innerHTML = data.data[0].name;
    nft1.contract.innerHTML = data.data[0].contract_address;
    nft1.desc.innerHTML = data.data[0].metadata.description;
    nft1.floor.innerHTML = data.data[0].floor_prices[0].value;

    nft2.img.src = data.data[1].image_uri.replace('ipfs://',ipfs);
    nft2.name.innerHTML = data.data[1].name;
    nft2.contract.innerHTML = data.data[1].contract_address;
    nft2.desc.innerHTML = data.data[1].metadata.description;
    nft2.floor.innerHTML = data.data[1].floor_prices[0].value;

    nft3.img.src = data.data[2].image_uri.replace('ipfs://',ipfs);
    nft3.name.innerHTML = data.data[2].name;
    nft3.contract.innerHTML = data.data[2].contract_address;
    nft3.desc.innerHTML = data.data[2].metadata.description;
    nft3.floor.innerHTML = data.data[2].floor_prices[0].value;

    nft4.img.src = data.data[4].image_uri.replace('ipfs://ipfs/',ipfs);
    nft4.name.innerHTML = data.data[4].name;
    nft4.contract.innerHTML = data.data[4].contract_address;
    nft4.desc.innerHTML = data.data[4].metadata.description;
    nft4.floor.innerHTML = data.data[4].floor_prices[0].value;

}).catch(error=>console.log(error));
}


function test(){
    console.clear();
    fetch(`https://api.chainbase.online/v1/account/nfts?chain_id=${networkID}&address=${address.value}&page=1&limit=5`,{
    method: "GET",
    headers:{
        'x-api-key':'2VQQpKlDTJyrk82KN5zxEfOW3sT',
        'accept': 'application/json'
    }
}).then(response=>response.json()).then((data)=>{
    data.data.forEach(nft=>{
        let counter = 0;
        counter++
        if(nft.image_uri.includes('https://')){
            grid.innerHTML += `<div class="nft nft${counter}">
            <img src="${nft.image_uri}" class="nft_img">
            <p class="nft_name">${nft.name}</p>
            <p class="nft_desc clamp">${nft.metadata.description}</p>
            <p class="nft_contract">${nft.contract_address}</p>
            <p class="nft_floor">Floor Price ${nft.floor_prices[0].value} Ξ</p>
            </div>`;
        } else if(nft.image_uri.includes('ipfs://ipfs/')){
            grid.innerHTML += `<div class="nft nft${counter}">
            <img src="${nft.image_uri.replace('ipfs://ipfs/',ipfs)}" class="nft_img">
            <p class="nft_name">${nft.name}</p>
            <p class="nft_desc clamp">${nft.metadata.description}</p>
            <p class="nft_contract">${nft.contract_address}</p>
            <p class="nft}_floor">Floor Price ${nft.floor_prices[0].value} Ξ</p>
            </div>`;
        } else {
            grid.innerHTML += `<div class="nft nft${counter}">
            <img src="${nft.image_uri.replace('ipfs://',ipfs)}" class="nft_img">
            <p class="nft_name">${nft.name}</p>
            <p class="nft_desc clamp">${nft.metadata.description}</p>
            <p class="nft_contract">${nft.contract_address}</p>
            <p class="nft_floor">Floor Price ${nft.floor_prices[0].value} Ξ</p>
            </div>`;
        }
    })
});
}