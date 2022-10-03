let url = "https://www.cbr-xml-daily.ru/daily_json.js"
let $list = document.querySelector(".list")
let $listBtn = document.querySelector("#list")
let $calcBtn = document.querySelector("#calc")
let $listCurrency = document.querySelector(".listCurrency")
let $calculatorCurrency = document.querySelector(".calculatorCurrency")
let $fromSelect = document.querySelector("#fromSelect")
let $toSelect = document.querySelector("#toSelect")
let $fromImg = document.querySelector("#fromImg")
let $toImg = document.querySelector("#toImg")
let $fromInput = document.querySelector("#fromInput")
let $toInput = document.querySelector("#toInput")


fetch(url)
    .then(resp => resp.json())
    .then(data =>{
        console.log(data)
        let dataa = data.Valute
        Object.keys(dataa).forEach(element => {
            let elem = dataa[element]
            $fromSelect.insertAdjacentHTML('beforeend',`
                <option value="${elem.CharCode}">${elem.CharCode}</option>
            `)
            $toSelect.insertAdjacentHTML('beforeend',`
                <option value="${elem.CharCode}">${elem.CharCode}</option>
            `)
            $list.insertAdjacentHTML('beforeend', `
            <div class="course">
            <img src="https://countryflagsapi.com/svg/${elem.NumCode}">
                <h1>
                    ${elem.CharCode} <br>
                    ${elem.Nominal}
                </h1>
                <h2>${elem.Name}</h2>
                <h1>
                    ${elem.Value} <br>
                    Рублей
                </h1>
            </div>
            `)
        });
        $fromSelect.addEventListener("change", function(){
            let numCode = Object.keys(dataa).find(el => el == fromSelect.value)
            if (numCode != null){
                $fromImg.setAttribute("src", `https://countryflagsapi.com/svg/${dataa[numCode].NumCode}`)
            }
        })
        $toSelect.addEventListener("change", function(){
            let numCode = Object.keys(dataa).find(el => el == toSelect.value)
            if (numCode != null){
                $toImg.setAttribute("src", `https://countryflagsapi.com/svg/${dataa[numCode].NumCode}`)
            }
        })
        $fromInput.addEventListener("input", function(){
            let frNum = dataa[Object.keys(dataa).find(el => el == fromSelect.value)]
            if (frNum == null){frNum = data["AUD"]}
            let toNum = dataa[Object.keys(dataa).find(el => el == toSelect.value)]
            if (toNum == null){toNum = data["AUD"]}
            frS = frNum.Nominal == 100 ? frNum.Value / 100 : frNum.Value
            toS = toNum.Nominal == 100 ? toNum.Value / 100 : toNum.Value
            $toInput.value = $fromInput.value * toS * frS
        })
    })

$listBtn.addEventListener('click', function(){
    $listCurrency.classList.remove('hide')
    $calculatorCurrency.classList.add('hide')
})
$calcBtn.addEventListener('click', function(){
    $listCurrency.classList.add('hide')
    $calculatorCurrency.classList.remove('hide')
})