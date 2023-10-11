let login = document.querySelector("#login");
let criarConta = document.querySelector("#criarConta");


criarConta.addEventListener("click", () => {
    location.href = "../telaDeCriarConta/index.html"
});

let allUsers = [];
allUsers = JSON.parse(localStorage.getItem("allUsers"));
let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let erroTexto = document.querySelector("#erroTexto");

login.addEventListener("click", () => {
    let loginSucesso = false;
    allUsers.forEach(e => {
        if (!loginSucesso) {
            erroTexto.style.display = "inherit";
        }
        if (e.email == email.value &&
            e.senha == senha.value) {
            erroTexto.style.display = "none";
            localStorage.setItem("logado", JSON.stringify(e));
            location.href = "../areaDePesquisa/index.html";
        }


    });


});

