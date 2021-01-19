<template>
    <q-dialog v-model="DialogCancelOrderReason.dialog" persistent>
      <q-card style="width: 300px">
        <q-toolbar>
             <q-toolbar-title 
              class="text-white">
                New Cancel Order Reason
             </q-toolbar-title>
         </q-toolbar>


        <q-card-section class="q-pt-none">
            <div style="padding: 20px">
                <SInput 
                  label-text="Description"
                  v-model="DialogCancelOrderReason.des"
                 />
            </div>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn unelevated size="sm" v-close-popup color="primary" outline label="Cancel" />
          <q-btn unelevated size="sm" color="primary"  label="OK" @click="onSave" />
        </q-card-actions>

      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
export default defineComponent({
    props: {
        DialogCancelOrderReason: {} as any
    },

    setup(_,{emit}){
      const onSave = () => {
        emit('onSave')
      }
      return {
        onSave,
      }
    }
})
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

</style>
