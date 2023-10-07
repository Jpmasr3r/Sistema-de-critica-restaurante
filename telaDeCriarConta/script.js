// let clientes = [];
// clientes = localStorage.getItem("clientes");
// if(!clientes) {
//     clientes = [];
// }else {
//     clientes = JSON.parse(clientes);
// }

// let criticos = [];
// criticos = localStorage.getItem("criticos");
// if(!criticos) {
//     criticos = [];
// }else {
//     criticos = JSON.parse(criticos);
// }

// let nome = document.querySelector("#nome");
// let senha = document.querySelector("#senha");
// let email = document.querySelector("#email");
// let telefone = document.querySelector("#telefone");
// let foto = document.querySelector("#foto");

// let addConta = document.querySelector("#addConta");
// let tipoNode = document.getElementsByName("tipo");

// let showPassword = document.querySelector("#showPassword");
// let show = false;

// showPassword.addEventListener("click",() => {
//     if(show) {
//         show = false;
//         showPassword.querySelector("img").src = "../src/img/notShow.png";
//         senha.setAttribute("type","password")
//     }else {
//         show = true;
//         showPassword.querySelector("img").src = "../src/img/show.png";
//         senha.setAttribute("type","text")
//     }
// })

// addConta.addEventListener("click",() => {
//     if(nome.value.length > 0 && senha.value.length > 0 && email.value.length > 0 && telefone.value.length > 0) {
//         tipoNode.forEach(e => {
//             if(e.checked) {
//                 let tipo = e.value;

//                 let usuario;
//                 if(foto.value == "") {
//                     usuario = {
//                         nome: nome.value,
//                         senha: senha.value,
//                         email: email.value,
//                         telefone: telefone.value,
//                         src: "../src/img/perfil.png",
//                         tipo: tipo,
//                     }
//                 }else {
//                     usuario = {
//                         nome: nome.value,
//                         senha: senha.value,
//                         email: email.value,
//                         telefone: telefone.value,
//                         src: foto.value,
//                         tipo: tipo,
//                     }
//                 }


    
//                 switch(tipo) {
//                     case "cliente":
//                         clientes.push(usuario);
//                         clientes = JSON.stringify(clientes);
//                         localStorage.setItem("clientes",clientes);
//                         localStorage.setItem("logado",clientes);
//                         break;
    
//                     case "critico":
//                             criticos.push(usuario);
//                             criticos = JSON.stringify(criticos);
//                             localStorage.setItem("criticos",criticos);
//                             localStorage.setItem("logado",criticos);
//                         break;
//                 }
    
                
                
    
//             }
//         })
        
//     }
    
// })