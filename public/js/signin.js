"use strict"

const id = document.querySelector("#id")
const password = document.querySelector("#password")
const signinBtn = document.querySelector("#signin")

console.log(id)
console.log("hello")
signinBtn.addEventListener("click",signin)

function signin(){
    const req = {
        id: id.value,
        password: password.value
    };
    fetch("/signin",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(req)
    })

}