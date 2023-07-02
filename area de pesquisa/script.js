let clientes = [];
clientes = localStorage.getItem("clientes");
if(!clientes) {
    clientes = [];
}else {
    clientes = JSON.parse(clientes)
}

let criticos = [];
criticos = localStorage.getItem("criticos");
if(!criticos) {
    criticos = [];
}else {
    criticos = JSON.parse(criticos)
}

let restaurantes = [];
restaurantes = localStorage.getItem("restaurantes");
if(!restaurantes) {
    restaurantes = [];
}else {
    restaurantes = JSON.parse(restaurantes)
}

let tipo = document.getElementsByName("tipo");
let buttonPes = document.querySelector("#buttonPes");
let area = document.querySelector("#area");

printTodos();

buttonPes.addEventListener("click", () => {
    area.innerHTML = "";

    tipo.forEach(e => { 
        if(e.checked) {
            switch(e.value){
                case "nenhum":
                    printTodos()
                    break;
        
                case "restaurante":
                    printRestaurantes()
                    break;
        
                case "cliente":
                    printClientes()
                    break;
        
                case "critico":
                    printCriticos()
                    break;
            }
        }
    })
})

function printClientes() {
    if(clientes.length > 0) {
        clientes.forEach(e => {
            area.insertAdjacentHTML("beforeend",`
                <div class="link pessoa">
                    <img src="${e.src}" alt="">
                    <a href="../perfil cliente/index.html">${e.nome}</a>
                    <span class="tipo">Cliente</span>
                </div>
            `)
        })
    }
}

function printCriticos() {
    if(criticos.length > 0) {
        criticos.forEach(e => {
            area.insertAdjacentHTML("beforeend",`
                <div class="link pessoa">
                    <img src="${e.src}" alt="">
                    <a href="../perfil cliente/index.html">${e.nome}</a>
                    <span class="tipo">Critico</span>
                </div>
            `)
        })
    }
}

function printRestaurantes() {
    restaurantes.forEach(e => {
        area.insertAdjacentHTML("beforeend",`
            <div class="link restaurante">
                <img src="${e.src}" alt="">
                <a href="../perfil restaurante/index.html">${e.nome}</a>
                <div class="nota">
                    ${addEstrelas(e)}
                </div>
                <span class="tipo">Restaurante</span>
            </div>
        
        `)
    })
}

function addEstrelas(e) {
    let estrelas = "";
    for(let i = 1;i <= e.nota;i++) {
        estrelas += `<img src="../src/img/estrelaAtiva.png" alt="" class="estrela">`;
    }
    for(let i = 1; i <= (5 - e.nota);i++) {
        estrelas += `<img src="../src/img/estrelaInativa.png" alt="" class="estrela">`;
    }
    return estrelas;
}

function printTodos() {
    area.innerHTML = "";
    printClientes();
    printRestaurantes();
    printCriticos();
}
