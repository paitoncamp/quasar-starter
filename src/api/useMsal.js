import { InteractionStatus } from "@azure/msal-browser"
import { getCurrentInstance, toRefs } from "vue"

export function useMsal() {
  const internalInstance = getCurrentInstance()
  if (!internalInstance) {
    console.log("useMsal() cannot be called outside the setup() function of a component");
	return;
  }
  const { instance, accounts, inProgress } = toRefs(
    internalInstance.appContext.config.globalProperties.$msal
  )

  if (!instance || !accounts || !inProgress) {
    console.log( "Please install the msalPlugin");
	return;
  }

  if (inProgress.value === InteractionStatus.Startup) {
    instance.value.handleRedirectPromise().catch(() => {
      // Errors should be handled by listening to the LOGIN_FAILURE event
      return
    })
  }

  return {
    instance: instance.value,
    accounts,
    inProgress
  }
}