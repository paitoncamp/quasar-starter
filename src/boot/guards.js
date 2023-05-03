import { boot } from 'quasar/wrappers';
//import { useAuthStore } from 'src/stores/auth.js';
//import { useIsAuthenticated } from '../api/useIsAuthenticated';

//import { router } from "src/router/index";

//const { Router } = router();


export default boot(({  router }) => {
  //const auth = useAuthStore(store);
  //console.log(useMsal());
  //const { instance } = useMsal();
  
  //app.use(msalInstance, msalConfig);
  
  router.beforeEach(() => {
    //const isAuthenticated = auth.getUser();
	//const isAuthenticated = useIsAuthenticated();  
    //const isPublic = to.matched.some((record) => record.meta.public);

    // If not authenticated, redirect to Login
    //if (!isAuthenticated && !isPublic && to.name !== 'Login') {
	//if(!isAuthenticated){
    //instance.loginRedirect();
	//}
    //  return { name: 'Login' };
    //}

    // If authenticated, don't allow access to public pages
    //if (isAuthenticated && isPublic) {
    //  return { name: 'Home' };
    //}
  });
});
