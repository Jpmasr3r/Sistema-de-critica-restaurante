async function getLogado() {
    let data = await fetch("../assets/php/get/getLogado.php").then(res => res.text());
    if (data == "Nao Logado") {
        location.href = "../telaDeLogin/index.html";
    }
}
getLogado();

getInfs();

let carrinhoButton = document.querySelector("#carrinhoButton");
carrinhoButton.addEventListener("click", () => {
    location.href = "../carrinho/index.html";
});

let voltar = document.querySelector("#voltar");
voltar.addEventListener("click", () => {
    location.href = "../areaDePesquisa/index.html";
})

let addR = document.querySelector("#addR");
addR.addEventListener("click", () => {
    location.href = "../cadastrarRestaurante/index.html";
});

let nome = document.querySelector("#nome");
let telefone = document.querySelector("#telefone");
let tipo = document.querySelector("#tipo");
let perfil = document.querySelector("#perfil");

async function getInfs() {
    try {
        let data = await fetch("../assets/php/get/getSelectedUser.php").then(res => res.json());
        nome.innerHTML = `<label>Nome: </label>${data.nome}`;
        telefone.innerHTML = `<label>Telefone: </label>55+ 51 ${data.telefone}`;
        tipo.innerHTML = `${data.tipo}`.toUpperCase();
        perfil.src = data.foto;
        if(data.logado) {
            addR.style.display = "flex";
        }
    } catch (error) {
        console.log(error.getMessage());
    }
}