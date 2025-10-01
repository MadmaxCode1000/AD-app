// Interactive Anxiety Management Application JavaScript

class AnxietyAidApp {
    constructor() {
        this.currentSection = 'activities';
        this.userData = this.loadUserData();
        this.activities = this.loadActivities();
        this.breathingTimer = null;
        this.breathingActive = false;
        this.currentThoughtStep = 1;
        this.currentDecisionStep = 1;
        this.currentGroundingStep = 'see';
        this.charts = {};
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDashboard();
        this.renderActivitiesSection();
        this.renderAnalyticsSection();
        this.renderResourcesSection();
    }

    loadUserData() {
        const stored = localStorage.getItem('anxietyaid_userdata');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Initialize with sample data from the provided JSON
        return {
            completedActivities: [
                {
                    id: "activity_1",
                    name: "Breathing Exercise",
                    date: "2025-10-01",
                    duration: 300,
                    effectiveness: 8,
                    anxietyBefore: 7,
                    anxietyAfter: 4
                },
                {
                    id: "activity_2", 
                    name: "Thought Challenge",
                    date: "2025-09-30",
                    duration: 600,
                    effectiveness: 7,
                    anxietyBefore: 8,
                    anxietyAfter: 5
                },
                {
                    id: "activity_3",
                    name: "Grounding Exercise", 
                    date: "2025-09-29",
                    duration: 180,
                    effectiveness: 9,
                    anxietyBefore: 6,
                    anxietyAfter: 3
                }
            ],
            progressData: {
                weeklyAnxiety: [6.5, 6.2, 5.8, 5.4, 5.1, 4.8, 4.5],
                commonTriggers: [
                    {"trigger": "Work meetings", "frequency": 12},
                    {"trigger": "Social events", "frequency": 8},
                    {"trigger": "Health concerns", "frequency": 6},
                    {"trigger": "Financial decisions", "frequency": 4}
                ],
                copingEffectiveness: [
                    {"strategy": "Breathing Exercise", "rating": 8.2},
                    {"strategy": "Grounding Exercise", "rating": 8.8},
                    {"strategy": "Thought Challenge", "rating": 7.5},
                    {"strategy": "Decision Making", "rating": 7.1}
                ]
            }
        };
    }

    loadActivities() {
        const stored = localStorage.getItem('anxietyaid_activities');
        return stored ? JSON.parse(stored) : [];
    }

    saveUserData() {
        localStorage.setItem('anxietyaid_userdata', JSON.stringify(this.userData));
    }

    saveActivities() {
        localStorage.setItem('anxietyaid_activities', JSON.stringify(this.activities));
    }

    bindEvents() {
        // Dashboard navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const section = e.target.getAttribute('data-section');
                this.showSection(section);
            });
        });

        // Emergency button
        document.getElementById('emergency-btn').addEventListener('click', () => {
            this.showModal('emergency-modal');
        });

        // Breathing exercise events
        document.getElementById('start-breathing-btn').addEventListener('click', () => {
            this.startBreathingExercise();
        });

        document.getElementById('stop-breathing-btn').addEventListener('click', () => {
            this.stopBreathingExercise();
        });

        // Anxiety rating slider in thought record
        const anxietySlider = document.getElementById('anxiety-rating-slider');
        if (anxietySlider) {
            anxietySlider.addEventListener('input', (e) => {
                document.getElementById('current-anxiety-rating').textContent = e.target.value;
            });
        }

        // Decision maker - add option button
        document.getElementById('add-option-btn').addEventListener('click', () => {
            this.addDecisionOption();
        });

        // Grounding exercise start
        document.getElementById('start-grounding-btn').addEventListener('click', () => {
            this.startGroundingSequence();
        });

        // Rating buttons for breathing exercise
        document.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.submitBreathingRating(parseInt(e.target.getAttribute('data-rating')));
            });
        });

        // Modal close events
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');

        this.currentSection = sectionName;

        // Load section-specific content
        if (sectionName === 'analytics') {
            this.renderCharts();
        }
    }

    updateDashboard() {
        this.updateActivityStats();
        this.renderRecentActivities();
    }

    updateActivityStats() {
        const activities = this.userData.completedActivities;
        
        // Update stats
        document.getElementById('activities-completed').textContent = activities.length;
        document.getElementById('streak-counter').textContent = this.calculateStreak();
        document.getElementById('avg-effectiveness').textContent = this.calculateAverageEffectiveness().toFixed(1);
    }

    calculateStreak() {
        const activities = this.userData.completedActivities;
        if (activities.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        let currentDate = new Date(today);

        // Check each day backwards from today
        for (let i = 0; i < 30; i++) { // Check up to 30 days
            const dateStr = currentDate.toISOString().split('T')[0];
            const hasActivity = activities.some(activity => activity.date === dateStr);
            
            if (hasActivity) {
                streak++;
            } else if (streak > 0) {
                break; // Streak is broken
            }
            
            currentDate.setDate(currentDate.getDate() - 1);
        }

        return streak;
    }

    calculateAverageEffectiveness() {
        const activities = this.userData.completedActivities;
        if (activities.length === 0) return 0;
        
        const sum = activities.reduce((acc, activity) => acc + activity.effectiveness, 0);
        return sum / activities.length;
    }

    renderRecentActivities() {
        const container = document.getElementById('recent-activities-list');
        const activities = this.userData.completedActivities.slice(-5).reverse();

        if (activities.length === 0) {
            container.innerHTML = '<p class="no-data">No activities completed yet. Start your first therapeutic exercise!</p>';
            return;
        }

        container.innerHTML = activities.map(activity => `
            <div class="recent-activity-item">
                <div>
                    <div class="activity-name">${activity.name}</div>
                    <div class="activity-date">${this.formatDate(activity.date)}</div>
                </div>
                <div class="activity-rating">${activity.effectiveness}/10</div>
            </div>
        `).join('');
    }

    renderActivitiesSection() {
        // Activities section is mostly static HTML with dynamic updates
        this.updateActivityStats();
        this.renderRecentActivities();
    }

    renderAnalyticsSection() {
        this.updateInsights();
        // Charts will be rendered when section is active
    }

    renderCharts() {
        this.renderAnxietyTrendChart();
        this.renderTriggersChart();
        this.renderEffectivenessChart();
    }

    renderAnxietyTrendChart() {
        const ctx = document.getElementById('anxiety-trend-chart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.charts.anxietyTrend) {
            this.charts.anxietyTrend.destroy();
        }

        const data = this.userData.progressData.weeklyAnxiety;
        const labels = ['7 days ago', '6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday'];

        this.charts.anxietyTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Anxiety Level',
                    data: data,
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
                            text: 'Anxiety Level (1-10)'
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

    renderTriggersChart() {
        const ctx = document.getElementById('triggers-chart');
        if (!ctx) return;

        if (this.charts.triggers) {
            this.charts.triggers.destroy();
        }

        const triggers = this.userData.progressData.commonTriggers;
        const labels = triggers.map(t => t.trigger);
        const data = triggers.map(t => t.frequency);

        this.charts.triggers = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    renderEffectivenessChart() {
        const ctx = document.getElementById('effectiveness-chart');
        if (!ctx) return;

        if (this.charts.effectiveness) {
            this.charts.effectiveness.destroy();
        }

        const strategies = this.userData.progressData.copingEffectiveness;
        const labels = strategies.map(s => s.strategy);
        const data = strategies.map(s => s.rating);

        this.charts.effectiveness = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Effectiveness Rating',
                    data: data,
                    backgroundColor: '#1FB8CD'
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
                            text: 'Effectiveness (1-10)'
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

    updateInsights() {
        const container = document.getElementById('insights-list');
        const insights = [
            "📈 Your anxiety has decreased by 23% this month - great progress!",
            "🎯 Breathing exercises work best for you (8.2/10 average effectiveness)",
            "📅 You're most consistent with activities on weekdays",
            "🧠 Thought challenges show the most improvement over time",
            "⚡ Quick tip: Try morning breathing exercises for better daily management"
        ];

        container.innerHTML = insights.map(insight => `
            <div class="insight-item">${insight}</div>
        `).join('');
    }

    renderResourcesSection() {
        // Resources section is mostly static, just ensure emergency functions work
    }

    // Therapeutic Activities Implementation
    startBreathingExercise() {
        this.showModal('breathing-modal');
    }

    startAdvancedBreathing() {
        this.showModal('breathing-modal');
        this.resetBreathingExercise();
    }

    resetBreathingExercise() {
        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-text');
        const progressFill = document.getElementById('breathing-progress-fill');
        const timeLeft = document.getElementById('breathing-time-left');
        const rating = document.getElementById('breathing-rating');

        circle.classList.remove('inhale', 'exhale');
        text.textContent = 'Get Ready...';
        progressFill.style.width = '0%';
        timeLeft.textContent = '5:00';
        rating.style.display = 'none';

        document.getElementById('start-breathing-btn').style.display = 'inline-block';
        document.getElementById('stop-breathing-btn').style.display = 'none';

        this.breathingActive = false;
        if (this.breathingTimer) {
            clearInterval(this.breathingTimer);
        }
    }

    startBreathingExercise() {
        if (this.breathingActive) return;

        this.breathingActive = true;
        document.getElementById('start-breathing-btn').style.display = 'none';
        document.getElementById('stop-breathing-btn').style.display = 'inline-block';

        const duration = parseInt(document.getElementById('breathing-duration').value);
        this.runBreathingSession(duration);
    }

    runBreathingSession(totalSeconds) {
        let remainingTime = totalSeconds;
        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-text');
        const progressFill = document.getElementById('breathing-progress-fill');
        const timeLeft = document.getElementById('breathing-time-left');

        const updateTimer = () => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            timeLeft.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            const progress = ((totalSeconds - remainingTime) / totalSeconds) * 100;
            progressFill.style.width = `${progress}%`;

            if (remainingTime <= 0) {
                this.completeBreathingExercise();
                return;
            }

            remainingTime--;
        };

        this.breathingTimer = setInterval(updateTimer, 1000);
        this.runBreathingCycle();
    }

    runBreathingCycle() {
        if (!this.breathingActive) return;

        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-text');

        // Inhale phase (4 seconds)
        text.textContent = 'Breathe In...';
        circle.classList.add('inhale');
        circle.classList.remove('exhale');

        setTimeout(() => {
            if (!this.breathingActive) return;
            
            // Hold phase (4 seconds)
            text.textContent = 'Hold...';
            circle.classList.remove('inhale', 'exhale');

            setTimeout(() => {
                if (!this.breathingActive) return;
                
                // Exhale phase (4 seconds)
                text.textContent = 'Breathe Out...';
                circle.classList.add('exhale');
                circle.classList.remove('inhale');

                setTimeout(() => {
                    if (!this.breathingActive) return;
                    
                    // Hold empty phase (4 seconds)
                    text.textContent = 'Hold Empty...';
                    circle.classList.remove('inhale', 'exhale');

                    setTimeout(() => {
                        if (this.breathingActive) {
                            this.runBreathingCycle(); // Continue cycle
                        }
                    }, 4000);
                }, 4000);
            }, 4000);
        }, 4000);
    }

    stopBreathingExercise() {
        this.breathingActive = false;
        if (this.breathingTimer) {
            clearInterval(this.breathingTimer);
        }
        this.resetBreathingExercise();
    }

    completeBreathingExercise() {
        this.breathingActive = false;
        if (this.breathingTimer) {
            clearInterval(this.breathingTimer);
        }

        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-text');
        const rating = document.getElementById('breathing-rating');

        circle.classList.remove('inhale', 'exhale');
        text.textContent = 'Complete!';
        rating.style.display = 'block';

        document.getElementById('start-breathing-btn').style.display = 'inline-block';
        document.getElementById('stop-breathing-btn').style.display = 'none';
    }

    submitBreathingRating(rating) {
        // Save activity
        const activity = {
            id: Date.now(),
            name: 'Breathing Exercise',
            date: new Date().toISOString().split('T')[0],
            duration: parseInt(document.getElementById('breathing-duration').value),
            effectiveness: rating,
            anxietyBefore: 7, // Could be collected before exercise
            anxietyAfter: Math.max(1, 7 - Math.floor(rating / 2))
        };

        this.userData.completedActivities.push(activity);
        this.saveUserData();
        
        this.showSuccessMessage('Breathing exercise completed and saved!');
        this.closeModal('breathing-modal');
        this.updateDashboard();
    }

    // Thought Record Implementation
    startThoughtRecord() {
        this.showModal('thought-record-modal');
        this.resetThoughtRecord();
    }

    startInteractiveThoughtRecord() {
        this.showModal('thought-record-modal');
        this.resetThoughtRecord();
    }

    resetThoughtRecord() {
        this.currentThoughtStep = 1;
        this.showThoughtStep(1);
        
        // Clear all inputs
        document.getElementById('situation-input').value = '';
        document.getElementById('thoughts-input').value = '';
        document.getElementById('anxiety-rating-slider').value = '5';
        document.getElementById('current-anxiety-rating').textContent = '5';
        document.getElementById('evidence-for').value = '';
        document.getElementById('evidence-against').value = '';
        document.getElementById('balanced-thought').value = '';
    }

    showThoughtStep(stepNumber) {
        // Update step indicator
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 === stepNumber) {
                step.classList.add('active');
            } else if (index + 1 < stepNumber) {
                step.classList.add('completed');
            }
        });

        // Show/hide steps
        document.querySelectorAll('.thought-step').forEach(step => {
            step.classList.remove('active');
        });
        document.querySelector(`[data-step="${stepNumber}"]`).classList.add('active');

        this.currentThoughtStep = stepNumber;
    }

    nextThoughtStep(stepNumber) {
        this.showThoughtStep(stepNumber);
    }

    prevThoughtStep(stepNumber) {
        this.showThoughtStep(stepNumber);
    }

    completeThoughtRecord() {
        const thoughtData = {
            situation: document.getElementById('situation-input').value,
            thoughts: document.getElementById('thoughts-input').value,
            anxietyRating: parseInt(document.getElementById('anxiety-rating-slider').value),
            evidenceFor: document.getElementById('evidence-for').value,
            evidenceAgainst: document.getElementById('evidence-against').value,
            balancedThought: document.getElementById('balanced-thought').value
        };

        // Save activity
        const activity = {
            id: Date.now(),
            name: 'Thought Challenge',
            date: new Date().toISOString().split('T')[0],
            duration: 600, // 10 minutes estimated
            effectiveness: Math.floor(Math.random() * 3) + 7, // 7-9 range
            anxietyBefore: thoughtData.anxietyRating,
            anxietyAfter: Math.max(1, thoughtData.anxietyRating - Math.floor(Math.random() * 4) - 2),
            data: thoughtData
        };

        this.userData.completedActivities.push(activity);
        this.saveUserData();

        this.showCompletionCelebration('Thought Challenge Complete!', 'You\'ve successfully challenged your anxious thoughts and created a more balanced perspective.');
        this.closeModal('thought-record-modal');
        this.updateDashboard();
    }

    // Grounding Exercise Implementation
    startGroundingExercise() {
        this.showModal('grounding-modal');
    }

    startInteractiveGrounding() {
        this.showModal('grounding-modal');
    }

    startGroundingSequence() {
        document.querySelector('.grounding-intro').style.display = 'none';
        document.getElementById('grounding-exercise').style.display = 'block';
        this.currentGroundingStep = 'see';
        this.setupGroundingSteps();
    }

    setupGroundingSteps() {
        const exerciseContainer = document.getElementById('grounding-exercise');
        
        const steps = [
            { id: 'see', icon: '👁️', title: 'Find 5 Things You Can See', count: 5 },
            { id: 'touch', icon: '✋', title: 'Find 4 Things You Can Touch', count: 4 },
            { id: 'hear', icon: '👂', title: 'Find 3 Things You Can Hear', count: 3 },
            { id: 'smell', icon: '👃', title: 'Find 2 Things You Can Smell', count: 2 },
            { id: 'taste', icon: '👅', title: 'Find 1 Thing You Can Taste', count: 1 }
        ];

        exerciseContainer.innerHTML = steps.map((step, index) => `
            <div class="grounding-step ${index === 0 ? 'active' : ''}" data-step="${step.id}">
                <h3>${step.icon} ${step.title}</h3>
                <p>Take your time and really notice each item in detail.</p>
                <div class="grounding-checklist">
                    ${Array.from({length: step.count}, (_, i) => `
                        <div class="checklist-item">
                            <input type="checkbox" id="${step.id}-${i + 1}">
                            <label for="${step.id}-${i + 1}">Thing ${i + 1} you can ${step.id === 'see' ? 'see' : step.id === 'touch' ? 'touch' : step.id === 'hear' ? 'hear' : step.id === 'smell' ? 'smell' : 'taste'}</label>
                        </div>
                    `).join('')}
                </div>
                ${index < steps.length - 1 ? 
                    `<button class="btn btn--primary grounding-continue" onclick="app.nextGroundingStep('${steps[index + 1].id}')">Continue</button>` :
                    `<button class="btn btn--primary grounding-continue" onclick="app.completeGroundingExercise()">Complete Exercise</button>`
                }
            </div>
        `).join('');
    }

    nextGroundingStep(stepId) {
        // Hide current step
        document.querySelector('.grounding-step.active').classList.remove('active');
        
        // Show next step
        document.querySelector(`[data-step="${stepId}"]`).classList.add('active');
        
        this.currentGroundingStep = stepId;
    }

    completeGroundingExercise() {
        // Save activity
        const activity = {
            id: Date.now(),
            name: 'Grounding Exercise',
            date: new Date().toISOString().split('T')[0],
            duration: 480, // 8 minutes estimated
            effectiveness: Math.floor(Math.random() * 2) + 8, // 8-9 range
            anxietyBefore: 6,
            anxietyAfter: Math.floor(Math.random() * 3) + 2 // 2-4 range
        };

        this.userData.completedActivities.push(activity);
        this.saveUserData();

        this.showCompletionCelebration('Grounding Exercise Complete!', 'You\'ve successfully brought yourself back to the present moment.');
        this.closeModal('grounding-modal');
        this.updateDashboard();
    }

    // Decision Maker Implementation
    startDecisionMaker() {
        this.showModal('decision-modal');
        this.resetDecisionMaker();
    }

    resetDecisionMaker() {
        this.currentDecisionStep = 1;
        this.showDecisionStep(1);
        
        // Clear inputs
        document.getElementById('decision-title').value = '';
        document.querySelectorAll('.option-input').forEach(input => input.value = '');
        document.getElementById('pros-list').innerHTML = '';
        document.getElementById('cons-list').innerHTML = '';
        document.getElementById('pro-input').value = '';
        document.getElementById('con-input').value = '';
    }

    showDecisionStep(stepNumber) {
        document.querySelectorAll('.decision-step').forEach(step => {
            step.style.display = 'none';
        });
        document.querySelector(`[data-step="${stepNumber}"]`).style.display = 'block';
        this.currentDecisionStep = stepNumber;
    }

    nextDecisionStep(stepNumber) {
        this.showDecisionStep(stepNumber);
    }

    prevDecisionStep(stepNumber) {
        this.showDecisionStep(stepNumber);
    }

    addDecisionOption() {
        const container = document.querySelector('.option-input-container');
        const optionCount = container.children.length + 1;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'option-input form-control';
        input.placeholder = `Option ${optionCount}`;
        
        container.appendChild(input);
    }

    addPro() {
        const input = document.getElementById('pro-input');
        const proText = input.value.trim();
        
        if (proText) {
            const prosList = document.getElementById('pros-list');
            const proItem = document.createElement('div');
            proItem.className = 'pro-item';
            proItem.innerHTML = `
                <span>${proText}</span>
                <button class="remove-item" onclick="this.parentElement.remove()">×</button>
            `;
            prosList.appendChild(proItem);
            input.value = '';
        }
    }

    addCon() {
        const input = document.getElementById('con-input');
        const conText = input.value.trim();
        
        if (conText) {
            const consList = document.getElementById('cons-list');
            const conItem = document.createElement('div');
            conItem.className = 'con-item';
            conItem.innerHTML = `
                <span>${conText}</span>
                <button class="remove-item" onclick="this.parentElement.remove()">×</button>
            `;
            consList.appendChild(conItem);
            input.value = '';
        }
    }

    completeDecisionMaking() {
        const decisionTitle = document.getElementById('decision-title').value;
        const options = Array.from(document.querySelectorAll('.option-input')).map(input => input.value).filter(v => v.trim());
        const pros = Array.from(document.querySelectorAll('.pro-item span')).map(span => span.textContent);
        const cons = Array.from(document.querySelectorAll('.con-item span')).map(span => span.textContent);

        const decisionData = { decisionTitle, options, pros, cons };

        // Calculate simple recommendation (more pros = better)
        const recommendation = pros.length > cons.length ? 'Proceed with confidence!' : 
                              pros.length < cons.length ? 'Consider carefully or explore alternatives.' :
                              'It\'s a balanced decision - trust your instinct.';

        // Save activity
        const activity = {
            id: Date.now(),
            name: 'Decision Making',
            date: new Date().toISOString().split('T')[0],
            duration: 720, // 12 minutes estimated
            effectiveness: Math.floor(Math.random() * 3) + 6, // 6-8 range
            anxietyBefore: 6,
            anxietyAfter: Math.floor(Math.random() * 3) + 3, // 3-5 range
            data: decisionData,
            recommendation: recommendation
        };

        this.userData.completedActivities.push(activity);
        this.saveUserData();

        alert(`Decision Analysis Complete!\n\nRecommendation: ${recommendation}\n\nPros: ${pros.length} | Cons: ${cons.length}`);
        this.closeModal('decision-modal');
        this.updateDashboard();
    }

    // Emergency and Resource Functions
    callCrisisLine(number) {
        if (confirm(`Call ${number}?\n\nThis will attempt to dial the crisis support number.`)) {
            window.open(`tel:${number}`, '_self');
        }
    }

    startEmergencyGrounding() {
        alert('Emergency Grounding Exercise\n\nTake a deep breath and try this:\n\n• Look around and name 5 things you can see\n• Touch 4 different objects\n• Listen for 3 sounds\n• Notice 2 smells\n• Identify 1 taste\n\nTake your time with each step.');
        this.closeModal('emergency-modal');
    }

    showSafetyPlan() {
        alert('Safety Plan\n\n1. Emergency Contacts: 988, 741741\n2. Safe spaces: Home, library, friend\'s house\n3. Coping strategies: Breathing, grounding, calling support\n4. People to contact: Family, friends, therapist\n5. Medical contacts: Doctor, hospital\n\nRemember: You are not alone and help is available.');
    }

    // Utility Functions
    showModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
        
        // Reset specific modals when closed
        if (modalId === 'breathing-modal') {
            this.stopBreathingExercise();
        } else if (modalId === 'thought-record-modal') {
            this.resetThoughtRecord();
        } else if (modalId === 'grounding-modal') {
            document.querySelector('.grounding-intro').style.display = 'block';
            document.getElementById('grounding-exercise').style.display = 'none';
        } else if (modalId === 'decision-modal') {
            this.resetDecisionMaker();
        }
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    showCompletionCelebration(title, message) {
        const celebrationDiv = document.createElement('div');
        celebrationDiv.className = 'completion-celebration';
        celebrationDiv.innerHTML = `
            <div class="celebration-icon">🎉</div>
            <div class="celebration-message">${title}</div>
            <div class="celebration-submessage">${message}</div>
        `;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.appendChild(celebrationDiv);
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.remove();
        }, 3000);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    }
}

// Global functions for HTML onclick handlers
function startBreathingExercise() {
    app.startBreathingExercise();
}

function startThoughtRecord() {
    app.startThoughtRecord();
}

function startGroundingExercise() {
    app.startGroundingExercise();
}

function startAdvancedBreathing() {
    app.startAdvancedBreathing();
}

function startInteractiveThoughtRecord() {
    app.startInteractiveThoughtRecord();
}

function startInteractiveGrounding() {
    app.startInteractiveGrounding();
}

function startDecisionMaker() {
    app.startDecisionMaker();
}

function closeModal(modalId) {
    app.closeModal(modalId);
}

function nextThoughtStep(step) {
    app.nextThoughtStep(step);
}

function prevThoughtStep(step) {
    app.prevThoughtStep(step);
}

function completeThoughtRecord() {
    app.completeThoughtRecord();
}

function nextGroundingStep(step) {
    app.nextGroundingStep(step);
}

function nextDecisionStep(step) {
    app.nextDecisionStep(step);
}

function prevDecisionStep(step) {
    app.prevDecisionStep(step);
}

function addPro() {
    app.addPro();
}

function addCon() {
    app.addCon();
}

function completeDecisionMaking() {
    app.completeDecisionMaking();
}

function callCrisisLine(number) {
    app.callCrisisLine(number);
}

function startEmergencyGrounding() {
    app.startEmergencyGrounding();
}

function showSafetyPlan() {
    app.showSafetyPlan();
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new AnxietyAidApp();
});