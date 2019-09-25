function onLoadF(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4){
            MyFunction(this);
        }
    };
    xhttp.open("GET", "konyvek.xml", true);
    xhttp.send();
}
function MyFunction(that){
    let xmlSzoveg = that.responseXML;
    let konyvesbolt = xmlSzoveg.getElementsByTagName("KONYV");
    let dSzoveg = "";
    for(let i = 0; i < konyvesbolt.length; i++){
        dSzoveg += `
        <div id='konyv'>
            <div class='image'>
                <img src='images/${konyvesbolt[i].getElementsByTagName("KEP")[0].childNodes[0].nodeValue}' width='100%'/>
            </div>
            <div class='text'>
                <h3>${konyvesbolt[i].getElementsByTagName("CIM")[0].childNodes[0].nodeValue}</h3>
                <small>${konyvesbolt[i].getElementsByTagName("SZERZO")[0].childNodes[0].nodeValue} - <span> Oldalszám: <strong>${konyvesbolt[i].getElementsByTagName("OLDALSZAM")[0].childNodes[0].nodeValue}</strong></span></small>
                <div class="ar">
                    ${(konyvesbolt[i].getElementsByTagName("AR-AKCIOS")[0].childNodes[0].nodeValue != "") ? "<li class='def-price'>"+ parseFloat(konyvesbolt[i].getElementsByTagName("AR")[0].childNodes[0].nodeValue).toLocaleString('en').replace(",", " ") +" Ft</li><li class='price'>"+ parseFloat(konyvesbolt[i].getElementsByTagName("AR-AKCIOS")[0].childNodes[0].nodeValue).toLocaleString('en').replace(",", " ") +" Ft</li>" : "<li class='price'>"+ parseFloat(konyvesbolt[i].getElementsByTagName("AR")[0].childNodes[0].nodeValue).toLocaleString("en").replace(",", " ") +" Ft</li>"}
                    <a href="#">Megrendelés</a>
                </div>
            </div>
        </div>
        `;
    }

    document.getElementById("konyvek").innerHTML = dSzoveg;
}