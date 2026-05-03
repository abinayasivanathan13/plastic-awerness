const STORAGE_KEY = 'plasticAwarenessComments';
const commentForm = document.getElementById('commentForm');
const commentResult = document.getElementById('commentResult');

function getSavedComments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function saveComments(comments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

function renderComments() {
  const savedComments = getSavedComments();
  const container = document.getElementById('savedComments');

  if (!container) return;

  if (savedComments.length === 0) {
    container.innerHTML = '<h3>No comments yet.</h3>';
    return;
  }

  const html = ['<h3>Saved Comments</h3>'];
  savedComments.slice().reverse().forEach((item) => {
    html.push(
      `<div class="comment-item"><p>${item.text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p><time>${new Date(item.createdAt).toLocaleString()}</time></div>`
    );
  });

  container.innerHTML = html.join('');
}

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const commentValue = document.getElementById('comment').value.trim();

  if (!commentValue) {
    commentResult.textContent = 'Please write a comment before submitting.';
    commentResult.style.color = '#891bf0';
    return;
  }

  const savedComments = getSavedComments();
  savedComments.push({ text: commentValue, createdAt: new Date().toISOString() });
  saveComments(savedComments);
  renderComments();

  commentResult.textContent = 'Thank you for your comment! Your feedback is saved.';
  commentResult.style.color = '#047857';
  commentForm.reset();
});

renderComments();
