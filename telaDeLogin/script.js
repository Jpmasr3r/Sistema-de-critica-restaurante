let clientes = [];
clientes = localStorage.getItem("clientes");

let criticos = [];
criticos = localStorage.getItem("criticos");

let usuarios = clientes+criticos;
usuarios = JSON.parse(usuarios);

