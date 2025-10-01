// AnxietyAid Application JavaScript

class AnxietyAid {
    constructor() {
        this.currentScreen = 'welcome';
        this.assessmentProgress = 0;
        this.assessmentData = {};
        this.userData = null;
        this.situations = [];
        this.currentSituation = null;
        
        // Assessment questions from the provided data with additional ones
        this.assessmentQuestions = [
            {
                id: "gad1",
                question: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious or on edge?",
                type: "scale",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
                category: "general_anxiety"
            },
            {
                id: "gad2",
                question: "Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?",
                type: "scale",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
                category: "general_anxiety"
            },
            {
                id: "gad3",
                question: "Over the last 2 weeks, how often have you been bothered by worrying too much about different things?",
                type: "scale",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
                category: "general_anxiety"
            },
            {
                id: "iu1", 
                question: "Uncertainty makes me uneasy, anxious, or stressed",
                type: "agreement",
                options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
                category: "uncertainty_intolerance"
            },
            {
                id: "iu2",
                question: "I can't stand being taken by surprise",
                type: "agreement",
                options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
                category: "uncertainty_intolerance"
            },
            {
                id: "iu3",
                question: "I should be able to organize everything in advance",
                type: "agreement",
                options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
                category: "uncertainty_intolerance"
            },
            {
                id: "dm1",
                question: "I find it difficult to make decisions when I don't have all the information",
                type: "agreement", 
                options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
                category: "decision_making"
            },
            {
                id: "dm2",
                question: "I tend to postpone decisions until I have more certainty",
                type: "agreement",
                options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
                category: "decision_making"
            },
            {
                id: "triggers",
                question: "Which situations typically make you most anxious? (Select all that apply)",
                type: "multiple_choice",
                options: [
                    "Job interviews or career decisions",
                    "Health concerns or medical tests", 
                    "Relationship conflicts or changes",
                    "Financial decisions or money concerns",
                    "Major life transitions",
                    "Social situations with unfamiliar people",
                    "Making plans without knowing all details",
                    "Waiting for important news or results"
                ],
                category: "triggers"
            },
            {
                id: "support",
                question: "How would you rate your current support system?",
                type: "scale",
                options: ["Very poor", "Poor", "Fair", "Good", "Excellent"],
                category: "support"
            },
            {
                id: "coping_current",
                question: "What do you currently do when feeling anxious? (Select all that apply)",
                type: "multiple_choice",
                options: [
                    "Deep breathing exercises",
                    "Talk to friends or family",
                    "Physical exercise",
                    "Avoid the situation",
                    "Try to distract myself",
                    "Write or journal",
                    "Listen to music",
                    "Nothing specific"
                ],
                category: "current_coping"
            },
            {
                id: "goals",
                question: "What would you most like to improve?",
                type: "single_choice",
                options: [
                    "Managing uncertainty better",
                    "Making decisions more confidently", 
                    "Reducing overall anxiety levels",
                    "Handling specific triggering situations",
                    "Building better coping strategies"
                ],
                category: "goals"
            }
        ];

        this.copingStrategies = [
            {
                id: "grounding_54321",
                name: "5-4-3-2-1 Grounding Technique",
                category: "grounding",
                description: "Focus on 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, 1 thing you can taste",
                steps: [
                    "Take a deep breath and look around you",
                    "Name 5 things you can see in detail",
                    "Touch 4 different objects and notice their texture",
                    "Listen for 3 different sounds around you",
                    "Identify 2 things you can smell",
                    "Notice 1 thing you can taste"
                ],
                timeEstimate: "3-5 minutes",
                effectiveness: {"uncertainty": 8, "decision_anxiety": 6, "general_anxiety": 9}
            },
            {
                id: "thought_challenge",
                name: "Thought Challenging",
                category: "cognitive",
                description: "Question and reframe anxious thoughts about uncertain situations",
                steps: [
                    "Identify the specific worried thought",
                    "Ask: What evidence supports this thought?",
                    "Ask: What evidence goes against this thought?", 
                    "Consider: What would I tell a friend in this situation?",
                    "Create a more balanced, realistic thought"
                ],
                timeEstimate: "5-10 minutes",
                effectiveness: {"uncertainty": 9, "decision_anxiety": 8, "general_anxiety": 7}
            },
            {
                id: "breathing_exercise",
                name: "Box Breathing",
                category: "physiological",
                description: "Structured breathing pattern to calm the nervous system",
                steps: [
                    "Inhale for 4 counts",
                    "Hold your breath for 4 counts",
                    "Exhale for 4 counts",
                    "Hold empty for 4 counts",
                    "Repeat 5-10 times"
                ],
                timeEstimate: "3-5 minutes",
                effectiveness: {"uncertainty": 6, "decision_anxiety": 7, "general_anxiety": 9}
            },
            {
                id: "uncertainty_acceptance",
                name: "Uncertainty Acceptance Statements",
                category: "acceptance",
                description: "Practice accepting uncertainty as a normal part of life",
                steps: [
                    "Remind yourself: 'Uncertainty is a normal part of life'",
                    "Say: 'I can handle whatever comes my way'",
                    "Think: 'Not knowing everything is okay'",
                    "Focus on what you can control right now",
                    "Take one small action despite the uncertainty"
                ],
                timeEstimate: "2-3 minutes",
                effectiveness: {"uncertainty": 10, "decision_anxiety": 8, "general_anxiety": 6}
            }
        ];

        this.commonTriggers = [
            "Job interviews or career decisions",
            "Health concerns or medical tests", 
            "Relationship conflicts or changes",
            "Financial decisions or money concerns",
            "Major life transitions",
            "Social situations with unfamiliar people",
            "Making plans without knowing all details",
            "Waiting for important news or results"
        ];

        this.symptoms = [
            "Racing heart or palpitations",
            "Sweating or trembling", 
            "Difficulty concentrating",
            "Muscle tension",
            "Restlessness or feeling on edge",
            "Sleep disturbances",
            "Digestive issues",
            "Avoidance behaviors"
        ];

        this.emergencyResources = [
            {
                name: "Crisis Text Line",
                contact: "Text HOME to 741741",
                description: "24/7 crisis support via text message"
            },
            {
                name: "National Suicide Prevention Lifeline", 
                contact: "988",
                description: "24/7 free and confidential support"
            },
            {
                name: "SAMHSA National Helpline",
                contact: "1-800-662-4357",
                description: "Treatment referral and information service"
            }
        ];

        this.breathingTimer = null;
        this.breathingCycles = 0;
        this.breathingActive = false;
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.bindEvents();
        this.determineInitialScreen();
        this.populateEmergencyResources();
    }

    loadUserData() {
        const stored = localStorage.getItem('anxietyaid_user_data');
        if (stored) {
            this.userData = JSON.parse(stored);
        }

        const storedSituations = localStorage.getItem('anxietyaid_situations');
        if (storedSituations) {
            this.situations = JSON.parse(storedSituations);
        }
    }

    saveUserData() {
        localStorage.setItem('anxietyaid_user_data', JSON.stringify(this.userData));
    }

    saveSituations() {
        localStorage.setItem('anxietyaid_situations', JSON.stringify(this.situations));
    }

    determineInitialScreen() {
        if (this.userData && this.userData.assessmentCompleted) {
            this.showScreen('dashboard');
            this.updateDashboard();
        } else {
            this.showScreen('welcome');
        }
    }

    bindEvents() {
        // Welcome screen
        document.getElementById('get-started-btn').addEventListener('click', () => {
            this.startAssessment();
        });

        document.getElementById('returning-user-btn').addEventListener('click', () => {
            if (this.userData && this.userData.assessmentCompleted) {
                this.showScreen('dashboard');
                this.updateDashboard();
            } else {
                this.startAssessment();
            }
        });

        // Assessment navigation
        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('prev-question').addEventListener('click', () => {
            this.prevQuestion();
        });

        // Dashboard actions
        document.getElementById('log-situation-btn').addEventListener('click', () => {
            this.showScreen('situation');
            this.setupSituationForm();
        });

        document.getElementById('quick-mood-btn').addEventListener('click', () => {
            this.quickMoodCheck();
        });

        document.getElementById('breathing-exercise-btn').addEventListener('click', () => {
            this.showBreathingModal();
        });

        // Situation form
        document.getElementById('situation-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSituation();
        });

        document.getElementById('cancel-situation').addEventListener('click', () => {
            this.showScreen('dashboard');
        });

        // Anxiety level slider
        document.getElementById('anxiety-level').addEventListener('input', (e) => {
            document.getElementById('anxiety-value').textContent = e.target.value;
        });

        // Emergency support
        document.getElementById('emergency-btn').addEventListener('click', () => {
            this.showEmergencyModal();
        });

        document.getElementById('close-emergency').addEventListener('click', () => {
            this.hideModal('emergency-modal');
        });

        document.getElementById('start-grounding').addEventListener('click', () => {
            this.startGroundingExercise();
        });

        // Breathing exercise
        document.getElementById('close-breathing').addEventListener('click', () => {
            this.hideModal('breathing-modal');
            this.stopBreathingExercise();
        });

        document.getElementById('start-breathing').addEventListener('click', () => {
            this.startBreathingExercise();
        });

        document.getElementById('stop-breathing').addEventListener('click', () => {
            this.stopBreathingExercise();
        });

        // Recommendations
        document.getElementById('back-to-dashboard').addEventListener('click', () => {
            this.showScreen('dashboard');
            this.updateDashboard();
        });

        document.getElementById('rate-effectiveness').addEventListener('click', () => {
            this.showEffectivenessRating();
        });

        // Bottom navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const screen = e.currentTarget.getAttribute('data-screen');
                this.navigateToScreen(screen);
            });
        });

        // Modal close on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                }
            });
        });
    }

    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;

        // Show/hide bottom navigation
        const bottomNav = document.getElementById('bottom-nav');
        if (['dashboard', 'situation', 'progress'].includes(screenName)) {
            bottomNav.style.display = 'flex';
            this.updateNavigation();
        } else {
            bottomNav.style.display = 'none';
        }
    }

    updateNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === this.currentScreen) {
                item.classList.add('active');
            }
        });
    }

    navigateToScreen(screenName) {
        if (screenName === 'dashboard') {
            this.showScreen('dashboard');
            this.updateDashboard();
        } else if (screenName === 'situation') {
            this.showScreen('situation');
            this.setupSituationForm();
        } else if (screenName === 'progress') {
            this.showScreen('progress');
            this.updateProgressScreen();
        }
    }

    startAssessment() {
        this.showScreen('assessment');
        this.assessmentProgress = 0;
        this.assessmentData = {};
        this.renderQuestion();
    }

    renderQuestion() {
        const question = this.assessmentQuestions[this.assessmentProgress];
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <div class="question-title">${question.question}</div>
            <div class="question-options" id="question-options"></div>
        `;

        const optionsContainer = document.getElementById('question-options');
        
        if (question.type === 'multiple_choice') {
            question.options.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'question-option';
                optionDiv.innerHTML = `
                    <input type="checkbox" id="${question.id}_${option}" value="${option}">
                    <label for="${question.id}_${option}">${option}</label>
                `;
                optionsContainer.appendChild(optionDiv);
                
                optionDiv.addEventListener('click', (e) => {
                    if (e.target.type !== 'checkbox') {
                        const checkbox = optionDiv.querySelector('input[type="checkbox"]');
                        checkbox.checked = !checkbox.checked;
                    }
                    optionDiv.classList.toggle('selected', optionDiv.querySelector('input').checked);
                });
            });
        } else {
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'question-option';
                optionDiv.innerHTML = `
                    <input type="radio" name="${question.id}" id="${question.id}_${index}" value="${option}">
                    <label for="${question.id}_${index}">${option}</label>
                `;
                optionsContainer.appendChild(optionDiv);
                
                optionDiv.addEventListener('click', () => {
                    document.querySelectorAll(`input[name="${question.id}"]`).forEach(radio => {
                        radio.closest('.question-option').classList.remove('selected');
                    });
                    optionDiv.classList.add('selected');
                    optionDiv.querySelector('input').checked = true;
                });
            });
        }

        this.updateAssessmentProgress();
        this.updateAssessmentNavigation();
    }

    updateAssessmentProgress() {
        const progress = ((this.assessmentProgress + 1) / this.assessmentQuestions.length) * 100;
        document.getElementById('assessment-progress').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = 
            `Question ${this.assessmentProgress + 1} of ${this.assessmentQuestions.length}`;
    }

    updateAssessmentNavigation() {
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        
        prevBtn.disabled = this.assessmentProgress === 0;
        nextBtn.textContent = this.assessmentProgress === this.assessmentQuestions.length - 1 ? 'Complete' : 'Next';
    }

    nextQuestion() {
        const currentQuestion = this.assessmentQuestions[this.assessmentProgress];
        
        // Collect current question data
        if (currentQuestion.type === 'multiple_choice') {
            const selectedOptions = Array.from(document.querySelectorAll(`#question-options input:checked`))
                .map(input => input.value);
            this.assessmentData[currentQuestion.id] = selectedOptions;
        } else {
            const selectedOption = document.querySelector(`input[name="${currentQuestion.id}"]:checked`);
            if (selectedOption) {
                this.assessmentData[currentQuestion.id] = selectedOption.value;
            }
        }

        if (this.assessmentProgress < this.assessmentQuestions.length - 1) {
            this.assessmentProgress++;
            this.renderQuestion();
        } else {
            this.completeAssessment();
        }
    }

    prevQuestion() {
        if (this.assessmentProgress > 0) {
            this.assessmentProgress--;
            this.renderQuestion();
        }
    }

    completeAssessment() {
        // Calculate scores
        const scores = this.calculateAssessmentScores(this.assessmentData);
        
        this.userData = {
            id: Date.now(),
            assessmentCompleted: true,
            assessmentDate: new Date().toISOString(),
            assessmentData: this.assessmentData,
            scores: scores,
            currentAnxietyLevel: scores.generalAnxiety,
            uncertaintyTolerance: scores.uncertaintyIntolerance,
            decisionMakingConfidence: scores.decisionMaking
        };

        this.saveUserData();
        this.showScreen('dashboard');
        this.updateDashboard();
    }

    calculateAssessmentScores(data) {
        // Simple scoring algorithm
        let generalAnxiety = 0;
        let uncertaintyIntolerance = 0;
        let decisionMaking = 0;

        // GAD questions (0-3 each)
        ['gad1', 'gad2', 'gad3'].forEach(id => {
            if (data[id]) {
                const value = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
                    .indexOf(data[id]);
                generalAnxiety += value;
            }
        });

        // Uncertainty intolerance (1-5 each)
        ['iu1', 'iu2', 'iu3'].forEach(id => {
            if (data[id]) {
                const value = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
                    .indexOf(data[id]) + 1;
                uncertaintyIntolerance += value;
            }
        });

        // Decision making confidence (1-5 each)
        ['dm1', 'dm2'].forEach(id => {
            if (data[id]) {
                const value = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
                    .indexOf(data[id]) + 1;
                decisionMaking += value;
            }
        });

        return {
            generalAnxiety: Math.min(generalAnxiety, 9), // 0-9 scale
            uncertaintyIntolerance: Math.min(uncertaintyIntolerance, 15), // 3-15 scale
            decisionMaking: Math.min(decisionMaking, 10) // 2-10 scale
        };
    }

    updateDashboard() {
        if (!this.userData) return;

        // Update stats
        document.getElementById('current-anxiety-level').textContent = 
            `${this.userData.scores.generalAnxiety}/9`;
        document.getElementById('situations-logged').textContent = this.situations.length;
        
        // Calculate progress score (improvement over time)
        const progressScore = this.calculateProgressScore();
        document.getElementById('progress-score').textContent = progressScore;

        // Update recent situations
        this.updateRecentSituations();
        
        // Update progress chart
        this.updateProgressChart();
    }

    calculateProgressScore() {
        if (this.situations.length < 2) return 'New';
        
        const recent = this.situations.slice(-5);
        const older = this.situations.slice(0, -5);
        
        if (older.length === 0) return 'Tracking';
        
        const recentAvg = recent.reduce((sum, s) => sum + s.anxietyLevel, 0) / recent.length;
        const olderAvg = older.reduce((sum, s) => sum + s.anxietyLevel, 0) / older.length;
        
        const improvement = olderAvg - recentAvg;
        
        if (improvement > 1) return 'Great!';
        if (improvement > 0) return 'Good';
        if (improvement > -1) return 'Stable';
        return 'Focus';
    }

    updateRecentSituations() {
        const container = document.getElementById('recent-situations');
        
        if (this.situations.length === 0) {
            container.innerHTML = '<p class="no-data">No situations logged yet. Start by logging your first situation!</p>';
            return;
        }

        const recentSituations = this.situations.slice(-3).reverse();
        container.innerHTML = recentSituations.map(situation => `
            <div class="situation-item">
                <div class="situation-date">${new Date(situation.date).toLocaleDateString()}</div>
                <div class="situation-description">${situation.situation.substring(0, 100)}${situation.situation.length > 100 ? '...' : ''}</div>
                <div class="situation-meta">
                    <span class="anxiety-badge">Anxiety: ${situation.anxietyLevel}/10</span>
                </div>
            </div>
        `).join('');
    }

    updateProgressChart() {
        const ctx = document.getElementById('progress-chart').getContext('2d');
        
        if (this.progressChart) {
            this.progressChart.destroy();
        }

        const last7Days = this.situations.slice(-7);
        const labels = last7Days.map(s => new Date(s.date).toLocaleDateString());
        const data = last7Days.map(s => s.anxietyLevel);

        this.progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels.length ? labels : ['Start tracking'],
                datasets: [{
                    label: 'Anxiety Level',
                    data: data.length ? data : [5],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        title: {
                            display: true,
                            text: 'Anxiety Level'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    setupSituationForm() {
        // Populate triggers
        const triggerGrid = document.getElementById('trigger-grid');
        triggerGrid.innerHTML = this.commonTriggers.map(trigger => `
            <div class="trigger-option">
                <input type="checkbox" id="trigger_${trigger}" value="${trigger}">
                <label for="trigger_${trigger}">${trigger}</label>
            </div>
        `).join('');

        // Populate symptoms
        const symptomGrid = document.getElementById('symptom-grid');
        symptomGrid.innerHTML = this.symptoms.map(symptom => `
            <div class="symptom-option">
                <input type="checkbox" id="symptom_${symptom}" value="${symptom}">
                <label for="symptom_${symptom}">${symptom}</label>
            </div>
        `).join('');

        // Add click handlers
        document.querySelectorAll('.trigger-option, .symptom-option').forEach(option => {
            option.addEventListener('click', (e) => {
                if (e.target.type !== 'checkbox') {
                    const checkbox = option.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                }
                option.classList.toggle('selected', option.querySelector('input').checked);
            });
        });

        // Reset form
        document.getElementById('situation-form').reset();
        document.getElementById('anxiety-value').textContent = '5';
    }

    saveSituation() {
        const form = document.getElementById('situation-form');
        const formData = new FormData(form);
        
        const situation = {
            id: Date.now(),
            date: new Date().toISOString(),
            situation: formData.get('situation-description') || '',
            anxietyLevel: parseInt(formData.get('anxiety-level')) || 5,
            triggers: Array.from(document.querySelectorAll('.trigger-option input:checked')).map(cb => cb.value),
            symptoms: Array.from(document.querySelectorAll('.symptom-option input:checked')).map(cb => cb.value),
            uncertaintyElements: formData.get('uncertainty-elements') || '',
            copingUsed: [],
            effectiveness: null,
            resolved: false
        };

        this.situations.push(situation);
        this.saveSituations();
        this.currentSituation = situation;
        
        // Show recommendations
        this.showRecommendations(situation);
    }

    showRecommendations(situation) {
        this.showScreen('recommendations');
        
        // Find similar situations
        const similarSituations = this.findSimilarSituations(situation);
        
        if (similarSituations.length > 0) {
            document.getElementById('similar-situations').style.display = 'block';
            const container = document.getElementById('similar-situations-list');
            container.innerHTML = similarSituations.map(similar => `
                <div class="similar-situation-item">
                    <div class="similarity-score">${Math.round(similar.similarity * 100)}% similar</div>
                    <div class="situation-description">${similar.situation.situation.substring(0, 150)}...</div>
                    <div class="situation-meta">
                        <span class="anxiety-badge">Previous anxiety: ${similar.situation.anxietyLevel}/10</span>
                    </div>
                </div>
            `).join('');
        }
        
        // Show recommended strategies
        const recommendedStrategies = this.getRecommendedStrategies(situation);
        const strategiesContainer = document.getElementById('strategies-list');
        
        strategiesContainer.innerHTML = recommendedStrategies.map(strategy => `
            <div class="strategy-card">
                <div class="strategy-header">
                    <div class="strategy-title">${strategy.name}</div>
                    <div class="strategy-meta">${strategy.timeEstimate} • ${strategy.category}</div>
                </div>
                <div class="strategy-body">
                    <p class="strategy-description">${strategy.description}</p>
                    <ol class="strategy-steps">
                        ${strategy.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                    <div class="effectiveness-score">
                        Effectiveness for your situation: ${this.getStrategyEffectiveness(strategy, situation)}/10
                    </div>
                </div>
            </div>
        `).join('');
    }

    findSimilarSituations(newSituation) {
        return this.situations
            .filter(s => s.id !== newSituation.id)
            .map(situation => ({
                situation,
                similarity: this.calculateSimilarity(newSituation, situation)
            }))
            .filter(item => item.similarity > 0.3)
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 3);
    }

    calculateSimilarity(situation1, situation2) {
        let similarity = 0;
        let factors = 0;

        // Anxiety level similarity (weight: 0.3)
        const anxietyDiff = Math.abs(situation1.anxietyLevel - situation2.anxietyLevel);
        similarity += (1 - anxietyDiff / 10) * 0.3;
        factors += 0.3;

        // Trigger similarity (weight: 0.4)
        const commonTriggers = situation1.triggers.filter(t => situation2.triggers.includes(t)).length;
        const totalTriggers = new Set([...situation1.triggers, ...situation2.triggers]).size;
        if (totalTriggers > 0) {
            similarity += (commonTriggers / totalTriggers) * 0.4;
            factors += 0.4;
        }

        // Symptom similarity (weight: 0.3)
        const commonSymptoms = situation1.symptoms.filter(s => situation2.symptoms.includes(s)).length;
        const totalSymptoms = new Set([...situation1.symptoms, ...situation2.symptoms]).size;
        if (totalSymptoms > 0) {
            similarity += (commonSymptoms / totalSymptoms) * 0.3;
            factors += 0.3;
        }

        return factors > 0 ? similarity / factors : 0;
    }

    getRecommendedStrategies(situation) {
        // Simple strategy recommendation based on situation characteristics
        let recommendedStrategies = [...this.copingStrategies];
        
        // Sort by effectiveness for this situation type
        recommendedStrategies.sort((a, b) => {
            const aScore = this.getStrategyEffectiveness(a, situation);
            const bScore = this.getStrategyEffectiveness(b, situation);
            return bScore - aScore;
        });

        return recommendedStrategies.slice(0, 3);
    }

    getStrategyEffectiveness(strategy, situation) {
        let score = 5; // base score

        // High anxiety situations benefit more from grounding and breathing
        if (situation.anxietyLevel >= 7 && ['grounding', 'physiological'].includes(strategy.category)) {
            score += 2;
        }

        // Uncertainty-related situations benefit from acceptance strategies
        if (situation.uncertaintyElements.length > 0 && strategy.category === 'acceptance') {
            score += 2;
        }

        // Use strategy effectiveness ratings
        if (strategy.effectiveness) {
            if (situation.uncertaintyElements.length > 0) {
                score += (strategy.effectiveness.uncertainty || 5) / 10;
            }
            score += (strategy.effectiveness.general_anxiety || 5) / 10;
        }

        return Math.min(Math.round(score), 10);
    }

    quickMoodCheck() {
        const mood = prompt("How are you feeling right now? (1-10, where 1 is terrible and 10 is excellent)");
        if (mood && !isNaN(mood)) {
            const moodValue = parseInt(mood);
            if (moodValue >= 1 && moodValue <= 10) {
                // Quick situation entry
                const quickSituation = {
                    id: Date.now(),
                    date: new Date().toISOString(),
                    situation: "Quick mood check",
                    anxietyLevel: 11 - moodValue, // Inverse for anxiety scale
                    triggers: [],
                    symptoms: [],
                    uncertaintyElements: "",
                    copingUsed: [],
                    effectiveness: null,
                    resolved: false,
                    quickEntry: true
                };
                
                this.situations.push(quickSituation);
                this.saveSituations();
                this.updateDashboard();
                
                alert(`Mood logged! (Anxiety level: ${quickSituation.anxietyLevel}/10)`);
            }
        }
    }

    showBreathingModal() {
        document.getElementById('breathing-modal').classList.remove('hidden');
        this.resetBreathingExercise();
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
        if (modalId === 'breathing-modal') {
            this.stopBreathingExercise();
        }
    }

    showEmergencyModal() {
        document.getElementById('emergency-modal').classList.remove('hidden');
    }

    populateEmergencyResources() {
        const container = document.getElementById('crisis-resources');
        container.innerHTML = this.emergencyResources.map(resource => `
            <div class="crisis-resource">
                <div class="resource-name">${resource.name}</div>
                <div class="resource-contact">${resource.contact}</div>
                <p class="resource-description">${resource.description}</p>
            </div>
        `).join('');
    }

    startGroundingExercise() {
        alert('Starting 5-4-3-2-1 Grounding Exercise...\n\nTake a deep breath and look around you. Follow the prompts to identify:\n• 5 things you can see\n• 4 things you can touch\n• 3 things you can hear\n• 2 things you can smell\n• 1 thing you can taste');
        this.hideModal('emergency-modal');
    }

    resetBreathingExercise() {
        this.breathingCycles = 0;
        this.breathingActive = false;
        document.getElementById('breathing-cycles').textContent = '0';
        document.getElementById('breathing-text').textContent = 'Get Ready';
        document.getElementById('breathing-circle').classList.remove('inhale', 'exhale');
        document.getElementById('start-breathing').style.display = 'inline-block';
        document.getElementById('stop-breathing').style.display = 'none';
    }

    startBreathingExercise() {
        if (this.breathingActive) return;
        
        this.breathingActive = true;
        this.breathingCycles = 0;
        document.getElementById('breathing-cycles').textContent = '0';
        document.getElementById('start-breathing').style.display = 'none';
        document.getElementById('stop-breathing').style.display = 'inline-block';
        
        this.runBreathingCycle();
    }

    runBreathingCycle() {
        if (!this.breathingActive) return;
        
        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-text');
        
        if (this.breathingCycles >= 5) {
            this.completeBreathingExercise();
            return;
        }

        // Inhale phase (4 seconds)
        text.textContent = 'Inhale (4)';
        circle.classList.add('inhale');
        circle.classList.remove('exhale');
        
        let count = 4;
        const inhaleInterval = setInterval(() => {
            count--;
            if (count > 0) {
                text.textContent = `Inhale (${count})`;
            } else {
                clearInterval(inhaleInterval);
                this.holdBreath(true); // Hold after inhale
            }
        }, 1000);
    }

    holdBreath(afterInhale) {
        if (!this.breathingActive) return;
        
        const text = document.getElementById('breathing-text');
        const phase = afterInhale ? 'Hold' : 'Hold Empty';
        
        let count = 4;
        text.textContent = `${phase} (4)`;
        
        const holdInterval = setInterval(() => {
            count--;
            if (count > 0) {
                text.textContent = `${phase} (${count})`;
            } else {
                clearInterval(holdInterval);
                if (afterInhale) {
                    this.exhaleBreath();
                } else {
                    this.completeCycle();
                }
            }
        }, 1000);
    }

    exhaleBreath() {
        if (!this.breathingActive) return;
        
        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-text');
        
        text.textContent = 'Exhale (4)';
        circle.classList.add('exhale');
        circle.classList.remove('inhale');
        
        let count = 4;
        const exhaleInterval = setInterval(() => {
            count--;
            if (count > 0) {
                text.textContent = `Exhale (${count})`;
            } else {
                clearInterval(exhaleInterval);
                this.holdBreath(false); // Hold after exhale
            }
        }, 1000);
    }

    completeCycle() {
        if (!this.breathingActive) return;
        
        this.breathingCycles++;
        document.getElementById('breathing-cycles').textContent = this.breathingCycles.toString();
        
        const circle = document.getElementById('breathing-circle');
        circle.classList.remove('inhale', 'exhale');
        
        if (this.breathingCycles < 5) {
            setTimeout(() => {
                this.runBreathingCycle();
            }, 500);
        } else {
            this.completeBreathingExercise();
        }
    }

    completeBreathingExercise() {
        this.breathingActive = false;
        const text = document.getElementById('breathing-text');
        const circle = document.getElementById('breathing-circle');
        
        text.textContent = 'Complete!';
        circle.classList.remove('inhale', 'exhale');
        
        document.getElementById('start-breathing').style.display = 'inline-block';
        document.getElementById('stop-breathing').style.display = 'none';
        
        setTimeout(() => {
            alert('Great job! You completed the breathing exercise. How do you feel?');
        }, 1000);
    }

    stopBreathingExercise() {
        this.breathingActive = false;
        
        if (this.breathingTimer) {
            clearTimeout(this.breathingTimer);
            this.breathingTimer = null;
        }
        
        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-text');
        
        circle.classList.remove('inhale', 'exhale');
        text.textContent = 'Stopped';
        
        document.getElementById('start-breathing').style.display = 'inline-block';
        document.getElementById('stop-breathing').style.display = 'none';
    }

    showEffectivenessRating() {
        const rating = prompt("How effective were the recommended strategies? (1-10, where 1 is not helpful and 10 is very helpful)");
        if (rating && !isNaN(rating)) {
            const ratingValue = parseInt(rating);
            if (ratingValue >= 1 && ratingValue <= 10) {
                if (this.currentSituation) {
                    this.currentSituation.effectiveness = ratingValue;
                    this.saveSituations();
                }
                alert("Thank you for your feedback! This helps improve future recommendations.");
                this.showScreen('dashboard');
                this.updateDashboard();
            }
        }
    }

    updateProgressScreen() {
        this.updateAnxietyTrendChart();
        this.updateTriggersChart();
        this.updateEffectivenessChart();
        this.updateInsights();
    }

    updateAnxietyTrendChart() {
        const ctx = document.getElementById('anxiety-trend-chart').getContext('2d');
        
        if (this.anxietyTrendChart) {
            this.anxietyTrendChart.destroy();
        }

        const last30Days = this.situations.slice(-30);
        const labels = last30Days.map(s => new Date(s.date).toLocaleDateString());
        const data = last30Days.map(s => s.anxietyLevel);

        this.anxietyTrendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels.length ? labels : ['No data'],
                datasets: [{
                    label: 'Anxiety Level',
                    data: data.length ? data : [0],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    }

    updateTriggersChart() {
        const ctx = document.getElementById('triggers-chart').getContext('2d');
        
        if (this.triggersChart) {
            this.triggersChart.destroy();
        }

        // Count trigger frequency
        const triggerCounts = {};
        this.situations.forEach(situation => {
            situation.triggers.forEach(trigger => {
                triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
            });
        });

        const labels = Object.keys(triggerCounts).slice(0, 8);
        const data = labels.map(label => triggerCounts[label]);

        this.triggersChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels.length ? labels : ['No data'],
                datasets: [{
                    data: data.length ? data : [1],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    updateEffectivenessChart() {
        const ctx = document.getElementById('effectiveness-chart').getContext('2d');
        
        if (this.effectivenessChart) {
            this.effectivenessChart.destroy();
        }

        // Get effectiveness ratings
        const effectivenessData = this.situations
            .filter(s => s.effectiveness !== null)
            .map(s => s.effectiveness);

        if (effectivenessData.length === 0) {
            this.effectivenessChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['No ratings yet'],
                    datasets: [{
                        label: 'Strategy Effectiveness',
                        data: [0],
                        backgroundColor: '#1FB8CD'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            return;
        }

        const avgEffectiveness = effectivenessData.reduce((a, b) => a + b, 0) / effectivenessData.length;

        this.effectivenessChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Average Strategy Effectiveness'],
                datasets: [{
                    label: 'Effectiveness Rating',
                    data: [avgEffectiveness],
                    backgroundColor: '#1FB8CD'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    }

    updateInsights() {
        const container = document.getElementById('insights-list');
        const insights = this.generateInsights();
        
        container.innerHTML = insights.map(insight => `
            <div class="insight-item">${insight}</div>
        `).join('');
    }

    generateInsights() {
        const insights = [];
        
        if (this.situations.length === 0) {
            insights.push("Start logging situations to see personalized insights about your anxiety patterns.");
            return insights;
        }

        // Anxiety trend insight
        const recent = this.situations.slice(-5);
        const avgRecent = recent.reduce((sum, s) => sum + s.anxietyLevel, 0) / recent.length;
        
        if (this.situations.length >= 10) {
            const older = this.situations.slice(0, -5);
            const avgOlder = older.reduce((sum, s) => sum + s.anxietyLevel, 0) / older.length;
            const improvement = avgOlder - avgRecent;
            
            if (improvement > 1) {
                insights.push("Great progress! Your anxiety levels have decreased by " + improvement.toFixed(1) + " points on average.");
            } else if (improvement > 0) {
                insights.push("You're making progress! Your anxiety levels are slightly lower than before.");
            } else if (improvement < -1) {
                insights.push("Your anxiety levels have increased recently. Consider reaching out for additional support.");
            }
        }

        // Most common trigger
        const triggerCounts = {};
        this.situations.forEach(situation => {
            situation.triggers.forEach(trigger => {
                triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
            });
        });
        
        const topTrigger = Object.keys(triggerCounts).reduce((a, b) => 
            triggerCounts[a] > triggerCounts[b] ? a : b, null);
        
        if (topTrigger) {
            insights.push(`Your most common trigger is "${topTrigger}". Consider developing specific strategies for this situation.`);
        }

        // Time of day pattern
        const hourCounts = {};
        this.situations.forEach(situation => {
            const hour = new Date(situation.date).getHours();
            hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        });
        
        const peakHour = Object.keys(hourCounts).reduce((a, b) => 
            hourCounts[a] > hourCounts[b] ? a : b, null);
        
        if (peakHour) {
            const timeString = new Date().setHours(parseInt(peakHour)).toLocaleTimeString([], 
                {hour: '2-digit', minute:'2-digit'});
            insights.push(`You tend to experience more anxiety around ${timeString}. Consider preventive strategies during this time.`);
        }

        return insights;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnxietyAid();
});