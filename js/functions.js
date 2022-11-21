let Gvalue; //value containing % or number, connect with slider and input boxes
let userMedalsCount;
let currentSpecificUserID;
let currentSpecificUserMedalsCount;
let xhr = new XMLHttpRequest(); 
xhr.open("GET", `https://osekai.net/api/profiles/get_user.php?id=${nUserID}&min`, true); 
xhr.responseType = 'json'; 
xhr.send(); 
xhr.onload = function() { 
    userMedalsCount = xhr.response.user_achievements.length; 
}


async function osekaiSkillIssue(res, err) {
        
    console.log(`Medals Calculator Error: ${err}\nResponse Status: ${res.statusCode} | ${res.statusMessage}`); //idk why would we need that but ok, also can show user some error in case this function fires

}

function countDecimals(value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}

function GenerateFromPercentage(percentageValue) {

    if(
        percentageValue <= 0
        || Math.ceil(percentageValue) > 100
        || !Number.isFinite(+percentageValue)
    ) return;

    return Math.ceil((medalAmount/100)*percentageValue); //Medals needed for x%, show that after calculation

}

function GenerateFromCount(countValue) {

    let DecimalsNum
    if(countValue.includes(".")) {
        DecimalsNum = countDecimals(countValue);
    } else {
        DecimalsNum = 0
    }
    if(Number.parseInt(DecimalsNum) > 2 || Number.isNaN(+Number.parseInt(DecimalsNum))) return;

    if(
        countValue < 1
        || Math.ceil(Number.parseFloat(countValue)) > Number.parseFloat(medalAmount)
    ) return;

    return ((countValue/medalAmount)*100).toFixed(2); //Percent you'll have after getting x medals, show that after calculation

}

function GenerateFromToolUserCount(countInput) { //gets user medals count and calculates their % after getting x more medals they inputted 

    let medalsAfterAdding = Number.parseInt(userMedalsCount) + Number.parseInt(countInput)
    return ((medalsAfterAdding/medalAmount)*100).toFixed(2);

}

function GenerateFromToolUserPercentage(percentageInput) { //gets user medals percent and calculates how many more medals they need to reach x percent they inputted

    let medalsForInputtedPercent = Math.ceil((medalAmount/100)*percentageInput);
    return (Number.parseInt(medalsForInputtedPercent) - Number.parseInt(userMedalsCount));

}

function GetUserData(userID) {

    let xhr = new XMLHttpRequest(); 
    xhr.open("GET", `https://osekai.net/api/profiles/get_user.php?id=${userID}&min`, true); 
    xhr.responseType = 'json'; 
    xhr.send(); 
    xhr.onload = function() { 
    if(xhr.responseText == "") return;
    currentSpecificUserID = userID;
    currentSpecificUserMedalsCount = xhr.response.user_achievements.length; 
    }

}

function GenerateFromSpecificUserUserCount(specificUserId, countInput) {

    if(currentSpecificUserID !== specificUserId) {
        GetUserData(specificUserId)
    }

    let medalsAfterAdding = Number.parseInt(currentSpecificUserMedalsCount) + Number.parseInt(countInput)
    return ((medalsAfterAdding/medalAmount)*100).toFixed(2);

}

function GenerateFromSpecificUserUserPercentage(specificUserId, percentageInput) {

    if(currentSpecificUserID !== specificUserId) {
        GetUserData(specificUserId)
    }

    let medalsForInputtedPercent = Math.ceil((medalAmount/100)*percentageInput);
    return (Number.parseInt(medalsForInputtedPercent) - Number.parseInt(currentSpecificUserMedalsCount));

}
