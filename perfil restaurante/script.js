let area = document.querySelector("#areaCriticas");
let buttonPes = document.querySelector("#addCritica");
let critica = document.querySelector("#escreverCritica");
let nota = document.querySelector("#notaCritica");
let data = new Date();

buttonPes.addEventListener("click", () => {
  addCritica();
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
                <span>${nota.value}</span>
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

  for (i = 1; i <= nota.value; i++) {
    if (i <= 5) {
      estrelasAtivas += `<img src="../src/img/estrelaAtiva.png" alt="" class="estrela">\n`;
    } else {
      estrelasAtivas += `<img src="../src/img/estrelaAtivaCritico.png" alt="" class="estrela">\n`;
    }
  }

  for (i = 1; i <= 5 - nota.value; i++) {
    estrelasInativas += `<img src="../src/img/estrelaInativa.png" alt="" class="estrela">\n`;
  }

  return estrelasAtivas + estrelasInativas;
}
