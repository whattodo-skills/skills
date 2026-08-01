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

## Key Element IDs

- `progressText`
- `progressBar`
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
- `emotionDefinitions`
- `physicalOptions`
- `actionOptions`
- `reflectionOptions`

No countdown is used. The exercise is self-paced and typically takes about five minutes, so learners can slow down while noticing, naming, and understanding the emotion.

## Feelings Wheel Source

No third-party Feelings Wheel image is used. The build uses an original text-based selector with selectable families and emotion words. Each family and emotion word has a short definition exposed through the chip text, hover title, and accessible label.

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

The published artifact loads the expected exercise content, including the six-step flow, self-paced framing that typically takes about five minutes, privacy statement, emotion-versus-feeling education, emotion naming and intensity controls, emotion definitions, worked examples, completion actions, survey link, Skills Stack button, and response-clearing controls.

The public Wix route loads successfully with the What To Do! wrapper, attribution, coaching disclaimer, and site navigation. The embedded exercise is iframe-based, so final iframe interaction and sizing still require hands-on browser testing.

## Required Wix Studio Change

Select the HTML/embed element in Wix Studio and set its descriptive embed text to:

`Name The Emotion coping practice`

Depending on the Studio interface, this may appear as `What's in the embed?`, alt text, or the element's accessible description. Publish the site again after making the change.

## Final QA Checklist

### Keyboard-only

- Start and finish the entire exercise without a mouse.
- Confirm every emotion option, intensity control, suggestion chip, disclosure, and clear-response confirmation is reachable.
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
- Validation messages are announced when displayed.
- Collapsible examples expose expanded and collapsed states.
- Hidden steps and optional fields are not read.

### Functional regression

- Refresh during the exercise and confirm the session draft returns.
- Select `Finish`, `Practice again`, and `Clear my responses` separately; confirm each clears the intended session data.
- Verify no learner-entered text or emotion data appears in network analytics requests.
- Test locked parent-origin behavior on both the Wix route and direct GitHub Pages URL.
- Confirm iframe height updates after validation messages, disclosures, examples, and the completion summary.
- Test at approximately 320, 375, 768, and 1440 pixels wide.
- Confirm the survey and Skills Stack actions behave correctly when opened, cancelled, repeated, or blocked by the browser.

Full production completion can be recorded after the accessible embed name is published and the hands-on QA results are added here.

## QA Run - 2026-07-31

Browser route tested:

`https://www.whattodo.coach/skills-hub/name-the-emotion`

Direct artifact:

`https://whattodo-skills.github.io/skills/name-the-emotion.html?v=7c9788d-1`

### Passed In Chrome Automation

- Public Wix route loaded with page title `Name The Emotion | What To Do!`.
- Embedded artifact source was `https://whattodo-skills.github.io/skills/name-the-emotion.html?v=7c9788d-1`.
- Standard flow completed from intro through completion.
- Situation input accepted text.
- Situation input was also verified as optional by continuing with it blank.
- Primary emotion selection worked with broad family plus specific emotion word.
- Missing primary emotion displayed: `Choose one emotion word before continuing. There is no single correct answer.`
- `No second emotion right now` allowed the learner to continue without an error.
- Primary intensity accepted a value of `8`.
- Physical clue selection worked.
- Strong-feeling note appeared without blocking the learner.
- Respond step accepted a pointing-toward value and a next-action chip.
- Reflection accepted optional text.
- Completion summary rendered primary emotion, intensity, physical clue, pointing-toward text, next helpful action, and reflection without broken optional fields.
- Refresh on the completion screen restored the same session draft.
- `Finish` cleared the session draft; after reload, the artifact returned to `intro`.
- Clear-response confirmation appeared inline.
- Cancelling clear-response kept the learner on the current step.
- Confirming clear-response returned the artifact to `intro`.
- Responsive checks at approximately 320, 375, 768, and 1440 pixels wide showed no horizontal overflow in the Wix route.

### Still Failing Or Not Fully Verifiable

- The Wix iframe title is still `Embedded Content`.
- The iframe has no `aria-label`.
- The required accessible name `Name The Emotion coping practice` has not been verified in production.
- The iframe container still reported a fixed outer height of about `950px`; dynamic height behavior was not confirmed in production.
- Keyboard-only testing was partially exercised, but full sign-off is not complete because focus enters a generically named cross-origin iframe and the exact internal focus sequence could not be fully verified through automation.
- Hands-on VoiceOver with Safari was not completed.
- Hands-on NVDA with Chrome on Windows was not completed.
- Network analytics inspection for learner-entered text was not completed through browser devtools; source inspection still shows analytics events do not include learner answers.
- Skills Stack save was not fully verified end-to-end against the parent Wix save response in this QA pass.

### Current Approval Status

Production deployed, functional smoke QA partially passed, but full accessibility sign-off is still blocked.

Required before production-complete:

1. In Wix Studio, set the embed description/accessibility text to `Name The Emotion coping practice`.
2. Publish the Wix site.
3. Re-run iframe-title verification and confirm production no longer exposes `Embedded Content`.
4. Complete hands-on keyboard-only testing.
5. Complete hands-on VoiceOver/Safari and NVDA/Chrome testing.
6. Re-check iframe height behavior after disclosures, validation messages, and completion summary.
7. Verify Skills Stack save result handling through the Wix parent page.
