let questions = [];
let currentStep = 0;

function addQuestion() {
    if (questions.length >= 15) {
        showNotification('Maximum 15 questions allowed!', 'warning');
        return;
    }
    
    // Save current step data before adding new question
    if (currentStep >= 0 && currentStep < questions.length) {
        saveCurrentStep();
    }
    
    questions.push({
        question: '',
        image: '',
        options: { A: '', B: '', C: '', D: '' },
        correct: ''
    });
    
    updateWizard();
    currentStep = questions.length - 1;
    showStep(currentStep);
}

function removeQuestion(index) {
    if (questions.length <= 1) {
        showNotification('At least 1 question required!', 'warning');
        return;
    }
    
    questions.splice(index, 1);
    if (currentStep >= questions.length) {
        currentStep = questions.length - 1;
    }
    updateWizard();
    showStep(currentStep);
}

function updateWizard() {
    const nav = document.getElementById('wizardNav');
    nav.innerHTML = '';
    
    questions.forEach((_, index) => {
        const step = document.createElement('div');
        step.className = `wizard-step ${index === currentStep ? 'active' : ''}`;
        step.textContent = `Q${index + 1}`;
        step.onclick = () => showStep(index);
        nav.appendChild(step);
    });
    
    updateButtons();
}

function showStep(step) {
    if (step < 0 || step >= questions.length) {
        console.log('Invalid step:', step, 'questions length:', questions.length);
        return;
    }
    
    // Save current step data
    if (currentStep >= 0 && currentStep < questions.length && currentStep !== step) {
        saveCurrentStep();
    }
    
    currentStep = step;
    console.log('Showing step:', step, 'question:', questions[step]);
    
    const content = document.getElementById('wizardContent');
    const question = questions[step];
    
    content.innerHTML = `
        <div class="question-card">
            <div class="question-number">Question ${step + 1}</div>
            <div class="form-group">
                <label class="form-label">Question</label>
                <input type="text" class="form-input" id="question_${step}" value="${question.question.replace(/"/g, '&quot;')}" placeholder="Enter your question" required>
            </div>
            <div class="form-group">
                <label class="form-label">Question Image (Optional)</label>
                <input type="file" class="form-input" id="questionImage_${step}" accept="image/*" style="padding: 0.5rem;">
                <div class="file-info" style="font-size: 0.8rem; color: #6c757d; margin-top: 0.3rem;">Max size: 10MB (JPG, PNG, GIF)</div>
                ${question.image ? `<div class="image-preview"><img src="${question.image}" alt="Question image" style="max-width: 100%; max-height: 500px; margin-top: 0.5rem; border-radius: 8px; border: 2px solid #e9ecef;"></div>` : ''}
            </div>
            <div class="options-grid">
                <input type="text" class="option-input option-a" id="optionA_${step}" value="${question.options.A.replace(/"/g, '&quot;')}" placeholder="Option A" required>
                <input type="text" class="option-input option-b" id="optionB_${step}" value="${question.options.B.replace(/"/g, '&quot;')}" placeholder="Option B" required>
                <input type="text" class="option-input option-c" id="optionC_${step}" value="${question.options.C.replace(/"/g, '&quot;')}" placeholder="Option C" required>
                <input type="text" class="option-input option-d" id="optionD_${step}" value="${question.options.D.replace(/"/g, '&quot;')}" placeholder="Option D" required>
            </div>
            <div class="correct-answer">
                <div class="form-label">Correct Answer</div>
                <div class="correct-options">
                    <div class="correct-option ${question.correct === 'A' ? 'selected' : ''}" onclick="selectCorrect(this, 'A')">A</div>
                    <div class="correct-option ${question.correct === 'B' ? 'selected' : ''}" onclick="selectCorrect(this, 'B')">B</div>
                    <div class="correct-option ${question.correct === 'C' ? 'selected' : ''}" onclick="selectCorrect(this, 'C')">C</div>
                    <div class="correct-option ${question.correct === 'D' ? 'selected' : ''}" onclick="selectCorrect(this, 'D')">D</div>
                </div>
                ${questions.length > 1 ? `<button type="button" class="btn btn-danger" onclick="removeQuestion(${step})" style="margin-top: 1rem; width: 100%;">🗑️ Delete Question</button>` : ''}
            </div>
        </div>
    `;
    
    updateWizard();
    setupImagePreview(step);
    
    // Ensure wizard navigation is updated
    document.querySelectorAll('.wizard-step').forEach((el, idx) => {
        el.classList.toggle('active', idx === step);
    });
}

function saveCurrentStep() {
    const step = currentStep;
    const question = questions[step];
    
    const questionEl = document.getElementById(`question_${step}`);
    const optionAEl = document.getElementById(`optionA_${step}`);
    const optionBEl = document.getElementById(`optionB_${step}`);
    const optionCEl = document.getElementById(`optionC_${step}`);
    const optionDEl = document.getElementById(`optionD_${step}`);
    
    // Save values as-is without any encoding/decoding
    if (questionEl) question.question = questionEl.value;
    // Image is already saved in setupImagePreview
    if (optionAEl) question.options.A = optionAEl.value;
    if (optionBEl) question.options.B = optionBEl.value;
    if (optionCEl) question.options.C = optionCEl.value;
    if (optionDEl) question.options.D = optionDEl.value;
}

function selectCorrect(element, answer) {
    element.parentNode.querySelectorAll('.correct-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    element.classList.add('selected');
    questions[currentStep].correct = answer;
}

function prevStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}

function nextStep() {
    if (currentStep < questions.length - 1) {
        showStep(currentStep + 1);
    }
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const addBtn = document.getElementById('addBtn');
    const createBtn = document.getElementById('createBtn');
    
    prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = currentStep === questions.length - 1 ? 'none' : 'inline-block';
    createBtn.style.display = currentStep === questions.length - 1 ? 'inline-block' : 'none';
    addBtn.textContent = questions.length >= 15 ? 'Max 15 Questions' : `+ Add Question (${questions.length}/15)`;
    addBtn.disabled = questions.length >= 15;
}

// Initialize with 1 question
if (questions.length === 0) {
    addQuestion();
} else {
    // If questions already exist (from import), show first one
    currentStep = 0;
    updateWizard();
    showStep(0);
}

// Add image preview functionality
function setupImagePreview(step) {
    const imageInput = document.getElementById(`questionImage_${step}`);
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            const previewContainer = this.parentNode.querySelector('.image-preview');
            
            if (previewContainer) {
                previewContainer.remove();
            }
            
            if (file) {
                // Check file size (10MB = 10 * 1024 * 1024 bytes)
                if (file.size > 10 * 1024 * 1024) {
                    showNotification('File size must be less than 10MB', 'error');
                    this.value = '';
                    return;
                }
                
                // Check file type
                if (!file.type.startsWith('image/')) {
                    showNotification('Please select an image file', 'error');
                    this.value = '';
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.createElement('div');
                    preview.className = 'image-preview';
                    preview.innerHTML = `<img src="${e.target.result}" alt="Question image" style="max-width: 100%; max-height: 500px; margin-top: 0.5rem; border-radius: 8px; border: 2px solid #e9ecef;">`;
                    imageInput.parentNode.appendChild(preview);
                    
                    // Store base64 data in question object
                    questions[step].image = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                // Clear image if no file selected
                questions[step].image = '';
            }
        });
    }
}

// Import/Export functions
function exportQuestions() {
    if (questions.length === 0) {
        showNotification('No questions to export!', 'warning');
        return;
    }
    
    saveCurrentStep();
    
    const exportData = {
        version: '1.0',
        created: new Date().toISOString(),
        questions: questions.map(q => ({
            question: q.question,
            options: q.options,
            correct: q.correct,
            image: q.image || ''
        }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-questions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importQuestions(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        let parsedQuestions = [];
        
        try {
            if (file.name.endsWith('.json')) {
                // JSON format
                const data = JSON.parse(content);
                if (!data.questions || !Array.isArray(data.questions)) {
                    throw new Error('Invalid JSON format');
                }
                parsedQuestions = data.questions;
            } else {
                // TXT format - parse simple text format
                parsedQuestions = parseTextQuestions(content);
            }
            
            // Validate questions
            const validQuestions = parsedQuestions.filter(q => 
                q.question && q.options && q.options.A && q.options.B && 
                q.options.C && q.options.D && q.correct
            );
            
            if (validQuestions.length === 0) {
                showNotification('No valid questions found in file!', 'error');
                return;
            }
            
            showConfirmDialog(`Import ${validQuestions.length} questions?`, 'This will replace current questions.', () => {
                questions = validQuestions.map(q => ({
                    question: q.question,
                    options: { A: q.options.A, B: q.options.B, C: q.options.C, D: q.options.D },
                    correct: q.correct,
                    image: q.image || ''
                }));
                
                // Reset to first question
                currentStep = 0;
                updateWizard();
                
                // Force show first question
                if (questions.length > 0) {
                    showStep(0);
                }
                
                showNotification(`Successfully imported ${questions.length} questions!`, 'success');
            });
        } catch (error) {
            showNotification('Error reading file. Please check the format.', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
}

function parseTextQuestions(content) {
    // Try Aiken format first
    const aikenQuestions = parseAikenFormat(content);
    if (aikenQuestions.length > 0) {
        return aikenQuestions;
    }
    
    // Fallback to simple format
    const questions = [];
    const lines = content.split('\n').map(line => line.trim()).filter(line => line);
    
    let currentQuestion = null;
    let optionCount = 0;
    
    for (let line of lines) {
        // Question line (starts with Q: or just text)
        if (line.match(/^Q\d*[:.]/i) || (!currentQuestion && !line.match(/^[A-D][:.]/i))) {
            if (currentQuestion && currentQuestion.question) {
                questions.push(currentQuestion);
            }
            currentQuestion = {
                question: line.replace(/^Q\d*[:.]/i, '').trim(),
                options: { A: '', B: '', C: '', D: '' },
                correct: '',
                image: ''
            };
            optionCount = 0;
        }
        // Option lines (A: B: C: D:)
        else if (line.match(/^[A-D][:.]/i) && currentQuestion) {
            const option = line.charAt(0).toUpperCase();
            const text = line.substring(2).trim();
            currentQuestion.options[option] = text;
            optionCount++;
        }
        // Answer line (Answer: A or *A or Correct: A)
        else if (line.match(/^(answer|correct|\*)[:.\\s]*[A-D]/i) && currentQuestion) {
            const match = line.match(/[A-D]/i);
            if (match) {
                currentQuestion.correct = match[0].toUpperCase();
            }
        }
        // Simple format: just 4 lines after question
        else if (currentQuestion && !currentQuestion.options.A && optionCount < 4) {
            const options = ['A', 'B', 'C', 'D'];
            currentQuestion.options[options[optionCount]] = line;
            optionCount++;
        }
    }
    
    // Add last question
    if (currentQuestion && currentQuestion.question) {
        questions.push(currentQuestion);
    }
    
    // Auto-assign correct answer if not specified (default to A)
    questions.forEach(q => {
        if (!q.correct) q.correct = 'A';
    });
    
    return questions;
}

function parseAikenFormat(content) {
    const questions = [];
    const blocks = content.split(/\n\s*\n/).filter(block => block.trim());
    
    for (let block of blocks) {
        const lines = block.split('\n').map(line => line.trim()).filter(line => line);
        if (lines.length < 6) continue; // Need question + 4 options + answer
        
        let questionText = '';
        let options = { A: '', B: '', C: '', D: '' };
        let correct = '';
        
        // First line is the question
        questionText = lines[0];
        
        // Parse options A-D
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            // Check for option format: A) text or A. text
            const optionMatch = line.match(/^([A-D])[.)\\s]\\s*(.+)$/);
            if (optionMatch) {
                options[optionMatch[1]] = optionMatch[2].trim();
            }
            
            // Check for answer format: ANSWER: C
            const answerMatch = line.match(/^ANSWER:\\s*([A-D])$/i);
            if (answerMatch) {
                correct = answerMatch[1].toUpperCase();
            }
        }
        
        // Validate and add question
        if (questionText && options.A && options.B && options.C && options.D && correct) {
            questions.push({
                question: questionText,
                options: options,
                correct: correct,
                image: ''
            });
        }
    }
    
    return questions;
}

document.getElementById('gameForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    saveCurrentStep();
    
    const hostName = document.getElementById('hostName').value;
    
    // Validate all questions
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q.question || !q.options.A || !q.options.B || !q.options.C || !q.options.D || !q.correct) {
            showNotification(`Please complete Question ${i + 1}`, 'error');
            showStep(i);
            return;
        }
    }
    
    try {
        const response = await fetch('/api/create-game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ host_name: hostName, questions: questions })
        });
        
        const data = await response.json();
        window.location.href = `/host/lobby/${data.pin}`;
    } catch (error) {
        showNotification('Error creating game. Please try again.', 'error');
    }
});

// Modern Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 400);
    }, 3000);
}

// Modern Confirmation Dialog
function showConfirmDialog(title, message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
        <div class="confirm-dialog">
            <div class="confirm-title">${title}</div>
            <div class="confirm-message">${message}</div>
            <div class="confirm-buttons">
                <button class="confirm-btn secondary" onclick="closeConfirmDialog()">Cancel</button>
                <button class="confirm-btn primary" onclick="confirmAction()">Confirm</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('show'), 100);
    
    window.closeConfirmDialog = () => {
        overlay.classList.remove('show');
        setTimeout(() => document.body.removeChild(overlay), 300);
        delete window.closeConfirmDialog;
        delete window.confirmAction;
    };
    
    window.confirmAction = () => {
        onConfirm();
        window.closeConfirmDialog();
    };
}