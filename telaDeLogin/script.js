let login = document.querySelector("#login");
let criarConta = document.querySelector("#criarConta");

criarConta.addEventListener("click", () => {
    location.href = "../telaDeCriarConta/index.html"
});

let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let erroTexto = document.querySelector("#erroTexto");

login.addEventListener("click", () => {
    getUser();
});

async function getUser() {
    let data = await fetch(`../api/php/set/setLogado.php?email=${email.value}&senha=${senha.value}`).then(res => res.json());

    erroTexto.style.display = "flex";
    erroTexto.innerHTML = data.status;

    if(data.status == "Logado com sucesso") {
        location.href = "../areaDePesquisa/index.html";
    }
}