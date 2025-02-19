function updateResult() {
    let currentYear = new Date().getFullYear();
    let selectedYear = document.getElementById("year").value || currentYear;
    let isee_两年前年份 = selectedYear - 2;

    let casa_selection = document.getElementById("casa").value;
    let resultText = `ISEE ${selectedYear} 所需材料：<br><br>* 家庭成员证明 Stato di Famiglia<br><br>* 办理⼈⾝份证、绿卡<br><br>* 家庭成员绿卡号`;

    if (casa_selection == "locazione") {
        resultText += `<br><br>* 租房合同（和续租证明）以及注册收据 Comunicazione di Registrazione Contratto`;
    }
    if (document.getElementById("autoveicolo").checked) {
        resultText += `<br><br>* 家庭成员的⻋牌号，排量500cc以上的摩托⻋牌号`;
    }
    if (document.getElementById("disabile").checked) {
        resultText += `<br><br>* 残疾证明 Verbale Commissione Invalidi`;
    }
    if (document.getElementById("attività").checked) {
        resultText += `<br><br>* 持有IVA税号的⼈，需要会计师填写相关表格，标明公司净资产值 Valore Patrimonio Netto al 31/12/${isee_两年前年份}`;
    }
    
    
    resultText += `<br><br>————————————<br><br>活动资产 PATRIMONIO MOBILIARE（参考${isee_两年前年份}年）<br><br>* 每个银⾏/邮局的平均存款余额 Giacenza Media e Saldo al 31/12/${isee_两年前年份}（店面使用IVA开的户头不需要，使用Codice Fiscale开的户头需要）`;
    if (document.getElementById("assicutazione_vita").checked) {
        resultText += `<br><br>* ⼈寿保险保单 Assicurazioni sulla Vita e di Capitalizzazione al 31/12/${isee_两年前年份}`;
    }
    if (document.getElementById("titoli").checked) {
        resultText += `<br><br>* 国债 Titoli di Stato，债券 Obbligazioni<br><br>* 存款单 Certificati di Deposito，计息债券 Buoni Fruttiferi`;
    }


    if (casa_selection == "proprietario") {
        resultText += `<br><br>————————————<br><br>不动产 PATRIMONIO IMMOBILIARE（截⾄31/12/${isee_两年前年份})<br><br>* 房产证信息，房屋买卖协议 Dati Catastali`;
    }
    if (casa_selection == "mutuo") {
        resultText += `<br><br>————————————<br><br>不动产 PATRIMONIO IMMOBILIARE（截⾄31/12/${isee_两年前年份})<br><br>* 房产证信息，房屋买卖协议 Dati Catastali<br><br>* 房屋贷款剩余本⾦证明 Certificazione Quota Capitale Residua del Mutuo al 31/12/${isee_两年前年份}`;
    }
        

    document.getElementById("result").innerHTML = resultText;
}