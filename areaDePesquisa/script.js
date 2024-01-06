async function getLogado() {
    let data = await fetch("../api/getLogado.php").then(res => res.text());
    if (data == "Nao Logado") {
        location.href = "../telaDeLogin/index.html";
    }
}

getLogado();

// let carrinhoButton = document.querySelector("#carrinhoButton");
// carrinhoButton.addEventListener("click", () => {
//     location.href = "../carrinho/index.html";
// });

let logout = document.querySelector("#logout");
logout.addEventListener("click", async () => {
    let data = await fetch("../api/setDeslogado.php").then(res => res.text());
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
        let data = await fetch("../api/getAllUsers.php").then(res => res.json());
        return await data;
    } catch (error) {
        console.log(error);
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
            if (e.logado) {
                a.innerHTML = `${e.nome} (Você)`;
            } else {
                a.innerHTML = e.nome;
            }

            const span = document.createElement('span');
            span.classList.add("tipo");
            span.innerHTML = `${e.tipo}`.toUpperCase();

            div.appendChild(img);
            div.appendChild(a);
            div.appendChild(span);

            div.addEventListener("click", async () => {
                try {
                    let data = await fetch(`../api/setSelectedUser.php?id=${e.id}`).then(res => res.text());
                    if (data == "OK") {
                        location.href = "../perfil/index.html";
                    }
                } catch (error) {
                    console.log("Error: " + error.getMessage());
                }
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
    try {
        let data = await fetch("../api/getAllRestaurantes.php").then(res => res.json());
        return await data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
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
            a.innerHTML = e.nome;

            const divNota = document.createElement("divNota");
            divNota.classList.add("nota");

            for (let i = 1; i <= 5; i++) {
                const spanEmoji = document.createElement("span");
                spanEmoji.classList.add("emoji");

                if (i <= e.nota) {
                    spanEmoji.innerHTML = "⭐️";
                } else {
                    spanEmoji.classList.add("desativado");
                    spanEmoji.innerHTML = "⭐️";
                }

                divNota.appendChild(spanEmoji);
            }


            const br = document.createElement("br");

            const span = document.createElement("span");
            span.classList.add("tipo");
            span.innerHTML = "RESTAURANTE";

            div.appendChild(img);
            div.appendChild(a);
            div.appendChild(divNota);
            div.appendChild(br);
            div.appendChild(span);
            area.appendChild(div);

            div.addEventListener("click", async () => {
                try {
                    let data = await fetch(`../api/setSelectedRestaurante.php?id=${e.id}`).then(res => res.text());
                    if (data == "OK") {
                        location.href = "../perfilRestaurante/index.html";
                    }
                } catch (error) {
                    console.log("Error: " + error.getMessage());
                }
            })

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