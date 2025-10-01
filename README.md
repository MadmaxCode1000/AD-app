# AnxietyAid - Personal Anxiety Support App

## Overview
AnxietyAid is a comprehensive web application designed to help individuals manage anxiety, particularly focusing on fear of the unknown and decision-making difficulties. The app provides interactive assessments, personalized coping strategies, and progress tracking to support users in building resilience against anxiety.

## Key Features

### 🧭 Interactive Assessment System
- **Initial Assessment**: Comprehensive questionnaire covering general anxiety, uncertainty intolerance, and decision-making confidence
- **Ongoing Evaluations**: Regular check-ins to track progress and adjust recommendations
- **Smart Scoring**: Automated analysis to determine anxiety severity and personalized support levels

### 📝 Situation Logging & Analysis
- **Detailed Situation Tracking**: Log anxiety-provoking events with context, triggers, and symptoms
- **Pattern Recognition**: Intelligent matching system identifies similar past situations
- **Historical Analysis**: Compare current responses with previous experiences to show growth

### 🎯 Personalized Coping Strategies
- **Evidence-Based Techniques**: Grounding exercises, cognitive restructuring, and uncertainty acceptance methods
- **Adaptive Recommendations**: Strategies tailored based on user data and effectiveness ratings
- **Interactive Tools**: Guided breathing exercises, thought challengers, and decision wizards

### 📊 Progress Visualization
- **Anxiety Trends**: Charts showing anxiety levels over time
- **Coping Effectiveness**: Track which strategies work best for you
- **Pattern Insights**: Identify common triggers and successful responses

### 🆘 Emergency Support
- **Crisis Resources**: Quick access to emergency contacts and immediate coping techniques
- **Always Available**: Emergency support button accessible from any screen

## Technical Features

### Data Management
- **Local Storage**: All data stored securely on your device
- **Privacy-First**: No external servers or data sharing
- **Persistent Memory**: App remembers your progress across sessions

### Intelligent Matching System
The app uses sophisticated algorithms to:
- Match similar situations based on keywords and context
- Suggest coping strategies that worked in similar past situations  
- Track pattern evolution over time
- Provide personalized recommendations

## How to Deploy on GitHub

### Step 1: Download and Extract
1. Download the application files from the deployment link
2. Extract all files to a local folder
3. You should have: `index.html`, `style.css`, `app.js`

### Step 2: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it something like `anxiety-support-app` or `anxietyaid`
3. Make it public and don't initialize with README (you'll upload files manually)

### Step 3: Upload Files
1. Click "uploading an existing file"
2. Drag and drop or select all three files: `index.html`, `style.css`, `app.js`
3. Add commit message: "Initial commit - AnxietyAid support app"
4. Click "Commit new files"

### Step 4: Enable GitHub Pages
1. Go to repository Settings
2. Scroll down to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click Save

### Step 5: Access Your App
- GitHub will provide a URL like: `https://[username].github.io/[repository-name]`
- The app will be live within a few minutes

## Usage Guide

### For New Users
1. **Welcome & Assessment**: Complete initial questionnaire (5-10 minutes)
2. **Dashboard Setup**: Review your personalized dashboard
3. **First Situation**: Log your first anxiety situation for baseline

### For Ongoing Use
1. **Regular Logging**: Add new situations as they occur
2. **Strategy Application**: Use recommended coping techniques
3. **Effectiveness Rating**: Rate how well strategies worked
4. **Progress Review**: Check weekly/monthly progress charts

### In Crisis Situations
1. **Emergency Button**: Always visible red emergency button
2. **Immediate Techniques**: Quick access to grounding exercises
3. **Crisis Resources**: Direct links to professional help

## App Architecture

### Data Structure
```javascript
// User profile with assessment results
UserData: {
  assessmentScores: {...},
  anxietyLevel: number,
  uncertaintyTolerance: number,
  decisionConfidence: number
}

// Individual situation entries
Situation: {
  id: timestamp,
  description: string,
  anxietyLevel: 1-10,
  triggers: array,
  copingUsed: array,
  effectiveness: rating,
  resolved: boolean
}
```

### Key Algorithms
1. **Similarity Matching**: Compares situations using keyword analysis and trigger categories
2. **Strategy Recommendation**: Suggests techniques based on past effectiveness and situation type
3. **Progress Calculation**: Tracks improvement trends across multiple metrics

## Customization Options

### Adding New Coping Strategies
Modify the `copingStrategies` array in `app.js` to add new techniques:
```javascript
{
  id: "new_technique",
  name: "Your New Technique",
  category: "cognitive|behavioral|mindfulness",
  description: "Brief description",
  steps: ["Step 1", "Step 2", ...],
  timeEstimate: "X minutes",
  effectiveness: {anxiety_type: rating}
}
```

### Customizing Assessment Questions
Add new questions to the `assessmentQuestions` array:
```javascript
{
  id: "unique_id",
  question: "Your question text",
  type: "scale|agreement|multiple_choice",
  options: ["Option 1", "Option 2", ...],
  category: "question_category"
}
```

## Privacy & Security

### Data Protection
- **Local-Only Storage**: All data remains on user's device
- **No External Tracking**: No analytics or third-party data collection
- **User Control**: Users can clear their data at any time

### Ethical Considerations
- **Professional Disclaimer**: App complements but doesn't replace professional care
- **Crisis Resources**: Always provides access to professional emergency support
- **Empowerment Focus**: Builds user capabilities rather than creating dependency

## Support & Maintenance

### Regular Updates
- Monitor for browser compatibility issues
- Update coping strategies based on latest research
- Enhance user interface based on feedback

### Getting Help
- Check GitHub Issues for known problems
- Review documentation for common questions
- Consider professional consultation for serious anxiety concerns

## Contributing

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make improvements or fixes
4. Submit a pull request with detailed description

### Areas for Enhancement
- Additional assessment instruments
- More coping strategy varieties
- Enhanced data visualization
- Accessibility improvements
- Mobile app versions

## License
This project is provided as-is for personal and educational use. Please ensure compliance with local healthcare regulations if modifying for professional use.

## Disclaimer
AnxietyAid is a supportive tool designed to help manage anxiety symptoms. It is not intended to replace professional mental health treatment. If you're experiencing severe anxiety, depression, or thoughts of self-harm, please seek immediate professional help or contact emergency services.

**Emergency Resources:**
- Crisis Text Line: Text HOME to 741741
- National Suicide Prevention Lifeline: 988
- Emergency Services: 911

---

*Built with care to support mental health and well-being. Remember: seeking help is a sign of strength, not weakness.*