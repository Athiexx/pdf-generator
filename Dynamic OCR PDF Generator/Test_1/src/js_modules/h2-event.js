document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('h2');

    textElement.addEventListener('mouseover', () => {
        textElement.style.border = "1px black solid";
        textElement.style.width = "fit-content";
        textElement.style.padding = "0.35em 0.7em";
        textElement.style.transform = 'scale(1.15)';
        textElement.classList.add('grow-shadow');
    });

    textElement.addEventListener('mouseout', () => {
        textElement.style.color = '';
        textElement.style.border = "";
        textElement.style.padding = "";
        textElement.style.width = "";
        textElement.classList.remove('grow-shadow');
        textElement.style.transform = 'scale(1)';
        textElement.style.transition = 'transform 0.3s ease;';
    });

});