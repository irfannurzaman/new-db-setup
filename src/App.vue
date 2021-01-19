<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { formatterMoney } from './app/helpers/formatterMoney.helper';

// Todo: use pattern to register filter
Vue.filter('money', formatterMoney);
Vue.filter('joinStr', (value: string[], separator = ',', init = 'None') => {
  return value.join(separator) || init;
});

export default Vue.extend({});
</script>

<style lang="stylus">
  /* width */
::-webkit-scrollbar {
  width: 4px;
  height 4px
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #b5b5b5; 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
</style>
