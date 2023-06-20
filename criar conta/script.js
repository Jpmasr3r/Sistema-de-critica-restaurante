let usuario = {};

let buttonCriar = document.querySelector("#buttonCriar");
let nome = document.querySelector("#nome");
let telefone = document.querySelector("#telefone");
let email = document.querySelector("#email");
let senha = document.querySelector("#senha");

buttonCriar.addEventListener("click", addConta);

function addConta() {
  usuario = {
    nome: nome.value,
    telefone: telefone.value,
    email: email.value,
    senha: senha.value,
  };

  console.log(usuario);
}
