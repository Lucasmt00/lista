const API_URL = 'https://crudcrud.com/api/cb14d33849254defa9ba28416cf405a9/usuarios';

function adicionarUsuarioNaTela(usuario) {
  const li = document.createElement('li');
  li.textContent = `${usuario.nome} - ${usuario.email} `;

  const botaoRemover = document.createElement('button');
  botaoRemover.textContent = '❌';
  botaoRemover.style.marginLeft = '10px';

  botaoRemover.addEventListener('click', () => {
    const confirmar = confirm(`Deseja realmente excluir o usuário ${usuario.nome}?`);
    if (!confirmar) return;

    fetch(`${API_URL}/${usuario._id}`, {
      method: 'DELETE',
    })
    .then(() => li.remove())
    .catch(() => alert('Erro ao excluir usuário'));
  });

  li.appendChild(botaoRemover);
  document.getElementById('listaUsuarios').appendChild(li);
}

function carregarUsuarios() {
  fetch(API_URL)
    .then(response => response.json())
    .then(usuarios => {
      document.getElementById('listaUsuarios').innerHTML = '';
      usuarios.forEach(adicionarUsuarioNaTela);
    })
    .catch(() => alert('Erro ao carregar usuários'));
}

document.getElementById('cadastrar').addEventListener('click', () => {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  if (!nome || !email) {
    alert('Preencha os dois campos!');
    return;
  }

  const usuario = { nome, email };

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  })
    .then(response => response.json())
    .then(dados => {
      adicionarUsuarioNaTela(dados);
      document.getElementById('nome').value = '';
      document.getElementById('email').value = '';
    })
    .catch(() => alert('Erro ao cadastrar usuário'));
});

window.addEventListener('DOMContentLoaded', carregarUsuarios);
