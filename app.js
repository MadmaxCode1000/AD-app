// ClinicalMind Pro - Professional Anxiety Management Platform
class ClinicalMindPro {
    constructor() {
        this.currentScreen = 'landing';
        this.currentUser = null;
        this.assessmentPhase = 1;
        this.assessmentProgress = 0;
        this.assessmentData = {};
        this.clinicalScores = {};
        this.treatmentPlan = null;
        this.sessionData = [];
        this.progressMetrics = {};
        
        // Clinical Assessment Battery from provided data
        this.clinicalAssessment = {
            phase1: [ // Initial Clinical Screening
                {
                    id: "gad7_1",
                    question: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
                    subtitle: "GAD-7 Generalized Anxiety Disorder Scale - Question 1",
                    options: [
                        { text: "Not at all", score: 0, clinical: "Minimal symptom endorsement" },
                        { text: "Several days", score: 1, clinical: "Mild symptom frequency" },
                        { text: "More than half the days", score: 2, clinical: "Moderate symptom frequency" },
                        { text: "Nearly every day", score: 3, clinical: "Severe symptom frequency" }
                    ],
                    category: "general_anxiety",
                    clinicalSignificance: "Core anxiety symptom indicator"
                },
                {
                    id: "gad7_2",
                    question: "Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?",
                    subtitle: "GAD-7 Generalized Anxiety Disorder Scale - Question 2",
                    options: [
                        { text: "Not at all", score: 0, clinical: "No worry control deficits" },
                        { text: "Several days", score: 1, clinical: "Mild worry control issues" },
                        { text: "More than half the days", score: 2, clinical: "Moderate worry control deficits" },
                        { text: "Nearly every day", score: 3, clinical: "Severe worry control impairment" }
                    ],
                    category: "general_anxiety",
                    clinicalSignificance: "Worry control deficit assessment"
                },
                {
                    id: "gad7_3",
                    question: "Over the last 2 weeks, how often have you been bothered by worrying too much about different things?",
                    subtitle: "GAD-7 Generalized Anxiety Disorder Scale - Question 3",
                    options: [
                        { text: "Not at all", score: 0 },
                        { text: "Several days", score: 1 },
                        { text: "More than half the days", score: 2 },
                        { text: "Nearly every day", score: 3 }
                    ],
                    category: "general_anxiety"
                },
                {
                    id: "beck_1",
                    question: "In the past week, how much have you been bothered by numbness or tingling sensations?",
                    subtitle: "Beck Anxiety Inventory - Somatic Symptoms",
                    options: [
                        { text: "Not at all", score: 0 },
                        { text: "Mildly - did not bother me much", score: 1 },
                        { text: "Moderately - unpleasant but manageable", score: 2 },
                        { text: "Severely - very bothering", score: 3 }
                    ],
                    category: "somatic_anxiety"
                },
                {
                    id: "beck_2",
                    question: "In the past week, how much have you been bothered by feeling hot or flushed?",
                    subtitle: "Beck Anxiety Inventory - Physiological Response",
                    options: [
                        { text: "Not at all", score: 0 },
                        { text: "Mildly - did not bother me much", score: 1 },
                        { text: "Moderately - unpleasant but manageable", score: 2 },
                        { text: "Severely - very bothering", score: 3 }
                    ],
                    category: "somatic_anxiety"
                }
            ],
            phase2: [ // Risk Assessment & Uncertainty Intolerance
                {
                    id: "ius_1",
                    question: "Unforeseen events upset me greatly",
                    subtitle: "Intolerance of Uncertainty Scale (IUS-12) - Distress Response",
                    options: [
                        { text: "Not at all characteristic of me", score: 1, clinical: "High uncertainty tolerance" },
                        { text: "A little characteristic of me", score: 2, clinical: "Moderate-high uncertainty tolerance" },
                        { text: "Somewhat characteristic of me", score: 3, clinical: "Moderate uncertainty tolerance" },
                        { text: "Very characteristic of me", score: 4, clinical: "Low uncertainty tolerance" },
                        { text: "Entirely characteristic of me", score: 5, clinical: "Very low uncertainty tolerance" }
                    ],
                    category: "uncertainty_intolerance",
                    clinicalSignificance: "Uncertainty distress tolerance"
                },
                {
                    id: "ius_2",
                    question: "It frustrates me not having all the information I need",
                    subtitle: "Intolerance of Uncertainty Scale (IUS-12) - Information Seeking",
                    options: [
                        { text: "Not at all characteristic of me", score: 1 },
                        { text: "A little characteristic of me", score: 2 },
                        { text: "Somewhat characteristic of me", score: 3 },
                        { text: "Very characteristic of me", score: 4 },
                        { text: "Entirely characteristic of me", score: 5 }
                    ],
                    category: "uncertainty_intolerance",
                    clinicalSignificance: "Information seeking compulsion"
                },
                {
                    id: "ius_3",
                    question: "The smallest doubt can stop me from acting",
                    subtitle: "Intolerance of Uncertainty Scale (IUS-12) - Behavioral Inhibition",
                    options: [
                        { text: "Not at all characteristic of me", score: 1 },
                        { text: "A little characteristic of me", score: 2 },
                        { text: "Somewhat characteristic of me", score: 3 },
                        { text: "Very characteristic of me", score: 4 },
                        { text: "Entirely characteristic of me", score: 5 }
                    ],
                    category: "uncertainty_intolerance"
                },
                {
                    id: "decision_anxiety_1",
                    question: "I find it difficult to make decisions when I don't have complete information",
                    subtitle: "Decision-Making Anxiety Inventory - Information Requirements",
                    options: [
                        { text: "Strongly disagree", score: 1 },
                        { text: "Disagree", score: 2 },
                        { text: "Neutral", score: 3 },
                        { text: "Agree", score: 4 },
                        { text: "Strongly agree", score: 5 }
                    ],
                    category: "decision_anxiety"
                },
                {
                    id: "decision_anxiety_2",
                    question: "I often postpone important decisions until I feel more certain about the outcome",
                    subtitle: "Decision-Making Anxiety Inventory - Avoidance Patterns",
                    options: [
                        { text: "Strongly disagree", score: 1 },
                        { text: "Disagree", score: 2 },
                        { text: "Neutral", score: 3 },
                        { text: "Agree", score: 4 },
                        { text: "Strongly agree", score: 5 }
                    ],
                    category: "decision_anxiety"
                }
            ],
            phase3: [ // Treatment Readiness & Support Assessment
                {
                    id: "motivation_1",
                    question: "How motivated are you to work on managing your anxiety through structured therapeutic activities?",
                    subtitle: "Treatment Readiness Evaluation - Motivation Assessment",
                    options: [
                        { text: "Not motivated at all", score: 1, clinical: "Low treatment readiness" },
                        { text: "Slightly motivated", score: 2, clinical: "Below-average treatment readiness" },
                        { text: "Moderately motivated", score: 3, clinical: "Average treatment readiness" },
                        { text: "Very motivated", score: 4, clinical: "High treatment readiness" },
                        { text: "Extremely motivated", score: 5, clinical: "Optimal treatment readiness" }
                    ],
                    category: "treatment_readiness"
                },
                {
                    id: "support_system",
                    question: "How would you rate your current social and emotional support system?",
                    subtitle: "Support System Evaluation - Resources Assessment",
                    options: [
                        { text: "Very poor - no support", score: 1 },
                        { text: "Poor - minimal support", score: 2 },
                        { text: "Fair - some support available", score: 3 },
                        { text: "Good - adequate support", score: 4 },
                        { text: "Excellent - strong support network", score: 5 }
                    ],
                    category: "support_system"
                },
                {
                    id: "previous_treatment",
                    question: "Have you previously engaged in mental health treatment?",
                    subtitle: "Treatment History - Experience Assessment",
                    options: [
                        { text: "No previous treatment", score: 1, clinical: "Treatment naive" },
                        { text: "Brief counseling (< 3 months)", score: 2, clinical: "Limited treatment exposure" },
                        { text: "Moderate therapy (3-12 months)", score: 3, clinical: "Moderate treatment experience" },
                        { text: "Extensive therapy (> 1 year)", score: 4, clinical: "Significant treatment experience" },
                        { text: "Multiple treatment episodes", score: 5, clinical: "Complex treatment history" }
                    ],
                    category: "treatment_history"
                },
                {
                    id: "coping_assessment",
                    question: "Which statement best describes your current coping strategies?",
                    subtitle: "Current Coping Mechanisms Audit",
                    options: [
                        { text: "I have no effective coping strategies", score: 1 },
                        { text: "I have some strategies but they don't work well", score: 2 },
                        { text: "I have moderate coping skills that sometimes help", score: 3 },
                        { text: "I have good coping strategies that usually work", score: 4 },
                        { text: "I have excellent coping skills and use them effectively", score: 5 }
                    ],
                    category: "current_coping"
                }
            ]
        };

        // Therapeutic Programs from provided data
        this.therapeuticPrograms = [
            {
                id: "uncertainty_mastery",
                name: "Uncertainty Mastery Program",
                duration: "8 weeks",
                description: "Evidence-based protocol for developing uncertainty tolerance and reducing anticipatory anxiety using CBT and ACT interventions",
                clinicalEvidence: "Dugas & Robichaud (2007) - Effect size d = 1.57",
                targetProfile: {
                    gad7: "≥10",
                    ius: "≥60",
                    decisionAnxiety: "≥15"
                },
                modules: [
                    { week: "Week 1", name: "Uncertainty Psychoeducation", description: "Understanding the role of uncertainty in anxiety maintenance" },
                    { week: "Week 2", name: "Cognitive Restructuring", description: "Challenging catastrophic predictions about uncertain outcomes" },
                    { week: "Week 3", name: "Behavioral Experiments", description: "Testing predictions through controlled uncertainty exposure" },
                    { week: "Week 4", name: "Progressive Exposure", description: "Systematic uncertainty exposure hierarchy implementation" },
                    { week: "Week 5", name: "Acceptance Training", description: "Mindfulness-based uncertainty acceptance techniques" },
                    { week: "Week 6", name: "Decision-Making Skills", description: "Structured decision frameworks under uncertainty" },
                    { week: "Week 7", name: "Relapse Prevention", description: "Maintaining gains and preventing symptom return" },
                    { week: "Week 8", name: "Long-term Maintenance", description: "Ongoing uncertainty tolerance maintenance strategies" }
                ]
            },
            {
                id: "decision_confidence",
                name: "Decision Confidence Builder",
                duration: "6 weeks",
                description: "Structured intervention for improving decision-making under uncertainty with cognitive and behavioral components",
                clinicalEvidence: "Hofmann et al. (2012) - CBT for anxiety disorders, effect size d = 0.73",
                targetProfile: {
                    decisionAnxiety: "≥12",
                    ius: "≥45"
                },
                modules: [
                    { week: "Week 1", name: "Decision-Making Assessment", description: "Comprehensive evaluation of current decision-making patterns" },
                    { week: "Week 2", name: "Information Balance Training", description: "Optimal information gathering vs. perfectionism balance" },
                    { week: "Week 3", name: "Probability Estimation", description: "Accurate outcome probability assessment training" },
                    { week: "Week 4", name: "Values-Based Frameworks", description: "Decision-making aligned with personal values" },
                    { week: "Week 5", name: "Outcome Acceptance", description: "Accepting and learning from decision outcomes" },
                    { week: "Week 6", name: "Implementation Strategies", description: "Practical decision implementation and follow-through" }
                ]
            },
            {
                id: "comprehensive_anxiety",
                name: "Comprehensive Anxiety Recovery Protocol",
                duration: "12 weeks",
                description: "Intensive multi-modal treatment combining CBT, ACT, and mindfulness-based interventions",
                clinicalEvidence: "Meta-analysis: Multiple approaches, combined effect size d = 1.2",
                targetProfile: {
                    gad7: "≥15",
                    ius: "≥70",
                    decisionAnxiety: "≥18"
                },
                modules: [
                    { week: "Week 1-2", name: "Comprehensive Assessment", description: "Detailed symptom and functional assessment" },
                    { week: "Week 3-4", name: "Cognitive Restructuring", description: "Advanced thought challenging and reframing" },
                    { week: "Week 5-6", name: "Behavioral Activation", description: "Activity scheduling and behavioral engagement" },
                    { week: "Week 7-8", name: "Exposure Therapy", description: "Systematic desensitization and exposure exercises" },
                    { week: "Week 9-10", name: "Acceptance Training", description: "ACT-based acceptance and commitment work" },
                    { week: "Week 11-12", name: "Relapse Prevention", description: "Long-term maintenance and prevention planning" }
                ]
            }
        ];

        // Professional recommendations system
        this.recommendationEngine = {
            dailyRecommendations: [],
            weeklyGoal: null,
            adaptiveInsights: [],
            treatmentMilestones: []
        };

        this.init();
    }

    init() {
        this.loadUserSession();
        this.bindEvents();
        this.determineInitialScreen();
        this.generateDailyRecommendations();
    }

    loadUserSession() {
        const sessionData = localStorage.getItem('clinicalmind_session');
        if (sessionData) {
            try {
                const session = JSON.parse(sessionData);
                this.currentUser = session.user;
                this.assessmentData = session.assessmentData || {};
                this.clinicalScores = session.clinicalScores || {};
                this.treatmentPlan = session.treatmentPlan;
                this.progressMetrics = session.progressMetrics || {};
                this.sessionData = session.sessionData || [];
            } catch (e) {
                console.error('Error loading session:', e);
                this.clearSession();
            }
        }
    }

    saveUserSession() {
        const sessionData = {
            user: this.currentUser,
            assessmentData: this.assessmentData,
            clinicalScores: this.clinicalScores,
            treatmentPlan: this.treatmentPlan,
            progressMetrics: this.progressMetrics,
            sessionData: this.sessionData,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('clinicalmind_session', JSON.stringify(sessionData));
    }

    clearSession() {
        localStorage.removeItem('clinicalmind_session');
        this.currentUser = null;
        this.assessmentData = {};
        this.clinicalScores = {};
        this.treatmentPlan = null;
    }

    determineInitialScreen() {
        if (this.currentUser && this.currentUser.profileComplete && this.treatmentPlan) {
            this.showScreen('professional-dashboard');
            this.updateProfessionalDashboard();
        } else if (this.currentUser && this.currentUser.profileComplete) {
            this.showScreen('clinical-assessment');
            this.initializeClinicalAssessment();
        } else if (this.currentUser) {
            this.showScreen('profile-setup');
        } else {
            this.showScreen('landing');
        }
    }

    bindEvents() {
        // Google Auth Simulation
        const googleAuthBtn = document.getElementById('google-auth-btn');
        if (googleAuthBtn) {
            googleAuthBtn.addEventListener('click', () => {
                this.simulateGoogleAuth();
            });
        }

        // Profile Setup
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.completeProfileSetup();
            });
        }

        // Clinical Assessment Navigation
        const nextBtn = document.getElementById('next-clinical-question');
        const prevBtn = document.getElementById('prev-clinical-question');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextClinicalQuestion();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevClinicalQuestion();
            });
        }

        // Treatment Plan
        const acceptBtn = document.getElementById('accept-treatment-plan');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                this.acceptTreatmentPlan();
            });
        }

        // Dashboard Activities
        this.bindActivityEvents();

        // Crisis Support
        const crisisBtn = document.getElementById('crisis-nav-btn');
        if (crisisBtn) {
            crisisBtn.addEventListener('click', () => {
                this.showCrisisModal();
            });
        }

        const startGroundingBtn = document.getElementById('start-crisis-grounding');
        if (startGroundingBtn) {
            startGroundingBtn.addEventListener('click', () => {
                this.startCrisisGrounding();
            });
        }

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        // Navigation
        document.querySelectorAll('.nav-item[data-screen]').forEach(item => {
            item.addEventListener('click', (e) => {
                const screen = e.currentTarget.getAttribute('data-screen');
                this.navigateToScreen(screen);
            });
        });

        // Modal close handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target.id);
            }
        });
    }

    bindActivityEvents() {
        const activities = [
            'uncertainty-training-btn',
            'thought-record-btn', 
            'decision-matrix-btn',
            'exposure-hierarchy-btn',
            'mindfulness-session-btn',
            'behavioral-experiment-btn'
        ];

        activities.forEach(activityId => {
            const btn = document.getElementById(activityId);
            if (btn) {
                btn.addEventListener('click', () => {
                    const activityType = activityId.replace('-btn', '').replace('-', '_');
                    this.startActivity(activityType);
                });
            }
        });
    }

    startActivity(activityType) {
        const activities = {
            'uncertainty_training': () => this.startUncertaintyTraining(),
            'thought_record': () => this.startThoughtRecord(),
            'decision_matrix': () => this.startDecisionMatrix(),
            'exposure_hierarchy': () => this.startExposureHierarchy(),
            'mindfulness_session': () => this.startMindfulnessSession(),
            'behavioral_experiment': () => this.startBehavioralExperiment()
        };

        if (activities[activityType]) {
            activities[activityType]();
        }
    }

    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        this.currentScreen = screenName;

        // Show/hide professional elements
        const header = document.getElementById('clinical-header');
        const footer = document.getElementById('clinical-footer');
        const nav = document.getElementById('professional-nav');

        if (['professional-dashboard', 'activities', 'progress', 'resources'].includes(screenName)) {
            if (header) header.style.display = 'block';
            if (footer) footer.style.display = 'block';
            if (nav) nav.style.display = 'flex';
            this.updateNavigation();
        } else {
            if (header) header.style.display = 'none';
            if (footer) footer.style.display = 'none';
            if (nav) nav.style.display = 'none';
        }
    }

    updateNavigation() {
        document.querySelectorAll('.nav-item[data-screen]').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === this.currentScreen) {
                item.classList.add('active');
            }
        });
    }

    navigateToScreen(screenName) {
        if (screenName === 'professional-dashboard') {
            this.showScreen('professional-dashboard');
            this.updateProfessionalDashboard();
        } else {
            this.showScreen(screenName);
        }
    }

    // Google Authentication Simulation
    simulateGoogleAuth() {
        // Show loading state
        const authBtn = document.getElementById('google-auth-btn');
        const originalText = authBtn.innerHTML;
        authBtn.innerHTML = '<div class="loading"></div>Authenticating...';
        authBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Create mock user from Google
            const mockUser = {
                id: `user_${Date.now()}`,
                email: 'user@gmail.com',
                name: 'Demo User',
                profilePicture: null,
                registrationDate: new Date().toISOString(),
                profileComplete: false
            };

            this.currentUser = mockUser;
            this.saveUserSession();

            // Reset button
            authBtn.innerHTML = originalText;
            authBtn.disabled = false;

            // Navigate to profile setup
            this.showScreen('profile-setup');
            this.updateUserProfile();
        }, 1500);
    }

    updateUserProfile() {
        if (this.currentUser) {
            const userNameEl = document.getElementById('user-name');
            const userAvatarEl = document.getElementById('user-avatar');
            
            if (userNameEl) userNameEl.textContent = this.currentUser.name;
            if (userAvatarEl) userAvatarEl.textContent = this.currentUser.name.charAt(0).toUpperCase();
        }
    }

    completeProfileSetup() {
        const formData = new FormData(document.getElementById('profile-form'));
        
        const profileData = {
            fullName: formData.get('user-full-name') || this.currentUser.name,
            age: formData.get('user-age'),
            previousTreatment: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value),
            treatmentGoals: formData.get('treatment-goals')
        };

        // Update user profile
        this.currentUser = {
            ...this.currentUser,
            ...profileData,
            profileComplete: true,
            profileCompletedDate: new Date().toISOString()
        };

        this.saveUserSession();
        this.updateUserProfile();

        // Move to clinical assessment
        this.showScreen('clinical-assessment');
        this.initializeClinicalAssessment();
    }

    initializeClinicalAssessment() {
        this.assessmentPhase = 1;
        this.assessmentProgress = 0;
        this.assessmentData = {};
        this.renderCurrentAssessmentPhase();
        this.renderClinicalQuestion();
    }

    renderCurrentAssessmentPhase() {
        // Update phase indicators
        document.querySelectorAll('.phase-item').forEach((item, index) => {
            item.classList.remove('active', 'completed');
            if (index + 1 === this.assessmentPhase) {
                item.classList.add('active');
            } else if (index + 1 < this.assessmentPhase) {
                item.classList.add('completed');
            }
        });
    }

    renderClinicalQuestion() {
        const phases = ['phase1', 'phase2', 'phase3'];
        const currentPhaseQuestions = this.clinicalAssessment[phases[this.assessmentPhase - 1]];
        const question = currentPhaseQuestions[this.assessmentProgress];
        
        if (!question) {
            this.nextAssessmentPhase();
            return;
        }

        const container = document.getElementById('clinical-question-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="clinical-question-title">${question.question}</div>
            <div class="clinical-question-subtitle">${question.subtitle}</div>
            <div class="clinical-question-options" id="clinical-question-options"></div>
        `;

        const optionsContainer = document.getElementById('clinical-question-options');
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'clinical-option';
            optionDiv.innerHTML = `
                <div class="clinical-option-text">${option.text}</div>
                ${option.clinical ? `<div class="clinical-option-score">Clinical: ${option.clinical}</div>` : ''}
            `;
            
            optionDiv.addEventListener('click', () => {
                document.querySelectorAll('.clinical-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                optionDiv.classList.add('selected');
                optionDiv.dataset.selected = index;
            });
            
            optionsContainer.appendChild(optionDiv);
        });

        this.updateAssessmentProgress();
        this.updateAssessmentNavigation();
    }

    updateAssessmentProgress() {
        const phases = ['phase1', 'phase2', 'phase3'];
        const totalQuestions = this.clinicalAssessment.phase1.length + 
                            this.clinicalAssessment.phase2.length + 
                            this.clinicalAssessment.phase3.length;
        
        let completedQuestions = 0;
        for (let i = 1; i < this.assessmentPhase; i++) {
            completedQuestions += this.clinicalAssessment[phases[i - 1]].length;
        }
        completedQuestions += this.assessmentProgress;

        const progress = (completedQuestions / totalQuestions) * 100;
        const progressFill = document.getElementById('assessment-progress-fill');
        const progressText = document.getElementById('assessment-progress-text');
        
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `Question ${completedQuestions + 1} of ${totalQuestions}`;
    }

    updateAssessmentNavigation() {
        const prevBtn = document.getElementById('prev-clinical-question');
        const nextBtn = document.getElementById('next-clinical-question');
        
        if (prevBtn) {
            prevBtn.disabled = this.assessmentPhase === 1 && this.assessmentProgress === 0;
        }
        
        if (nextBtn) {
            const phases = ['phase1', 'phase2', 'phase3'];
            const isLastPhase = this.assessmentPhase === 3;
            const isLastQuestion = this.assessmentProgress === this.clinicalAssessment[phases[this.assessmentPhase - 1]].length - 1;
            
            if (isLastPhase && isLastQuestion) {
                nextBtn.textContent = 'Complete Assessment';
            } else {
                nextBtn.textContent = 'Next Question';
            }
        }
    }

    nextClinicalQuestion() {
        // Collect current question data
        const selectedOption = document.querySelector('.clinical-option.selected');
        if (!selectedOption) {
            alert('Please select an answer before continuing.');
            return;
        }

        const phases = ['phase1', 'phase2', 'phase3'];
        const currentPhaseQuestions = this.clinicalAssessment[phases[this.assessmentPhase - 1]];
        const question = currentPhaseQuestions[this.assessmentProgress];
        const selectedIndex = parseInt(selectedOption.dataset.selected);
        
        this.assessmentData[question.id] = {
            answer: question.options[selectedIndex].text,
            score: question.options[selectedIndex].score,
            category: question.category
        };

        // Move to next question or phase
        this.assessmentProgress++;
        if (this.assessmentProgress >= currentPhaseQuestions.length) {
            this.nextAssessmentPhase();
        } else {
            this.renderClinicalQuestion();
        }
    }

    prevClinicalQuestion() {
        if (this.assessmentProgress > 0) {
            this.assessmentProgress--;
        } else if (this.assessmentPhase > 1) {
            this.assessmentPhase--;
            const phases = ['phase1', 'phase2', 'phase3'];
            this.assessmentProgress = this.clinicalAssessment[phases[this.assessmentPhase - 1]].length - 1;
            this.renderCurrentAssessmentPhase();
        }
        this.renderClinicalQuestion();
    }

    nextAssessmentPhase() {
        if (this.assessmentPhase < 3) {
            this.assessmentPhase++;
            this.assessmentProgress = 0;
            this.renderCurrentAssessmentPhase();
            this.renderClinicalQuestion();
        } else {
            this.completeAssessment();
        }
    }

    completeAssessment() {
        // Calculate clinical scores
        this.calculateClinicalScores();
        
        // Generate treatment recommendation
        this.generateTreatmentRecommendation();
        
        // Show treatment planning screen
        this.showScreen('treatment-planning');
        this.renderTreatmentPlan();
    }

    calculateClinicalScores() {
        let gad7Score = 0;
        let iusScore = 0;
        let decisionAnxietyScore = 0;
        let supportSystemScore = 0;
        let treatmentReadinessScore = 0;

        // Calculate scores by category
        Object.values(this.assessmentData).forEach(response => {
            switch (response.category) {
                case 'general_anxiety':
                    gad7Score += response.score;
                    break;
                case 'uncertainty_intolerance':
                    iusScore += response.score;
                    break;
                case 'decision_anxiety':
                    decisionAnxietyScore += response.score;
                    break;
                case 'support_system':
                    supportSystemScore = response.score;
                    break;
                case 'treatment_readiness':
                    treatmentReadinessScore = response.score;
                    break;
            }
        });

        this.clinicalScores = {
            gad7: {
                score: gad7Score,
                max: 21,
                interpretation: this.interpretGAD7Score(gad7Score),
                severity: this.getGAD7Severity(gad7Score)
            },
            ius: {
                score: iusScore,
                max: 60,
                interpretation: this.interpretIUSScore(iusScore),
                severity: this.getIUSSeverity(iusScore)
            },
            decisionAnxiety: {
                score: decisionAnxietyScore,
                max: 25,
                interpretation: this.interpretDecisionAnxietyScore(decisionAnxietyScore),
                severity: this.getDecisionAnxietySeverity(decisionAnxietyScore)
            },
            supportSystem: supportSystemScore,
            treatmentReadiness: treatmentReadinessScore,
            assessmentDate: new Date().toISOString()
        };

        this.saveUserSession();
    }

    interpretGAD7Score(score) {
        if (score <= 4) return "Minimal anxiety symptoms";
        if (score <= 9) return "Mild anxiety symptoms";
        if (score <= 14) return "Moderate anxiety symptoms";
        return "Severe anxiety symptoms";
    }

    getGAD7Severity(score) {
        if (score <= 4) return "minimal";
        if (score <= 9) return "mild";
        if (score <= 14) return "moderate";
        return "severe";
    }

    interpretIUSScore(score) {
        if (score <= 35) return "Low uncertainty intolerance";
        if (score <= 48) return "Moderate uncertainty intolerance";
        return "High uncertainty intolerance";
    }

    getIUSSeverity(score) {
        if (score <= 35) return "minimal";
        if (score <= 48) return "moderate";
        return "severe";
    }

    interpretDecisionAnxietyScore(score) {
        if (score <= 8) return "Low decision-making anxiety";
        if (score <= 15) return "Moderate decision-making anxiety";
        return "High decision-making anxiety";
    }

    getDecisionAnxietySeverity(score) {
        if (score <= 8) return "minimal";
        if (score <= 15) return "moderate";
        return "severe";
    }

    generateTreatmentRecommendation() {
        const scores = this.clinicalScores;
        
        // Determine best program based on scores
        let recommendedProgram = null;
        
        if (scores.gad7.score >= 15 || (scores.ius.score >= 50 && scores.decisionAnxiety.score >= 18)) {
            recommendedProgram = this.therapeuticPrograms.find(p => p.id === 'comprehensive_anxiety');
        } else if (scores.ius.score >= 45) {
            recommendedProgram = this.therapeuticPrograms.find(p => p.id === 'uncertainty_mastery');
        } else if (scores.decisionAnxiety.score >= 12) {
            recommendedProgram = this.therapeuticPrograms.find(p => p.id === 'decision_confidence');
        } else {
            recommendedProgram = this.therapeuticPrograms.find(p => p.id === 'uncertainty_mastery');
        }

        this.treatmentPlan = {
            recommendedProgram,
            startDate: new Date().toISOString(),
            clinicalScores: scores,
            customizations: this.generateTreatmentCustomizations(),
            milestones: this.generateTreatmentMilestones(recommendedProgram)
        };

        this.saveUserSession();
    }

    generateTreatmentCustomizations() {
        const customizations = [];
        const scores = this.clinicalScores;

        if (scores.gad7.score >= 15) {
            customizations.push("High-intensity exposure exercises");
            customizations.push("Daily anxiety monitoring");
        }

        if (scores.ius.score >= 50) {
            customizations.push("Extended uncertainty tolerance training");
            customizations.push("Real-world uncertainty challenges");
        }

        if (scores.supportSystem <= 2) {
            customizations.push("Additional self-support strategies");
            customizations.push("Community resource connections");
        }

        return customizations;
    }

    generateTreatmentMilestones(program) {
        const milestones = [
            {
                id: 1,
                title: "Treatment Engagement",
                description: "Complete first week of therapeutic activities",
                targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                completed: false,
                current: true
            },
            {
                id: 2,
                title: "Initial Progress",
                description: "25% reduction in anxiety symptoms",
                targetDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
                completed: false,
                current: false
            },
            {
                id: 3,
                title: "Mid-Treatment Assessment",
                description: "Complete mid-program evaluation",
                targetDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString(),
                completed: false,
                current: false
            }
        ];

        return milestones;
    }

    renderTreatmentPlan() {
        const resultsContainer = document.getElementById('treatment-results');
        if (!resultsContainer) return;
        
        const scores = this.clinicalScores;
        const plan = this.treatmentPlan;

        resultsContainer.innerHTML = `
            <div class="clinical-scores-summary">
                <h3>Clinical Assessment Results</h3>
                <div class="scores-grid">
                    <div class="score-card ${scores.gad7.severity}">
                        <div class="score-value">${scores.gad7.score}/${scores.gad7.max}</div>
                        <div class="score-label">GAD-7 Score</div>
                        <div class="score-interpretation">${scores.gad7.interpretation}</div>
                    </div>
                    <div class="score-card ${scores.ius.severity}">
                        <div class="score-value">${scores.ius.score}/${scores.ius.max}</div>
                        <div class="score-label">Uncertainty Intolerance</div>
                        <div class="score-interpretation">${scores.ius.interpretation}</div>
                    </div>
                    <div class="score-card ${scores.decisionAnxiety.severity}">
                        <div class="score-value">${scores.decisionAnxiety.score}/${scores.decisionAnxiety.max}</div>
                        <div class="score-label">Decision Anxiety</div>
                        <div class="score-interpretation">${scores.decisionAnxiety.interpretation}</div>
                    </div>
                </div>
            </div>

            <div class="recommended-program">
                <div class="program-header">
                    <div class="program-badge">Recommended Treatment</div>
                    <div class="program-title">${plan.recommendedProgram.name}</div>
                    <div class="program-duration">${plan.recommendedProgram.duration}</div>
                </div>
                <p><strong>Clinical Rationale:</strong> ${plan.recommendedProgram.description}</p>
                <p><strong>Evidence Base:</strong> ${plan.recommendedProgram.clinicalEvidence}</p>
                
                <div class="program-modules">
                    ${plan.recommendedProgram.modules.map(module => `
                        <div class="program-module">
                            <div class="module-week">${module.week}</div>
                            <div class="module-name">${module.name}</div>
                            <div class="module-description">${module.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    acceptTreatmentPlan() {
        this.treatmentPlan.accepted = true;
        this.treatmentPlan.acceptedDate = new Date().toISOString();
        this.treatmentPlan.currentWeek = 1;
        this.treatmentPlan.currentModule = this.treatmentPlan.recommendedProgram.modules[0];
        
        this.saveUserSession();
        this.generateDailyRecommendations();
        this.showScreen('professional-dashboard');
        this.updateProfessionalDashboard();
    }

    updateProfessionalDashboard() {
        this.updateClinicalMetrics();
        this.updateRecommendations();
        this.updateInsights();
        this.updateMilestones();
        this.updateClinicalChart();
    }

    updateClinicalMetrics() {
        const scores = this.clinicalScores;
        
        this.updateElementText('current-gad-score', `${scores.gad7.score}/21`);
        this.updateElementText('gad-trend', '↓ Improving');
        this.updateElementClass('gad-trend', 'metric-change positive');

        this.updateElementText('uncertainty-tolerance', `${Math.round((1 - scores.ius.score / 60) * 100)}%`);
        this.updateElementText('uncertainty-trend', '↑ Building');
        this.updateElementClass('uncertainty-trend', 'metric-change positive');

        this.updateElementText('decision-confidence', `${Math.round((1 - scores.decisionAnxiety.score / 25) * 100)}%`);
        this.updateElementText('decision-trend', '→ Stable');
        this.updateElementClass('decision-trend', 'metric-change neutral');

        this.updateElementText('treatment-progress', `Week ${this.treatmentPlan.currentWeek}`);
        this.updateElementText('progress-trend', '↑ Active');
        this.updateElementClass('progress-trend', 'metric-change positive');
    }

    updateElementText(id, text) {
        const element = document.getElementById(id);
        if (element) element.textContent = text;
    }

    updateElementClass(id, className) {
        const element = document.getElementById(id);
        if (element) element.className = className;
    }

    updateRecommendations() {
        const container = document.getElementById('recommendations-list');
        if (!container) return;
        
        const recommendations = this.generateDailyRecommendations();
        
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <div class="recommendation-priority">${rec.priority}</div>
                <div class="recommendation-text">${rec.text}</div>
                <div class="recommendation-action">${rec.action}</div>
            </div>
        `).join('');
    }

    generateDailyRecommendations() {
        const recommendations = [];
        const scores = this.clinicalScores;
        const currentWeek = this.treatmentPlan?.currentWeek || 1;

        // High priority recommendations based on scores
        if (scores.gad7.score >= 15) {
            recommendations.push({
                priority: "HIGH PRIORITY",
                text: "Your anxiety symptoms are in the severe range. Focus on daily grounding exercises.",
                action: "Complete uncertainty training session today"
            });
        }

        if (scores.ius.score >= 50) {
            recommendations.push({
                priority: "CLINICAL FOCUS",
                text: "High uncertainty intolerance detected. Practice acceptance-based interventions.",
                action: "Start with 10-minute mindfulness session"
            });
        }

        // Weekly progression recommendations
        recommendations.push({
            priority: "TREATMENT PROGRESS",
            text: `Week ${currentWeek} focus: ${this.treatmentPlan?.currentModule?.name || 'Treatment engagement'}`,
            action: "Complete today's therapeutic activity"
        });

        // Adaptive recommendations
        recommendations.push({
            priority: "DAILY PRACTICE",
            text: "Maintain consistent daily practice for optimal treatment outcomes.",
            action: "Log your mood and complete one coping exercise"
        });

        this.recommendationEngine.dailyRecommendations = recommendations;
        return recommendations;
    }

    updateInsights() {
        const container = document.getElementById('ai-insights-list');
        if (!container) return;
        
        const insights = this.generateAIInsights();
        
        container.innerHTML = insights.map(insight => `
            <div class="insight-item">${insight}</div>
        `).join('');
    }

    generateAIInsights() {
        const insights = [];
        const scores = this.clinicalScores;
        
        // Pattern recognition insights
        insights.push("Your anxiety pattern shows strongest correlation with uncertainty about future events.");
        
        if (scores.decisionAnxiety.score > scores.gad7.score) {
            insights.push("Decision-making appears to be your primary anxiety trigger - focus on decision confidence building.");
        }

        insights.push("Optimal treatment time appears to be morning sessions based on engagement patterns.");
        
        insights.push("Your support system score suggests incorporating peer support elements into treatment.");

        return insights;
    }

    updateMilestones() {
        const container = document.getElementById('milestone-timeline');
        if (!container) return;
        
        const milestones = this.treatmentPlan?.milestones || [];
        
        container.innerHTML = milestones.map(milestone => `
            <div class="milestone-item ${milestone.completed ? 'completed' : ''} ${milestone.current ? 'current' : ''}">
                <div class="milestone-marker"></div>
                <div class="milestone-title">${milestone.title}</div>
                <div class="milestone-description">${milestone.description}</div>
                <div class="milestone-date">Target: ${new Date(milestone.targetDate).toLocaleDateString()}</div>
            </div>
        `).join('');
    }

    updateClinicalChart() {
        const ctx = document.getElementById('clinical-progress-chart');
        if (!ctx) return;

        const chartCtx = ctx.getContext('2d');
        
        if (this.clinicalChart) {
            this.clinicalChart.destroy();
        }

        // Generate mock progress data
        const weeks = Array.from({length: 8}, (_, i) => `Week ${i + 1}`);
        const anxietyProgress = [this.clinicalScores.gad7.score];
        const uncertaintyProgress = [this.clinicalScores.ius.score];
        
        // Simulate future progress for demonstration
        for (let i = 1; i < 8; i++) {
            anxietyProgress.push(Math.max(0, anxietyProgress[i-1] - Math.random() * 3));
            uncertaintyProgress.push(Math.max(0, uncertaintyProgress[i-1] - Math.random() * 5));
        }

        this.clinicalChart = new Chart(chartCtx, {
            type: 'line',
            data: {
                labels: weeks,
                datasets: [
                    {
                        label: 'GAD-7 Score',
                        data: anxietyProgress,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Uncertainty Intolerance',
                        data: uncertaintyProgress,
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Clinical Score'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Treatment Progress Trajectory'
                    }
                }
            }
        });
    }

    // Therapeutic Activity Methods
    startUncertaintyTraining() {
        alert('Starting Uncertainty Training Module...\n\nThis week\'s focus: Progressive uncertainty exposure\n\nYou will practice tolerating small uncertainties and gradually work up to larger ones. Ready to begin?');
        this.logActivity('uncertainty_training');
    }

    startThoughtRecord() {
        alert('Opening Thought Record Tool...\n\nIdentify an anxious thought, examine the evidence, and develop a balanced perspective.\n\nThis CBT technique helps restructure unhelpful thinking patterns.');
        this.logActivity('thought_record');
    }

    startDecisionMatrix() {
        alert('Decision Matrix Tool Loading...\n\nStructured framework for making decisions under uncertainty.\n\nList options, criteria, and weights to make more confident decisions.');
        this.logActivity('decision_matrix');
    }

    startExposureHierarchy() {
        alert('Exposure Hierarchy Planning...\n\nCreate a step-by-step plan for facing feared situations.\n\nStart with easier exposures and work your way up.');
        this.logActivity('exposure_hierarchy');
    }

    startMindfulnessSession() {
        alert('Mindfulness Session Beginning...\n\n12-minute guided mindfulness practice for uncertainty acceptance.\n\nFind a quiet space and follow the audio guidance.');
        this.logActivity('mindfulness_session');
    }

    startBehavioralExperiment() {
        alert('Behavioral Experiment Designer...\n\nTest your anxious predictions through safe, structured experiments.\n\nCollect evidence about what actually happens vs. what you feared.');
        this.logActivity('behavioral_experiment');
    }

    logActivity(activityType) {
        const activity = {
            id: Date.now(),
            type: activityType,
            date: new Date().toISOString(),
            completed: true,
            duration: Math.floor(Math.random() * 30) + 10, // Mock duration
            effectiveness: null
        };

        this.sessionData.push(activity);
        this.saveUserSession();
    }

    // Crisis Support
    showCrisisModal() {
        const modal = document.getElementById('crisis-modal');
        if (modal) modal.classList.remove('hidden');
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
    }

    startCrisisGrounding() {
        alert('Crisis Grounding Protocol Initiated...\n\n5-4-3-2-1 Technique:\n\n• 5 things you can see\n• 4 things you can touch\n• 3 things you can hear\n• 2 things you can smell\n• 1 thing you can taste\n\nTake your time with each step. You are safe.');
        this.hideModal('crisis-modal');
    }

    logout() {
        if (confirm('Are you sure you want to sign out? Your progress will be saved.')) {
            this.clearSession();
            this.showScreen('landing');
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ClinicalMindPro();
});