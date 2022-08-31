document.querySelector("#btnLog").addEventListener("click", funca)

function funca(){
    let usuario= document.querySelector("#txtUsuario").value
    let contraseña= document.querySelector("#txtContraseña").value
    if(usuario==""|| contraseña==""){
        alert("Complete los campos vacios")
    }
    else{
        localStorage.setItem("Usuario", usuario);
        location.href= "index.html";
    }
}