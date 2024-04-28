
document.getElementById("login").addEventListener("click", ()=>{
    
    event.preventDefault(); 
    let username = document.getElementById("username").innerText
    let password = document.getElementById("password").innerText
    console.log(username, password)

})
