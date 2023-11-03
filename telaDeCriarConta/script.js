let nome = document.querySelector("#nome");
let email = document.querySelector("#email");
let telefone = document.querySelector("#telefone");
let senha = document.querySelector("#senha");
let Vsenha = document.querySelector("#Vsenha");
let selecao = document.querySelectorAll(".selecao");
let foto = document.querySelector("#foto");
let form = document.querySelector('form');


let erroTexto = document.querySelector("#erroTexto");

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

            let user = {
                nome: nome.value,
                email: email.value,
                telefone: telefone.value,
                senha: senha.value,
                tipo: "",
                foto: foto.files[0],
            }

            selecao.forEach((e) => {
                if (e.checked) {
                    user.tipo = e.value
                }
            })

            add(user);

            // add(`../assets/php/addUser.php?${new URLSearchParams(user)}`);

        } else {
            erroTexto.style.display = "flex";
            erroTexto.innerHTML = "Senhas não são iguais";
        }



    } else {
        erroTexto.style.display = "flex";
        erroTexto.innerHTML = "Valores não preenchidos";
    }
})

async function add(user) {
    const formData = new FormData
    formData.append("nome",user.nome);
    formData.append("email",user.email);
    formData.append("telefone",user.telefone);
    formData.append("senha",user.senha);
    formData.append("tipo",user.tipo);
    formData.append("foto",user.foto);

    let data = await fetch("../assets/php/addUser.php",{
        method: "POST",
        body: formData,
    }).then(res => res.json());
    console.log(data);

    // let data = await fetch(url).then(res => res.text());
    // console.log(data);

    if (data.status == "Usuario já cadastrado") {
        erroTexto.style.display = "flex";
        erroTexto.innerHTML = data.status;

    } else if (data.status == "Sucess") {
        erroTexto.style.display = "flex";
        erroTexto.innerHTML = data.status;
        location.href = "../telaDeLogin/index.html";
    }
}




