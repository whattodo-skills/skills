# Name The Emotion Handoff

## Artifact

- File: `name-the-emotion.html`
- Suggested Wix route: `/skills-hub/name-the-emotion`
- Artifact URL after publish: `https://whattodo-skills.github.io/skills/name-the-emotion.html?v=<commit>`

## State IDs

The standalone artifact uses the same state IDs requested for the Wix Multi-State Box build:

- `intro`
- `notice`
- `nameEmotion`
- `secondEmotion`
- `measure`
- `respond`
- `reflection`
- `complete`
- `pairPractice`

## Key Element IDs

- `progressText`
- `progressBar`
- `timerText`
- `backButton`
- `nextButton`
- `exitButton`
- `privacyText`
- `validationText`
- `situationInput`
- `primaryIntensitySlider`
- `primaryIntensityNumber`
- `secondaryIntensitySlider`
- `secondaryIntensityNumber`
- `pointingTowardInput`
- `nextActionInput`
- `reflectionInput`
- `saveStackButton`
- `copyButton`

## Editable Configuration

Copy and option sets are configured near the top of the script:

- `STEPS`
- `emotionFamilies`
- `physicalOptions`
- `actionOptions`
- `reflectionOptions`

The guided standard-flow times are:

- Introduction: 20 seconds
- Notice: 40 seconds
- Name: 60 seconds
- Second emotion: 40 seconds
- Measure: 40 seconds
- Respond: 60 seconds
- Reflection: 40 seconds

Total guided time: 300 seconds.

## Feelings Wheel Source

No third-party Feelings Wheel image is used. The build uses an original text-based selector with selectable families and emotion words.

## Session Data

Responses are stored only in `sessionStorage` under:

`wtd_name_the_emotion_v1`

Session data is cleared when the learner chooses:

- `Practice again`
- `Finish`
- `Clear my responses`

No response data is written to a database by the artifact. The Skills Stack save sends only the skill card metadata, not the learner's situation, emotion labels, intensity ratings, physical clue, next action, or reflection.

## Bridge Messages

Outgoing parent messages use the locked origin:

`https://www.whattodo.coach`

Messages:

- `skillFrameHeight`
- `skillEvent`
- `dashboardStateSave` with action `skillStackSaved`

Incoming save results validate both:

- `event.origin === "https://www.whattodo.coach"`
- `event.source === window.parent`

## Deferred Items

- Wix Studio Accessibility Wizard must still be run after the page is embedded.
- Hands-on VoiceOver, NVDA, physical mobile, and representative account testing are not completed by this local artifact build.
- The Wix iframe should receive the accessible title: `Name The Emotion coping practice`.
