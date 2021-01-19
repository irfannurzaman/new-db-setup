<template>
  <div>
    <q-layout view="HHh LpR fFf">
      <Stepper />
      <div class="row" style="margin: 30px">
        <div class="col-9">
          <router-view />
        </div>
        <div class="col-3">
          <q-card flat bordered class="my-card bg-grey-1">
            <q-card-section style="height: 440px" class="bg-primary-gradient text-white">
              <div class="row items-center no-wrap">
                <div class="row">
                  <div class="col-3">
                    <span class="q-mx-md mdi mdi-information mdi-48px"></span>    
                  </div>
                  <div class="col-9">
                    <div class="q-my-md q-mr-md text-weight-bold" style="fontSize: 18px">Outlet Setup</div>
                    <div class="q-mr-md">
                      <p>Here you will setup available in your hotel, the number of outlets was agreed upon purchase.</p>
                      <p>The Front Office is a default outlet. which can be edited but not delete.</p>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row">
      <div style="marginLeft: 30px">
      <router-link
        :to="$route.meta.onBack"
        class="link-back"
      >
        <q-btn 
        unelevated 
        size="sm" 
        v-close-popup 
        color="primary" 
        outline label="Back"
        style="marginRight: 8px; width: 90px" 
        />
      </router-link>
      <router-link
        class="link-back"
        :to="$route.meta.onNext"
      >
        <q-btn 
        unelevated 
        size="sm" 
        color="primary"  
        label="Next" 
        style="width: 90px"
        />
      </router-link>
      </div>
    </div> 
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent} from '@vue/composition-api';
export default defineComponent({
  components: {
    Stepper: () => import('./components/Stepper.vue')
  },
});
</script>


<style lang="scss" scoped>
.q-stepper__header--border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12); 
}
.link-back {
  text-decoration: none;
  color: #fff;
}
</style>
