let arrKursi = [];
let counter = 0;
var tutup = document.getElementById('tutup');
var buka = document.getElementById('buka');
var jmlhSeat = document.getElementById('jmlhSeat');
var nmSeat = document.getElementById('namaSeat');
var harga = document.getElementById('harga');

//container skip
//id data
//id input : masuk Nama

//tombol submit
var button = document.getElementById('button');
//tabel penampung bawah
var daftar = document.getElementById('daftar');

var namaInput = document.getElementById('namaInput');



function kalimat(){
    if(counter == 0){
        tutup.style.display = "block";
        buka.style.display = "none";
    }else{
        tutup.style.display = "none";
        buka.style.display = "block";
    }
}
function jumlahSeat(){
    jmlhSeat.innerHTML = counter;
}
function namaSeat(){
    var arrNamaSeat = [];
    var x = document.querySelectorAll(".ijo");
    for(var i=0;i<x.length;i++){
        arrNamaSeat.push(x[i].getAttribute('value'));
    }
    var arrNamaSeatZ = [];
    arrNamaSeat.sort();
    let temp;
    for(let i=0;i<arrNamaSeat.length;i++){
        if(arrNamaSeat[i]!==temp){
            arrNamaSeatZ.push(arrNamaSeat[i]);
            temp = arrNamaSeat[i];
        }
    }
    nmSeat.innerHTML = arrNamaSeatZ;
}
function reset(){
    counter = 0;
}
function rego(){
    var hasil = counter*(41000);
    harga.innerHTML = hasil;
}


function gantiWarnaHijau(el){
    if(el.className == "abu2"){
        el.className = "ijo";
        counter++;
    }else{
        el.className = "abu2";
        counter--;
    }
    kalimat();
    jumlahSeat();
    namaSeat();
    rego();
}

// function sudahPesan(){
//     let arrKursiZ = [];
//     arrKursi.sort();
//     let temp;
//     for(let i=0;i<arrKursi.length;i++){
//         if(arrKursi[i]!==temp){
//             arrKursiZ.push(arrKursi[i]);
//             temp = arrKursi[i];
//         }
//     }
//     for(let i=0;i<arrKursiZ.length;i++){
//         if(arrKursiZ[i]==document.getElementsByClassName('biru')[i].getAttribute('value')){
//             alert("Seat " + arrKursiZ[i] + " sudah terisi. Silahkan pilih seat yang lainnya!");
//         }
//     }
// }
function sudahPesan(el){
    let arrKursiZ = [];
    arrKursi.sort();
    let temp;
    for(let i=0;i<arrKursi.length;i++){
        if(arrKursi[i]!==temp){
            arrKursiZ.push(arrKursi[i]);
            temp = arrKursi[i];
        }
    }
    for(let i=0;i<arrKursiZ.length;i++){
        if(arrKursiZ[i]==el.getAttribute('value')){
            alert("Seat " + arrKursiZ[i] + " sudah terisi. Silahkan pilih seat yang lainnya!");
        }
    }
}


function yakin(){
        //ketika klik submit, semua kursi hijau dadi biru
        var pesan = document.getElementsByClassName('ijo');
        Array.from(pesan).forEach(function(item){
            item.className = "biru";
        })
        //ketika klik submit, semua kursi biru bisa 
        //muncul alert sudah dipesan
        //biar alert muncul nama seat
        //misal 'D3' sudah dipesan
        var x = document.querySelectorAll(".biru");
        for(var i=0;i<x.length;i++){
            x[i].setAttribute('onclick','sudahPesan(this)');
            arrKursi.push(x[i].getAttribute('value'));
        }
        reset();
        kalimat();
}

//bentuk javascript
let kursiArray = [];

function init() {
    if (localStorage.kursiRecord) {
        kursiArray = JSON.parse(localStorage.kursiRecord);
        for (var i=0; i<kursiArray.length; i++) {
            var namae = kursiArray[i].jeneng;
            var kursie = kursiArray[i].kursi;
            var hargae = kursiArray[i].harga;
            console.log(namae + kursie + hargae);
            let template1 = "<tr><td>"+namae+"</td><td>"+kursie+"</td><td>"+hargae+"</td></tr>";
            daftar.innerHTML += template1;
        }
    }
}

button.addEventListener('click',() => {
    let jeneng = namaInput.value;
    let chair = [];
    let price = counter*(41000);
    
    if(namaInput.value == ""){
        alert("Masukkan Nama Anda!");
    }else if (counter == 0){
        alert("Pilih Kursi Terlebih Dahulu!")
    }else{
        var nggoKursi = document.querySelectorAll(".ijo");
        for(var i=0;i<nggoKursi.length;i++){
            chair.push(nggoKursi[i].getAttribute('value'));
        }
        yakin();
        //---------------------------------------------

        //membuat objek
        var kursiObj = {jeneng:jeneng,kursi:chair,harga:price};
        //nabah data ke array 
        kursiArray.push(kursiObj);
        //local storage
        localStorage.kursiRecord = JSON.stringify(kursiArray);

        //penambah baris tabel
        let template = "<tr><td>"+jeneng+"</td><td>"+chair+"</td><td>"+price+"</td></tr>";
        daftar.innerHTML += template;

        harga.innerHTML = "0";
        namaInput.value="";
    }
});