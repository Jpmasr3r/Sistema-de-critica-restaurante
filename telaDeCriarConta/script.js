let user = {
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    tipo: "",
    foto: "",
}

let nome = document.querySelector("#nome");
let email = document.querySelector("#email");
let telefone = document.querySelector("#telefone");
let senha = document.querySelector("#senha");
let Vsenha = document.querySelector("#Vsenha");
let selecao = document.querySelectorAll(".selecao");
let foto = document.querySelector("#foto");

let erroTexto = document.querySelector("#erroTexto");
let erroSenha = document.querySelector("#erroSenha");

let logar = document.querySelector("#logar");
logar.addEventListener("click", () => {
    location.href = "../telaDeLogin/index.html";
})

let addConta = document.querySelector("#addConta");
addConta.addEventListener("click", () => {
    if (nome.value != "" &&
        email.value != "" &&
        telefone.value != "" &&
        senha.value != "" &&
        Vsenha.value != "" &&
        (selecao[0].checked || selecao[1].checked) &&
        foto.value != "") {

        erroTexto.style.display = "none";

        if (senha.value == Vsenha.value) {
            erroSenha.style.display = "none";

            user.nome = nome.value;
            user.email = email.value;
            user.telefone = telefone.value;
            user.senha = senha.value;
            selecao.forEach((e) => {
                if (e.checked) {
                    user.tipo = e.value
                }
            })

            user.foto = foto.value;

            let query = new URLSearchParams(user).toString();
            let url = `add.php?${query}`;

            add(url);
            
            // location.href = "../telaDeLogin/index.html";
        } else {
            erroSenha.style.display = "inherit";
        }



    } else {
        erroTexto.style.display = "inherit";
    }
})

async function add(url) {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
}




