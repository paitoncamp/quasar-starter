import { msalInstance, loginRequest } from "../authConfig"
import { InteractionType } from "@azure/msal-browser"

export async function isAuthenticated(instance, interactiontype, loginrequest) {
  // If your application uses redirects for interaction, handleRedirectPromise 
  //must be called and awaited on each page load before determining if a user is signed in or not
  return instance
    .handleRedirectPromise()
    .then(() => {
      const accounts = instance.getAllAccounts()
      if (accounts.length > 0) {
        return true
      }

      // User is not signed in and attempting to access protected route. Sign them in.
      if (interactiontype === InteractionType.Popup) {
        return instance
          .loginPopup(loginrequest)
          .then(() => {
            return true
          })
          .catch(() => {
            return false
          })
      } else if (interactiontype === InteractionType.Redirect) {
        return instance
          .loginRedirect(loginrequest)
          .then(() => {
            return true
          })
          .catch(() => {
            return false
          })
      }

      return false
    })
    .catch(() => {
      return false
    })
}

export function registerGuard(router) {
  router.beforeEach(async (to) => {
    if (to.meta.requiresAuth) {
      const request = {
        ...loginRequest,
        redirectStartPage: to.fullPath
      }
      const shouldProceed = await isAuthenticated(
        msalInstance,
        InteractionType.Redirect,
        request
      )
      return shouldProceed || "/failed"
    }

    return true
  })
}


