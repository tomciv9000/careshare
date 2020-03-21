const BACKEND_URL = 'http://localhost:3000'
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
    fetch('http://localhost:3000/shifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(shift)
    })
      .then(resp => resp.json())
      .then(displayShift(shift));
  }

  const displayShift = shift => {
    //let thisShift = shift
    let shiftHeader = document.createElement('h1')
    // add class to class list array
    shiftHeader.innerText = `${shift.date} with ${shift.caregiver}`
    //let deleteBtn = document.createElement('button')
    //deleteBtn.class = 'like-btn'
    //deleteBtn.innerText = 'Delete'
    //deleteBtn.addEventListener('click', e => deleteToy(e, thisShift.id))
    //let likeBtn = document.createElement('button')
    //likeBtn.class = 'like-btn'
    //likeBtn.innerText = 'Like <3'
    //likeBtn.addEventListener('click', e => showLikes(e, thisShift))
    //shiftHeader.append(likeBtn)
    //shiftHeader.append(deleteBtn)
    timelineDiv.append(shiftHeader)
  }