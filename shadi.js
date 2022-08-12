const Name = document.getElementById('name')
const email = document.getElementById('email')
const postcode = document.getElementById('post')
const city = document.getElementById('city')
const age = document.getElementById('age')
const hire = document.getElementById('hire')
const comment = document.getElementById('comment')
const question = document.getElementById('question')
const hourInput = document.getElementById('hour')
const hourContainer = document.querySelector('.hour-container')
const message = document.getElementById('message')
const form = document.querySelector('.form')


let purpose = ''
// click event 
let choose = ''
hire.addEventListener('click', hire);
//call the hire function
function hire() {
    choose = 'Hire'
    hourContainer.style.display = "block"
}
question.addEventListener('click', question)
function question() {
    choose = 'Question'
    hourContainer.style.display = "none"
}

comment.addEventListener('click', comment)
function comment() {
    choose = 'Comment'
    hourContainer.style.display = "none"
}

form.onsubmit = function (item) {
    item.preventDefault()
    const validPostCode = /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/.test(postcode.value)
    if (!validPostCode) return
    if (Name.value && email.value && city.value && age.value && purpose && message.value) {
        if (purpose === 'Hire' && !hourInput.value) return
        fetch('https://httpbin.org/post',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    name: Name.value,
                    postcode: postcode.value,
                    email: email.value,
                    city: city.value,
                    reason: purpose,
                    age: age.value,
                    message: message.value,
                    hourRate: hourInput.value ? hourInput.value : undefined
                })
            }).then(response => {
                console.log(response)
                if (response.ok) {
                    resetValues()
                }
            })
    }
}

function resetValues() {
    Name.value = ''
    postcode.value = ''
    email.value = ""
    city.value = ""
    reason = ""
    age.value = ''
    hourInput.value = ''
    message.value = ''
    hire.checked = false
    question.checked = false
    comment.checked = false
}