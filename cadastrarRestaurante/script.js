let nomeRestaurante = document.querySelector("#nomeRestaurante");
let enderecoRestaurante = document.querySelector("#enderecoRestaurante");
let fotoRestaurante = document.querySelector("#fotoRestaurante");
let submit = document.querySelector("#submit");

let voltar = document.querySelector("#voltar");
voltar.addEventListener("click",() => {
    location.href = "../perfil/index.html";
})

let logado = localStorage.getItem("logado");
if (!logado) {
    logado = "";
} else {
    logado = JSON.parse(logado);
}

let erroTexto = document.querySelector("#erroTexto");

submit.addEventListener("click", () => {
    if (nomeRestaurante.value != "" &&
        enderecoRestaurante.value != "" &&
        fotoRestaurante.value != "" &&
        logado != "") {
        let restaurante = {
            nome: nomeRestaurante.value,
            endereco: enderecoRestaurante.value,
            foto: fotoRestaurante.files[0],
            dono: logado.id,
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

    let data = await fetch("../assets/php/addRestaurante.php", {
        method: "POST",
        body: formData,
    }).then(res => res.json());

    console.log(data);

    erroTexto.style.display = "flex";
    erroTexto.innerHTML = data.status;

    if(data.status == "Usuario cadastrado com sucesso") {
        location.href = "../telaDeLogin/index.html";
    }
}

