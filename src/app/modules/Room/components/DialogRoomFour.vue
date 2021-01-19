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
                  label-text="Code"
                  v-model="code"
                 />                
                <SInput
                  label-text="Description"
                  v-model="des"
                 />                
            </div>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn unelevated size="sm" v-close-popup color="primary" outline @click="onCancel" label="Cancel" />
          <q-btn unelevated size="sm" color="primary" :disabled="code == '' || des == '' "  label="Save" @click="onSave" />
        </q-card-actions>

      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted, computed, watch } from '@vue/composition-api'
import { Notify } from 'quasar'

// inisial state
interface State {
  des: String,
  code: String,
  hide_bottom: boolean,
  nextNumber: any,
  title: String
}

export default defineComponent({
  props: {
    dialogRooms: {} as any,
    dataTable: { type: null, required: true },
    caseDialog: {} as any,
    maxNumber: {} as any,
    dataSelected: {} as any,

  },
  setup(props, {emit, root:{$api}}){  
    const state = reactive({
      des: "",
      hide_bottom: false,
      code: "",
      title: "",
      nextNumber:0

    })

    watch(
      () => props.dialogRooms, (dialog) => {
        console.log('init dialog' , props.dialogRooms);
        
        if (props.dialogRooms) {
          state.des = "";
          state.code = "";
          state.nextNumber = props.maxNumber;
          
          if(props.caseDialog == 1) {
            state.title = "New Preference Code"
            
          } else {
            state.title = "Edit Preference Code"
            state.des = props.dataSelected['char3'];
            state.code = props.dataSelected['char1'];
            
            state.nextNumber = props.dataSelected['number1'];
            console.log('data selected next: ', state.nextNumber);
            console.log('data selected code: ', state.code);
            console.log('data selected des: ', state.des);
            

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
      const GET_DATA = await $api.fetchAPI.FetchCommon(api, body)
      console.log(props.caseDialog == 1 ? 'Response Add Data' : 'Response Edit Data', GET_DATA);
     
      state.hide_bottom = true;
      emit('onValueFromDialog', false, null);
    }  

    const onCancel = () => {
      emit('onCancel');
    }

    const onSave = () => {

    //   Add
      if (props.caseDialog === 1) { 
        const data = {"description" : state.des , "code": state.code};
        let isValid = false;
        for (let i = 0; i<props.dataTable.length; i++) {
          const descInTable = props.dataTable[i]["char3"];
          const codeInTable = props.dataTable[i]["char1"];

          if (data['description'] == descInTable) {
            isValid = false;
            console.log("Description already exists");
            Notify.create({
              type: 'negative',
              message: 'Description already exists',
              color: 'negative',
            })

            break;
          } else if (data['code'] == codeInTable || data['code'].toLowerCase() == codeInTable 
          || data['code'].toUpperCase() == codeInTable){
            isValid = false;
            Notify.create({
              type: 'negative',
              message: 'Code already exists!',
              color: 'negative',
            })

            break;                
          } else if(state.des.trim() == "" || state.code.trim() == "") {
            isValid = false;
            Notify.create({
              type: 'negative',
              message: 'Field cannot be empty!',
              color: 'negative',
            })

            break;
          } else if(data['description'].toUpperCase() == descInTable || data['code'].toUpperCase() == descInTable) {
            isValid = false;
            Notify.create({
              type: 'negative',
              message: 'Field already exist!',
              color: 'negative', 
            })

            break;
          } else {
            
            isValid = true
          }
        }

        if(isValid) {
            // api add
            FETCH_DATA('createQueasy', {
              caseType: "3",
              tQueasy: {
                  "t-queasy": {
                      "key": 189,
                      "number1": state.nextNumber,
                      "number2": "?",
                      "number3": "?",
                      "date1": "?",
                      "date2": "?",
                      "date3": "?",
                      "char1": state.code,
                      "char2": "",
                      "char3": state.des,
                      "deci1": "?",
                      "deci2": "?",
                      "deci3": "?",
                      "logi1": "?",
                      "logi2": true,
                      "logi3": "?",
                      "betriebsnr": 0
                  }                
              },
              tQueasy1: {
                  "t-queasy1": {
                      "key": 189,
                      "number1": state.nextNumber,
                      "number2": "?",
                      "number3": "?",
                      "date1": "?",
                      "date2": "?",
                      "date3": "?",
                      "char1": state.code,
                      "char2": "",
                      "char3": state.des,
                      "deci1": "?",
                      "deci2": "?",
                      "deci3": "?",
                      "logi1": "?",
                      "logi2": true,
                      "logi3": "?",
                      "betriebsnr": 0
                  }
              }
            })                
        }
        

      } else if (props.caseDialog === 2) {          
        // Edit       
        const data = {"description" : state.des, "code": state.code}
        let isValid = false;
        for(let i = 0; i<props.dataTable.length; i++) {
          const codeInTable = props.dataTable[i]['char1'];
          const descInTable = props.dataTable[i]['char3'];
          const numberInTable = props.dataTable[i]['number1'];

          if(data['description'].toUpperCase() == descInTable && codeInTable != state.nextNumber) {
            isValid = false;
            Notify.create({
              type: 'negative',
              message: 'Description name already exist!',
              color: 'negative'
            })

            break;
          } else if (data['code'].toUpperCase() == codeInTable && numberInTable != state.nextNumber) {
            isValid = false;
            Notify.create({
              type: 'negative',
              message: 'Code already exist',
              color: 'negative'
            })

            break;
          } else if (state.des.trim() == "" || state.code.trim() == "") {
            isValid = false;
            Notify.create({
              type: 'negative',
              message: 'Field canoot be empty!',
              color: 'negative'      
            })

            break;
          } else {
            isValid = true;
          }
        }

        if(isValid) {
          FETCH_DATA('createQueasy', {
              caseType: "2",
              tQueasy: {
                  "t-queasy": {
                      "key": 189,
                      "number1": state.nextNumber,
                      "number2": "?",
                      "number3": "?",
                      "date1": "?",
                      "date2": "?",
                      "date3": "?",
                      "char1": state.code,
                      "char2": "",
                      "char3": state.des,
                      "deci1": "?",
                      "deci2": "?",
                      "deci3": "?",
                      "logi1": "?",
                      "logi2": true,
                      "logi3": "?",
                      "betriebsnr": 0
                  }                
              },
              tQueasy1: {
                  "t-queasy1": {
                      "key": 189,
                      "number1": state.nextNumber,
                      "number2": "?",
                      "number3": "?",
                      "date1": "?",
                      "date2": "?",
                      "date3": "?",
                      "char1": state.code,
                      "char2": "",
                      "char3": state.des,
                      "deci1": "?",
                      "deci2": "?",
                      "deci3": "?",
                      "logi1": "?",
                      "logi2": true,
                      "logi3": "?",
                      "betriebsnr": 0
                  }
              }
            }
          )
        }         
      }
    }

    return {
      ...toRefs(state),
      dialogModel,
      onSave,
      onCancel   
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
