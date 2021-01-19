<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="window-height window-width row justify-start items-center"
      >
        <div class="column">
          <div class="row">
            <q-card flat bordered>
              <q-card-section class="q-mx-lg">
                <div>
                  <q-img
                    class="logovhp"
                    src="../../assets/logo_e1VHP.svg"
                  />
                  <p class="q-mb-sm q-mt-lg text-weight-regular">Welcome to</p>
                  <h5 class="q-ma-none q-mb-lg text-bold">e1-VHP Setup Program</h5>
                </div>
                <q-form @submit="doLogin">
                  <q-input 
                    class="q-my-sm"                    
                    outlined
                    clearable
                    v-model="userName"
                    type="email"
                    placeholder="Username"
                    required
                    >
                    
                    <template v-slot:prepend>
                        <q-icon name="mdi-account-circle" color="light-blue-7" size="30px" />
                    </template>

                  </q-input>
                  <q-input 
                    class="q-my-md"
                    outlined
                    clearable
                    v-model="userPswd"
                    type="password"
                    placeholder="Password"
                    required 
                  >
                    <template v-slot:prepend>
                        <q-icon name="mdi-lock" color="light-blue-7" size="30px" />
                    </template>
                  </q-input>
                  <!-- <label class="inline-block q-mb-xs">
                    Language
                  </label> -->
                  <q-select
                    :options="locales"
                    v-model="countryId"
                    :loading="isFetchingLocales"
                    outlined
                    class="q-mb-md"
                  />
                 
                  <q-btn
                    unelevated
                    color="light-blue-7"
                    size="md"
                    style="height: 42px"
                    class="full-width"
                    label="Log In"
                    type="submit"
                    :disable="isFetchingLocales || isLoggingIn"
                    :loading="isLoggingIn"
                  />

                  <img class="q-mt-lg" src="../icons/logo_brand.svg"> 

                  <p class="text-center q-mt-sm">
                    Copyright by PT. Supranusa Sindata
                  </p>       
                </q-form>
              </q-card-section>
              <q-card-section class="text-center q-pa-none" />
            </q-card>
          </div>
          <!-- <p class="text-black-6 text-center q-mt-md">
            Copyright by PT. Supranusa Sindata
          </p> -->
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from '@vue/composition-api';
import { store } from '~/store';

interface State {
  userName: string | null;
  userPswd: string | null;
  countryId: any;
  locales: any[];
  isFetchingLocales: boolean;
  isLoggingIn: boolean;
}

export default defineComponent({
  setup(_, { root: { $api } }) {
    const state = reactive<State>({
      userName: null,
      userPswd: null,
      countryId: null,
      locales: [],
      isFetchingLocales: true,
      isLoggingIn: false,
    });

    // fetch locales
    (async () => {
      const resLangs = await $api.auth.getLanguages();
      state.locales = resLangs.map((item) => ({
        label: item['country-name'],
        value: item['country-id'],
      }));
      state.countryId = state.locales[0];
      state.isFetchingLocales = false;
    })();

    async function doLogin() {
      state.isLoggingIn = true;
      store.commit.layout.SET_STEP(1)
      store.commit.layout.SET_VALIDASI(1)
      store.commit.layout.SET_ROOM(1)
      store.commit.layout.SET_PROFILE(1)
      store.commit.layout.SET_RESERVATION(1)

      await store.dispatch.auth.doLogin({
        countryId: state.countryId.value,
        userName: state.userName,
        userPswd: state.userPswd,
      });

      state.isLoggingIn = false;
    }

    return {
      ...toRefs(state),
      doLogin,
    };
  },
});
</script>

<style scoped>
.q-card {
  width: 420px;
  height: 100vh;
  border-radius: 0 30px 30px 0;
  background-color: rgba(255, 255, 255, 0.4);
}

.q-page {
  background: lightblue url('../../assets/sign-in-bg.jpg') no-repeat fixed;
}

.logovhp {
    width: 75px;
    height: auto;
}
</style>
