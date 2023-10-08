let carrinhoButton = document.querySelector("#carrinhoButton");
carrinhoButton.addEventListener("click",() => {
    location.href = "../carrinho/index.html";
});



// let clientes = [];
// clientes = localStorage.getItem("clientes");
// if(!clientes) {
//     clientes = [];
// }else {
//     clientes = JSON.parse(clientes)
// }

// let criticos = [];
// criticos = localStorage.getItem("criticos");
// if(!criticos) {
//     criticos = [];
// }else {
//     criticos = JSON.parse(criticos)
// }

// let restaurantes = [];
// restaurantes = localStorage.getItem("restaurantes");
// if(!restaurantes) {
//     restaurantes = [];
// }else {
//     restaurantes = JSON.parse(restaurantes)
// }

// let tipo = document.getElementsByName("tipo");
// let buttonPes = document.querySelector("#buttonPes");
// let area = document.querySelector("#area");

// printTodos();

// buttonPes.addEventListener("click", () => {
//     area.innerHTML = "";

//     tipo.forEach(e => { 
//         if(e.checked) {
//             switch(e.value){
//                 case "nenhum":
//                     printTodos()
//                     break;
        
//                 case "restaurante":
//                     printRestaurantes()
//                     break;
        
//                 case "cliente":
//                     printClientes()
//                     break;
        
//                 case "critico":
//                     printCriticos()
//                     break;
//             }
//         }
//     })
// })

// function printClientes() {
//     if(clientes.length > 0) {
//         clientes.forEach(e => {
//             const div = document.createElement('div');
//             div.classList.add('link', 'pessoa');
//             div.innerHTML = `
//                 <img src="${e.src}" alt="">
//                 <a href="../perfil cliente/index.html">${e.nome}</a>
//                 <span class="tipo">Cliente</span>
//             `;
//             area.appendChild(div);

//             div.querySelector('a').addEventListener('click', () => {
//                 localStorage.setItem("salvo_cliente",JSON.stringify(e));
//             })


//         })
//     }
// }

// function printRestaurantes() {
//     restaurantes.forEach(e => {
//         const div = document.createElement("div");
//         div.classList.add("link","restaurante");

//         div.innerHTML = `
//             <img src=${e.src} alt="">
//             <a href="../perfil restaurante/index.html">${e.nome}</a>
//             <div class="nota">
//                 ${addEstrelas(e)}
//             </div>
//             <span class="tipo">Restaurante</span>
//         `

//         area.appendChild(div);

//         div.querySelector("a").addEventListener("click",() => {
//             localStorage.setItem("salvo_restaurante",JSON.stringify(e));
//         })
//     })
// }

// function addEstrelas(e) {
//     let estrelas = "";
//     for(let i = 1;i <= e.nota;i++) {
//         estrelas += `<img src="../src/img/estrelaAtiva.png" alt="" class="estrela">`;
//     }
//     for(let i = 1; i <= (5 - e.nota);i++) {
//         estrelas += `<img src="../src/img/estrelaInativa.png" alt="" class="estrela">`;
//     }
//     return estrelas;
// }

// function printTodos() {
//     area.innerHTML = "";
//     printClientes();
//     printRestaurantes();
//     printCriticos();
// }
