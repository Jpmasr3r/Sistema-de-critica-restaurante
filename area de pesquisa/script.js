let clientes = [
    {
        nome: "Roberto Carlos",
        src: "../src/img/pessoas/pessoa1.png"
    },

    {
        nome: "Socrates",
        src: "../src/img/pessoas/pessoa2.png"
    },

    {
        nome: "Albert Einstein",
        src: "../src/img/pessoas/pessoa3.png"
    }



];

let criticos = [
    {
        nome: "Érick Jacquin",
        src: "../src/img/pessoas/pessoa4.png"
    },

    {
        nome: "Rato Ratatuile",
        src: "../src/img/pessoas/pessoa5.png"
    }

];

let restaurantes = [
    {
        nome: "Restaurante da Praia",
        nota: 2,
        src: "../src/img/restaurantes/restaurante1.png"
    },

    {
        nome: "Restaurante da Floresta",
        nota: 4,
        src: "../src/img/restaurantes/restaurante2.png"
    }

];

let tipo = document.getElementsByName("tipo");
let buttonPes = document.querySelector("#buttonPes");
let area = document.querySelector("#area");

printTodos();

buttonPes.addEventListener("click", () => {
    area.innerHTML = "";
    for(let i = 0; i < tipo.length; i++) {
        if(tipo[i].checked){
            switch(tipo[i].value){
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
    
    }

})



function printClientes() {
    for(let i = 0; i < clientes.length; i++){
        area.innerHTML += `
            <div class="link pessoa">
                <img src="${clientes[i].src}" alt="">
                <a href="../perfil cliente/index.html">${clientes[i].nome}</a>
                <span class="tipo">Cliente</span>
            </div>
        
        
        `

    }
}

function printCriticos() {
    for(let i = 0; i < criticos.length; i++){
        area.innerHTML += `
            <div class="link critico">
                <img src="${criticos[i].src}" alt="">
                <a href="../perfil cliente/index.html">${criticos[i].nome}</a>
                <span class="tipo">Critico</span>
            </div>
        
        
        `

    }
}

function printRestaurantes() {
    for(let i = 0; i < restaurantes.length; i++){
        area.innerHTML += `
            <div class="link restaurante">
                <img src="${restaurantes[i].src}" alt="">
                <a href="../perfil restaurante/index.html">${restaurantes[i].nome}</a>
                <div class="nota">
                </div>
                <span class="tipo">Restaurante</span>
            </div>
        
        
        `
        let nota = document.querySelectorAll(".nota");
        let j = 1

        for(j = 1; j <= restaurantes[i].nota; j++) {
            nota[i].innerHTML += `<img src="../src/img/estrelaAtiva.png" alt="" class="estrela">` 

        }

        for(let p = 0; p <= (5 - j); p++) {
            console.log("a");
            nota[i].innerHTML += `<img src="../src/img/estrelaInativa.png" alt="" class="estrela">`
        }
        

    }
}

function printTodos() {
    area.innerHTML = "";
    printClientes();
    printRestaurantes();
    printCriticos();

}




