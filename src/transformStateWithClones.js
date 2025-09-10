'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          currentState = { ...currentState, ...action.extraData };
        }
        break;
      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          currentState = Object.keys(currentState).reduce((newState, key) => {
            if (!action.keysToRemove.includes(key)) {
              newState[key] = currentState[key];
            }

            return newState;
          }, {});
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    const stateCopy = { ...currentState };

    stateHistory.push(stateCopy);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
