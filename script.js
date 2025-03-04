// Sistema de Login
function checkPassword() {
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    const content = document.querySelector('.content');
    const loginContainer = document.querySelector('.login-container');

    if(password === 'lua123') {
        loginContainer.style.display = 'none';
        content.style.display = 'block';
        document.body.style.overflow = 'auto';
        initMatrix();
        initMenu();
    } else {
        errorMsg.textContent = 'Senha incorreta! Tente novamente.';
        errorMsg.style.display = 'block';
        document.getElementById('password').value = '';
        setTimeout(() => errorMsg.style.display = 'none', 2000);
    }
}

// Efeito Matrix
function initMatrix() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const chars = 'HQbeds0123456789@#$%&';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000';
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((drop, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drop * fontSize);

            if(drop * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    };

    setInterval(draw, 50);
}

function initMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const menuItems = document.querySelectorAll('.sidebar a'); // Seleciona os itens do menu

    // Fixar o menu
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.left = '0';
    sidebar.style.height = '100%';

    console.log('menuBtn:', menuBtn); // Adicionado para depuração
    console.log('sidebar:', sidebar); // Adicionado para depuração
    // Fechar menu ao clicar fora ou no documento
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && e.target !== menuBtn) {
            sidebar.classList.remove('active');
        }
    });

    // Fechar menu ao clicar em uma opção
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    });
}

// Event Listeners
document.getElementById('password').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') checkPassword();
});

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    document.onkeydown = (e) => {
        if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && [73,74].includes(e.keyCode))) {
            return false;
        }
    };

    // Inicializar o menu ao carregar a página
    initMenu();
});