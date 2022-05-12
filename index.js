const init = ()=>{
    const submitForm = document.getElementById("loginChild");
    const submitPin = document.querySelector('input[name="submitPin"]')
    const inputPin = document.querySelector('input[name="pin"]')
      //Login 
      submitForm.addEventListener("submit", (e)=> { 
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
    const btnLogOut = document.getElementById("logOut").addEventListener("click", ()=>location.reload());
     //Add form Element
    const btnAddElem = document.getElementById("addElement").addEventListener("click", addElementF);      
     //add To List 
    let btnToList = document.querySelector(".element");
     btnToList.addEventListener("submit", (ev)=>{
        ev.preventDefault();
        addToElementList();
        btnToList.reset();
    });
     //Delete element from List
    let btnDelete = document.getElementById("Delete")
      btnDelete.addEventListener("click", (e)=> {
        e.preventDefault();
        deleteElementList(btnDelete);
    })  

    
}

document.addEventListener("DOMContentLoaded",init); 

function login(){
    const authDiv = document.querySelector(".input-text");
        authDiv.setAttribute("style","display :none;"); // hide the authentification div
        alert("Welcome");  //welcome in message    
        const authSuccess = document.querySelectorAll(".displayInline").forEach(el=>el.style.visibility = "visible"); // have access to the functionality by set in them visible 
        
    }
function addElementF(){ // set form visible
    const formElement = document.querySelector(".element").style.visibility = "visible"; 
}
function addToElementList(){
    const idweb = document.getElementById("web");
    const iduser = document.getElementById("user");  
    const idpass = document.getElementById("pass"); 
    const idpassCon = document.getElementById("passCon");
    const btn = document.createElement("button");
    btn.innerText = "Delete"
        if (idpass.value == idpassCon.value){

            let table = document.getElementById("elemTable"); 
                //create an arrow and set cells
            let row = table.insertRow();   
            let cell1 = row.insertCell(0)
            let cell2 = row.insertCell(1)
            let cell3 = row.insertCell(2)
            let cell4 = row.insertCell(3)
                //insert the data to the table 
            cell1.innerHTML = idweb.value;
            cell2.innerHTML = iduser.value;
            cell3.innerHTML = idpass.value;
            cell4.appendChild(btn).setAttribute("id","Delete")

        }else{
            alert("password d'ont match");
        }
}
function deleteElementList(btnclicked){
   btnclicked.parentElement.parentElement.remove()
}

  


//function logout(){                            //another way to disconnect , we have to call this function in the logout event listener
    // const authDiv = document.querySelector(".input-text");
   // authDiv.setAttribute("style","display : block;");
   // const authSuccess = document.querySelectorAll(".displayInline").forEach(el=>el.style.visibility = "collapse");
   // const formElement = document.querySelector(".element").style.visibility = "collapse";
//}