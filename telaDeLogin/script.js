let loginButton = document.querySelector("#login");
let criarConta = document.querySelector("#criarConta");


criarConta.addEventListener("click", () => {
    location.href = "../telaDeCriarConta/index.html"
});

let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let erroTexto = document.querySelector("#erroTexto");

loginButton.addEventListener("click", () => {
    login();
});

async function login() {
    let user = {
        email: email.value,
        senha: senha.value,
    }

    let userParams = new URLSearchParams(user);

    let data = await fetch(`../assets/php/login.php?${userParams}`).then(res => res.json());


    if (data.status == "Nenhum usuario encontrado" || data.status == "Senha incorreta") {
        erroTexto.innerHTML = data.status;
        erroTexto.style.display = "flex";

    } else if (data.status == "Sucess") {
        erroTexto.innerHTML = data.status;
        erroTexto.style.display = "flex";
        localStorage.setItem("logado", JSON.stringify(data.result));
        location.href = "../areaDePesquisa/index.html";

    }

}

