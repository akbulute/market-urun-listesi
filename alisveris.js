function listeyikaydet() {
    const tumurunler =document.querySelectorAll("#urunlistesi li span");
    const urunlistesi = [];

    tumurunler.forEach(function(span) {
            urunlistesi.push(span.textContent);
    });
    localStorage.setItem("urunler", JSON.stringify(urunlistesi));
}






function urunekle(){
    let girdi = document.getElementById("urunadi");
    let metin = girdi.value.trim();
    if (metin == ""){
        document.getElementById("bosmu").textContent = "lütfen bu alanı doldurun..";
        return;
    }else{
        document.getElementById("bosmu").textContent = "";}

    // li oluşturuyoruz
    let yeniliste = document.createElement("li");

    yeniliste.style.display = "flex";       //yatay hizaladık
    yeniliste.style.alignItems = "center";  //dikey ortaladık
    yeniliste.style.padding = "10px";
    yeniliste.style.borderBottom= "1px solid brown";

    // görev metnini seçiyoruz   span ile
    let span = document.createElement("span");
    span.textContent = metin;
    span.style.flex ="1";   //yazı alanını büyütür. kalan alanı kaplar

    // buton gruplarını yazıdan ayırmak için div oluşturuyoruz
    const butongrubu = document.createElement("div");

    // alındı butonu ekliyoruz
    const alindi = document.createElement("button");
    alindi.textContent = "Alındı";
    alindi.style.marginRight = "10px"
    alindi.onclick = function(){
        yeniliste.classList.toggle("alindi");
    };

    // eklediğimiz ürünü silmek için sil butonu 
    const silbtn = document.createElement("button");
    silbtn.textContent = "sil";
    silbtn.onclick = function(){
    const eminMi = confirm("bu ürünü sileceksiniz");
    if(!eminMi) return;
    yeniliste.remove();
    const kalanUrunler = document.querySelectorAll("#urunlistesi li");
    if (kalanUrunler.length === 0) {
        document.getElementById("tumunuSilBtn").style.display = "none";
    }
    listeyikaydet();
};

    // butonları buton grubu div'ine  eklemek için  appendChild
    butongrubu.appendChild(alindi);
    butongrubu.appendChild(silbtn);

    // span butonunu li ye ekledik
    yeniliste.appendChild(span);
    yeniliste.appendChild(butongrubu);

    const liste = document.getElementById("urunlistesi");
    liste.appendChild(yeniliste);
    document.getElementById("tumunuSilBtn").style.display="inline";

    listeyikaydet();
    girdi.value=""; 
}

function tumunuSil() {
    
    const eminMi = confirm("Tüm ürünleri silmek istediğinize emin misiniz?");
    if (!eminMi) return;
    document.getElementById("urunlistesi").innerHTML="";
    document.getElementById("tumunuSilBtn").style.display="none";
    listeyikaydet();
  }



  function listeyiYukle() {
    // LocalStorage'dan kayıtlı ürünleri al
    const kayitliUrunler = JSON.parse(localStorage.getItem("urunler"));
    if (!kayitliUrunler) return; // Eğer ürün yoksa çık

    // Her ürün için li elementi oluşturduk
    kayitliUrunler.forEach(function(metin) {
        let yeniliste = document.createElement("li");
        yeniliste.style.display = "flex";
        yeniliste.style.alignItems = "center";
        yeniliste.style.padding = "10px";
        yeniliste.style.borderBottom = "1px solid brown";

        let span = document.createElement("span");
        span.textContent = metin;
        span.style.flex = "1";

        const butongrubu = document.createElement("div");

        const alindi = document.createElement("button");
        alindi.textContent = "Alındı";
        alindi.style.marginRight = "10px";
        alindi.onclick = function() {
            yeniliste.classList.toggle("alindi");
        };

        const silbtn = document.createElement("button");
        silbtn.textContent = "sil";
        silbtn.onclick = function() {
            const eminMi = confirm("bu ürünü sileceksiniz..");
            if (!eminMi) return;
            yeniliste.remove();
            const kalanUrunler = document.querySelectorAll("#urunlistesi li");
            if (kalanUrunler.length === 0) {
                document.getElementById("tumunuSilBtn").style.display = "none";
            }
            listeyikaydet(); // silince storage güncellesin diye eklemelyiz
        };

        butongrubu.appendChild(alindi);
        butongrubu.appendChild(silbtn);

        yeniliste.appendChild(span);
        yeniliste.appendChild(butongrubu);

        document.getElementById("urunlistesi").appendChild(yeniliste);
        
    });

    // Eğer kayıtlı ürün varsa, "Tümünü Sil" butonunu gösterdim
    document.getElementById("tumunuSilBtn").style.display = "inline";

    document.getElementById("urunadi").addEventListener("input", function() {
        localStorage.setItem("geciciInput", this.value);
    });
    
}
window.onload = function() {
    listeyiYukle();
    const geciciYazi = localStorage.getItem("geciciInput");
    if (geciciYazi) {
        document.getElementById("urunadi").value = geciciYazi;
    }
};
