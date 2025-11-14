document.addEventListener('DOMContentLoaded', function() {
  const prazoInput = document.getElementById('prazo');
  
  if (prazoInput) {
    const hoje = new Date().toISOString().split('T')[0];
    prazoInput.setAttribute('min', hoje);
  }

  // Confirmação antes de excluir
  const deleteForms = document.querySelectorAll('form[action*="/delete/"]');
  deleteForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
        e.preventDefault();
      }
    });
  });

  // Animação suave ao carregar a página
  const taskCards = document.querySelectorAll('.task-card');
  taskCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.5s ease';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    }, index * 100);
  });
});