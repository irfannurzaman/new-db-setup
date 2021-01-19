<template>
    <q-dialog v-model="dialogDiningTable.dialog" persistent>
      <q-card style="width: 300px; marginTop: -150px">
        <q-toolbar>
             <q-toolbar-title 
              class="text-white">
                {{dialogDiningTable.KEYADD}}
             </q-toolbar-title>
         </q-toolbar>


        <q-card-section class="q-pt-none">
            <div style="padding: 20px">
                <SInput 
                  v-if="dialogDiningTable.KEYADD == 'New Table'"
                  label-text="Table Number"
                  v-model="dialogDiningTable.tableNumber"
                 />
                <SInput 
                  v-if="dialogDiningTable.KEYADD !== 'New Table'"
                  label-text="Total Sitting Tables"
                  v-model="dialogDiningTable.quickadd"
                  @input="QuickAdd(dialogDiningTable.quickadd)"
                 />
                <SInput 
                  v-if="dialogDiningTable.KEYADD == 'New Table'"
                  label-text="Description"
                  v-model="dialogDiningTable.des"
                 />
                <q-checkbox 
                  v-if="dialogDiningTable.KEYADD == 'New Table'"
                  size="xs" 
                  v-model="dialogDiningTable.checkbox" 
                  val="md" 
                  label="Standing Mode" 
                  style="marginLeft: -6px"
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
        dialogDiningTable: {} as any
    },

    setup(props,{emit}){
      const onSave = () => {
        emit('onSave', props.dialogDiningTable)
      }
      const QuickAdd = (quickadd) => {
          if (isNaN(quickadd)) {
            props.dialogDiningTable.quickadd = ''
        }
        
      }
      return {
        onSave,
        QuickAdd
      }
    }
})
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

</style>
