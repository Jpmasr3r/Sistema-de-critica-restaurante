async function getLogado() {
    let data = await fetch("../assets/php/get/getLogado.php").then(res => res.text());
    if(data == "Nao Logado") {
        location.href = "../telaDeLogin/index.html";
    }
}

getLogado();

let voltar = document.querySelector("#voltar");
voltar.addEventListener("click",() => {
    location.href = "../index.html";
});