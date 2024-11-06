import { io } from 'socket.io-client';

// Função para recuperar o usuário autenticado, exemplo de como pegar de um contexto ou cookies
const getUser = () => {
  // Aqui você pode pegar os dados do usuário de onde ele estiver armazenado
  // Exemplo: se você tiver um contexto de usuário ou cookies:
  const userFromContext = { id: "user-id-aqui", name: "Nome do usuário" }; // Substitua com dados reais
  return userFromContext;
};

const user = getUser(); // Pegue o usuário autenticado dinamicamente

// Verifique se o usuário está definido corretamente
if (!user || !user.id || !user.name) {
  console.error('Dados de usuário inválidos', user);
  // Se o usuário não estiver autenticado, você pode redirecionar ou não permitir a conexão
  throw new Error('Usuário não autenticado');
}

const socket = io('http://localhost:8888', {
  auth: { user }  // Enviar o usuário com id e name
});

socket.on('connect', () => {
  console.log('Conectado ao servidor com id:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Desconectado do servidor');
});

socket.on('connect_error', (err) => {
  console.error('Erro de conexão:', err);
});

export default socket;
