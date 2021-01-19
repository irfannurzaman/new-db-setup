<template>
  <div>
    <div style="height: 450px;" class="column justify-center">
        <q-btn flat round>
          <img @click="onPlay" :src="iconPlay" height="120"/>
        </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
export default defineComponent({
    setup(_, {emit, root: { $router}}){
        const state = reactive({
            data: [],
            hide_bottom: false,
            iconPlay: require('~/app/icons/Icon-Play.svg')
        })

        const onPlay = () => {
            $router.push('/tutorial_room')
        }

        return {
            ...toRefs(state),
            onPlay,
        }
    },
})
</script>