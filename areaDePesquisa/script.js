async function getLogado() {
    let data = await fetch("../assets/php/getLogado.php").then(res => res.text());
    if(data == "Nao Logado") {
        location.href = "../telaDeLogin/index.html";
    }
}

getLogado();

let carrinhoButton = document.querySelector("#carrinhoButton");
carrinhoButton.addEventListener("click", () => {
    location.href = "../carrinho/index.html";
});

let logout = document.querySelector("#logout");
logout.addEventListener("click", async () => {
    let data = await fetch("../assets/php/setDeslogado.php").then(res => res.text());
    console.log(data);
    if (data == "OK") {
        location.href = "../telaDeLogin/index.html";
    }
})

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

async function getAllUsers() {
    try {
        let data = await fetch("../assets/php/getAllUsers.php").then(res => res.json());
        return await data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

async function printAllUsers(tipo) {
    let allUsers = await getAllUsers();
    allUsers.forEach(e => {
        if (e.nome.toLowerCase().includes(texto.value.toLowerCase())) {
            const div = document.createElement('div');
            div.classList.add("link");
            div.classList.add("pessoa");

            const img = document.createElement('img');
            img.src = e.foto;

            const a = document.createElement('a');
            a.href = "../perfil/index.html";
            if (e.logado) {
                a.innerHTML = `${e.nome} (Você)`;
            } else {
                a.innerHTML = e.nome;
            }

            const span = document.createElement('span');
            span.classList.add("tipo");
            span.innerHTML = e.tipo;

            div.appendChild(img);
            div.appendChild(a);
            div.appendChild(span);

            a.addEventListener("click", () => {
                fetch(`../assets/php/selectUser.php?id=${e.id}`);
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

async function getAllRestaurantes() {
    let data = await fetch("../assets/php/getAllRestaurantes.php").then(res => res.json());
    return data;
}

async function printRestaurantes() {
    let allRestaurantes = await getAllRestaurantes();
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