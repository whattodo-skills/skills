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

## Deployment Status

Production deployed and ready for final accessibility sign-off.

Published artifact:

`https://whattodo-skills.github.io/skills/name-the-emotion.html?v=7c9788d-1`

Public Wix route:

`https://www.whattodo.coach/skills-hub/name-the-emotion`

The published artifact loads the expected exercise content, including the six-step flow, five-minute framing, privacy statement, emotion naming and intensity controls, worked examples, completion actions, survey link, Skills Stack button, pair practice, and response-clearing controls.

The public Wix route loads successfully with the What To Do! wrapper, attribution, coaching disclaimer, and site navigation. The embedded exercise is iframe-based, so final iframe interaction and sizing still require hands-on browser testing.

## Required Wix Studio Change

Select the HTML/embed element in Wix Studio and set its descriptive embed text to:

`Name The Emotion coping practice`

Depending on the Studio interface, this may appear as `What's in the embed?`, alt text, or the element's accessible description. Publish the site again after making the change.

## Final QA Checklist

### Keyboard-only

- Start and finish the entire exercise without a mouse.
- Confirm every emotion option, intensity control, suggestion chip, disclosure, clear-response confirmation, and pair-practice control is reachable.
- Confirm visible focus is never lost.
- Confirm focus moves to each new step heading.
- Confirm Back returns to a logical location.
- Confirm the clear-response confirmation returns focus to its trigger when closed.
- Confirm users can enter and leave the iframe predictably.

### Screen readers

Test at minimum:

- VoiceOver with Safari on macOS.
- NVDA with Chrome on Windows.

Confirm:

- The iframe is announced as `Name The Emotion coping practice`.
- Step headings and progress are announced clearly.
- Selected emotion families and words expose their selected state.
- Intensity controls announce the emotion, value, minimum, and maximum.
- The timer does not announce every second.
- Validation messages are announced when displayed.
- Collapsible examples expose expanded and collapsed states.
- Hidden steps and optional fields are not read.
- The pair-practice view does not expose the private situation or reflection.

### Functional regression

- Refresh during the exercise and confirm the session draft returns.
- Select `Finish`, `Practice again`, and `Clear my responses` separately; confirm each clears the intended session data.
- Verify no learner-entered text or emotion data appears in network analytics requests.
- Test locked parent-origin behavior on both the Wix route and direct GitHub Pages URL.
- Confirm iframe height updates after validation messages, disclosures, examples, the completion summary, and pair practice open or close.
- Test at approximately 320, 375, 768, and 1440 pixels wide.
- Confirm the survey and Skills Stack actions behave correctly when opened, cancelled, repeated, or blocked by the browser.

Full production completion can be recorded after the accessible embed name is published and the hands-on QA results are added here.
