const carriers = {

    "mtn" : {
        prefixes: [803, 806, 703, 706, 810, 813, 814, 816, 903, 906],
        skip: false
    },

    "glo" : {
        prefixes: [805, 807, 811, 705, 815, 905,],
        skip: false
    },

    "airtel" : {
        prefixes: [802, 808, 812, 701, 708, 902, 907, 901],
        skip: false
    },

    "9mobile" : {
        prefixes: [809, 817, 818, 908, 909,],
        skip: false
    }

}


// SELECTING ALL UI ELEMENTS
const logo = document.getElementById("logo")
const responseMessage = document.getElementById("respondsMessage")
const identifyBtn = document.getElementById("identify-btn");
let inputedNumber = document.getElementById("phoneNumber");

const advanceSettingToggle = document.getElementById("advance-setting__toggle")
const advanceSetting = document.querySelector(".advance-setting")


const mtnSkipToggle = document.getElementById("mtn")
const gloSkipToggle = document.getElementById("glo")
const airtelSkipToggle = document.getElementById("airtel")
const mobileSkipToggle = document.getElementById("9mobile")


//ADDING EVENT LISTENERS TO UI ELEMNETS

mtnSkipToggle.addEventListener("click", carrierToggleBtnHandler)
gloSkipToggle.addEventListener("click", carrierToggleBtnHandler)
airtelSkipToggle.addEventListener("click", carrierToggleBtnHandler)
mobileSkipToggle.addEventListener("click", carrierToggleBtnHandler)

identifyBtn.addEventListener("click", inputHandler)



//////////////////////////////////////
//UI HANDLERS
////////////////////////



function logoHandler(name, extension) {
    logo.src = `img/${name}.${extension}`
}



//handles responce message to display
function responseMessageHandler(message) {
    responseMessage.innerText = message
}

//handles showing and hiding advance setting
advanceSettingToggle.addEventListener("click", () => {

    if (advanceSetting.style.height == "0px" ) {
        advanceSetting.style.height = "5rem"
        advanceSetting.style.padding = "1rem"
     } else {
        advanceSetting.style.height = "0px"
        advanceSetting.style.padding = "0px 1rem" 
    }

})

inputedNumber.addEventListener("focus", () => {
    logoHandler("loading", "gif")
    responseMessageHandler("loading...")
})

inputedNumber.addEventListener( "blur", () => {
    // logoHandler("default", "png")
    responseMessageHandler("--")
})


//handles skiping any of the carriers from advance settings
function carrierToggleBtnHandler() {
    
    if (carriers[this.id].skip == false) {
        carriers[this.id].skip = true
        this.className = "disable"
        
    } else {
        carriers[this.id].skip = false
        this.className = ""
        
    }

}



// NON UI FUNCTION

//processed the inputed number ready for detection

function inputHandler() {

    if (!inputedNumber.value) {
        logoHandler("error", "png")
        responseMessageHandler("you have not input your number")
    }

    if (/[a-z]/i.test(inputedNumber.value)) {
        logoHandler("error", "png")
        responseMessageHandler("no alphabates allowed")
        return
    }

    let phoneNumber = inputedNumber.value.trim().replace(/\s|-/g, "")
    

    if (phoneNumber[0] == 0) {
        phoneNumber = phoneNumber.slice(1)
    } else if (phoneNumber[0] == "+") {
        phoneNumber = phoneNumber.slice(4)
    } 

    if (phoneNumber.length < 10) {
        logoHandler("error", "png")
        responseMessageHandler("number is too short")
        return
    } else if (phoneNumber.length > 10) {
        logoHandler("error", "png")
        responseMessageHandler("number is too long")
        return
    }

    checkCarrier(phoneNumber.slice(0,3))
}


function checkCarrier(prefixCode) {
   for (const carrier in carriers) {   

        if (carriers[carrier].skip == true) {
            continue
        } 

        for (const prefix of carriers[carrier].prefixes) {
            if (prefixCode == prefix) {
                // console.log(carrier)

                logoHandler(carrier, "png")
                return carrier
                }     
             }
        }  
        
        responseMessageHandler("invalid No, adjust advance setting")
        logoHandler("error", "png")
        
        
 } 

 
 
 







