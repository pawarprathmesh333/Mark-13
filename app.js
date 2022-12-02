

function reverseStr(str){
    var listStr = str.split('');
    var listStr = listStr.reverse();
    return listStr.join('');
}

function checkPalindrom(str){
    var revStr = reverseStr(str);
    var flag = false;
    if(revStr===str){
        flag= true;
    }
    return flag;
}

function dateNumbertoString(date){
    var day = date.day;
    var month = date.month;
    var year = date.year;
    
    if(day<10){
        day = '0'+date.day;
    }
    else{
        day = date.day.toString();
    }
    if(month<10){
        month = '0'+date.month;
    }
    else{
        month = date.month.toString();
    }
    year = date.year.toString();

    return {day: day,
            month: month,
            year: year};
}

// DDMMYYYY
// MMDDYYYY
// YYYYMMDD
// DDMMYY
// MMDDYY
// YYMMDD

function allDateFormats(numdate){
   var date = dateNumbertoString(numdate);
   var DDMMYYYY = date.day + date.month + date.year;
   var MMDDYYYY = date.month + date.day + date.year;
   var YYYYMMDD = date.year + date.month + date.day;
   var DDMMYY = date.day + date.month + date.year.slice(-2);
   var MMDDYY = date.month + date.day + date.year.slice(-2);
   var YYMMDD = date.year.slice(-2) + date.month + date.day;

   return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD];
}

function checkAllFormats(date){
    var listallDateFormats = allDateFormats(date);
    var isPalindrom = false;

    for(let i=0;i<listallDateFormats.length;i++){
        if(checkPalindrom(listallDateFormats[i])){
            isPalindrom = true;
            break;
        }
    }
    return isPalindrom;
}
function leapyear(year){
    flag = false;
    if(year%400===0){
        flag = true;
    }
    if(year%100===0){
        flag = false;
    }
    if(year%4===0){
        flag=true;
    }
    return flag;
}

function findNextDate(date){
    var arrayMonths = [31,28,31,30,31,30,31,31,30,31,30,31];
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    if(day>arrayMonths[month-1]){
        if(leapyear(year)&&month===2)
        {
            if(day>29){
                day=1;
                month++;
            }
        }
        else{
            day = 1;
            month++;
        }
    }
    if(month>12){
        month=1;
        year++;
    }
    return {
        day : day,
        month : month,
        year : year
    };
}

function findPreviousDate(date){
    var arrayMonths = [31,28,31,30,31,30,31,31,30,31,30,31];
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    if(day < 1){
        if(leapyear(year)&&month===3)
        {
                day=29;
                month--;
        }
        else{
            month--;
            if(month<1){
                month=12;
                year--;
            }
            day = arrayMonths[month-1];
        }
    }

    return {
        day : day,
        month : month,
        year : year
    };
}

function findNextPalindrom(date){
    var count = 1;
    var nextDate = findNextDate(date);
    while(1){
        if(checkAllFormats(nextDate)){
            break;
        }
        nextDate = findNextDate(nextDate);
        count++;
    }

    return [count,nextDate];
}

function findPreviousPalindrom(date){
    var count = 1;
    var prevDate = findPreviousDate(date);
    while(1){
        if(checkAllFormats(prevDate)){
            break;
        }
        prevDate = findPreviousDate(prevDate);
        count++;
    }

    return [count,prevDate];
}

const birthDate = document.querySelector(".birthdate");
const submitButton = document.querySelector(".submit");
const output = document.querySelector(".output");


function clickHandler(){
    var stringDate = birthDate.value.split('-');
    var date = {
        day : Number(stringDate[2]),
        month : Number(stringDate[1]),
        year : Number(stringDate[0])
    };
    
    if(checkAllFormats(date)){
        output.innerText = "Yay! Your birthday is palindrome!";
    }
    else{
        var prevPalindromDate = findPreviousPalindrom(date);
        var nextPalindromDate = findNextPalindrom(date);
        
        var nearestPalindromDate = prevPalindromDate[0]<nextPalindromDate[0] ? prevPalindromDate : nextPalindromDate;
        
        output.innerText = `The nearest palindrome date is ${nearestPalindromDate[1].day}-${nearestPalindromDate[1].month}-${nearestPalindromDate[1].year}, you missed by ${nearestPalindromDate[0]} days.`
    }

}

submitButton.addEventListener("click",clickHandler);