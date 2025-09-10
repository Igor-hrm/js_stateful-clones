'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentStatee = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentStatee = {};
        break;
      case 'addProperties':
        currentStatee = { ...currentStatee, ...action.extraData };
        break;
      case 'removeProperties':
        currentStatee = Object.keys(currentStatee).reduce((newState, key) => {
          if (!action.keysToRemove.includes(key)) {
            newState[key] = currentStatee[key];
          }

          return newState;
        }, {});
        break;
      default:
        break;
    }
    stateHistory.push({ ...currentStatee });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
