// Efeito Matrix
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let frame;

function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'HQbeds0123456789';
    const drops = Array(Math.floor(canvas.width/24)).fill(0);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Aumentar a opacidade do fundo
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000'; // Alterar a cor do texto para um vermelho mais vivo
        ctx.font = '16px monospace'; // Diminuir o tamanho das letras para 16px

        drops.forEach((drop, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * 24, drop * 24);
            
            if(drop * 24 > canvas.height || Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }

    function animate() {
        draw();
        frame = setTimeout(animate, 100); // Diminuir a velocidade de atualização
    }
    
    animate();
}

// Controles de Interface
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if(!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});

// Carregamento Otimizado
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src + '&autoplay=0&mute=1';
            observer.unobserve(iframe);
        }
    });
}, { threshold: 0.25 });

document.querySelectorAll('iframe').forEach(iframe => {
    observer.observe(iframe);
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initMatrix();
    window.addEventListener('resize', initMatrix);
});