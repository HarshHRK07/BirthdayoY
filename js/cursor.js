// Custom cursor functionality
document.addEventListener('DOMContentLoaded', function() {
  const cursors = document.querySelectorAll('.cursor');

  function updateCursorPosition(e) {
    if (e.type === 'mousemove') {
      cursors.forEach((cursor) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    }
  }

  document.addEventListener('mousemove', updateCursorPosition);
});