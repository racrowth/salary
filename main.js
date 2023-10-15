// ICAO Cold Temperature Error Table
const coldTempErrTable = {
    'scale'  : [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 3000, 4000, 5000],
    '10'     : [ 10,  10,  10,  10,  20,  20,  20,  20,   20,   30,   40,   60,   80,   90],
    '0'      : [ 20,  20,  30,  30,  40,  40,  50,  50,   60,   90,  120,  170,  230,  280],
    '-10'    : [ 20,  30,  40,  50,  60,  70,  80,  90,  100,  150,  200,  290,  390,  490],
    '-20'    : [ 30,  50,  60,  70,  90, 100, 120, 130,  140,  210,  280,  420,  570,  710],
    '-30'    : [ 40,  60,  80, 100, 120, 140, 150, 170,  190,  280,  380,  570,  760,  950],
    '-40'    : [ 50,  80, 100, 120, 150, 170, 190, 220,  240,  360,  480,  720,  970, 1210],
    '-50'    : [ 60,  90, 120, 150, 180, 210, 240, 270,  300,  450,  590,  890, 1190, 1500]
};

let trueAlt;
let altArray = []; // HAA분해고도 어레이
let correctedAltArray = [];
let corrValue;
let corrections = [];
let selectedTempRange;
let totalCorrection = 0;
let correctedAlt = 0;

let inputTempCorr;


function 진고도계산기() {
    let 첫고도 = document.getElementById("firstAlt").value;
    let 공항고도 = document.getElementById("airportAlt").value;

    trueAlt = 첫고도 - 공항고도;
}


// 고도를 입력을 하고
//
// 입력 고도가 1000보다 작으면,
// altEnd=입력고도 선언 및 할당 후 altArray에 push
//
// 입력 고도가 1000보다 크면, 
// scale어레이의 13번-9번 순서로 대입하여 alt1=대입고도, alt1Remain=입력고도-대입고도 선언및 할당하고,
// alt1을 altArray에 push

// 1000보다 컸을경우, 하위 if문으로 alt1Remain이 또 1000보다 큰지 확인 후 반복

function HAA분해기() { // Height Above Airport
    if ( trueAlt <= 1000 ) {
        altArray.push(trueAlt);
        return altArray;
    }
    else {
        for ( let i = 0; i < 6; i++) {
            let calcIndex1 = 13 - i;
            
            if ( trueAlt >= coldTempErrTable.scale[calcIndex1] ) {
                let alt1 = coldTempErrTable.scale[calcIndex1];
                let alt1Remain = trueAlt - alt1;
                
                altArray.push(alt1);

                if ( alt1Remain <= 1000 ) {
                    altArray.push(alt1Remain);
                    return altArray; // alt1Remain이 1000보다 작으면 어레이 마지막에 push후 어레이로 return
                }
                else {
                    for ( let j = 0; j < 6; j++ ) {
                        let calcIndex2 = 13 - j;

                        if ( alt1Remain >= coldTempErrTable.scale[calcIndex2] ) {
                            let alt2 = coldTempErrTable.scale[calcIndex2];
                            let alt2Remain = alt1Remain - alt2;

                            altArray.push(alt2);

                            if ( alt2Remain <= 1000 ) {
                                altArray.push(alt2Remain);
                                return altArray;
                            }
                            else {
                                for ( let k = 0; k < 6; k++ ) {
                                    let calcIndex3 = 13 - k;

                                    if ( alt2Remain >= coldTempErrTable.scale[calcIndex3] ) {
                                        let alt3 = coldTempErrTable.scale[calcIndex3];
                                        let alt3Remain = alt2Remain - alt3;

                                        altArray.push(alt3);
                                        altArray.push(alt3Remain);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
 return altArray;
}

function 수정값계산기(a) {
    if (a == 0) {
        return 0;
    } else if (a > 0 && a <= 200){
        return 200;
    } else if (a > 200 && a <= 300){
        return 300;
    } else if (a > 300 && a <= 400){
        return 400;
    } else if (a > 400 && a <= 500){
        return 500;
    } else if (a > 500 && a <= 600){
        return 600;
    } else if (a > 600 && a <= 700){
        return 700;
    } else if (a > 700 && a <= 800){
        return 800;
    } else if (a > 800 && a <= 900){
        return 900;
    } else if (a > 900 && a <= 1000){
        return 1000;
    } else if (a > 1000 && a <= 1500){
        return 1500;
    } else if (a > 1500 && a <= 2000){
        return 2000;
    } else if (a > 2000 && a <= 3000){
        return 3000;
    } else if (a > 3000 && a <= 4000){
        return 4000;
    } else if (a > 4000 && a <= 5000){
        return 5000;}
}


function 수정값적용기() {
    let lastValue = altArray[altArray.length -1]    // altArray에서 마지막 값을 변수에 저장
    let correctedLastValue = 수정값계산기(lastValue);   // 마지막 값만 수정값 계산하여 변수에 저장

    correctedAltArray = [...altArray]
    correctedAltArray[correctedAltArray.length -1] = correctedLastValue;    // altArray를 복사하고, 마지막값을 수정값계산된 값으로 바꿔줌

    return correctedAltArray;  // 마지막값 바뀐 어레이 return
}


function 온도값보정기() {
    let inputTemp = document.getElementById('airportTemp').value;

    if ( inputTemp == 10 ){ inputTempCorr = 10 }
    else if (inputTemp >= 0 && inputTemp < 10){ inputTempCorr = 0 }
    else if (inputTemp >= -10 && inputTemp < 0){ inputTempCorr = -10 }
    else if (inputTemp >= -20 && inputTemp < -10){ inputTempCorr = -20 }
    else if (inputTemp >= -30 && inputTemp < -20){ inputTempCorr = -30 }
    else if (inputTemp >= -40 && inputTemp < -30){ inputTempCorr = -40 }
    else if (inputTemp >= -50 && inputTemp < -40){ inputTempCorr = -50 }

}



// function 온도범위어레이확인() {
//     let selectedTemp = document.getElementById("airportTemp").value;    // 입력한 온도값을 변수에 저장
    
//     for (let i = 0; i < tempRange.length; i++) {
//         if ( selectedTemp = tempRange[i] ) {
//             selectedTempRange = tempRange[i];
//             return selectedTempRange;
//         }
//     }   // 입력한 온도값에 맞는 온도범위어레이를 찾아 selectedTempRange에 저장
// }

// function 보정값계산기() {
//     for (let i = 0; i < correctedAltArray.length; i++) {
//         for (let j = 0; j < selectedTempRange.length; j++) {
//             if (correctedAltArray[i] = scale[j]) {
//                 let correctionValue = selectedTempRange[j];
//                 corrections.push(correctionValue);
//             }
//         }        
//     }   // 수정값적용된 어레이의 각 값을 scale어레이의 값과 비교하여 어레이값 순서를 도출
//         // 도출된 순서를 온도범위어레이에서 적용하여 보정값을 산출
//         // 산출된 보정값을 correction 어레이에 push
// }




function 보정값계산기() {

    for (let i = 0; i < correctedAltArray.length; i++) {
        for (let j = 0; j < coldTempErrTable.scale.length ; j++) {
            if (correctedAltArray[i] == coldTempErrTable.scale[j]) {
                corrValue = coldTempErrTable[inputTempCorr][j]
                corrections.push(corrValue);
                // corrections.push(coldTempErrTable[inputTempCorr][j]) // 요기서 에러나네 확인!
            }
        }
    }
}

function 보정값합치기() {
    totalCorrection = corrections.reduce((acc, currentValue) => acc + currentValue, 0);

    return totalCorrection;
}
    
function 어레이리셋() {
    altArray = [];
    correctedAltArray = [];
    corrections = [];
    totalCorrection = [];
}

function 최종값계산() {
    let 입력값 = document.getElementById("firstAlt").value
    correctedAlt = parseFloat(입력값) + parseFloat(totalCorrection);
}

document.getElementById('altCalc').addEventListener("click", function() {
    어레이리셋()
    진고도계산기()
    HAA분해기()
    수정값적용기()
    온도값보정기()
    보정값계산기()
    보정값합치기()
    최종값계산()

    let finalValue = document.getElementById('calculation');
    
    finalValue.innerHTML += `진고도 : ${trueAlt}</br>`;
    finalValue.innerHTML += `분해된 어레이 : ${altArray}</br>`;
    finalValue.innerHTML += `보정된 어레이 : ${correctedAltArray}</br>`;
    finalValue.innerHTML += `수정된 온도값 : ${inputTempCorr}</br>`;
    finalValue.innerHTML += `보정값 어레이 : ${corrections}</br>`;
    finalValue.innerHTML += `보정값 : ${totalCorrection}</br>`;
    finalValue.innerHTML += `보정된 최종 값 : ${correctedAlt}</br>`;
})