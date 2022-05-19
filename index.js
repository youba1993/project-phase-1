
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
        .then((upSheet) => {upSheet.forEach((elemet)=> setRow(elemet.site,elemet.user,elemet.password))}) 
    //Delete element from List
    document.getElementById("Delete").addEventListener("click", (e)=> {
        e.preventDefault();
        e.target.parentElement.parentElement.remove()
        deleteElementList(elementObj);
    })       
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
                setRow(elementObj.site,elementObj.user,elementObj.password);
                this.reset();
                
        }else{
            alert("password don't match");
        } 
        
}
function setRow(parWeb,parUser,parPass){
    const btn = document.createElement("button");
    btn.innerText = "Delete"
    let table = document.getElementById("elemTable"); 
                //create an arrow and set cells
            let row = table.insertRow();   
            let cell1 = row.insertCell(0)
            let cell2 = row.insertCell(1)
            let cell3 = row.insertCell(2)
            let cell4 = row.insertCell(3)
                //insert the data to the table 
            cell1.innerHTML = parWeb;
            cell2.innerHTML = parUser;
            cell3.innerHTML = parPass;
            cell4.appendChild(btn).setAttribute("id","Delete")
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
        body:JSON.stringify(elementObj),        // console.log(JSON.stringify(Obj)) gives the right full object but fetch create just id in the database JSON
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