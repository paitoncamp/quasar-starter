import { LogLevel, PublicClientApplication } from "@azure/msal-browser"

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: "[YOUR CLIENT ID HERE]",
    authority:
      "[YOUR AUTHORITY URL HERE]",
    redirectUri: "/", // Must be registered as a SPA redirectURI on your app registration
    postLogoutRedirectUri: "/" // Must be registered as a SPA redirectURI on your app registration
    //navigateToLoginRequestUrl: true, 
	// If "true", will navigate back to the original request 
	//location before processing the auth code response.
  },
  cache: {
    cacheLocation: "localStorage"
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            //return;
			break;
          default:
            return;
        }
      },
      logLevel: LogLevel.Verbose
    }
  }
}

export const msalInstance = new PublicClientApplication(msalConfig)
//app.use(msalInstance, msalConfig);
// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"]
}

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
}
