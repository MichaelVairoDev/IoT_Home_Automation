// Configuración del gráfico de consumo energético
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('energyChart').getContext('2d');
    const energyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Consumo (kWh)',
                data: [1.2, 0.8, 1.5, 2.1, 1.9, 2.4],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
});

// Control por voz
const voiceControlBtn = document.getElementById('voiceControlBtn');
let isListening = false;

voiceControlBtn.addEventListener('click', function() {
    if (!isListening) {
        startVoiceRecognition();
    } else {
        stopVoiceRecognition();
    }
});

function startVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-ES';

        recognition.onstart = function() {
            isListening = true;
            voiceControlBtn.classList.add('bg-red-600');
            voiceControlBtn.innerHTML = '<i class="fas fa-microphone-slash mr-2"></i>Detener';
        };

        recognition.onend = function() {
            isListening = false;
            voiceControlBtn.classList.remove('bg-red-600');
            voiceControlBtn.classList.add('bg-blue-600');
            voiceControlBtn.innerHTML = '<i class="fas fa-microphone mr-2"></i>Control por Voz';
        };

        recognition.onresult = function(event) {
            const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
            processVoiceCommand(command);
        };

        recognition.start();
    } else {
        alert('Tu navegador no soporta el reconocimiento de voz.');
    }
}

function stopVoiceRecognition() {
    if (recognition) {
        recognition.stop();
    }
}

function processVoiceCommand(command) {
    // Ejemplos de comandos de voz
    if (command.includes('encender luz') || command.includes('prender luz')) {
        // Lógica para encender luz
        console.log('Encendiendo luz...');
    } else if (command.includes('apagar luz')) {
        // Lógica para apagar luz
        console.log('Apagando luz...');
    } else if (command.includes('temperatura')) {
        // Lógica para mostrar temperatura
        console.log('La temperatura actual es 23°C');
    }
}

// Manejo de interruptores de dispositivos
document.querySelectorAll('input[type="checkbox"]').forEach(switch_ => {
    switch_.addEventListener('change', function() {
        const deviceCard = this.closest('.device-card');
        if (deviceCard) {
            const statusText = deviceCard.querySelector('p.text-sm');
            if (this.checked) {
                statusText.textContent = 'Encendido';
                deviceCard.classList.add('border-blue-500');
            } else {
                statusText.textContent = 'Apagado';
                deviceCard.classList.remove('border-blue-500');
            }
        }
    });
});