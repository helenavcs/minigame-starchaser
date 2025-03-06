document.addEventListener('DOMContentLoaded', function() {
    const text = document.querySelector('.wave-text');
    const textContent = text.textContent;
    text.innerHTML = '';

    for (let i = 0; i < textContent.length; i++) {
        const span = document.createElement('span');
        span.textContent = textContent[i];
        if (textContent[i] === ' ') {
            span.style.width = '0.0em'; // Define a largura do espaço
        }
        span.style.animationDelay = `${i * 0.1}s`;
        text.appendChild(span);
    }
});
