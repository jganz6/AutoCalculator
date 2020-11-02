panggilCSS();
panggilPOPS();
panggilCalcuWidget();
function popupWidget(){
    alert("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx SUBMITED  xxxxxx");
}
document.getElementById("AEP").innerHTML="Add extra payments";
removeExtraPT();
var jodieEPT=false;

function extraPT(){
    if (jodieEPT==true){
        document.getElementById("AEP").innerHTML="Add extra payments";
        removeExtraPT();
        jodieEPT=false;
    }else if(jodieEPT==false){
        document.getElementById("AEP").innerHTML="Remove extra payments";
        addExtraPT();
        jodieEPT=true;
    }
}
function removeExtraPT(){
    var xPT=document.getElementById("inputExtraPayment");
    var x_pt=xPT.children;
    console.log(x_pt);
    for (var ixpt=0; ixpt<x_pt.length;ixpt++){
        x_pt[ixpt].style.display="none";
    }
}
function addExtraPT(){
    var xPT=document.getElementById("inputExtraPayment");
    var x_pt=xPT.children;
    for (var ixpt=0; ixpt<x_pt.length;ixpt++){
        x_pt[ixpt].style.display="flex";
    }
}
function closePops(){
    document.getElementsByTagName("BODY")[0].style.overflowY="auto";
    document.getElementById("CalculateWidgetPops").style.visibility= "hidden";
    document.getElementById("label-Price").classList.remove("popupsOverlay");
    document.getElementById("label-DP").classList.remove("popupsOverlay");
    document.getElementById("label-IR").classList.remove("popupsOverlay");
    document.getElementById("label-MT").classList.remove("popupsOverlay");
    var sch=document.getElementById("tabelData");
    var schC=sch.children;
    while(sch.hasChildNodes()){
        sch.removeChild(sch.firstChild);
    }
    console.log(schC);
}
function openPops(){
    panggilTabel();
    var sch=document.getElementById("tabelData");
    var schC=sch.children;
    console.log(schC);
    document.getElementsByTagName("BODY")[0].style.overflowY="hidden";
    document.getElementById("CalculateWidgetPops").style.visibility= "visible";
    document.getElementById("label-Price").classList.add("popupsOverlay");
    document.getElementById("label-DP").classList.add("popupsOverlay");
    document.getElementById("label-IR").classList.add("popupsOverlay");
    document.getElementById("label-MT").classList.add("popupsOverlay");
    calculate();
}
function calculate(){
    var price= document.getElementById("inputPrice").value;
    var dp= document.getElementById("inputDP").value;
    var ir= document.getElementById("inputIR").value;
    var mt= document.getElementById("inputMT").value; 
    var monthly=document.getElementById("inputMonthly").value;
    console.log(price+" "+ dp+" "+ ir+" "+ mt);
    if (price==""){
        price=0;
    }
    if (dp==""){
        dp=0;
    }
    if (ir==""){
        ir=0;
    }
    if (mt==""){
        mt=0;
    }
    if (monthly== ""){
        monthly=0;
    }
    console.log("price value= "+price);
    console.log("DP value= "+dp);
    console.log("interest value= "+ir);
    console.log("Monthly Term value= "+mt);
    console.log("monthly value= "+monthly);
    var monthINT=parseInt(monthly);
    mP();
    function mP(){
        var ym= 12;
        var p= (price-dp)+monthINT;
        var r= (ir/100)/ym;
        var n= mt*ym;
        var hp=[];
        hp[0]=p;
        
        var m= p*r*(((1+r)**n)/(((1+r)**n)-1));
        console.log("Monthly_Payment: "+m);
        var arrayI=[];
        var prncpl=[];
        var totalPayment=[];
        var totalInterest=[];
        totalInterest[0]=0;
        totalPayment[0]=0;
        arrayI[0]=0;
        prncpl[0]= 0;
        for (var i=1; i<=n; i++){
            arrayI[i]=r*hp[i-1];
            prncpl[i]=m-arrayI[i];
            hp[i]=hp[i-1]-prncpl[i];
            if (hp[i]<0){
                hp[i]=0;
            }
            totalPayment[i]=arrayI[i]+prncpl[i];
            totalInterest[i]= arrayI[i]+totalInterest[i-1];
        }
        var totalPrinc=0;
        for(var kl = 1; kl <(prncpl.length); kl++){
            totalPrinc += prncpl[kl];
        }
        console.log(arrayI);
        console.log(prncpl);
        console.log(hp);
        console.log(totalPrinc);
        console.log(totalPayment);
        
        //Mortage TERM INPUT
        var arrMonth=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var arrTerm=[];
        var listBulan=document.getElementById("list__bulan").value;
        var listYear=document.getElementById("list__Year").value;
        var intYear=parseInt(listYear);
        var intBulan=parseInt(listBulan);
        //Jessie
        var blnperthn = [];
        for (var i=0; i<=mt;i++){
            if (i==0){
                blnperthn[0]=12 - intBulan;
            }else{
                var sum = blnperthn.reduceRight(function(a,b){return a+b;});
                var sisa = n - sum;
                if (sisa>12){
                    blnperthn[i] = 12;
                }else{
                    blnperthn[i] = sisa;
                }
            }
        }

        //Mortage TERM OUTPUT
        var arrBulan = [];
        var naon = intBulan;
        var apa = intYear;
        var i_amam=0;
        for(var i=0; i<=mt; i++){
            for(var j=0; j<blnperthn[i]; j++){                
                if (i==0){
                    arrBulan[i_amam] = arrMonth[naon];
                    naon += 1;
                }else{
                    arrBulan[i_amam] = arrMonth[j];
                }
                arrTerm[i_amam]=arrBulan[i_amam]+" 202"+(apa);
                i_amam +=1;
            }
            apa +=1;
        }
        arrTerm[i_amam]= arrMonth[j]+ " 202"+(apa-1);
        console.log(arrTerm);
        //var i_amam=0;
        //for (var i_mt=0; i_mt<mt;i_mt++){
            //console.log(arrMonth[intBulan]);

            //for(var i_am=0;i_am<arrMonth.length;i_am++){
                //arrTerm[i_amam]=arrMonth[i_am]+" 202"+(i_mt+intYear);
                //i_amam+=1;
            //}
        //}
        //arrTerm[i_amam]="ujung";
        //console.log(arrTerm);

        //menampilkan hasil
        var ttl_I=totalInterest.length-1;
        var downP= price-p;
        console.log(price-p);
        var totalAll=totalInterest[ttl_I]+totalPrinc+downP;
        document.getElementById("contentPops").innerHTML="Monthly Payment = $ "+m.toLocaleString()+"<br>Total Interest = $ "+totalInterest[ttl_I].toLocaleString()+"<br>Total Principal = $ "+p.toLocaleString()+"<br>Down Payment = $ "+downP.toLocaleString()+"<br><br><h3><b>Total Of All Payment = $ "+totalAll.toLocaleString()+"<b></h3>";
        //chart batang
        var prncplT=document.getElementById("kotakBiru");
        var dpT=document.getElementById("kotakKuning");
        var intT=document.getElementById("kotakPink");
        var dpPRCNT=document.getElementById("dpC");
        var interestPRCNT=document.getElementById("intC");
        var dpPR= (dp/totalAll)*100;
        var intPR= (totalInterest[ttl_I]/totalAll)*100;
        var prncplPR= 100-(dpPR+intPR);

        dpPRCNT.style.width= dpPR.toFixed(2)+"%";
        dpT.innerHTML=dpPR.toFixed(2)+"%";
        prncplT.innerHTML= prncplPR.toFixed(2)+"%";
        interestPRCNT.style.width= intPR.toFixed(2)+"%";
        intT.innerHTML=intPR.toFixed(2)+"%";
        //interestPRCNT.style.width=" %";
        console.log(hp.length)
        var schedule=document.getElementById("tabelData");
        for (var j=1; j<=(n+1) ;j++){
            var sr= document.createElement("tr");
            schedule.appendChild(sr);
            for (var k=1; k<=6; k++){
                var sd= document.createElement("td");
                if (k==1){
                    var dataSr=document.createTextNode(arrTerm[j-1].toLocaleString());
                    sr.appendChild(sd);
                    sd.appendChild(dataSr);
                }else if (k==2){
                    var dataSr=document.createTextNode("$ "+totalInterest[j].toLocaleString());
                    sr.appendChild(sd);
                    sd.appendChild(dataSr);
                }else if (k==3){
                    var dataSr=document.createTextNode("$ "+arrayI[j].toLocaleString());
                    sr.appendChild(sd);
                    sd.appendChild(dataSr);
                }else if(k==4){
                    var dataSr=document.createTextNode("$ "+prncpl[j].toLocaleString());
                    sr.appendChild(sd);
                    sd.appendChild(dataSr);
                }else if(k==5){
                    var dataSr=document.createTextNode("$ "+totalPayment[j].toLocaleString());
                    sr.appendChild(sd);
                    sd.appendChild(dataSr);
                }else if(k==6){
                    var dataSr=document.createTextNode("$ "+hp[j].toLocaleString());
                    sr.appendChild(sd);
                    sd.appendChild(dataSr);          
                }
            }           
        }
    }
}
function panggilTabel(){
    var tblDat=document.getElementById("tabelData");
    var datR= document.createElement("tr");
    datR.classList.add("hD");
    tblDat.appendChild(datR);
    for (var k=1; k<=6; k++){
        var datD= document.createElement("td");
        if (k==1){
            var dataSr=document.createTextNode("Payment Date");
            datR.appendChild(datD);
            datD.appendChild(dataSr);
        }else if (k==2){
            var dataSr=document.createTextNode("Total Interest");
            datR.appendChild(datD);
            datD.appendChild(dataSr);
        }else if (k==3){
            var dataSr=document.createTextNode("Interest");
            datR.appendChild(datD);
            datD.appendChild(dataSr);
        }else if(k==4){
            var dataSr=document.createTextNode("Principal");
            datR.appendChild(datD);
            datD.appendChild(dataSr);
        }else if(k==5){
            var dataSr=document.createTextNode("Total Payment");
            datR.appendChild(datD);
            datD.appendChild(dataSr);
        }else if(k==6){
            var dataSr=document.createTextNode("Balance");
            datR.appendChild(datD);
            datD.appendChild(dataSr);          
        }
    }
}
function panggilPOPS(){
    var ortu=document.getElementsByTagName("BODY")[0];
    var buatElement=document.createElement("div");
    buatElement.className="CW__popups";
    buatElement.id= "CalculateWidgetPops";
    ortu.appendChild(buatElement);
    //child ortu1
    var ortu1=document.getElementById("CalculateWidgetPops");
    var buatAnak1=document.createElement("div");
    buatAnak1.className="Pops";
    ortu1.appendChild(buatAnak1);
    //child ortu2
    var ortu2=document.getElementsByClassName("Pops")[0];
    var buatAnak2a=document.createElement("button"); //button
    buatAnak2a.id="btn__closePops";
    buatAnak2a.className="btn__closePops";
    buatAnak2a.type="reset";
    ortu2.appendChild(buatAnak2a);
    //button ACTION
    var btnCLE=document.getElementById("btn__closePops");
    btnCLE.onclick = function() {closePops()};
    //====btn======
    buatAnak2a.innerHTML="X";
    var buatAnak2b=document.createElement("h2"); //h2
    buatAnak2b.innerHTML="MortgagePopup";
    ortu2.appendChild(buatAnak2b);
    var buatAnak2c=document.createElement("div");  //div className="flexPops"
    buatAnak2c.className="flexPops";
    ortu2.appendChild(buatAnak2c);
    var buatAnak2d=document.createElement("div"); //div className="bungkusData"
    buatAnak2d.className="bungkusData";
    ortu2.appendChild(buatAnak2d);
    //child ortu flexPops
    var ortuFP=document.getElementsByClassName("flexPops")[0];
    var anakFP=document.createElement("div"); //div class="popsChart"
    anakFP.className="popsChart";
    ortuFP.appendChild(anakFP);
    var anakFPa=document.createElement("div"); //div id="contentPops"
    anakFPa.id="contentPops";
    ortuFP.appendChild(anakFPa);
    //child ortu popsChart
    var ortuPC=document.getElementsByClassName("popsChart")[0];
    var anakPC=document.createElement("div"); //div class="chrtKOTAK"
    anakPC.className="chrtKOTAK";
    ortuPC.appendChild(anakPC);
    var anakPCa=document.createElement("div"); //div class="chrt"
    anakPCa.className="chrt";
    ortuPC.appendChild(anakPCa);
    //----------------------
    //child ortu bungkusData
    var ortuBD=document.getElementsByClassName("bungkusData")[0];
    var anakBD=document.createElement("table"); //table id="tabelData"
    anakBD.id="tabelData";
    ortuBD.appendChild(anakBD);
    //child ortu chrtKOTAK
    var ortuCK=document.getElementsByClassName("chrtKOTAK")[0];
    var anakCK=document.createElement("div");//div class="kotak"
    anakCK.className="kotak";
    ortuCK.appendChild(anakCK);
    var anakCKa=document.createElement("div");//div class="namaKotak"
    anakCKa.className="namaKotak";
    ortuCK.appendChild(anakCKa);
    //---------------
    //child ortu chrt
    var ortuCHRT=document.getElementsByClassName("chrt")[0];
    var anakCHRT=document.createElement("div");//div id="dpC" class="dpC"
    anakCHRT.id="dpC";
    anakCHRT.className="dpC";
    ortuCHRT.appendChild(anakCHRT);
    var anakCHRTa=document.createElement("div");//div id="intC" class="interestC"
    anakCHRTa.id="intC";
    anakCHRTa.className="interestC";
    ortuCHRT.appendChild(anakCHRTa);
    //child ortu kotak
    var ortuK=document.getElementsByClassName("kotak")[0];
    var anakK=document.createElement("div");//div id="kotakBiru" class="kotakBiru"
    anakK.id="kotakBiru";
    anakK.className="kotakBiru";
    ortuK.appendChild(anakK);
    var anakKa=document.createElement("div");//div id="kotakKuning" class="kotakKuning"
    anakKa.id="kotakKuning";
    anakKa.className="kotakKuning";
    ortuK.appendChild(anakKa);
    var anakKb=document.createElement("div");//div id="kotakPink" class="kotakPink"
    anakKb.id="kotakPink";
    anakKb.className="kotakPink";
    ortuK.appendChild(anakKb);
    //child ortu namaKotak
    var ortuNK=document.getElementsByClassName("namaKotak")[0];
    var anakNK=document.createElement("div");// div
    anakNK.innerHTML="Total Principal";
    ortuNK.appendChild(anakNK);
    var anakNKa=document.createElement("div");// div
    anakNKa.innerHTML="Down Payment";
    ortuNK.appendChild(anakNKa);
    var anakNKb=document.createElement("div");// div
    anakNKb.innerHTML="Total Interest";
    ortuNK.appendChild(anakNKb);
}
function panggilCSS(){
    // Get HTML head element 
    var head = document.getElementsByTagName('HEAD')[0];  
    // Create new link Element 
    var link = document.createElement('link'); 
    // set the attributes for link element  
    link.rel = 'stylesheet';  
    link.type = 'text/css'; 
    link.href = 'css/AutoCalculatorWidget.css';
    // Append link element to HTML head 
    head.appendChild(link);
}
function panggilCalcuWidget(){
    var widget=document.getElementById("calcuWidget");
    var anakWidget=document.createElement("div");
    anakWidget.className="CalculatorWidget__Header";
    widget.appendChild(anakWidget);
    calcuHeader();
    var anakWidget1=document.createElement("div");
    anakWidget1.className="CalculatorWidget__Body";
    widget.appendChild(anakWidget1);
    calcuBody();
    var anakWidget2=document.createElement("button");
    anakWidget2.id="calcu_submit";
    anakWidget2.className="CalculatorWidget__Submit";
    anakWidget2.type="submit";
    widget.appendChild(anakWidget2);
    //buttonACTION SUBMIT
    var btnSubmit=document.getElementById("calcu_submit");
    btnSubmit.innerHTML="Calculate";
    btnSubmit.onclick = function() {openPops()};
    //===================
    var anakWidget3=document.createElement("div");
    anakWidget3.innerHTML="By.JodieSoluna &#xa9 copyright all reserved.";
    anakWidget3.className="CalculatorWidget__Footer";
    widget.appendChild(anakWidget3);
    function calcuHeader(){
        var cHead=document.getElementsByClassName("CalculatorWidget__Header")[0];
        var anakWidgetH2=document.createElement("h2");
        anakWidgetH2.innerHTML="CalculatorWidget";
        cHead.appendChild(anakWidgetH2);
    }
    function calcuBody(){
        var cBody=document.getElementsByClassName("CalculatorWidget__Body")[0];
        var anakCbody=document.createElement("div");
        anakCbody.id="cBodyHP";
        anakCbody.className="body__Container";
        cBody.appendChild(anakCbody);
        calcuBody_hp();
        var anakCbody1=document.createElement("div");
        anakCbody1.id="cBodyDP";
        anakCbody1.className="body__Container";
        cBody.appendChild(anakCbody1);
        calcuBody_DP();
        var anakCbody2=document.createElement("div");
        anakCbody2.id="cBodyIR";
        anakCbody2.className="body__Container";
        cBody.appendChild(anakCbody2);
        calcuBody_IR();
        var anakCbody3=document.createElement("div");
        anakCbody3.id="cBodyMT";
        anakCbody3.className="body__Container";
        cBody.appendChild(anakCbody3);
        calcuBody_MT();
        var anakCbody4=document.createElement("div");
        anakCbody4.id="cBodySdate";
        anakCbody4.className="body__Container";
        cBody.appendChild(anakCbody4);
        calcuBody_Sdate();
        var anakCbody5=document.createElement("a");
        anakCbody5.id="AEP";
        anakCbody5.href="#";
        cBody.appendChild(anakCbody5);
        var cBody5=document.getElementById("AEP");
        cBody5.onclick=function() {extraPT()};
        var anakCbody6=document.createElement("div");
        anakCbody6.id="inputExtraPayment";
        cBody.appendChild(anakCbody6);
        var cBody6=document.getElementById("inputExtraPayment");
        var anakCbody6a=document.createElement("div");
        anakCbody6a.className="body__Container";
        anakCbody6a.id="cBody6_m";
        cBody6.appendChild(anakCbody6a);
        calcuBody_cBody6_m();
        var anakCbody6b=document.createElement("div");
        anakCbody6b.className="body__Container";
        anakCbody6b.id="cBody6_y";
        cBody6.appendChild(anakCbody6b);
        calcuBody_cBody6_y();
        function calcuBody_hp(){
            var ortu_hp=document.getElementById("cBodyHP");
            var anak_hp=document.createElement("div");
            anak_hp.className="namaInput";
            anak_hp.innerHTML="Home Price";
            ortu_hp.appendChild(anak_hp);
            var anak_hp1=document.createElement("div");
            anak_hp1.className="input";
            anak_hp1.id="cbi_hp";
            ortu_hp.appendChild(anak_hp1);
            var input_cbi=document.getElementById("cbi_hp");
            var anak_cbi=document.createElement("label");
            anak_cbi.id="label-Price";
            anak_cbi.className="input-symbol-dollar";
            anak_cbi.innerHTML="$";
            anak_cbi.htmlFor= "inputPrice";
            input_cbi.appendChild(anak_cbi);
            var anak_cbi1=document.createElement("input");
            anak_cbi1.id="inputPrice";
            anak_cbi1.name="inputPrice";
            anak_cbi1.placeholder="0.00";
            anak_cbi1.type="text";
            input_cbi.appendChild(anak_cbi1);        
        }
        function calcuBody_DP(){
            var ortu_hp=document.getElementById("cBodyDP");
            var anak_hp=document.createElement("div");
            anak_hp.className="namaInput";
            anak_hp.innerHTML="Down Payment";
            ortu_hp.appendChild(anak_hp);
            var anak_hp1=document.createElement("div");
            anak_hp1.className="input";
            anak_hp1.id="cbi_dp";
            ortu_hp.appendChild(anak_hp1);
            var input_cbi=document.getElementById("cbi_dp");
            var anak_cbi=document.createElement("label");
            anak_cbi.id="label-DP";
            anak_cbi.className="input-symbol-dollar";
            anak_cbi.innerHTML="$";
            anak_cbi.htmlFor= "inputDP";
            input_cbi.appendChild(anak_cbi);
            var anak_cbi1=document.createElement("input");
            anak_cbi1.id="inputDP";
            anak_cbi1.name="inputDP";
            anak_cbi1.placeholder="0.00";
            anak_cbi1.type="text";
            input_cbi.appendChild(anak_cbi1);        
        }
        function calcuBody_IR(){
            var ortu_hp=document.getElementById("cBodyIR");
            var anak_hp=document.createElement("div");
            anak_hp.className="namaInput";
            anak_hp.innerHTML="Interest Rate";
            ortu_hp.appendChild(anak_hp);
            var anak_hp1=document.createElement("div");
            anak_hp1.className="input";
            anak_hp1.id="cbi_ir";
            ortu_hp.appendChild(anak_hp1);
            var input_cbi=document.getElementById("cbi_ir");
            var anak_cbi=document.createElement("label");
            anak_cbi.id="label-IR";
            anak_cbi.className="input-symbol-persen";
            anak_cbi.innerHTML="%";
            anak_cbi.htmlFor= "inputIR";
            input_cbi.appendChild(anak_cbi);
            var anak_cbi1=document.createElement("input");
            anak_cbi1.id="inputIR";
            anak_cbi1.name="inputIR";
            anak_cbi1.placeholder="0.00";
            anak_cbi1.type="text";
            input_cbi.appendChild(anak_cbi1);        
        }
        function calcuBody_MT(){
            var ortu_hp=document.getElementById("cBodyMT");
            var anak_hp=document.createElement("div");
            anak_hp.className="namaInput";
            anak_hp.innerHTML="Mortgage Term";
            ortu_hp.appendChild(anak_hp);
            var anak_hp1=document.createElement("div");
            anak_hp1.className="input";
            anak_hp1.id="cbi_mt";
            ortu_hp.appendChild(anak_hp1);
            var input_cbi=document.getElementById("cbi_mt");
            var anak_cbi=document.createElement("label");
            anak_cbi.id="label-MT";
            anak_cbi.className="input-symbol-years";
            anak_cbi.innerHTML="years";
            anak_cbi.htmlFor= "inputMT";
            input_cbi.appendChild(anak_cbi);
            var anak_cbi1=document.createElement("input");
            anak_cbi1.id="inputMT";
            anak_cbi1.name="inputMT";
            anak_cbi1.placeholder="0.00";
            anak_cbi1.type="text";
            input_cbi.appendChild(anak_cbi1);        
        }
        function calcuBody_Sdate(){
            var ortu_hp=document.getElementById("cBodySdate");
            var anak_hp=document.createElement("div");
            anak_hp.className="namaInput";
            anak_hp.innerHTML="Start date";
            ortu_hp.appendChild(anak_hp);
            var anak_hp1=document.createElement("div");
            anak_hp1.className="flexInp";
            anak_hp1.id="cbi_fI";
            ortu_hp.appendChild(anak_hp1);
            var input_cbi=document.getElementById("cbi_fI");
            var anak_cbi=document.createElement("select");
            anak_cbi.id="list__bulan";
            anak_cbi.name="bulan";
            input_cbi.appendChild(anak_cbi);
            var opt_slc=document.getElementById("list__bulan");
            var anak_slc=document.createElement("option");
            anak_slc.value="0";
            anak_slc.innerHTML="Jan";
            opt_slc.appendChild(anak_slc);
            var anak_slc1=document.createElement("option");
            anak_slc1.value="1";
            anak_slc1.innerHTML="Feb";
            opt_slc.appendChild(anak_slc1);
            var anak_slc2=document.createElement("option");
            anak_slc2.value="2";
            anak_slc2.innerHTML="Mar";
            opt_slc.appendChild(anak_slc2);
            var anak_slc3=document.createElement("option");
            anak_slc3.value="3";
            anak_slc3.innerHTML="Apr";
            opt_slc.appendChild(anak_slc3);
            var anak_slc4=document.createElement("option");
            anak_slc4.value="4";
            anak_slc4.innerHTML="Mei";
            opt_slc.appendChild(anak_slc4);
            var anak_slc5=document.createElement("option");
            anak_slc5.value="5";
            anak_slc5.innerHTML="Jun";
            opt_slc.appendChild(anak_slc5);
            var anak_slc6=document.createElement("option");
            anak_slc6.value="6";
            anak_slc6.innerHTML="Jul";
            opt_slc.appendChild(anak_slc6);
            var anak_slc7=document.createElement("option");
            anak_slc7.value="7";
            anak_slc7.innerHTML="Aug";
            opt_slc.appendChild(anak_slc7);
            var anak_slc8=document.createElement("option");
            anak_slc8.value="8";
            anak_slc8.innerHTML="Sep";
            opt_slc.appendChild(anak_slc8);
            var anak_slc9=document.createElement("option");
            anak_slc9.value="9";
            anak_slc9.innerHTML="Oct";
            opt_slc.appendChild(anak_slc9);
            var anak_slc10=document.createElement("option");
            anak_slc10.value="10";
            anak_slc10.innerHTML="Nov";
            opt_slc.appendChild(anak_slc10);
            var anak_slc11=document.createElement("option");
            anak_slc11.value="11";
            anak_slc11.innerHTML="Dec";
            opt_slc.appendChild(anak_slc11);
            //year================================
            //year================================
            //year================================
            var input_cbi1=document.getElementById("cbi_fI");
            var anak_cbi1=document.createElement("select");
            anak_cbi1.id="list__Year";
            anak_cbi1.name="year";
            input_cbi1.appendChild(anak_cbi1);
            var slcA=document.getElementById("list__Year");
            var anak_slcA=document.createElement("option");
            anak_slcA.value="0";
            anak_slcA.innerHTML="2020";
            slcA.appendChild(anak_slcA);
            var anak_slcA1=document.createElement("option");
            anak_slcA1.value="1";
            anak_slcA1.innerHTML="2021";
            slcA.appendChild(anak_slcA1);
            var anak_slcA2=document.createElement("option");
            anak_slcA2.value="2";
            anak_slcA2.innerHTML="2022";
            slcA.appendChild(anak_slcA2);
            var anak_slcA3=document.createElement("option");
            anak_slcA3.value="3";
            anak_slcA3.innerHTML="2023";
            slcA.appendChild(anak_slcA3);
            var anak_slcA4=document.createElement("option");
            anak_slcA4.value="4";
            anak_slcA4.innerHTML="2024";
            slcA.appendChild(anak_slcA4);
            var anak_slcA5=document.createElement("option");
            anak_slcA5.value="5";
            anak_slcA5.innerHTML="2025";
            slcA.appendChild(anak_slc5);
            var anak_slcA6=document.createElement("option");
            anak_slcA6.value="6";
            anak_slcA6.innerHTML="2026";
            slcA.appendChild(anak_slcA6);
            var anak_slcA7=document.createElement("option");
            anak_slcA7.value="7";
            anak_slcA7.innerHTML="2027";
            slcA.appendChild(anak_slcA7);
            var anak_slcA8=document.createElement("option");
            anak_slcA8.value="8";
            anak_slcA8.innerHTML="2028";
            slcA.appendChild(anak_slcA8);
            var anak_slcA9=document.createElement("option");
            anak_slcA9.value="9";
            anak_slcA9.innerHTML="2029";
            slcA.appendChild(anak_slcA9);  
        }
        function calcuBody_cBody6_m(){
            var ortu_hp=document.getElementById("cBody6_m");
            var anak_hp=document.createElement("div");
            anak_hp.className="namaInput";
            anak_hp.innerHTML="To monthly";
            ortu_hp.appendChild(anak_hp);
            var anak_hp1=document.createElement("div");
            anak_hp1.className="input";
            anak_hp1.id="cbi_6m";
            ortu_hp.appendChild(anak_hp1);
            var input_cbi=document.getElementById("cbi_6m");
            var anak_cbi=document.createElement("label");
            anak_cbi.id="label-Monthly";
            anak_cbi.className="input-symbol-dollar";
            anak_cbi.innerHTML="$";
            anak_cbi.htmlFor= "inputMonthly";
            input_cbi.appendChild(anak_cbi);
            var anak_cbi1=document.createElement("input");
            anak_cbi1.id="inputMonthly";
            anak_cbi1.name="inputMonthly";
            anak_cbi1.placeholder="0.00";
            anak_cbi1.type="text";
            input_cbi.appendChild(anak_cbi1);
        }
        function calcuBody_cBody6_y(){
            var ortu_cBody6_y=document.getElementById("cBody6_y");
            var anak_hp=document.createElement("div");
            anak_hp.className="namaInput";
            anak_hp.innerHTML="To yearly";
            ortu_cBody6_y.appendChild(anak_hp);
            var anak_hp1=document.createElement("div");
            anak_hp1.className="input";
            anak_hp1.id="cbi_6y";
            ortu_cBody6_y.appendChild(anak_hp1);
            var input_cbi=document.getElementById("cbi_6y");
            var anak_cbi=document.createElement("label");
            anak_cbi.id="label-Yearly";
            anak_cbi.className="input-symbol-dollar";
            anak_cbi.innerHTML="$";
            anak_cbi.htmlFor= "inputYearly";
            input_cbi.appendChild(anak_cbi);
            var anak_cbi1=document.createElement("input");
            anak_cbi1.id="inputYearly";
            anak_cbi1.name="inputYearly";
            anak_cbi1.placeholder="0.00";
            anak_cbi1.type="text";
            input_cbi.appendChild(anak_cbi1);
            var input_cbi=document.getElementById("cbi_6y");
            var anak_cbi=document.createElement("select");
            anak_cbi.id="list__bulan-Yearly";
            anak_cbi.name="Yearly";
            input_cbi.appendChild(anak_cbi);
            var opt_slc=document.getElementById("list__bulan-Yearly");
            var anak_slc=document.createElement("option");
            anak_slc.value="0";
            anak_slc.innerHTML="Jan";
            opt_slc.appendChild(anak_slc);
            var anak_slc1=document.createElement("option");
            anak_slc1.value="1";
            anak_slc1.innerHTML="Feb";
            opt_slc.appendChild(anak_slc1);
            var anak_slc2=document.createElement("option");
            anak_slc2.value="2";
            anak_slc2.innerHTML="Mar";
            opt_slc.appendChild(anak_slc2);
            var anak_slc3=document.createElement("option");
            anak_slc3.value="3";
            anak_slc3.innerHTML="Apr";
            opt_slc.appendChild(anak_slc3);
            var anak_slc4=document.createElement("option");
            anak_slc4.value="4";
            anak_slc4.innerHTML="Mei";
            opt_slc.appendChild(anak_slc4);
            var anak_slc5=document.createElement("option");
            anak_slc5.value="5";
            anak_slc5.innerHTML="Jun";
            opt_slc.appendChild(anak_slc5);
            var anak_slc6=document.createElement("option");
            anak_slc6.value="6";
            anak_slc6.innerHTML="Jul";
            opt_slc.appendChild(anak_slc6);
            var anak_slc7=document.createElement("option");
            anak_slc7.value="7";
            anak_slc7.innerHTML="Aug";
            opt_slc.appendChild(anak_slc7);
            var anak_slc8=document.createElement("option");
            anak_slc8.value="8";
            anak_slc8.innerHTML="Sep";
            opt_slc.appendChild(anak_slc8);
            var anak_slc9=document.createElement("option");
            anak_slc9.value="9";
            anak_slc9.innerHTML="Oct";
            opt_slc.appendChild(anak_slc9);
            var anak_slc10=document.createElement("option");
            anak_slc10.value="10";
            anak_slc10.innerHTML="Nov";
            opt_slc.appendChild(anak_slc10);
            var anak_slc11=document.createElement("option");
            anak_slc11.value="11";
            anak_slc11.innerHTML="Dec";
            opt_slc.appendChild(anak_slc11);
        }
    }
}