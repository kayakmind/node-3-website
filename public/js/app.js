console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form') 
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    //Prevent page from refreshing on form submission
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading weather for ' + location + '...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then( (response) => {
    
    response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.address
                messageTwo.textContent = data.forecast
                     
            }
             
        })
    })  

    
})