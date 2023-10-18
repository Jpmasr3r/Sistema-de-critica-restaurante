let login = document.querySelector("#login");
let criarConta = document.querySelector("#criarConta");


criarConta.addEventListener("click", () => {
    location.href = "../telaDeCriarConta/index.html"
});

let allUsers = localStorage.getItem("allUsers");
if(!allUsers) {
    allUsers = [];
}else {
    allUsers = JSON.parse(allUsers);
}
let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let erroTexto = document.querySelector("#erroTexto");

login.addEventListener("click", () => {
    allUsers.forEach(e => {
        let loginSucesso = false;
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

