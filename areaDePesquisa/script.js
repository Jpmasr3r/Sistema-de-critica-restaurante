let carrinhoButton = document.querySelector("#carrinhoButton");
carrinhoButton.addEventListener("click", () => {
    location.href = "../carrinho/index.html";
});

let logout = document.querySelector("#logout");
logout.addEventListener("click", () => {
    localStorage.removeItem("logado");
    location.href = "..//index.html"
})

let allUsers = [];
allUsers = localStorage.getItem("allUsers");
if (!allUsers) {
    allUsers = [];
} else {
    allUsers = JSON.parse(allUsers)
}

let allRestaurantes = [];
allRestaurantes = localStorage.getItem("allRestaurantes");
if (!allRestaurantes) {
    allRestaurantes = [];
} else {
    allRestaurantes = JSON.parse(allRestaurantes)
}

let logado = JSON.parse(localStorage.getItem("logado"));
let tipo = document.querySelectorAll(".selecao");
let buttonPes = document.querySelector("#buttonPes");
let area = document.querySelector("#area");
let texto = document.querySelector("#texto");

printTodos();

texto.addEventListener("input", () => {
    tipo.forEach(e => {
        if (e.checked) {
            switch (e.value) {
                case "nenhum":
                    area.innerHTML = "";
                    printTodos()
                    break;

                case "restaurante":
                    area.innerHTML = "";
                    printRestaurantes()
                    break;

                case "cliente":
                    area.innerHTML = "";
                    printAllUsers("cliente")
                    break;

                case "critico":
                    area.innerHTML = "";
                    printAllUsers("critico")
                    break;
            }
        }
    })
})

tipo.forEach(e => {
    e.addEventListener("click", () => {
        if (e.checked) {
            switch (e.value) {
                case "nenhum":
                    area.innerHTML = "";
                    printTodos()
                    break;

                case "restaurante":
                    area.innerHTML = "";
                    printRestaurantes()
                    break;

                case "cliente":
                    area.innerHTML = "";
                    printAllUsers("cliente")
                    break;

                case "critico":
                    area.innerHTML = "";
                    printAllUsers("critico")
                    break;
            }
        }
    })
})

function printAllUsers(tipo) {
    allUsers.forEach(e => {
        if (e.nome.toLowerCase().includes(texto.value.toLowerCase())) {
            const div = document.createElement('div');
            div.classList.add("link");
            div.classList.add("pessoa");

            const img = document.createElement('img');
            img.src = e.foto;

            const a = document.createElement('a');
            a.href = "../perfil/index.html";
            if(e.email == logado.email) {
                a.innerHTML = `${e.nome} (Você)`;
            }else {
                a.innerHTML = e.nome;
            }

            const span = document.createElement('span');
            span.classList.add("tipo");
            span.innerHTML = e.tipo;

            div.appendChild(img);
            div.appendChild(a);
            div.appendChild(span);

            a.addEventListener("click", () => {
                localStorage.setItem("selectedPerfil", JSON.stringify(e));
            })

            if (tipo == "todos") {
                area.appendChild(div);
            } else {
                if (tipo == "cliente") {
                    if (e.tipo == "cliente") {
                        area.appendChild(div);
                    }
                }

                if (tipo == "critico") {
                    if (e.tipo == "critico") {
                        area.appendChild(div);
                    }
                }
            }
        }
    })
}

function printRestaurantes() {
    allRestaurantes.forEach(e => {
        if (e.nome.toLowerCase().includes(texto.value.toLowerCase())) {
            const div = document.createElement("div");
            div.classList.add("link");
            div.classList.add("restaurante");

            const img = document.createElement("img");
            img.src = e.foto;

            const a = document.createElement("a");
            a.href = "../perfilRestaurante/index.html";
            a.innerHTML = e.nome;

            const divNota = document.createElement("divNota");
            divNota.classList.add("nota");

            for (let i = 1; i <= e.nota; i++) {
                const spanEmoji = document.createElement("span");
                spanEmoji.classList.add("emoji");
                spanEmoji.innerHTML = "⭐️";

                divNota.appendChild(spanEmoji);
            }

            for (let i = 1; i <= 5 - e.nota; i++) {
                const spanEmoji = document.createElement("span");
                spanEmoji.classList.add("emoji");
                spanEmoji.classList.add("desativado");
                spanEmoji.innerHTML = "⭐️";

                divNota.appendChild(spanEmoji);
            }

            const br = document.createElement("br");

            const span = document.createElement("span");
            span.classList.add("tipo");
            span.innerHTML = "Restaurante";

            div.appendChild(img);
            div.appendChild(a);
            div.appendChild(divNota);
            div.appendChild(br);
            div.appendChild(span);
            area.appendChild(div);

            div.addEventListener("click", () => {
                localStorage.setItem("selectedRestaurante", JSON.stringify(e));
            });
        }

    })
}

function printTodos() {
    area.innerHTML = "";
    printAllUsers("todos");
    printRestaurantes();
}
