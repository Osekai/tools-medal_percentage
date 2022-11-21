let Gvalue; //value containing % or number, connect with slider and input boxes

async function osekaiSkillIssue(res, err) {
        
    console.log(`Medals Calculator Error: ${err}\nResponse Status: ${res.statusCode} | ${res.statusMessage}`); //idk why would we need that but ok, also can show user some error in case this function fires

}

function countDecimals(value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}

function GenerateFromPercentage(percentageValue) {
    
    let DecimalsNum
    if(percentageValue.includes(".")) {
        DecimalsNum = countDecimals(percentageValue);
    } else {
        DecimalsNum = 0
    }
    if(Number.parseInt(DecimalsNum) > 2 || Number.isNaN(+Number.parseInt(DecimalsNum))) return;

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
