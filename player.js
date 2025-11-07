document.getElementById('gamePin').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

document.getElementById('playerName').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9\u0E00-\u0E7F\s]/g, '');
});

document.getElementById('joinForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const pin = document.getElementById('gamePin').value;
    const name = document.getElementById('playerName').value.trim();
    const errorDiv = document.getElementById('error');
    const joinBtn = document.getElementById('joinBtn');
    
    if (pin.length !== 6) {
        showError('Game PIN must be 6 digits');
        return;
    }
    
    if (name.length < 2) {
        showError('Name must be at least 2 characters');
        return;
    }
    
    joinBtn.disabled = true;
    joinBtn.textContent = 'Joining...';
    errorDiv.style.display = 'none';
    
    try {
        const response = await fetch('/api/join-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin: pin, name: name })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('playerName', name);
            window.location.href = `/player/game/${pin}`;
        } else {
            showError(data.error || 'Failed to join game');
        }
    } catch (error) {
        showError('Connection error. Please try again.');
    } finally {
        joinBtn.disabled = false;
        joinBtn.textContent = '🚀 Join Game';
    }
});

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function exitLobby() {
    window.location.href = '/';
}

const randomNames = [
    'นักสู้', 'เทพเกม', 'ฮีโร่', 'นินจา', 'ซามูไร', 'มังกร', 'ฟีนิกซ์', 'เสือ',
    'หมาป่า', 'เหยี่ยว', 'ปลาฉลาม', 'สิงโต', 'เสือดาว', 'แพนด้า', 'โคอาล่า', 'ยูนิคอร์น',
    'ดาวเหนือ', 'ฟ้าร้อง', 'พายุ', 'แสงแดด', 'พระจันทร์', 'ดาวตก', 'รุ้ง', 'ลมแรง',
    'เพชร', 'ทอง', 'เงิน', 'ทับทิม', 'มรกต', 'ไข่มุก', 'คริสตัล', 'อำพัน',
    'Player', 'Gamer', 'Hero', 'Ninja', 'Dragon', 'Phoenix', 'Tiger', 'Wolf'
];

function generateRandomName() {
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomNum = Math.floor(Math.random() * 999) + 1;
    document.getElementById('playerName').value = randomName + randomNum;
}