let clientes = [
  {
    nome: "Roberto Carlos",
    src: "../src/img/pessoas/pessoa1.png",
  },

  {
    nome: "Socrates",
    src: "../src/img/pessoas/pessoa2.png",
  },

  {
    nome: "Albert Einstein",
    src: "../src/img/pessoas/pessoa3.png",
  },

  {
    nome: "Miguel",
    src: "../src/img/pessoas/pessoa7.png",
  },
];

let criticos = [
  {
    nome: "Érick Jacquin",
    src: "../src/img/pessoas/pessoa4.png",
  },

  {
    nome: "Rato Ratatuile",
    src: "../src/img/pessoas/pessoa5.png",
  },

  {
    nome: "James da Salada de Fruta",
    src: "../src/img/pessoas/pessoa6.png",
  },
];

let restaurantes = [
  {
    nome: "Restaurante da Praia",
    nota: 2,
    src: "../src/img/restaurantes/restaurante1.png",
  },

  {
    nome: "Restaurante da Floresta",
    nota: 4,
    src: "../src/img/restaurantes/restaurante2.png",
  },
];

let tipo = document.getElementsByName("tipo");
let buttonPes = document.querySelector("#buttonPes");
let area = document.querySelector("#area");
let textoPes = document.querySelector("#texto");

printTodos();

buttonPes.addEventListener("click", () => {
  area.innerHTML = "";
  for (let i = 0; i < tipo.length; i++) {
    if (tipo[i].checked) {
      switch (tipo[i].value) {
        case "nenhum":
          printTodos();
          break;

        case "restaurante":
          printRestaurantes();
          break;

        case "cliente":
          printClientes();
          break;

        case "critico":
          printCriticos();
          break;
      }
    }
  }
});

function printClientes() {
  if (textoPes.value.length > 0) {
    clientes.forEach((obj) => {
      if (
        obj.nome
          .toLocaleLowerCase()
          .startsWith(textoPes.value.toLocaleLowerCase())
      ) {
        area.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="link pessoa">
                        <img src="${obj.src}" alt="">
                        <a href="../perfil cliente/index.html">${obj.nome}</a>
                        <span class="tipo">Cliente</span>
                    </div>
            
            
                    `
        );
      }
    });
  } else {
    clientes.forEach((obj) => {
      area.insertAdjacentHTML(
        "beforeend",
        `
                <div class="link pessoa">
                    <img src="${obj.src}" alt="">
                    <a href="../perfil cliente/index.html">${obj.nome}</a>
                    <span class="tipo">Cliente</span>
                </div>
        
        
            `
      );
    });
  }
}

function printCriticos() {
  if (textoPes.value.length > 0) {
    criticos.forEach((obj) => {
      if (
        obj.nome
          .toLocaleLowerCase()
          .startsWith(textoPes.value.toLocaleLowerCase())
      ) {
        area.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="link critico">
                        <img src="${obj.src}" alt="">
                        <a href="../perfil cliente/index.html">${obj.nome}</a>
                        <span class="tipo">Critico</span>
                    </div>
                
                `
        );
      }
    });
  } else {
    criticos.forEach((obj) => {
      if (
        obj.nome
          .toLocaleLowerCase()
          .startsWith(textoPes.value.toLocaleLowerCase())
      ) {
        area.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="link critico">
                        <img src="${obj.src}" alt="">
                        <a href="../perfil cliente/index.html">${obj.nome}</a>
                        <span class="tipo">Critico</span>
                    </div>
                
                `
        );
      }
    });
  }
}

function printRestaurantes() {
  if (textoPes.value.length > 0) {
    restaurantes.forEach((obj) => {
      if (
        obj.nome
          .toLocaleLowerCase()
          .startsWith(textoPes.value.toLocaleLowerCase())
      ) {
        area.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="link restaurante">
                        <img src="${obj.src}" alt="">
                        <a href="../perfil restaurante/index.html">${
                          obj.nome
                        }</a>
                        <div class="nota">
                            ${addEstrelas(obj)}
                        </div>
                        <span class="tipo">Restaurante</span>
                    </div>
                
                
                `
        );
      }
    });
  } else {
    restaurantes.forEach((obj) => {
      if (
        obj.nome
          .toLocaleLowerCase()
          .startsWith(textoPes.value.toLocaleLowerCase())
      ) {
        area.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="link restaurante">
                        <img src="${obj.src}" alt="">
                        <a href="../perfil restaurante/index.html">${
                          obj.nome
                        }</a>
                        <div class="nota">
                            ${addEstrelas(obj)}
                        </div>
                        <span class="tipo">Restaurante</span>
                    </div>
                
                
                `
        );
      }
    });
  }
}

function printTodos() {
  area.innerHTML = "";
  printClientes();
  printRestaurantes();
  printCriticos();
}

function addEstrelas(obj) {
  let estrelasAtivas = "";
  let estrelasInativas = "";

  for (i = 1; i <= obj.nota; i++) {
    estrelasAtivas += `<img src="../src/img/estrelaAtiva.png" alt="" class="estrela">\n`;
  }

  for (i = 1; i <= 5 - obj.nota; i++) {
    estrelasInativas += `<img src="../src/img/estrelaInativa.png" alt="" class="estrela">\n`;
  }

  return estrelasAtivas + estrelasInativas;
}
