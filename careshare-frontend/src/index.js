const BACKEND_URL = 'http://localhost:3000/shifts'
const addShiftForm = document.querySelector('#add-shift-form')
const actionPanel = document.querySelector(".action-container")
const timelineDiv = document.querySelector('#timeline')
const timelineButtons = document.querySelector('#timeline-buttons')
const dropDownDiv = document.querySelector('#all-shifts-dropdown')
const shiftDropDown = document.getElementById("shifts-dropdown")
const newShiftButton = document.getElementById('new-shift')
const previousShiftsButton = document.getElementById('select-shift')
const formButtons = document.querySelector('.form-show-buttons')
const goBackButton = document.getElementById('go-back')


let dateDisplay = {}




const getDates = () => {
    let today = new Date()
    dateDisplay.sql = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    dateDisplay.dom = today.toLocaleDateString()
}


function formatDate(date){
    
    let split = date.split('-')
    return split[1] + "/" + split[2] + "/" + split[0] 
}

function getShifts() {
    return fetch(BACKEND_URL).then(response => response.json()).then(json => (json.data))
}

function hideOrShowElement(element) {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
        } 
    else {
      element.className += " hidden";
    }
}

function goBack(){
    toggleGoBack()
    if (!addShiftForm.classList.contains("hidden")) {
        toggleForm()
    }
    else {
        toggleDropDown()
    }
    toggleButtons()
}

function toggleGoBack(){
    hideOrShowElement(goBackButton)
}

function toggleForm() {
    hideOrShowElement(addShiftForm);
}

function toggleButtons() {
    hideOrShowElement(formButtons);
}

function toggleDropDown() {
  hideOrShowElement(dropDownDiv);
  //populate dropdown(); I think this would work
}



const addNewShift = e => {
    let shift = {
      caregiver: e.target.caregiver.value,
      date: dateDisplay.sql
    }
    createShift(shift)
}

const createShift = shift => {
    fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(shift)
    })
    .then(resp => resp.json())
    .then(shift => displayShift(shift.data.attributes));
    
}

function dropDownHasValue(id){
    let option = shiftDropDown.querySelector('[value="' + id + '"]');
    return !!option
}

const displayShift = shift => {
    
    //let thisShift = shift
    let shiftHeader = document.createElement('h1')
    // add class to class list array
    shiftHeader.innerText = `${dateDisplay.dom} with ${shift.caregiver}`
    let endShiftBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')
    //deleteBtn.class = 'like-btn'
    endShiftBtn.innerText = 'Clock-Out'
    endShiftBtn.addEventListener('click', e => endShift(e))
    deleteBtn.addEventListener('click', e => deleteShift(e, shift.id))
    deleteBtn.innerText = 'Delete Shift'
    timelineDiv.append(shiftHeader)
    shiftHeader.append(endShiftBtn)
    shiftHeader.append(deleteBtn)
    
}

const endShift = (e) => {
    shiftDropDown.selectedIndex = 0
    toggleButtons()
    e.target.parentNode.remove();
}

const deleteShift = (e, id) => {
    shiftDropDown.selectedIndex = 0
    toggleButtons()
    //toggleDropDown()
    cleanDropDown(id)
    e.target.parentNode.remove();
    fetch(`${BACKEND_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
      })
}
   
function getShiftFromDropDown(shift_id) {
    return fetch(BACKEND_URL + `/${shift_id}`).then(response => response.json())
}  

function populateShiftsDropDown(data) {
    data.sort((a, b) => (a.attributes.date < b.attributes.date) ? 1 : -1)
    for (let shift of data) {
      let option = document.createElement("option")
      option.value = shift.attributes.id
      option.innerHTML = `${shift.attributes.caregiver} - ${formatDate(shift.attributes.date)}` 
      shiftDropDown.appendChild(option)
    }
}
    
function fetchAndPopulateDropDown() {
    getShifts().then(json => populateShiftsDropDown(json))
}

function Shift(){
    timelineDiv.innerHTML = ""
}

function addShiftToDropDown(shift){
    let option = document.createElement("option")
    option.value = shift.id
    option.innerHTML = `${shift.caregiver} - ${formatDate(shift.date)}` 
    shiftDropDown.insertBefore(option, shiftDropDown.childNodes[2])

}

function cleanDropDown(id){
    //var shiftsDropdown = document.getElementById("shifts-dropdown");
    for (var i=0; i<shiftDropDown.length; i++) {
    if (shiftDropDown.options[i].value == id)
    shiftDropDown.remove(i);
    }
    shiftDropDown.selectedIndex = 0
}

function getAndLoadShift(event) {
  toggleDropDown()
  toggleGoBack()
  const shift_id = event.target.value
  getShiftFromDropDown(shift_id).then(json => displayShift(json.data.attributes))
}


addShiftForm.addEventListener('submit', e => {
    e.preventDefault()
    toggleForm()
    toggleGoBack()
    getDates()
    addNewShift(e)
    addShiftForm.reset()
})

newShiftButton.addEventListener("click", function() {
    toggleForm();
    toggleButtons();
    toggleGoBack();
}.bind(this))

previousShiftsButton.addEventListener("click", function() {
    toggleDropDown();
    toggleButtons();
    toggleGoBack();
}.bind(this))

goBackButton.addEventListener("click", function() {
    goBack()
}.bind(this))

function bindEventListeners() {
    shiftDropDown.addEventListener("change", event => getAndLoadShift(event))
}


getDates()
fetchAndPopulateDropDown()
bindEventListeners()
