const BACKEND_URL = 'http://localhost:3000/shifts'
const createShiftForm = document.querySelector('.add-shift-form')
const actionPanel = document.querySelector(".action-container")
const timelineDiv = document.querySelector('#timeline')
const shiftDropDown = document.getElementById("shifts-dropdown")

let dateDisplay = {}
//let addShift = false



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

createShiftForm.addEventListener('submit', e => {
    e.preventDefault()
    getDates()
    addNewShift(e)
    createShiftForm.reset()
})

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

const displayShift = shift => {
    let thisShift = shift
    let shiftHeader = document.createElement('h1')
    // add class to class list array
    shiftHeader.innerText = `${dateDisplay.dom} with ${shift.caregiver}`
    let deleteBtn = document.createElement('button')
    //deleteBtn.class = 'like-btn'
    deleteBtn.innerText = 'Delete Shift'
    deleteBtn.addEventListener('click', e => deleteShift(e, thisShift.id))
    shiftHeader.append(deleteBtn)
    timelineDiv.append(shiftHeader)
}

const deleteShift = (e, id) => {
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
      option.innerHTML = `${shift.attributes.caregiver} - ${dateDisplay.dom}` 
      shiftDropDown.appendChild(option)
    }
}
    
function fetchAndPopulateDropDown() {
    getShifts().then(json => populateShiftsDropDown(json))
}

function clearShift(){
    timelineDiv.innerHTML = ""
}

function cleanDropDown(id){
    var shiftsDropdown = document.getElementById("shifts-dropdown");
    for (var i=0; i<shiftsDropdown.length; i++) {
    if (shiftsDropdown.options[i].value == id)
        shiftsDropdown.remove(i);
    }
}

function getAndLoadShift(event) {
  clearShift();
  const shift_id = event.target.value
  getShiftFromDropDown(shift_id).then(json => displayShift(json.data.attributes))
}

function bindEventListener() {
    shiftDropDown.addEventListener("change", event => getAndLoadShift(event))
}


getDates()
fetchAndPopulateDropDown()
bindEventListener()
