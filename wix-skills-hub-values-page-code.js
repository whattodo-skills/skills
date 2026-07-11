import wixData from 'wix-data';
import { currentMember } from 'wix-members-frontend';

const htmlElementId = '#html1';
const valuesCollectionId = 'MemberValues';

$w.onReady(function () {
  $w(htmlElementId).onMessage(function (event) {
    const message = parseMessage(event.data);

    if (message.type === 'valuesCompassReady') {
      sendSubscriberValues();
      return;
    }

    if (message.type === 'saveValues') {
      saveSubscriberValues(message.values)
        .then(function () {
          sendSubscriberValues();
        })
        .catch(function (error) {
          console.log('Could not save subscriber values:', error);
        });
    }
  });

  sendSubscriberValues();
});

function parseMessage(data) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  return data || {};
}

function getMemberId() {
  return currentMember.getMember()
    .then(function (member) {
      return member && member._id ? member._id : '';
    })
    .catch(function () {
      return '';
    });
}

function cleanValues(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .map(function (value) {
      return String(value || '').trim();
    })
    .filter(Boolean)
    .slice(0, 3);
}

function findSubscriberValues(memberId) {
  return wixData.query(valuesCollectionId)
    .eq('memberId', memberId)
    .limit(1)
    .find()
    .then(function (result) {
      return result.items.length ? result.items[0] : null;
    });
}

function sendSubscriberValues() {
  return getMemberId()
    .then(function (memberId) {
      if (!memberId) {
        return null;
      }

      return findSubscriberValues(memberId);
    })
    .then(function (item) {
      if (!item) {
        return null;
      }

      $w(htmlElementId).postMessage({
        type: 'subscriberValues',
        values: cleanValues([item.value1, item.value2, item.value3])
      });

      return null;
    })
    .catch(function (error) {
      console.log('Could not load subscriber values:', error);
    });
}

function saveSubscriberValues(values) {
  const selectedValues = cleanValues(values);

  return getMemberId()
    .then(function (memberId) {
      if (!memberId) {
        return null;
      }

      return findSubscriberValues(memberId)
        .then(function (existing) {
          const item = existing || {};
          item.memberId = memberId;
          item.value1 = selectedValues[0] || '';
          item.value2 = selectedValues[1] || '';
          item.value3 = selectedValues[2] || '';
          item.savedAt = new Date();

          if (item._id) {
            return wixData.update(valuesCollectionId, item);
          }

          return wixData.insert(valuesCollectionId, item);
        });
    });
}
