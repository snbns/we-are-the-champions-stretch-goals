import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-snbns-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsementsList")

const textareaEl = document.getElementById("text-area-endorsements")
const publishButtonEl = document.getElementById("publish-btn")
const endorsementsListEl = document.getElementById("endorsements-list")
const fromEl = document.getElementById("input-from")
const toEl = document.getElementById("input-to")

publishButtonEl.addEventListener("click", function() {
    let endorsementObject = {
        endorsement: textareaEl.value,
        fromPerson: fromEl.value,
        toPerson: toEl.value,
        likeCount: 0
    }
    
    push(endorsementsInDB, endorsementObject)
    
    clearTextAreaEl()
    clearFromField()
    clearToField()
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val());
        
        clearEndorsementsListEl()
        
        // let a = endorsementsArray[2]
        // let aID = a[0]
        // let aValue = a[1]
        // console.log(aValue.fromPerson)
        
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentItem = endorsementsArray[i]
            // console.log(currentItem)
            // let currentItemID = currentItem[0]
            // console.log(currentItemID)
            let currentItemValueObject = currentItem[1]
            let currentItemValueObjectEndorsement = currentItemValueObject.endorsement
            let currentItemValueObjectFrom = currentItemValueObject.fromPerson
            let currentItemValueObjectTo = currentItemValueObject.toPerson
            
            appendItemToEndorsementsList(currentItemValueObjectEndorsement, currentItemValueObjectFrom, currentItemValueObjectTo)
        }
    }
})

function appendItemToEndorsementsList(endorsement, fperson, tperson) {
    let newEl = document.createElement("li")
    
    newEl.innerHTML = `<b>To ${tperson}</b>
    <br>
    <br>
    ${endorsement}
    <br>
    <br>
    <b>From ${fperson}`
    
    endorsementsListEl.append(newEl)
}

// function appendItemToEndorsementsList(item) {
//     let newEl = document.createElement("li")
    
//     newEl.textContent = item
    
//     endorsementsListEl.append(newEl)
// }

function clearTextAreaEl() {
    textareaEl.value = ""
}

function clearFromField() {
    fromEl.value = ""
}

function clearToField() {
    toEl.value = ""
}

function clearEndorsementsListEl() {
    endorsementsListEl.innerHTML = ""
}