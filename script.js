//JSON Blob representing API call
var jsonVar = [
    {
        "id":1,
        "name":"John Smith",
        "position":"Server",
        "applied":"03/15/16",
        "experience":2,
        "availability":{
          "M":2,
          "T":2,
          "W":1,
              "Th":2,
              "F":1,
              "S":0,
              "Su":0
           },
           "questions":[
              {
                 "text":"Have you ever been convicted of a felony?",
                 "answer":"No"
              }
           ]
        },
        {
           "id":2,
           "name":"Jane Smith",
           "position":"Cook",
           "applied":"02/08/16",
           "experience":4,
           "availability":{
              "M":1,
              "T":1,
              "W":1,
              "Th":1,
              "F":0,
              "S":0,
              "Su":0
           },
           "questions":[
              {
                 "text":"Have you ever been convicted of a felony?",
                 "answer":"Yes"
              }
           ]
        },
        {
           "id":3,
           "name":"David Jessup",
           "position":"Chef",
           "applied":"03/08/16",
           "experience":2,
           "availability":{
              "M":2,
              "T":2,
              "W":2,
              "Th":2,
              "F":2,
              "S":0,
              "Su":0
           },
           "questions":[
              {
                 "text":"Are you authorized to work in the United States?",
                 "answer":"Yes"
              }
           ]
        },
        {
           "id":4,
           "name":"Clay vanSchalkwijk",
           "position":"Cook",
           "applied":"03/08/16",
           "experience":1,
           "availability":{
              "M":1,
              "T":0,
              "W":1,
              "Th":0,
              "F":1,
              "S":0,
              "Su":0
           },
           "questions":[
              {
                 "text":"Are you authorized to work in the United States?",
                 "answer":"Yes"
              }
           ]
        }
];


//Search by first Name
$('#search').keyup(function (){
    $('.card').removeClass('d-none'); //reset the search, removing d-none shows all cards again
    var filter = $(this).val(); // get the value of the input, which we filter on
    //Iterate through all cards in deck, if the card's header (first name) does not contain the 
    //searched for string, add the d-none (display none) 
    //attribute to not show searched for cards
    $('.card-deck').find('.card .card-body h4:not(:contains("'+filter+'"))').parent().parent().addClass('d-none');
})

//Sort by Position functionality
$('#btnSortName').click(function (){
    $('.card-deck .card').sort(function(a,b) {
        return $(a).find(".card-position").text() > $(b).find(".card-position").text() ? 1 : -1;
    }).appendTo(".card-deck");
})

//Sort by Applied Date
$('#btnSortDate').click(function () {
    $('.card-deck .card').sort(function(a,b) {
        return $(a).find(".card-date").text() > $(b).find(".card-date").text() ? 1 : -1;
    }).appendTo(".card-deck");
})

//Add Favorite functionality
function setFavorite(idOfButton) {
    document.getElementById(idOfButton).value = 1;
    console.log(document.getElementById(idOfButton).value);
    document.getElementById(idOfButton).classList.add('disabled');
    document.getElementById(idOfButton).setAttribute('disabled','disabled');
}

//Show Favorites functionality
$('#btnShowFavorites').click(function() {
    var applications = document.getElementsByClassName('btnFave');
    for (i = 0; i < applications.length; i++) {
        console.log(applications[i].value);
        if (applications[i].value != 1){
            applications[i].parentElement.parentElement.classList.add('d-none');
        }
    }
});

function resetAvailability() {
    var appendedChildren = document.getElementById("appendedAvailability");
    console.log(appendedChildren);
    while (appendedChildren.hasChildNodes()) {
        appendedChildren.removeChild(appendedChildren.firstChild);
    }
}


//Show Full App Functionality
function showFullApplication(idOfButton) {
    var appToShow = document.getElementById(idOfButton).value;
    
    var position = "Position Applied For: " + jsonVar[appToShow-1].position;
    var appliedDate = "Date applied to position: " + jsonVar[appToShow-1].applied;
    var yoe = "Years of experience: " + jsonVar[appToShow-1].experience;

    var questionText = "Question: " + JSON.stringify(jsonVar[appToShow-1].questions.text);
    var answerText = "Answer: " + JSON.stringify(jsonVar[appToShow-1].questions.answer);

    
    console.log(appToShow);
    document.getElementById("applicationModalTitle").innerHTML = jsonVar[appToShow-1].name;
    document.getElementById("fullApplicationPosition").innerHTML = position;
    document.getElementById("fullApplicationDate").innerHTML = appliedDate;
    document.getElementById("fullApplicationYOE").innerHTML = yoe;

    //Looping through keys of JSON to pull availability out per day
    for (var i = 0; i < Object.keys(jsonVar[appToShow-1].availability).length; i++) {
        console.log(Object.keys(jsonVar[appToShow-1].availability)[i]);
        console.log(Object.values(jsonVar[appToShow-1].availability)[i]);
        //Creating new 'p' object to append to div to display the availability
        var pAvailability = document.createElement("P");
        //Switch to display availability based on which letter (key) was pulled from JSON object
        switch(Object.keys(jsonVar[appToShow-1].availability)[i]) {
            case "M":
                if (pAvailability.innerHTML.length == 0) {
                    pAvailability.innerHTML = "Monday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                else {
                    pAvailability.innerHTML += "Tuesday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                break;
            case "T":
                if (pAvailability.innerHTML.length == 0) {
                    pAvailability.innerHTML = "Tuesday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                else {
                    pAvailability.innerHTML += "Tuesday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                break;
            case "W":
                if (pAvailability.innerHTML.length == 0) {
                    pAvailability.innerHTML = "Wednesday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                else {
                    pAvailability.innerHTML += "Wednesday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                break;
            case "Th":
                if (pAvailability.innerHTML.length == 0) {
                    pAvailability.innerHTML = "Thursday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                else {
                    pAvailability.innerHTML += "Thursday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                break;
            case "F":
                if (pAvailability.innerHTML.length == 0) {
                    pAvailability.innerHTML = "Friday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                else {
                    pAvailability.innerHTML += "Friday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                break;
            case "S":
                if (pAvailability.innerHTML.length == 0) {
                    pAvailability.innerHTML = "Saturday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                else {
                    pAvailability.innerHTML += "Saturday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                break;
            case "Su":
                if (pAvailability.innerHTML.length == 0) {
                    pAvailability.innerHTML = "Sunday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                else {
                    pAvailability.innerHTML += "Sunday: " + Object.values(jsonVar[appToShow-1].availability)[i];
                }
                break;
        }
        document.getElementById("appendedAvailability").appendChild(pAvailability);

    }
    console.log(Object.keys(jsonVar[appToShow-1].availability).length);

    //document.getElementById("fullApplicationAvailability").innerHTML =availabilityText
    
}


//Functionality to populate cards with JSON data
// var cardName1 = jsonVar[0].name;
// var cardPosition1 = jsonVar[0].position;
// var cardYOE1 = jsonVar[0].experience;
// document.getElementById("cardName1").innerHTML = cardName1;
// document.getElementById("cardPosition1").innerHTML = cardPosition1;
// document.getElementById("cardYOE1").innerHTML = cardYOE1;

//Looping functionality to populate cards with JSON data
for( var i = 1; i < 5; i++ ) {
    document.getElementById("cardName"+i).innerHTML = jsonVar[i-1].name;
    document.getElementById("cardPosition"+i).innerHTML = jsonVar[i-1].position;
    document.getElementById("applyDate"+i).innerHTML = jsonVar[i-1].applied;
}
