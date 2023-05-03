<template>
  <Header />
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
//import Header from "./components/Navigation/Desktop/Header.vue";
//import { useIsAuthenticated } from '../api/useIsAuthenticated';

//const isAuthenticated = useIsAuthenticated();

export default defineComponent({
  name: 'inv-manager',
  //components: {Header}
});
</script>
