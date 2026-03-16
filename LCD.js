const stations = [
    ["大　船", "Ōfuna", "おおふな", "01", "OFN", "0"],
    ["本郷台", "Hongōdai", "ほんごうだい", "02", "", "4"],
    ["港南台", "Kōnandai", "こうなんだい", "03", "", "3"],
    ["洋光台", "Yōkōdai", "ようこうだい", "04", "", "3"],
    ["新杉田", "Shin-Sugita", "しんすぎた", "05", "", "3"],
    ["磯　子", "Isogo", "いそご", "06", "", "2"],
    ["根　岸", "Negishi", "ねぎし", "07", "", "3"],
    ["山　手", "Yamate", "やまて", "08", "", "3"],
    ["石川町", "Ishikawachō", "いしかわちょう", "09", "", "2"],
    ["関　内", "Kannai", "かんない", "10", "", "2"],
    ["桜木町", "Sakuragichō", "さくらぎちょう", "11", "", "2"],
    ["横　浜", "Yokohama", "よこはま", "12", "YHM", "3"],
    ["東神奈川", "Higashi-Kanagawa", "ひがしかながわ", "13", "", "3"],
    ["新子安", "Shin-Koyasu", "しんこやす", "14", "", "3"],
    ["鶴　見", "Tsurumi", "つるみ", "15", "", "4"],
    ["川　崎", "Kawasaki", "かわさき", "16", "KWS", "4"],
    ["蒲　田", "Kamata", "かまた", "17", "", "3"],
    ["大　森", "Ōmori", "おおもり", "18", "", "4"],
    ["大井町", "Ōimachi", "おおいまち", "19", "", "3"],
    ["品　川", "Shinagawa", "しながわ", "20", "SGW", "3"],
    ["高輪ゲートウェイ", "Takanawa Gateway", "たかなわげーとうぇい", "21", "TGW", "2"],
    ["田　町", "Tamachi", "たまち", "22", "", "2"],
    ["浜松町", "Hamamatsuchō", "はままつちょう", "23", "HMC", "3"],
    ["新　橋", "Shimbashi", "しんばし", "24", "SMB", "2"],
    ["有楽町", "Yūrakuchō", "ゆうらくちょう", "25", "", "2"],
    ["東　京", "Tōkyō", "とうきょう", "26", "TYO", "2"],
    ["神　田", "Kanda", "かんだ", "27", "KND", "2"],
    ["秋葉原", "Akihabara", "あきはばら", "28", "AKB", "2"],
    ["御徒町", "Okachimachi", "おかちまち", "29", "", "2"],
    ["上　野", "Ueno", "うえの", "30", "UEN", "2"],
    ["鶯　谷", "Uguisudani", "うぐいすだに", "31", "", "2"],
    ["日暮里", "Nippori", "にっぽり", "32", "NPR", "2"],
    ["西日暮里", "Nishi-Nippori", "にしにっぽり", "33", "", "2"],
    ["田　端", "Tabata", "たばた", "34", "", "2"],
    ["上中里", "Kami-Nakazato", "かみなかざと", "35", "", "3"],
    ["王　子", "Ōji", "おうじ", "36", "", "2"],
    ["東十条", "Higashi-Jūjō", "ひがしじゅうじょう", "37", "", "3"],
    ["赤　羽", "Akabane", "あかばね", "38", "ABN", "3"],
    ["川　口", "Kawaguchi", "かわぐち", "39", "", "4"],
    ["西川口", "Nishi-Kawaguchi", "にしかわぐち", "40", "", "3"],
    ["蕨", "Warabi", "わらび", "41", "", "2"],
    ["南浦和", "Minami-Urawa", "みなみうらわ", "42", "", "4"],
    ["浦　和", "Urawa", "うらわ", "43", "URW", "2"],
    ["北浦和", "Kita-Urawa", "きたうらわ", "44", "", "3"],
    ["与　野", "Yono", "よ　の", "45", "", "2"],
    ["さいたま新都心", "Saitama-Shintoshin", "さいたましんとしん", "46", "", "2"],
    ["大　宮", "Ōmiya", "おおみや", "47", "OMY", "3"]
];


/*時計*/
document.addEventListener('DOMContentLoaded', (event) => {
    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('time').textContent = hours + ':' + minutes;
    };
    setInterval(updateTime, 100);
    updateTime();
});


/*うえ*/
var UeLanguage = 1;
let UeInterval = null;
let departureMode = true;
let departureInterval = null;

function applyUeLanguage() {
    // まず全表示
    document.querySelectorAll('.ue_ja, .ue_en, .ue_hi').forEach((el) => el.style.display = 'block');
    // 次に非表示クラスを決めて適用
    let hideClasses = [];
    switch (UeLanguage) {
        case 1:
            hideClasses = ['ue_en', 'ue_hi'];
            break;
        case 2:
            hideClasses = ['ue_ja', 'ue_hi'];
            break;
        case 3:
            hideClasses = ['ue_ja', 'ue_en'];
            break;
    }
    hideClasses.forEach((className) => {
        document.querySelectorAll('.' + className).forEach((element) => {
            element.style.display = 'none';
        });
    });
}

function startUeCycle() {
    if (UeInterval) clearInterval(UeInterval);
    UeInterval = setInterval(() => {
        UeLanguage = UeLanguage % 3 + 1;
        applyUeLanguage();
    }, 3000);
}

function enterDepartureMode() {
    departureMode = true;
    // next と for を非表示、departure を表示
    const nextEl = document.getElementById('next');
    const forEl = document.getElementById('for');
    const depEl = document.getElementById('departure');
    if (nextEl) nextEl.style.display = 'none';
    if (forEl) forEl.style.display = 'none';
    if (depEl) depEl.style.display = 'block';

    // ue_hi は常に非表示、ue_ja と ue_en を交互に表示
    document.querySelectorAll('.ue_hi').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.ue_ja').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.ue_en').forEach(el => el.style.display = 'none');

    // 停止しておく既存のUeInterval
    if (UeInterval) { clearInterval(UeInterval); UeInterval = null; }

    // 初期表示を埋める（departure モード中でも所要時間を表示するため）
    // userSettings に始発があればそこを表示先頭にする
    const startIdx = (window.userSettings && typeof window.userSettings.startIndex === 'number') ? window.userSettings.startIndex : 0;
    currentIndex = startIdx;
    updateDisplay(0);
    textSize();
    syubetuColor();

    // 開始: 3秒ごとに ue_ja / ue_en を切り替え
    departureInterval = setInterval(() => {
        const jaVisible = document.querySelectorAll('.ue_ja')[0].style.display !== 'none';
        document.querySelectorAll('.ue_ja').forEach(el => el.style.display = jaVisible ? 'none' : 'block');
        document.querySelectorAll('.ue_en').forEach(el => el.style.display = jaVisible ? 'block' : 'none');
    }, 3000);
}

function exitDepartureMode() {
    departureMode = false;
    if (departureInterval) { clearInterval(departureInterval); departureInterval = null; }
    // 表示を元に戻す
    const nextEl = document.getElementById('next');
    const forEl = document.getElementById('for');
    const depEl = document.getElementById('departure');
    if (nextEl) nextEl.style.display = 'block';
    if (forEl) forEl.style.display = 'block';
    if (depEl) depEl.style.display = 'none';

    // 従来のUeLanguageサイクルを再開（初期は 1）
    UeLanguage = 1;
    applyUeLanguage();
    startUeCycle();
}

// --- 設定パネル初期化と適用処理 ---
function setupSettingsPanel() {
    const selStart = document.getElementById('select-start');
    const selEnd = document.getElementById('select-end');
    const selCar = document.getElementById('select-car');
    const selType = document.getElementById('select-type');
    // stations 配列からオプションを作成
    if (selStart && selEnd) {
        stations.forEach((s, idx) => {
            const optJa = document.createElement('option');
            optJa.value = idx;
            optJa.textContent = s[0];
            selStart.appendChild(optJa.cloneNode(true));
            selEnd.appendChild(optJa);
        });
    }
    // car 1..15
    if (selCar) {
        for (let i = 1; i <= 15; i++) {
            const o = document.createElement('option');
            o.value = i;
            o.textContent = String(i);
            selCar.appendChild(o);
        }
    }

    const applyBtn = document.getElementById('applySettings');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const typeVal = selType ? selType.value : 'local';
            const startIdx = selStart ? parseInt(selStart.value, 10) : 0;
            const endIdx = selEnd ? parseInt(selEnd.value, 10) : 0;
            const carNo = selCar ? selCar.value : '1';

            // 選択値は内部に保存するのみ（表示の自動更新は行わない）
            window.userSettings = {
                type: typeVal,
                startIndex: startIdx,
                endIndex: endIdx,
                carNumber: carNo
            };

            // UI に即時反映する
            try {
                setType(typeVal);
                setDestination(endIdx);
                setCarNumber(carNo);
                // 始発を左端に表示するため currentIndex を設定して再描画
                currentIndex = startIdx;
                updateDisplay(0);
                textSize();
                syubetuColor();
            } catch (e) {
                console.error('applySettings error', e);
            }

            // 設定パネルを非表示にする
            const panel = document.getElementById('settings-panel');
            if (panel) panel.style.display = 'none';
        });
    }
}

//文字数による大きさの変更
function textSize() {
    var p_ja = document.getElementById('sn_ja');
    var p_en = document.getElementById('sn_en');
    var p_hi = document.getElementById('sn_hi');

    if (p_hi.textContent.length == 7) {
        p_hi.style.transform = "scale(0.92,1) translate(-2%,-50%)";
        p_hi.style.letterSpacing = "-0.08em";
    } else if (p_hi.textContent.length == 9) {
        p_hi.style.transform = "scale(0.78,1) translate(-14%,-50%)";
        p_hi.style.letterSpacing = "-0.14em";
    } else if (p_hi.textContent.length == 10) {
        p_hi.style.transform = "scale(0.68,1) translate(-22%,-50%)";
        p_hi.style.letterSpacing = "-0.12em";
    } else {
        p_hi.style.transform = null;
        p_hi.style.letterSpacing = null;
    }

    if (p_ja.textContent.length == 8) {
        p_ja.style.transform = "scale(0.78,1) translate(-12%,-50%)";
        p_ja.style.letterSpacing = "-0.05em";
    } else if (p_ja.textContent.length == 9) {
        p_ja.style.transform = "scale(0.78,1) translate(-14%,-50%)";
        p_ja.style.letterSpacing = "-0.14em";
    } else if (p_ja.textContent.length == 7) {
        p_ja.style.transform = "scale(0.88,1) translate(-7%,-50%)";
        p_ja.style.letterSpacing = "-0.0em";
    } else if (p_ja.innerText == "石川町") {
        p_ja.innerHTML = '<div style="font-size: 0.9em; transform: scale(1,0.95) translateY(28%); line-height:180%;">石川町<p style="font-size: 0.7em;">（元町・中華街）</p></div>';
        p_ja.style.transform = "scale(1,0.8) translate(-1%,-90%)";
    } else {
        p_ja.style.transform = null;
        p_ja.style.letterSpacing = null;
    }

    if (p_en.textContent.length == 12) {
        if (p_en.innerText == "Higashi-Jūjō") {
            p_en.style.transform = null;
        } else {
            p_en.style.transform = "scale(0.92,1) translate(-4%,-50%)";
        }
    } else if (p_en.innerText == "Ishikawachō") {
        p_en.innerHTML = '<div style="font-size: 0.8em; transform: translateY(28%); line-height:150%;">Ishikawachō<p style="font-size: 0.7em;">（Motomachi·China Town）</p></div>';
        p_en.style.transform = "translate(-3%,-78%)";
        p_en.style.letterSpacing = "-0.02em";
    } else if (p_en.textContent.length == 15) {
        p_en.style.transform = "scale(0.88,1) translate(-6%,-50%)";
    } else if (p_en.textContent.length == 16) {
        if (p_en.innerText == "Takanawa Gateway") {
            p_en.style.transform = "scale(0.74,1) translate(-16%,-50%)";
        } else {
            p_en.style.transform = "scale(0.78,1) translate(-14%,-50%)";
        }
    } else if (p_en.textContent.length == 18) {
        p_en.style.transform = "scale(0.76,1) translate(-16%,-50%)";
    } else if (p_en.innerText == "Kami-Nakazato") {
        p_en.style.transform = "scale(0.95,1) translate(-2%,-50%)";
    } else {
        p_en.style.transform = null;
        p_en.style.letterSpacing = null;
    }
};

function syubetuColor() {
    // syubetu の色は .syubetu-omote の文字色に反映する
    const settings = window.userSettings || {};
    const typeVal = settings.type || 'local';
    const colorMap = { local: '#00bae8', rapid: '#ff008c', commuter: '#00bae8', special: '#00b52d' };
    const color = colorMap[typeVal] || '#00bae8';
    // .syubetu-omote を選択して文字色をセット
    document.querySelectorAll('#syubetu .syubetu-omote, #syubetu-en .syubetu-omote').forEach(el => {
        el.style.color = color;
    });
};

// 種別の表示と色を変更する
function setType(typeVal) {
    const jpMap = {
        local: '各駅<br>停車',
        rapid: '快速',
        commuter: '通勤<br>快速',
        special: '特別<br>快速'
    };
    const enMap = {
        local: 'Local',
        rapid: 'Rapid',
        commuter: 'Commuter<br>Rapid',
        special: 'Special<br>Rapid'
    };
    const colorMap = { local: '#00bae8', rapid: '#ff00d4', commuter: '#a700bd', special: '#00b52d' };

    // 日本語・ひらがな領域
    document.querySelectorAll('#syubetu .ue_ja, #syubetu .ue_hi').forEach((div) => {
        const ura = div.querySelector('.syubetu-ura');
        const omote = div.querySelector('.syubetu-omote');
        if (ura) ura.innerHTML = jpMap[typeVal] || jpMap.local;
        if (omote) omote.innerHTML = jpMap[typeVal] || jpMap.local;
    });

    // 英語領域
    const enDiv = document.getElementById('syubetu-en');
    if (enDiv) {
        const ura = enDiv.querySelector('.syubetu-ura');
        const omote = enDiv.querySelector('.syubetu-omote');
        if (ura) ura.innerHTML = enMap[typeVal] || enMap.local;
        if (omote) omote.innerHTML = enMap[typeVal] || enMap.local;
    }

    // 種別色は .syubetu-omote の文字色に設定
    const color = colorMap[typeVal] || colorMap.local;
    document.querySelectorAll('#syubetu .syubetu-omote, #syubetu-en .syubetu-omote').forEach(el => {
        el.style.color = color;
    });
}

// 行先（終着駅）を表示に反映する
function setDestination(endIdx) {
    if (typeof endIdx !== 'number' || endIdx < 0 || endIdx >= stations.length) return;
    const s = stations[endIdx];
    const ja = s[0];
    const en = s[1];
    const hi = s[2];

    const snJa = document.getElementById('sn_ja');
    const snEn = document.getElementById('sn_en');
    const snHi = document.getElementById('sn_hi');
    if (snJa) snJa.textContent = ja;
    if (snEn) snEn.textContent = en;
    if (snHi) snHi.textContent = hi;

    // for 部分のテキストを更新
    const forJa = document.querySelector('#for .ue_ja');
    const forEn = document.querySelector('#for .ue_en');
    const forHi = document.querySelector('#for .ue_hi');
    // 日本語名に全角空白（U+3000）が含まれる場合は除去して「駅名 + 半角空白 + 行」とする
    const jaFor = ja ? ja.replace(/\u3000/g, '') : ja;
    if (forJa) forJa.textContent = jaFor + ' ' + '行';
    if (forEn) forEn.textContent = 'for ' + en;
    if (forHi) forHi.textContent = jaFor + ' ' + '行';

    // 駅ナンバリング（3文字コードと番号）を更新
    const threeCodeEl = document.getElementById('three-code-text');
    const threeCodeContainer = document.getElementById('three-code');
    const numbering3El = document.getElementById('numbering3');
    if (threeCodeEl) threeCodeEl.textContent = s[4] ? s[4] : 'NA';
    if (numbering3El) numbering3El.textContent = s[3] ? s[3] : '';
    if (threeCodeContainer) threeCodeContainer.style.backgroundColor = s[4] ? 'black' : 'white';
}

// 号車をセット
function setCarNumber(carNo) {
    const el = document.getElementById('car-number');
    if (el) el.textContent = String(carNo);
}


//８駅表示の日英切り替え
/*document.addEventListener('DOMContentLoaded', (event) => {
    setInterval(() => {
        let ja8 = document.getElementById('stations_ja');
        let en8 = document.getElementById('stations_en');
        if (ja8.style.display !== 'none') {
            ja8.style.display = 'none';
            en8.style.display = 'block';
        } else {
            ja8.style.display = 'block';
            en8.style.display = 'none';
        }
    }, 12000);
});
*/
function initialDisplay() {

};

let currentIndex = 0;

function updateDisplay(NextOrPrevious) {
    // NextOrPrevious がイベントオブジェクトで渡される場合があるため整数に正規化
    let delta = 0;
    if (typeof NextOrPrevious === 'number') {
        delta = NextOrPrevious;
    } else if (NextOrPrevious && typeof NextOrPrevious === 'object') {
        // クリックや他イベントで呼ばれた場合は次へ進む
        delta = 1;
    } else {
        delta = 0;
    }
    let nextIndex = currentIndex + delta;

    // 終着駅を取得（userSettings があれば優先）
    const endIdx = (window.userSettings && typeof window.userSettings.endIndex === 'number') ? window.userSettings.endIndex : (stations.length - 1);

    // nextIndex を終着でクランプ（終着より先へ進めない）
    if (nextIndex > endIdx) nextIndex = endIdx;
    if (nextIndex < 0) nextIndex = 0;

    // nextIndex が配列範囲外（安全確保）なら何もしない
    if (nextIndex < 0 || nextIndex >= stations.length) return;

    // 次駅が最後駅（終点）かどうか判定して表示を切り替える
    const nextEl = document.getElementById('next');
    const syEl = document.getElementById('syubetu');
    const forEl = document.getElementById('for');
    if (nextIndex === endIdx) {
        // 次は終点 を表示し、syubetu と for を非表示にする
        if (nextEl) {
            const ja = nextEl.querySelector('.ue_ja');
            const hi = nextEl.querySelector('.ue_hi');
            if (ja) ja.textContent = '次は終点';
            if (hi) hi.textContent = 'つぎは終点';
        }
        if (syEl) syEl.style.display = 'none';
        if (forEl) forEl.style.display = 'none';
    } else {
        // 通常表示に戻す
        if (nextEl) {
            const ja = nextEl.querySelector('.ue_ja');
            const en = nextEl.querySelector('.ue_en');
            const hi = nextEl.querySelector('.ue_hi');
            if (ja) ja.textContent = '次は';
            if (en) en.textContent = 'Next';
            if (hi) hi.textContent = 'つぎは';
        }
        // departureMode の場合は syubetu 表示、for 非表示。
        // 通常モードでは両方表示。
        if (departureMode) {
            if (syEl) syEl.style.display = 'block';
            if (forEl) forEl.style.display = 'none';
        } else {
            if (syEl) syEl.style.display = 'block';
            if (forEl) forEl.style.display = 'block';
        }
    }

    // 表示用の基準インデックスは末尾近くで固定したい
    const minNext = 1; // 表示は nextIndex が1以上で先頭(=current)を含められるようにする
    // 終着駅が userSettings にあれば、それを右端に固定するための最大 displayBase を算出
    const maxNext = Math.max(1, endIdx - 6);
    // displayBase は表示を決める基準。
    // 通常は nextIndex を2番目スロットに表示するため displayBase = nextIndex
    let displayBase = Math.min(Math.max(nextIndex, minNext), maxNext);
    // ただし departureMode 開始直後で currentIndex が userSettings.startIndex の場合、
    // 始発を左端(スロット0)に表示したいので displayBase = nextIndex + 1 とする
    const cfgStart = (window.userSettings && typeof window.userSettings.startIndex === 'number') ? window.userSettings.startIndex : null;
    if (departureMode && cfgStart !== null && currentIndex === cfgStart) {
        displayBase = Math.min(Math.max(nextIndex + 1, minNext), maxNext);
    }

    // Update top SNS display. If in departureMode and an endIndex is set, keep SNS showing the end station.
    const snsIndex = (departureMode && window.userSettings && typeof window.userSettings.endIndex === 'number') ? window.userSettings.endIndex : nextIndex;
    const [snsKanji, snsEnglish, snsHiragana, snsNumber, snsCode] = stations[snsIndex];
    const snJa = document.getElementById('sn_ja');
    const snEn = document.getElementById('sn_en');
    const snHi = document.getElementById('sn_hi');
    if (snJa) snJa.textContent = snsKanji;
    if (snEn) snEn.textContent = snsEnglish;
    if (snHi) snHi.textContent = snsHiragana;

    const numbering3El = document.getElementById("numbering3");
    const threeCodeTextEl = document.getElementById("three-code-text");
    if (numbering3El) numbering3El.textContent = snsNumber;
    if (threeCodeTextEl) threeCodeTextEl.textContent = snsCode ? snsCode : "NA";

    const threeCodeElement = document.getElementById("three-code");
    if (threeCodeElement) threeCodeElement.style.backgroundColor = snsCode ? "black" : "white";


    const times = document.getElementById("stick").querySelectorAll("p");
    const jaStations = document.getElementById("stations_ja").querySelectorAll("p");
    const enStations = document.getElementById("stations_en").querySelectorAll("p");
    const numberings = document.getElementById("numberings").querySelectorAll("p");
    let over8 = 1;
    const displayedIndices = [];
        // Update stations_ja (常に実行して表示インデックスを埋める)
        // ただし始発->終着が7駅以下の場合は右詰め表示して前方スロットを非表示にする
        const startIdx = (window.userSettings && typeof window.userSettings.startIndex === 'number') ? window.userSettings.startIndex : currentIndex;
        const smallCount = (endIdx - startIdx + 1) <= 7;
        for (let i = 0; i < 8; i++) {
            let index;
            if (smallCount) {
                // 右詰め: 前方の (8 - count) スロットは空にする
                const count = endIdx - startIdx + 1;
                if (i < 8 - count) {
                    // 見た目を保持するために完全に消さず、全角空白や透明ナンバリングを設定する
                    displayedIndices.push(NaN);
                    // 駅名は全角空白で埋める
                    jaStations[i].textContent = '\u3000';
                    enStations[i].textContent = '\u3000';
                    // ナンバリングは JK-00 にして透明化
                    numberings[i].textContent = 'JK-00';
                    numberings[i].style.color = 'transparent';
                    // 所要時間も全角空白にし、背景は不可視風にする
                    times[i].textContent = '\u3000';
                    times[i].style.backgroundColor = '#b1b1b1';
                    // クリアID/データ属性
                    jaStations[i].id = "";
                    numberings[i].id = "";
                    times[i].id = "";
                    jaStations[i].dataset.index = undefined;
                    numberings[i].dataset.index = undefined;
                    times[i].dataset.index = undefined;
                    continue;
                } else {
                    index = startIdx + (i - (8 - count));
                    // ensure visible
                    jaStations[i].style.display = '';
                    enStations[i].style.display = '';
                    numberings[i].style.display = '';
                    times[i].style.display = '';
                    // リセット（透明化されている可能性があるため）
                    numberings[i].style.color = '';
                    times[i].style.backgroundColor = '';
                }
            } else {
                index = displayBase - 1 + i; // 表示は displayBase の1つ前（現在地表示開始基準）を先頭にする
                // ensure visible
                jaStations[i].style.display = '';
                enStations[i].style.display = '';
                numberings[i].style.display = '';
                times[i].style.display = '';
            }
            displayedIndices.push(index);
            if (index < 0 || index >= stations.length) {
                // 範囲外ならセルをクリア
                jaStations[i].textContent = "";
                enStations[i].textContent = "";
                numberings[i].textContent = "";
                times[i].textContent = "";
                jaStations[i].id = "";
                numberings[i].id = "";
                times[i].id = "";
                jaStations[i].dataset.index = undefined;
                numberings[i].dataset.index = undefined;
                times[i].dataset.index = undefined;
                continue;
            }
            const [kanji, english, hi, number, three_letter, time] = stations[index];

            // "さいたま新都心"の場合に"<br>"を挿入するなど
            if (kanji === "さいたま新都心") {
                jaStations[i].innerHTML = "さいたま<br>新都心";
                jaStations[i].style.writingMode = "vertical-rl";
                jaStations[i].style.margin = "0 4.7vw 0 -1.9vw";
            } else if (kanji === "高輪ゲートウェイ") {
                jaStations[i].innerHTML = '高　輪<div style="transform: scale(1,0.65) translateY(28%);">ゲートウェイ</div>';
                jaStations[i].style.writingMode = "vertical-rl";
                jaStations[i].style.margin = i !== 0 ? "0 4.7vw 0 -1.9vw" : "0 5.1vw 0 8.3vw";
            } else if (kanji === "石川町") {
                jaStations[i].innerHTML = '石川町<div style="font-size: 0.8em; transform: scale(1,0.7) translateY(28%);">（元町・中華街）</div>';
                jaStations[i].style.writingMode = "vertical-rl";
                jaStations[i].style.margin = i !== 0 ? "0 4.7vw 0 -1.9vw" : "0 5.1vw 0 8.3vw";
            } else if (kanji === "蕨") {
                jaStations[i].innerHTML = "蕨&emsp;";
            } else {
                jaStations[i].textContent = kanji;
                jaStations[i].style.writingMode = null;
                jaStations[i].style.margin = null;
            }

            enStations[i].textContent = english;
            numberings[i].textContent = "JK-" + number;

            jaStations[i].id = number;
            // 各要素に実際のステーション配列インデックスをデータ属性で保存
            jaStations[i].dataset.index = index;
            numberings[i].dataset.index = index;
            times[i].dataset.index = index;
            numberings[i].id = (parseFloat(number) + 0.2).toString();
            times[i].id = (parseFloat(number) + 0.5).toString();
        }
        over8 = 0;

    // 時刻表示は以下でavailable/unavailableクラスを割り当てた後に再取得して更新する


    // すべての<p>要素を取得
    const ALLpElements = document.querySelectorAll("#sita p");
    ALLpElements.forEach((p) => {
        const dataIndex = p.dataset.index;
        const stationIndex = dataIndex !== undefined ? parseInt(dataIndex, 10) : NaN;
        if (isNaN(stationIndex)) {
            // データ属性が無い要素は表示外セルとして扱う
            p.style.color = "#a4a4a4";
            p.classList.remove("available");
            p.classList.add("unavailable");
        } else if (stationIndex <= currentIndex) {
            // 現在位置以前の駅は unavailable
            p.style.color = "#a4a4a4";
            p.classList.remove("available");
            p.classList.add("unavailable");
        } else {
            p.style.color = "black";
            p.classList.remove("unavailable");
            p.classList.add("available");
        }
    });

    // departure モードでは表示先頭（始発駅）を強制的に黒にする
    if (typeof departureMode !== 'undefined' && departureMode) {
        try {
            // 始発のインデックスを取得（設定があればそれを優先）
            const cfgStart = (window.userSettings && typeof window.userSettings.startIndex === 'number') ? window.userSettings.startIndex : currentIndex;
            // displayedIndices 配列から始発が表示されているスロットを探す
            let startSlot = -1;
            for (let i = 0; i < displayedIndices.length; i++) {
                if (displayedIndices[i] === cfgStart) { startSlot = i; break; }
            }
            // 見つからなければフォールバックで先頭スロットを使う
            if (startSlot === -1) startSlot = 0;

            if (typeof jaStations !== 'undefined' && jaStations[startSlot]) {
                jaStations[startSlot].style.color = 'black';
                jaStations[startSlot].classList.remove('unavailable');
                jaStations[startSlot].classList.add('available');
            }
            if (typeof numberings !== 'undefined' && numberings[startSlot]) {
                numberings[startSlot].style.color = 'black';
                numberings[startSlot].classList.remove('unavailable');
                numberings[startSlot].classList.add('available');
            }
            if (typeof times !== 'undefined' && times[startSlot]) {
                times[startSlot].style.backgroundColor = 'white';
                times[startSlot].style.color = '';
            }
        } catch (e) {
            // ignore
        }
    }

    // available クラス割当のあとで、全8スロットを基準に時刻を計算してセットする
    // 所要時間の累積開始インデックスはモードで異なる
    // - departureモード: nextIndex+1 （現在地から次駅への所要時間）
    // - 通常モード: nextIndex （次駅自体を含めて表示するため以前の挙動を維持）
    const sumStart = (departureMode) ? (nextIndex + 1) : nextIndex;
    for (let i = 0; i < times.length; i++) {
        const dispIndex = displayedIndices[i];
        let cumulativeTime = 0;
        // dispIndex が累積開始未満（現在地以前）または範囲外なら空表示
        if (Number.isFinite(dispIndex) && dispIndex >= sumStart && dispIndex < stations.length) {
            for (let k = sumStart; k <= dispIndex; k++) {
                if (k < 0 || k >= stations.length) continue;
                const travelTime = parseInt(stations[k][5], 10);
                if (!isNaN(travelTime)) cumulativeTime += travelTime;
            }
            times[i].textContent = cumulativeTime;
            times[i].style.backgroundColor = "white";
        } else {
            times[i].textContent = "";
            times[i].style.backgroundColor = "#b1b1b1";
        }
    }

    // 前方を全角空白で埋める処理を行ったスロットについては、
    // ALLpElements による色設定で上書きされるためここで再度透明化する。
    for (let i = 0; i < displayedIndices.length; i++) {
        if (!Number.isFinite(displayedIndices[i])) {
            // ナンバリングを JK-00 にして透明化
            if (numberings[i]) {
                numberings[i].textContent = 'JK-00';
                numberings[i].style.color = 'transparent';
            }
            // 所要時間のテキストも透明にする（背景は薄グレーのまま）
            if (times[i]) {
                times[i].textContent = '\u3000';
                times[i].style.color = 'transparent';
                times[i].style.backgroundColor = 'transparent';
            }
            // 駅名も全角空白で見た目を保つ
            if (jaStations[i]) jaStations[i].textContent = '\u3000';
            if (enStations[i]) enStations[i].textContent = '\u3000';
        }
    }

    // 大宮(終点)が表示領域に含まれる場合、右端の三角（#stick::after）を非表示にする
    const stickEl = document.getElementById('stick');
    if (stickEl) {
        const targetIndex = (window.userSettings && typeof window.userSettings.endIndex === 'number') ? window.userSettings.endIndex : (stations.length - 1);
        if (displayedIndices.includes(targetIndex)) {
            if (targetIndex === stations.length - 1) {
                // 終点が大宮（最後）なら矢印を非表示
                stickEl.classList.add('no-arrow');
                stickEl.classList.remove('triangle-muted');
            } else {
                // 終点が大宮以外で右端固定なら矢印を薄グレー表示
                stickEl.classList.remove('no-arrow');
                stickEl.classList.add('triangle-muted');
            }
        } else {
            // 通常状態
            stickEl.classList.remove('no-arrow');
            stickEl.classList.remove('triangle-muted');
        }
    }

    currentIndex = nextIndex;
};

// デフォルトは departure モードで開始
document.addEventListener("DOMContentLoaded", () => {
    setupSettingsPanel();
    enterDepartureMode();
});

// 進退: クリックは departureMode 中は無視
document.addEventListener("click", (e) => {
    if (!departureMode) updateDisplay(e);
});
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        if (departureMode) {
            exitDepartureMode();
            updateDisplay(1);
            textSize();
            syubetuColor();
        } else {
            updateDisplay(1);
            textSize();
        }
    }
});