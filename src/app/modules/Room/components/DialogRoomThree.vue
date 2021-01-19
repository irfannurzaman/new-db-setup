<template>
    <q-dialog v-model="dialogModel" persistent>
      <q-card style="width: 300px">
        <q-toolbar>
             <q-toolbar-title 
              class="text-white text-weight-medium">
               {{ title }}
             </q-toolbar-title>
         </q-toolbar>


        <q-card-section class="q-pt-none">
            <div style="padding: 20px">
                <SInput autofocus
                  label-text="Description"
                  v-model="des"
                 />                
            </div>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn unelevated size="sm" v-close-popup color="primary" outline @click="onCancel" label="Cancel" />
          <q-btn unelevated size="sm" color="primary" :disabled="des == ''"  label="Save" @click="onSave" />
        </q-card-actions>

      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted, computed, watch } from '@vue/composition-api'
import { log } from 'console'
import { Notify } from 'quasar'
// inisialisasi state
interface State {
  des: String,
  hide_bottom: boolean,
  nextNumber: any,
  title: String
}

export default defineComponent({
  props: {
    dialogRooms: { type: Boolean, required: true },
    dataTable: { type: null, required: true },
    caseDialog: {type: null, required: true},
    maxNumber: {type: null, required: true},
    dataSelected: { type: null, required: true },

  },
  setup(props, {emit, root:{$api}}){  
    const state = reactive({
      des: "",
      hide_bottom: false,
      title: "",
      nextNumber: 0

    })

    watch(
      () => props.dialogRooms, (dialog) => {
        console.log('init dialog' , props.dialogRooms);
          
        if (props.dialogRooms) {
          state.des = "";
          state.nextNumber = props.maxNumber;

          if(props.caseDialog == 1) {
            state.title = "New Room View"
          } else {
            state.title = "Edit Room View"
            state.des = props.dataSelected['ptexte'];
            // state.nextNumber = props.dataSelected['sprachcode'];

            console.log('data selected : ' , props.dataSelected['sprachcode']);
            console.log('data selected des : ' , props.dataSelected['ptexte']);
            // console.log('data selected next : ', state.nextNumber);
          }
        }
      }
      
    )

    const dialogModel = computed({
      get:() => props.dialogRooms,
      set:(val) => {
        emit('onValueFromDialog', props.dialogRooms, null);

      }
    })    

    // manggil api add
    const FETCH_DATA = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchAPISS(api, body)
      console.log(props.caseDialog == 1 ? 'Response Add Data' : 'Response Edit Data', GET_DATA);

      state.hide_bottom = true;
      emit('onValueFromDialog', false, null);
    }  

    const onCancel = () => {
      emit('onCancel');
    }

    const onSave = () => {
        // Add
        if(props.caseDialog === 1) {
            const data = {"description" : state.des};
            let isValid = false;

            for(let i = 0; i < props.dataTable.length; i++) {
                const desInTable = props.dataTable[i]['ptexte'];

                if(data['description'].toUpperCase() == desInTable.toUpperCase()) {
                    isValid = false;
                    console.log('Room already exist');
                    Notify.create({
                        type: 'negative',
                        message: 'Room already exist',
                        color: 'negative',
                    })

                    break;                    
                } else if (state.des.trim() == "") {
                  isValid = false;
                  Notify.create({
                    type: 'negative',
                    message: 'Failed',
                    color: 'negative',
                  })
                } else {
                    isValid = true
                }
            }

            if(isValid) {
                FETCH_DATA('writeParamtext', {
                    caseType: "3",
                    tParamtext: {
                        "t-paramtext": {
                            "ptexte": state.des,
                            "txtnr": 230,
                            "sprachcode": state.nextNumber
                        }
                    }
                })
            }
        } else if (props.caseDialog === 2) {
          // edit
          // console.log('edit ptexte: ', state.des);
          // console.log('edit number: ', state.nextNumber);
          
          const data = {"description" : state.des};
          let isValid = false;
          for (let i = 0; i < props.dataTable.length; i++) {
            const descInTable = props.dataTable[i]['ptexte'];

            if(data['description'].toUpperCase() == descInTable.toUpperCase()) {
              isValid = false;
              Notify.create({
                type: 'negative',
                message: 'Description name already exist!',
                color: 'negative',
              })

              break;
            } else {
              isValid = true;
            }
          }

          if(isValid) {
            FETCH_DATA('writeParamtext', {
              caseType: "3",
              tParamtext: {
                  "t-paramtext": {
                      "ptexte": state.des,
                      "txtnr": 230,
                      "sprachcode": state.nextNumber
                  }
              }
          })
          }

          
        }
    }

    return {
      ...toRefs(state),
      dialogModel,
      onCancel,
      onSave
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
