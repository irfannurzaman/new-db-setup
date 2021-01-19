<template>
  <div style="height: 450px; alignItems: center; textAlign: center" class="row">
    <div style="marginTop: -70px" class="col-8">
        <q-btn flat round>
          <img @click="onPlay" :src="iconPlay" height="120"/>
        </q-btn>
    </div>
    <div class="col-4">
      <q-card 
          style="
              width: 300px; 
              height: 450px; 
              marginLeft: 100px; 
              borderRadius: 10px" 
          flat bordered 
          class="my-card bg-primary text-white">
          <div class="row" style="paddingTop: 10px; alignItems: center; paddingLeft: 10px;">
              <span style="marginRight: 10px" class="mdi mdi-information mdi-48px"></span>
              <div style="fontSize: 17px; fontWeight: 500">Outlet Setup</div>
          </div>
          <div style="paddingLeft: 70px; marginTop: -10px">
              <div style="marginRight: 10px">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum iste modi mollitia quis quam a! Optio est aut numquam ullam omnis, ratione nesciunt iure. Repudiandae, aspernatur. Ullam optio sint ipsa!
              </div>
          </div>
      </q-card>
    </div>
  </div>
</template>


<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
export default defineComponent({
    setup(_, {emit, root}){
        const state = reactive({
            data: [],
            hide_bottom: false,
            iconPlay: require('~/app/icons/Icon-Play.svg')
        })

        const onPlay = () => {
            root.$router.push('/tutorial_room')
        }
        return {
            ...toRefs(state),
            onPlay,
        }
    },
})
</script>