import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'; // Importe o CORS

const app = express();
const prisma = new PrismaClient();

// Configuração do CORS para permitir requisições do front-end
app.use(cors({
  origin: process.env.APP_URL || '*'  // Substitua pela URL do seu front-end
}));

// Permitir JSON no corpo das requisições
app.use(express.json());

app.get('/usuarios', async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  .then(() => res.status(201).send('Usuário criado com sucesso'))
  .catch((e) => res.status(500).send(`Erro ao criar usuário: ${e}`));
});

app.put('/usuarios/:id', async (req, res) => {
  await prisma.user.update({
    where: { id: req.params.id },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  .then(() => res.status(201).send('Dados editados com sucesso'))
  .catch((e) => res.status(500).send(`Erro ao editar dados: ${e}`));
});

app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: { id: req.params.id }
  })
  .then(() => res.status(201).send('Usuário excluído com sucesso'))
  .catch(e => res.status(500).send(`Erro ao excluir usuário: ${e}`));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
