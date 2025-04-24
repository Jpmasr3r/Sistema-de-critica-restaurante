async function getLogado() {
    let data = await fetch("../api/getLogado.php").then(res => res.text());
    if(data == "Nao Logado") {
        location.href = "../telaDeLogin/index.html";
    }
}

getLogado();

let nomeRestaurante = document.querySelector("#nomeRestaurante");
let enderecoRestaurante = document.querySelector("#enderecoRestaurante");
let fotoRestaurante = document.querySelector("#fotoRestaurante");
let submit = document.querySelector("#submit");

let voltar = document.querySelector("#voltar");
voltar.addEventListener("click",() => {
    location.href = "../perfil/index.html";
})

let erroTexto = document.querySelector("#erroTexto");

submit.addEventListener("click", () => {
    if (nomeRestaurante.value != "" &&
        enderecoRestaurante.value != "" &&
        fotoRestaurante.value != "") {
        let restaurante = {
            nome: nomeRestaurante.value,
            endereco: enderecoRestaurante.value,
            foto: fotoRestaurante.files[0],
            nota: 0,
        }

        addRestaurante(restaurante);
    } else {
        console.log("erro");
    }
});

async function addRestaurante(restaurante) {
    let formData = new FormData();
    for (const i in restaurante) {
        let e = restaurante[i];
        formData.append(i, e);
    }

    let data = await fetch("../api/setRestaurante.php", {
        method: "POST",
        body: formData,
    }).then(res => res.text());

    erroTexto.style.display = "flex";
    erroTexto.innerHTML = data;

    console.log(data);
    if(data == "OK") {
        location.href = "../areaDePesquisa/index.html";
    }
}

