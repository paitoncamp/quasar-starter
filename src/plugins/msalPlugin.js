import { reactive } from "vue"
import {
  EventMessageUtils,
  EventType,
  InteractionStatus
} from "@azure/msal-browser"

/**
 * Helper function to determine whether 2 arrays are equal
 * Used to avoid unnecessary state updates
 * @param arrayA
 * @param arrayB
 */
function accountArraysAreEqual(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length) {
    return false
  }

  const comparisonArray = [...arrayB]

  return arrayA.every(elementA => {
    const elementB = comparisonArray.shift()
    if (!elementA || !elementB) {
      return false
    }

    return (
      elementA.homeAccountId === elementB.homeAccountId &&
      elementA.localAccountId === elementB.localAccountId &&
      elementA.username === elementB.username
    )
  })
}

export const msalPlugin = {
  install: (app, msalInstance) => {
    const inProgress = InteractionStatus.Startup
    const accounts = msalInstance.getAllAccounts()

    const state = reactive({
      instance: msalInstance,
      inProgress: inProgress,
      accounts: accounts
    })

    app.config.globalProperties.$msal = state

    msalInstance.addEventCallback(message => {
      switch (message.eventType) {
        case EventType.ACCOUNT_ADDED:
        case EventType.ACCOUNT_REMOVED:
        case EventType.LOGIN_SUCCESS:
        case EventType.SSO_SILENT_SUCCESS:
        case EventType.HANDLE_REDIRECT_END:
        case EventType.LOGIN_FAILURE:
        case EventType.SSO_SILENT_FAILURE:
        case EventType.LOGOUT_END:
        case EventType.ACQUIRE_TOKEN_SUCCESS:
        case EventType.ACQUIRE_TOKEN_FAILURE:{
          const currentAccounts = msalInstance.getAllAccounts()
          if (!accountArraysAreEqual(currentAccounts, state.accounts)) {
            state.accounts = currentAccounts
          }
          break
		}
		default:
      }

      const status = EventMessageUtils.getInteractionStatusFromEvent(
        message,
        state.inProgress
      )
      if (status !== null) {
        state.inProgress = status
      }
    })
  }
}
