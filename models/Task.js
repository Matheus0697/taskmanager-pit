const db = require('../config/database');

class Task {
  // Buscar todas as tarefas
  static getAll(callback) {
    const query = 'SELECT * FROM tarefas ORDER BY data_criacao DESC';
    db.query(query, callback);
  }

  // Buscar tarefa por ID
  static getById(id, callback) {
    const query = 'SELECT * FROM tarefas WHERE id = ?';
    db.query(query, [id], callback);
  }

  // Criar nova tarefa
  static create(data, callback) {
    const query = 'INSERT INTO tarefas (titulo, descricao, prazo) VALUES (?, ?, ?)';
    db.query(query, [data.titulo, data.descricao, data.prazo], callback);
  }

  // Atualizar tarefa
  static update(id, data, callback) {
    const query = 'UPDATE tarefas SET titulo = ?, descricao = ?, prazo = ? WHERE id = ?';
    db.query(query, [data.titulo, data.descricao, data.prazo, id], callback);
  }

  // Marcar como concluída
  static markAsCompleted(id, callback) {
    const query = 'UPDATE tarefas SET status = "Concluída" WHERE id = ?';
    db.query(query, [id], callback);
  }

  // Excluir tarefa
  static delete(id, callback) {
    const query = 'DELETE FROM tarefas WHERE id = ?';
    db.query(query, [id], callback);
  }

  // Contar tarefas por status
  static countByStatus(callback) {
    const query = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Pendente' THEN 1 ELSE 0 END) as pendentes,
        SUM(CASE WHEN status = 'Concluída' THEN 1 ELSE 0 END) as concluidas
      FROM tarefas
    `;
    db.query(query, callback);
  }
}

module.exports = Task;