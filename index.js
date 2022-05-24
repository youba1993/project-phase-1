const init = ()=>{
      //Login 
      document.getElementById("loginChild").addEventListener("submit", (e)=> { 
        const inputPin = document.querySelector('input[name="pin"]')
          e.preventDefault();
          if ( parseInt(inputPin.value)  === 1111){ // Verifie Pin code .. use 1111 to have acces 
            login();
        }
        else{
            alert("Wrong Pin code ");  // show an error message and refresh the page 
            location.reload();
        }
      })
      //Logout
     document.getElementById("logOut").addEventListener("click", ()=>location.reload());
     //Add form Element 
          document.getElementById("addElement").addEventListener("click", addElementF);      
     //add To List 
    document.querySelector(".element").addEventListener("submit",addToElementList);
    
    // upload JSON 
    fetch("http://localhost:3000/elementListItem")
        .then((resp)=> resp.json())
        .then((upSheet) => {upSheet.forEach((elemet)=> setRow(elemet))}) 
          
}
  

document.addEventListener("DOMContentLoaded",init); 

function login(){
    const authDiv = document.querySelector(".input-text");
        authDiv.setAttribute("style","display :none;"); // hide the authentification div    
        const authSuccess = document.querySelectorAll(".displayInline").forEach(el=>el.style.visibility = "visible"); // have access to the functionality by set in them visible 
        
    }
function addElementF(){ // set form visible
    const formElement = document.querySelector(".element").style.visibility = "visible"; 
}
function addToElementList(e){
    e.preventDefault()
    let elementObj = {
        "site": e.target.web.value,
        "user": e.target.username.value,
        "password": e.target.password.value
    }
    let idpassCon = e.target.passwordconfirm.value;
            if (elementObj.password == idpassCon){
                addElementTOdb(elementObj);
                setRow(elementObj);
                this.reset();
                
        }else{
            alert("password don't match");
        } 
        
}
function setRow(element){
    let table = document.createElement("tr")
    table.id = element.id
    table.innerHTML = `
    
            <td>${element.site}</td>
            <td>${element.user}</td>
            <td>${element.password}</td>
            <td>
            <button id="Delete">Delete</button>
            </td>
            
    ` 
    document.getElementById("elemTable").appendChild(table)
    table.querySelector('#Delete').addEventListener("click", ()=>{
        deleteElementList(element)
        location.reload();
    })
}

function deleteElementList(elementObj){
   
   fetch(`http://localhost:3000/elementListItem/${elementObj.id}`,{
    method: 'DELETE',
    headers: {
        'Content-Type' : 'application/json',
        Accept: 'application/json',
    }
})
}
function addElementTOdb(elementObj){
           //add element to db.json
    fetch("http://localhost:3000/elementListItem/",{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
           
        },
        body:JSON.stringify(elementObj),      
        })
            .then(response => response.json())
            .then(data => {
             console.log('Success:', data);
             })
             .catch((error) => {
             console.error('Error:', error);
            });
}

 

  


//function logout(){                            //another way to disconnect , we have to call this function in the logout event listener
    // const authDiv = document.querySelector(".input-text");
   // authDiv.setAttribute("style","display : block;");
   // const authSuccess = document.querySelectorAll(".displayInline").forEach(el=>el.style.visibility = "collapse");
   // const formElement = document.querySelector(".element").style.visibility = "collapse";
//}