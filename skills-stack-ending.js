(function () {
  'use strict';

  const LABEL = 'Save to my Skills Stack';
  const SAFE_PARENT_ORIGIN = 'https://www.whattodo.coach';
  const existing = Array.from(document.querySelectorAll('button, a')).filter((element) =>
    /^save to (?:my )?skills stack$/i.test((element.textContent || '').trim())
  );

  if (existing.length) {
    existing.forEach((element) => { element.textContent = LABEL; });
    new MutationObserver(() => {
      existing.forEach((element) => {
        if ((element.textContent || '').trim() !== LABEL && /^save to (?:my )?skills stack$/i.test((element.textContent || '').trim())) {
          element.textContent = LABEL;
        }
      });
    }).observe(document.body, { childList: true, characterData: true, subtree: true });
    return;
  }

  const groups = Array.from(document.querySelectorAll(
    '.conclusion, .finish-actions, .btn-row, .btns, .actions, .action-row, .button-row'
  )).filter((group) => group.querySelector('button, a'));
  const lastControl = Array.from(document.querySelectorAll('button, a')).pop();
  const actionGroup = groups.pop() || lastControl?.parentElement || document.body;
  const referenceControl = Array.from(actionGroup.querySelectorAll('button, a')).pop();

  const button = document.createElement('button');
  button.type = 'button';
  button.disabled = true;
  button.textContent = LABEL;
  button.className = referenceControl?.className || 'button';
  button.classList.add('skills-stack-ending-button');
  actionGroup.appendChild(button);

  const status = document.createElement('p');
  status.className = 'skills-stack-ending-status status';
  status.setAttribute('aria-live', 'polite');
  status.textContent = 'Checking your subscription…';
  actionGroup.insertAdjacentElement('afterend', status);
  let requestId = '';

  function post(message) {
    window.parent.postMessage(message, SAFE_PARENT_ORIGIN);
  }

  window.addEventListener('message', (event) => {
    if (event.origin !== SAFE_PARENT_ORIGIN || event.source !== window.parent) return;
    const message = event.data || {};
    if (message.type === 'skillEntitlement') {
      button.disabled = message.canSaveToSkillsStack !== true;
      status.textContent = message.canSaveToSkillsStack === true
        ? ''
        : (message.message || 'A currently confirmed paid subscription is required.');
    }
    if (message.type === 'skillActionResult' && message.action === 'saveToSkillsStack' && message.requestId === requestId) {
      button.disabled = !message.ok;
      button.textContent = message.ok ? 'Saved to my Skills Stack' : LABEL;
      status.textContent = message.ok
        ? ''
        : (message.message || 'Unable to save. Please try again.');
    }
  });

  button.addEventListener('click', () => {
    requestId = `stack-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    button.disabled = true;
    button.textContent = 'Saving…';
    status.textContent = 'Saving to your account…';
    post({
      type: 'skillAction',
      action: 'saveToSkillsStack',
      requestId,
      skillSlug: decodeURIComponent(location.pathname.split('/').pop() || '').replace(/\.html$/i, '')
    });
  });

  post({ type: 'skillReady' });
}());
