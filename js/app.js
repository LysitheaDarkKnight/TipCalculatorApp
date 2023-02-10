const bill = document.getElementById('bill');
const btns = document.querySelectorAll('button');
const custom = document.getElementById('custom');
const people = document.getElementById('people');
const form = document.querySelector('.form');
const reset = document.querySelector('.reset');

let isValid = [false, false];

people.addEventListener('keypress', e => {
    if(e.key === "Enter"){
        e.preventDefault()
    }


})

bill.addEventListener('keypress', e => {
    if(e.key === "Enter"){
        e.preventDefault()
    }
})

people.addEventListener('blur', e => {

    const peopleMsg = document.querySelector('.people-msg');

    if(people.value.trim().length === 0) {
        showError("Can't be blank", peopleMsg)
        isValid[0] = false;
    } else if (isNaN(people.value) || people.value < 0){
        showError("Valid number required", peopleMsg)
        isValid[0] = false;
    } else{
        showSuccess(peopleMsg)
        isValid[0] = true;
    }
})

bill.addEventListener('blur', e => {

    const billMsg = document.querySelector('.bill-msg');

    if(bill.value.trim().length === 0) {
        showError("Can't be blank", billMsg)
        isValid[1] = false;
    } else if (isNaN(bill.value) || bill.value < 0){
        showError("Valid number required", billMsg)
        isValid[1] = false;
    } else{
        showSuccess(billMsg)
        isValid[1] = true;
    }

})

btns.forEach(btns => {
    btns.addEventListener('click', e => {
        // if (isValidBill === true && isValidPeople === true){
        let val = btns.value;
        calculation(val);
        e.preventDefault();
})
})



custom.addEventListener('keypress', e => {
    if(e.key === "Enter"){
        if(custom.value.trim().length === 0 || isNaN(custom.value) || custom.value < 0 || custom.value >= 100){
            custom.style.border = '2px solid #EF5350'
        } else{
        
        let val = custom.value;
        calculation(val);
        custom.style.border = '2px solid #26c0ab'

        }
        e.preventDefault()
    }
})



function toDecimal(percent) {
    return parseFloat(percent) / 100;
}

function calculation(val){
    let tipPayment = document.getElementById('tip-payment');
    let totalPayment = document.getElementById('total-payment');

    if (!isValid.includes(false)){
    tipPayment.value = '$' + (bill.value  * (toDecimal(val)) / people.value)
    totalPayment.value = '$' + (bill.value  * (1 + toDecimal(val)) / people.value)
    reset.style.opacity = '1'
    reset.disabled = false;
    } else {
        reset.style.opacity = '0.15'
        reset.disabled = true;
    }
}

function showError(message, msgClass){
    msgClass.innerText = message;
    msgClass.classList.add('error');
    msgClass.parentElement.nextElementSibling.style.border = '2px solid #EF5350'
}

function showSuccess(msgClass){
    msgClass.innerText = '';
    msgClass.classList.remove('error');
    msgClass.parentElement.nextElementSibling.style.border = '2px solid #26c0ab'
}

