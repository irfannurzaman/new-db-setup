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
                <SInput 
                  label-text="Intial Later"
                  v-model="init"
                 />
            </div>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn unelevated size="sm" v-close-popup color="primary" outline @click="onCancel" label="Cancel" />
          <q-btn unelevated size="sm" color="primary" :disabled="des == '' || init == ''"  label="Save" @click="onSave" />
        </q-card-actions>

      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted, computed, watch } from '@vue/composition-api'
import { Notify } from 'quasar'
// inisialisasi state
// interface State {
//   des: String,
//   init: String,
//   hide_bottom: boolean,
//   nextNumber: any,
//   title: String
// }

export default defineComponent({
  props: {
    dialogRooms: {} as any,
    dataTable: {} as any,
    caseDialog: {} as any,
    maxNumber: {} as any,
    dataSelected: {} as any,

  },
  setup(props, {emit, root:{$api}}){  
    const state = reactive({
      des: "",
      hide_bottom: false,
      init: "",
      title: "",
      nextNumber: 0

    })

    watch(
      () => props.dialogRooms, (dialog) => {
        console.log('init dialog' , props.dialogRooms);
        
        if (props.dialogRooms) {
          state.des = "";
          state.init = "";
          state.nextNumber = props.maxNumber;

          if(props.caseDialog == 1) {
            state.title = "New Bed Type"
          } else {
            state.title = "Edit Bed Type"
            state.des = props.dataSelected['ptexte'];
            state.init = props.dataSelected['notes'];
            state.nextNumber = props.dataSelected['txtnr'] - 9200;

            console.log('data selected : ' , props.dataSelected['txtnr'] - 9200);
            console.log('data selected next : ', state.nextNumber);
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
      // emit('savedata')

      // const tempData = GET_DATA['tParamtext']['t-paramtext'];
      // console.log(tempData, 'tempData');
      

      // for(let i = 0; i<tempData.length; i++) {
      //   tempData[i]['number'] = tempData[i]['txtnr']-9200;
      // }

      // state.data = tempData;
      state.hide_bottom = true;
      emit('onValueFromDialog', false, null);
    }  

    const onCancel = () => {
      emit('onCancel');
    }

    const onSave = () => {

      // Add
      if (props.caseDialog === 1) { 
        const data = {"description" : state.des , "initLater": state.init, "nextnumber": state.nextNumber};
        let isValid = false;
        for (let i = 0; i<props.dataTable.length; i++) {
          const descInTable = props.dataTable[i]["ptexte"];
          const initInTable = props.dataTable[i]["notes"];

          if (data['description'] == descInTable) {
            isValid = false;
            console.log("Bed type name already exist");
            Notify.create({
              type: 'negative',
              message: 'Bed type name already exist!',
              color: 'negative',
            })

            break;
          } else if (data['initLater'] == initInTable || data['initLater'].toLowerCase() == initInTable 
          || data['initLater'].toUpperCase() == initInTable){
            isValid = false;
            console.log("Short note already exist");
            Notify.create({
              type: 'negative',
              message: 'Short note already exist!',
              color: 'negative',
            })

            break;                
          } else if(state.des.trim() == "" || state.init.trim() == "") {
            isValid = false;
            Notify.create({
              type: 'negative',
              message: 'Field cannot be empty!',
              color: 'negative',
            })

            break;
          } else if(data['description'].toUpperCase() == descInTable || data['initLater'].toUpperCase() == descInTable) {
            isValid = false;
            Notify.create({
              type: 'negative',
              message: 'Field already exist!',
              color: 'negative', 
            })

            break;
          } else {
            // api
            isValid = true
          }
        }

        if (isValid) {
          FETCH_DATA('writeParamtext', {
            caseType: "3",
            tParamtext: {
              "t-paramtext": {
                ptexte: state.des.toUpperCase(),
                txtnr: state.nextNumber,
                notes: state.init.toUpperCase(),
                sprachcode: 0,
                number: 0,
                passwort: "",
                wert: false,
                betriebsnr: 0
              }   
            }
          })                
        }

      } else if (props.caseDialog === 2) {           
        // edit              
        console.log('edit ptexte: ', state.des);
        console.log('edit notes: ', state.init);
        console.log('edit txtnr: ', state.nextNumber); 

        const data = {"description" : state.des , "initLater": state.init};
        let isValid = false;
        for (let i = 0; i<props.dataTable.length; i++) {
          const descInTable = props.dataTable[i]["ptexte"];
          const initInTable = props.dataTable[i]["notes"];
          const numberInTable = (props.dataTable[i]['txtnr'] - 9200);

          if (data['description'].toUpperCase() == descInTable && numberInTable != state.nextNumber) {
            isValid = false;
            console.log("Bed type name already exist");
            Notify.create({
              type: 'negative',
              message: 'Bed type name already exist!',
              color: 'negative',
            })

            break;
          } else if (data['initLater'].toUpperCase() == initInTable && numberInTable != state.nextNumber){
            isValid = false;
            console.log("Short note already exist");
            Notify.create({
              type: 'negative',
              message: 'Short note already exist!',
              color: 'negative',
            })

            break;                
          } else if(state.des.trim() == "" || state.init.trim() == "") {
            isValid = false;
            Notify.create({
              type: 'negative',
              message: 'Field cannot be empty!',
              color: 'negative',
            })

            break;
          } /*else if(data['description'].toUpperCase() == descInTable || data['initLater'].toUpperCase() == descInTable) {
            isValid = false;
            Notify.create({
              type: 'negative',
              message: 'Field already exist!',
              color: 'negative', 
            })

            break;
          }*/ else {
            // api
            isValid = true
          }
        }       
        
        if (isValid) {
          FETCH_DATA('writeParamtext', {
            caseType: "3",
            tParamtext: {
              "t-paramtext": {
                ptexte: state.des.toUpperCase(),
                txtnr: (state.nextNumber + 9200),
                notes: state.init.toUpperCase(),
                sprachcode: 0,
                number: 0,
                passwort: "",
                wert: false,
                betriebsnr: 0
              }   
            }
          })
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
