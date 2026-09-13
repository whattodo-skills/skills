(function () {
  'use strict';
  const optionPattern = /save my (?:reflection|practice summary)|save .* in (?:this|my) browser|include my (?:detailed|private)|keep my unfinished answers/i;
  const noticePattern = /where (?:your )?saves? go|private reflection|not included in (?:skills stack saving|analytics)|written answers retained/i;

  function removeOptionalSaveControls(root) {
    (root || document).querySelectorAll('label').forEach(function (label) {
      if (!optionPattern.test(label.textContent || '')) return;
      const input = label.querySelector('input[type="checkbox"]');
      if (input) {
        input.checked = false;
        input.type = 'hidden';
      }
      label.style.display = 'none';
      label.setAttribute('aria-hidden', 'true');
    });
    (root || document).querySelectorAll('p,.note,.helper,.example,.subscription-note').forEach(function (element) {
      if (!noticePattern.test(element.textContent || '')) return;
      element.style.display = 'none';
      element.setAttribute('aria-hidden', 'true');
    });
  }

  removeOptionalSaveControls(document);
  new MutationObserver(function (records) {
    records.forEach(function (record) {
      record.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) removeOptionalSaveControls(node);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
