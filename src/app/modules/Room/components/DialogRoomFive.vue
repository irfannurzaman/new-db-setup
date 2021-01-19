<template>
    <q-dialog v-model="dialogModel" persistent>
      <q-card >
        <q-toolbar>
             <q-toolbar-title 
              class="text-white text-weight-medium">
               New Guest Room
             </q-toolbar-title>
         </q-toolbar>


        <q-card-section class="q-pt-none">
            <div style="padding: 20px; width: 420px" class="row">
                <SSelect
                    v-for="select in selectionAdd.filter(x => ['Locations'].includes(x.labelText))" 
                    :label-text="select.labelText" 
                    :style="{'width': select.width}"
                    :options="select.options"
                    v-model="select.value"
                    />
                <SInput autofocus
                    v-for="select in selectionAdd.filter(x => !['Locations', 'View'].includes(x.labelText))" 
                    :label-text="select.labelText" 
                    :style="{'width': select.width, 'marginTop': select.top}"
                 />
                <SSelect
                    v-for="select in selectionAdd.filter(x => ['View'].includes(x.labelText))" 
                    :label-text="select.labelText" 
                    :style="{'width': select.width}"
                    :options="select.options"
                    v-model="select.value"
                    />                
            </div>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn unelevated size="sm" v-close-popup color="primary" outline @click="onCancel" label="Cancel" />
          <q-btn unelevated size="sm" color="primary"  label="Save" @click="onSave" />
        </q-card-actions>

      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted, computed, watch } from '@vue/composition-api'
import { Notify } from 'quasar'
import {selectionAdd} from '../utils/GuestRoom'

export default defineComponent({
  props: {
    dialogModel: {} as any,

  },
  setup(props, {emit, root:{$api}}){  
    const state = reactive({
      selectionAdd: selectionAdd
    })

    const onCancel = () => {
      emit('onCancel');
    }

    onMounted(() => {
        let xi = []
        for (let i = 1; i <= 9; i++) {
            xi.push(i)
        }
        selectionAdd[0].options = xi
    })

    return {
      ...toRefs(state),
      onCancel,
    }
  }
})

</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}
.q-toolbar__title {
  font-size: 16px;
}

</style>
