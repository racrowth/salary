const airports = [
    { airportId   : 'RKSI', airportElv  : 23 },
    { airportId   : 'RKSS', airportElv  : 59 },
    { airportId   : 'RKTN', airportElv  : 120 },
    { airportId   : 'RKTU', airportElv  : 192 },
    { airportId   : 'RKPK', airportElv  : 13 },
    { airportId   : 'RKJJ', airportElv  : 48 },
    { airportId   : 'RKNY', airportElv  : 241 },
    { airportId   : 'RKJB', airportElv  : 51 }
] // 공항 리스트, airports 어레이 안에 object를 나열한 dictionary형 데이터

const presetTemp = [10, 0, -10, -20, -30, -40, -50];
// presetTempList로 차트 기준의 temp를 쉽게 입력할 수 있도록 함. 사용자 option임.

for (let i = 0; i < airports.length; i++) {
    document.getElementById('airportList').innerHTML += `<option value="${airports[i].airportId}">${airports[i].airportId}</option>`
}
 // airports dictionary내의 데이터로 airportList의 드롭박스 데이터 HTML에 채워줌


for (let i = 0; i < presetTemp.length; i++) {
    document.getElementById('airportTempList').innerHTML += `<option value="${presetTemp[i]}">${presetTemp[i]}</option>`
}
 // presetTemp object내의 데이터로 presetTemp의 드롭박스 데이터 HTML에 채워줌

function setElevation() {
    let airportSelected = document.getElementById('airportId').value;

    for ( i = 0; i < airports.length; i++) {
        if (airportSelected == airports[i].airportId) {
            document.getElementById('airportAlt').value = airports[i].airportElv
        }
    }
} // airportId에 선택된 공항이 airports dictionary에 존재한다면, 그 공항에 맞는 airportElv 값을 airportAlt에 넣어줌.


document.getElementById('airportId').addEventListener('change', setElevation); 
 // airportId에 change 이벤트 리스너를 붙여주고 setElevation 함수 실행해줌.

let airportTempData =  document.getElementById('airportTemp')

airportTempData.addEventListener('change', (e) => {
    if (airportTempData.value > 10) {
        alert("10도 이하의 값을 입력해주세요!");
        airportTempData.value = "";}
    else if (isNaN(airportTempData.value)) {
        alert("숫자만 입력해주세요!");
        airportTempData.value = "";}    
})

let airportAltData = document.getElementById('airportAlt');

airportAltData.addEventListener('change', (e) => {
    if (isNaN(airportAltData.value)) {
        alert("숫자만 입력해주세요!");
        airportAltData.value = "";}    
})
