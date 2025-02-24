document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language');

    // 初始化时设置默认语言
    let defaultLanguage = localStorage.getItem('language') || 'zh'; // 默认中文
    languageSelector.value = defaultLanguage;
    updateContent(defaultLanguage);

    languageSelector.addEventListener('change', function() {
        const selectedLanguage = languageSelector.value;
        localStorage.setItem('language', selectedLanguage); // 保存选择的语言到localStorage
        updateContent(selectedLanguage);
    });

    function updateContent(lang) {
        fetch('lang_isee.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应错误');
                }
                return response.json();
            })
            .then(data => {
                const langData = data[lang];

                // 遍历语言对象的键
                for (const key in langData) {
                    if (langData.hasOwnProperty(key)) {
                        const element = document.getElementById(key);
                        if (element) {
                            if (element.tagName === 'INPUT' && element.type === 'checkbox') {
                                const label = document.getElementById('label_' + key); // 构造label的ID
                                if (label) {
                                    label.textContent = langData[key]; // 填充对应的内容
                                }
                            } else {
                                element.textContent = langData[key]; // 填充对应的内容
                            }
                        }
                    }
                }
                updateResult_isee(); // 刷新其他依赖语言数据的函数
            })
            .catch(error => {
                console.error('获取数据时出错:', error);
            });
    }
});

function updateResult_isee() {
    const selectedLanguage = localStorage.getItem('language') || 'zh'; // 从localStorage获取当前语言
    fetch('lang_isee.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应错误');
            }
            return response.json();
        })
        .then(data => {
            const zh = data[selectedLanguage];

            // 更新年份相关的内容
            let currentYear = new Date().getFullYear();
            let selectedYear = document.getElementById("year").value || currentYear;
            let isee_两年前年份 = selectedYear - 2;

            // 更新文本内容
            let resultText = zh.output_materiale_base.replace("{selectedYear}", selectedYear);

            // 根据选择更新材料列表
            let residenza_selection = document.getElementById("residenza").value;

            if (residenza_selection === "residenza_locato") {
                resultText += `<br><br>* ` + zh.output_residenza_locato;
            }
            if (document.getElementById("checkbox_autoveicolo").checked) {
                resultText += `<br><br>* ` + zh.output_autoveicolo;
            }
            if (document.getElementById("checkbox_disabile").checked) {
                resultText += `<br><br>* ` + zh.output_disabile;
            }
            if (document.getElementById("checkbox_attività").checked) {
                resultText += `<br><br>* ` + zh.output_attività.replace("{2_years_ago}", isee_两年前年份);
            }

            resultText += `<br><br>————————————<br><br>` + zh.output_patrimonio_mobiliare.replace("{2_years_ago}", isee_两年前年份);
            resultText += `<br><br>* ` + zh.output_giacenza_media.replace("{2_years_ago}", isee_两年前年份);

            if (document.getElementById("checkbox_assicutazione_vita").checked) {
                resultText += `<br><br>* ` + zh.output_assicutazione_vita.replace("{2_years_ago}", isee_两年前年份);
            }
            if (document.getElementById("checkbox_titoli").checked) {
                resultText += `<br><br>* ` + zh.output_titoli;
            }

            if (residenza_selection === "residenza_acquistato") {
                resultText += `<br><br>————————————<br><br>` + zh.output_patrimonio_immobiliare.replace("{2_years_ago}", isee_两年前年份);
                resultText += `<br><br>* ` + zh.output_dati_catastali;
            }
            if (residenza_selection === "residenza_acquistato_mutuo") {
                resultText += `<br><br>————————————<br><br>` + zh.output_patrimonio_immobiliare.replace("{2_years_ago}", isee_两年前年份);
                resultText += `<br><br>* ` + zh.output_dati_catastali;
                resultText += `<br><br>* ` + zh.output_quota_capitale_residua.replace("{2_years_ago}", isee_两年前年份);
            }

            // 更新结果到页面
            document.getElementById("result").innerHTML = resultText;
        })
        .catch(error => {
            console.error('获取数据时出错:', error);
        });
}
