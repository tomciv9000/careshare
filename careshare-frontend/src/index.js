const BACKEND_URL = 'http://localhost:3000/shifts'
const createShiftForm = document.querySelector('.add-shift-form')
const actionPanel = document.querySelector(".action-container")
const timelineDiv = document.querySelector('#timeline')


//let addShift = false


//function to return the current Date
const returnDate = () => {
    let today = new Date()
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return date
}

const displayDate = () => {
    let date = new Date()
    return date.toLocaleDateString()
}

createShiftForm.addEventListener('submit', e => {
    e.preventDefault()
    addNewShift(e)
    createShiftForm.reset()
  })

const addNewShift = e => {
    let shift = {
      caregiver: e.target.caregiver.value,
      date: returnDate()
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
    shiftHeader.innerText = `${displayDate()} with ${shift.caregiver}`
    let deleteBtn = document.createElement('button')
    //deleteBtn.class = 'like-btn'
    deleteBtn.innerText = 'Delete Shift'
    deleteBtn.addEventListener('click', e => deleteShift(e, thisShift.id))
    shiftHeader.append(deleteBtn)
    timelineDiv.append(shiftHeader)
  }

  const deleteShift = (e, id) => {
    e.target.parentNode.remove();
    fetch(`${BACKEND_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json());
  }
   
