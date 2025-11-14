const Task = require('../models/Task');

class TaskController {
  // Página inicial - Dashboard
  static index(req, res) {
    Task.getAll((err, tasks) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao buscar tarefas');
      }

      Task.countByStatus((err, stats) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Erro ao buscar estatísticas');
        }

        res.render('tasks/index', {
          tasks: tasks,
          stats: stats[0]
        });
      });
    });
  }

  // Exibir formulário de criação
  static createForm(req, res) {
    res.render('tasks/create');
  }

  // Salvar nova tarefa
  static store(req, res) {
    const { titulo, descricao, prazo } = req.body;

    if (!titulo || !prazo) {
      return res.status(400).send('Título e prazo são obrigatórios');
    }

    const data = { titulo, descricao, prazo };

    Task.create(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao criar tarefa');
      }
      res.redirect('/');
    });
  }

  // Exibir formulário de edição
  static editForm(req, res) {
    const { id } = req.params;

    Task.getById(id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao buscar tarefa');
      }

      if (results.length === 0) {
        return res.status(404).send('Tarefa não encontrada');
      }

      res.render('tasks/edit', { task: results[0] });
    });
  }

  // Atualizar tarefa
  static update(req, res) {
    const { id } = req.params;
    const { titulo, descricao, prazo } = req.body;

    if (!titulo || !prazo) {
      return res.status(400).send('Título e prazo são obrigatórios');
    }

    const data = { titulo, descricao, prazo };

    Task.update(id, data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao atualizar tarefa');
      }
      res.redirect('/');
    });
  }

  // Marcar como concluída
  static complete(req, res) {
    const { id } = req.params;

    Task.markAsCompleted(id, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao marcar tarefa como concluída');
      }
      res.redirect('/');
    });
  }

  // Excluir tarefa
  static delete(req, res) {
    const { id } = req.params;

    Task.delete(id, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao excluir tarefa');
      }
      res.redirect('/');
    });
  }
}

module.exports = TaskController;