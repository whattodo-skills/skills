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

  const style = document.createElement('style');
  style.textContent = '.skills-stack-ending{width:min(920px,calc(100% - 28px));margin:18px auto 28px;padding:18px;text-align:center;background:#fff;border:1px solid #d8e2e8;border-radius:16px;box-shadow:0 12px 34px rgba(23,50,77,.1)}.skills-stack-ending__button{width:100%;min-height:48px;padding:12px 18px;border:0;border-radius:10px;background:#17324d;color:#fff;font:700 16px/1.3 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;cursor:pointer}.skills-stack-ending__button:disabled{cursor:not-allowed;opacity:.55}.skills-stack-ending__status{min-height:1.4em;margin:9px 0 0;color:#397aa8;font:600 14px/1.4 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}';
  document.head.appendChild(style);

  const region = document.createElement('section');
  region.className = 'skills-stack-ending';
  region.setAttribute('aria-label', 'Skills Stack');
  region.innerHTML = '<button class="skills-stack-ending__button" type="button" disabled>Save to my Skills Stack</button><p class="skills-stack-ending__status" aria-live="polite">Checking your subscription…</p>';
  document.body.appendChild(region);

  const button = region.querySelector('button');
  const status = region.querySelector('p');
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
        ? 'Your paid subscription is confirmed.'
        : (message.message || 'A currently confirmed paid subscription is required.');
    }
    if (message.type === 'skillActionResult' && message.action === 'saveToSkillsStack' && message.requestId === requestId) {
      button.disabled = !message.ok;
      button.textContent = message.ok ? 'Saved to my Skills Stack' : LABEL;
      status.textContent = message.message || (message.ok ? 'Saved.' : 'Unable to save. Please try again.');
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
