//import { useAuthStore } from 'src/stores/auth.js';
//import { useIsAuthenticated } from '../api/useIsAuthenticated';
//import { useMsal } from 'src/api/useMsal';
//import { router } from "src/router/index";
import { EventType } from "@azure/msal-browser";
//import { msalPlugin } from "./plugins/msalPlugin"
import { msalInstance } from "src/authConfig";
//import { CustomNavigationClient } from "src/router/NavigationClient";

//const { Router } = router();

//const navigationClient = new CustomNavigationClient(router)
//msalInstance.setNavigationClient(navigationClient)

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts()
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}
msalInstance.addEventCallback(event => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload
    const account = payload.account
    msalInstance.setActiveAccount(account)
  }
})

const $msalInstance = msalInstance;

export {$msalInstance};
