let carrinhoButton = document.querySelector("#carrinhoButton");
carrinhoButton.addEventListener("click",() => {
    location.href = "../carrinho/index.html";
});

let voltar = document.querySelector("#voltar");
voltar.addEventListener("click",() => {
    location.href = "../areaDePesquisa/index.html";
})

let addR = document.querySelector("#addR");
addR.addEventListener("click",() => {
    location.href = "../cadastrarRestaurante/index.html";
});

let logado = JSON.parse(localStorage.getItem("logado"));
let selectedPerfil = JSON.parse(localStorage.getItem("selectedPerfil"));

let admB = document.querySelectorAll(".adm");

if(selectedPerfil.id != logado.id) {
    admB.forEach(e => {
        e.style.display = "none";
    });
}


