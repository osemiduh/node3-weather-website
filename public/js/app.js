
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=>{
        console.log(data)
    })
})




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    
    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = ''


    fetch(`http://localhost:3900/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
            messageOne.innerHTML = data.error
            
        } else {
            messageOne.innerHTML = data.forecast
            messageTwo.innerHTML = data.location 
            
        }
    })
})

})