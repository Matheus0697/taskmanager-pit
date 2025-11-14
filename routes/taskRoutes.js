const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

// Rotas
router.get('/', TaskController.index);                    // Listar tarefas
router.get('/create', TaskController.createForm);         // Formulário criar
router.post('/store', TaskController.store);              // Salvar tarefa
router.get('/edit/:id', TaskController.editForm);         // Formulário editar
router.post('/update/:id', TaskController.update);        // Atualizar tarefa
router.post('/complete/:id', TaskController.complete);    // Marcar concluída
router.post('/delete/:id', TaskController.delete);        // Excluir tarefa

module.exports = router;
