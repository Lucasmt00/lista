function adicionarUsuarioNaTela(nome, email) {
  const li = document.createElement('li');
  li.textContent = `${nome} - ${email} `;

  // Criar botão de remover
  const botaoRemover = document.createElement('button');
  botaoRemover.textContent = '❌';
  botaoRemover.style.marginLeft = '10px';

  // Ação do botão
  botaoRemover.addEventListener('click', () => {
    // Confirmação antes de excluir
    const confirmar = confirm(`Deseja realmente excluir o usuário ${nome}?`);
    if (!confirmar) return;

    li.remove(); // remove da tela
    removerUsuarioDoLocalStorage(nome, email); // remove do localStorage
  });

  li.appendChild(botaoRemover);
  document.getElementById('listaUsuarios').appendChild(li);
}

function carregarUsuarios() {
  const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuariosSalvos.forEach((usuario) => {
    adicionarUsuarioNaTela(usuario.nome, usuario.email);
  });
}

function removerUsuarioDoLocalStorage(nome, email) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const novosUsuarios = usuarios.filter((usuario) => {
    return usuario.nome !== nome || usuario.email !== email;
  });

  localStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
}

document.getElementById('cadastrar').addEventListener('click', () => {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  if (!nome || !email) {
    alert('Preencha os dois campos!');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.push({ nome, email });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  adicionarUsuarioNaTela(nome, email);

  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
});

// Carregar usuários salvos ao abrir a página
window.addEventListener('DOMContentLoaded', carregarUsuarios);
