async function getLogado() {
    let data = await fetch("../assets/php/get/getLogado.php").then(res => res.text());
    if(data == "Nao Logado") {
        location.href = "../telaDeLogin/index.html";
    }
}

getLogado();

let voltar = document.querySelector("#voltar");
voltar.addEventListener("click",() => {
    location.href = "../areaDePesquisa/index.html";
});

let finalizar = document.querySelector("#finalizar");
finalizar.addEventListener("click",() => {
    location.href = "../agradecimento/index.html";
});
