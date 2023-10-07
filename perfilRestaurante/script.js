let area = document.querySelector("#areaCriticas");
let buttonPes = document.querySelector("#addCritica");
let critica = document.querySelector("#escreverCritica");
let nota = document.querySelector("#notaCritica");
let data = new Date();
let notaValue = 0;

buttonPes.addEventListener("click", () => {
  if (nota.value != "") {
    notaValue = nota.value;
  }

  if (notaValue >= 5) {
    notaValue = 5;
  }

  if (critica.value != "") {
    addCritica();
  }
});

function addCritica() {
  area.insertAdjacentHTML(
    "beforeend",
    `
        <div class="critica">
            <div class="usu">
                <img src="../src/img/perfil.png" alt="" class="perfilUsu">
                <a href="../perfil cliente/index.html">Você</a>
            </div>

            <div class="informacoes">
                <span>${notaValue}</span>
                ${addEstrelas()}
                <span>${
                  data.getDate() +
                  "/" +
                  (data.getMonth() + 1) +
                  "/" +
                  data.getFullYear()
                }</span>
                
            </div>

            <div class="texto">
                <span>${critica.value}</span>
            </div>

        </div>
    
    `
  );
}

function addEstrelas() {
  let estrelasAtivas = "";
  let estrelasInativas = "";

  for (i = 1; i <= notaValue; i++) {
    estrelasAtivas += `<img src="../src/img/estrelaAtiva.png" alt="" class="estrela">\n`;
  }

  for (i = 1; i <= 5 - notaValue; i++) {
    estrelasInativas += `<img src="../src/img/estrelaInativa.png" alt="" class="estrela">\n`;
  }

  return estrelasAtivas + estrelasInativas;
}
