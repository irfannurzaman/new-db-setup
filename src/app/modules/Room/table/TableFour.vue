<template>
  <div style="height: 450px" class="row">
      <div class="col-8">
          <div class="q-mb-md">
              <q-btn flat round class="q-mr-lg">
                <img @click="add" :src="icon_add" height="25" />
              </q-btn>
          </div>
          <STable
            :columns="tableHeadersFour"
            :data="data"
            :rows-per-page-options="[0]"
            :hide-bottom="hide_bottom"
            class="table-accounting-date"
            flat bordered
            style="width: 300px"
          >
          <template #header-cell-fibukonto="props">
              <q-th :props="props" class="fixed-col left">{{ props.col.label }}</q-th>
            </template>
            <template #body-cell-fibukonto="props">
              <q-td :props="props" class="fixed-col left">{{ props.row.fibukonto }}</q-td>
            </template>
            <template #header-cell-actions="props">
              <q-th style="z-index : 4" :props="props" class="fixed-col right">{{ props.col.label }}</q-th>
            </template>
            <template #body-cell-actions="props">
              <q-td :props="props" class="fixed-col right">
                <q-icon name="mdi-dots-vertical" size="16px">
                  <q-menu :props="props" auto-close anchor="bottom right" self="top right">
                    <q-list :props="props">
                      <q-item :props="props" @click="onClickEdit(props.row)" clickable v-ripple>
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item @click="onClickDel(props.row)" clickable v-ripple>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-icon>
              </q-td>
            </template>
          </STable>
      </div>
      <div class="col-4">
        <q-card 
          flat 
          class="card_right bg-primary-gradient text-white">
          <div class="row">
              <div class="col-3">
                  <span class="q-mx-md mdi mdi-information mdi-48px"></span>    
              </div>
              <div class="col-9">
                  <div class="q-my-md q-mr-md text-weight-bold" style="fontSize: 18px">Room Related Setup - Room Preference Code</div>
                  <div class="q-mr-md">
                    <p>Here you will setup room preference code to quickly record hotel guest's room preference when making the reservation </p>
                    <p>This information is connected to the room selection program, which helps the user to choose a proper room according to guest's request.</p>
                  </div>
              </div>
          </div>
        </q-card>
      </div>

      <DialogRoomFour
        :dialogRooms="dialogRoom.dialog"
        :dataTable="data"
        @onCancel="onCancelDialog"
        :caseDialog="caseDialog"
        :maxNumber="dialogRoom.nextNumber"
        :dataSelected="dialogRoom.dataSelected"
        @onValueFromDialog="onValueFromDialog"
      />

      <!--  confirm delete -->
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-mx-md mdi text-red mdi-alert mdi-48px"></span>
            <span class="q-ml-sm">Delete the Bed Type <br> {{ dialogRoom.des }}!</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Ok" @click="OnDelete()" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

  </div>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeadersFour} from './room.table'
export default defineComponent({
  setup(_, { emit, root: { $api } }) {
        const state = reactive({
            data: [],
            icon_add: require('~/app/icons/Icon-Add.svg'),
            hide_bottom: false,
            caseDialog: null,
            confirm: false,
            dialogRoom: {
                dialog: false,
                des: '',
                code: '',
                dataSelected: null,
                nextNumber: 0,
                dataDel: null
            }
        })

    // const fetchGetData = () => {

    // }

    // const fetchAddData = () => {

    // }

    // const fetchEditData = () => {

    // }
    const fetchdelCommon = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchCommon(api, body);
      // const tempdata = GET_DATA['tQueasy']['t-queasy'].sort(compare);
      // console.log('ayo', tempdata.sort(compare));
    
      refreshdata();
      // console.log('temp data : ', tempdata);
      
      // state.data = tempdata;
      // state.hide_bottom = true;
    }
    
    const fetchCommon = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchCommon(api, body);
      const tempdata = GET_DATA['tQueasy']['t-queasy'].sort(compare);
      // console.log('ayo', tempdata.sort(compare));


      
      console.log('temp data : ', tempdata);
      
      state.data = tempdata;
      state.hide_bottom = true;
    }
    onMounted(() => {
      fetchCommon('readQueasy', {
        caseType: 3,
        intkey: 189,
        inpInt1: '?',
        inpchar1: '?',
      });
    });

    const compare = (a, b) => {
      if (a.char1 < b.char1) {
        return -1;
      }
      if (a.char1 > b.char1) {
        return 1;
      }
      return 0;
    }

    const add = () => {
      console.log('Masuk Dialog Add');
      state.dialogRoom.nextNumber = getMaxNumber();
      console.log('number :', state.dialogRoom.nextNumber);
      
      state.caseDialog = 1;
      state.dialogRoom.dialog = true;
    }

    const onClickDel = (row) => {
      console.log('Delete No : ', row['number1']);
      
      state.dialogRoom.dataDel = row['number1'];
      state.confirm = true;
      state.dialogRoom.nextNumber = row.number;
      state.dialogRoom.des = row.char3;
      // state.dialogRoom.code = row.char1;
    }

    const OnDelete = (e) => {
      fetchdelCommon('createQueasy', {
              caseType: "12",
              tQueasy: {
                  "t-queasy": {
                      "key": 189,
                      "number1": state.dialogRoom.dataDel,
                      "number2": "?",
                      "number3": "?",
                      "date1": "?",
                      "date2": "?",
                      "date3": "?",
                      "char1": state.dialogRoom.code,
                      "char2": "",
                      "char3": state.dialogRoom.des,
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
                      "number1": 1,
                      "number2": "?",
                      "number3": "?",
                      "date1": "?",
                      "date2": "?",
                      "date3": "?",
                      "char1": "SV1",
                      "char2": "",
                      "char3": "Sea View 1",
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

    const getMaxNumber = () => {
      const dataNumber = [];

      for (let i = 0; i<state.data.length; i++) {
        dataNumber.push(i, state.data[i]["number1"]);
      }
      return (Math.max(...dataNumber) + 1);      
    }    

    const onClickRoom = (e) => {
      emit('onClickRoom', e)
    }

    const onClickEdit = (row) => {
      console.log('row : ', row);
      
      state.dialogRoom.dialog = true;
      state.dialogRoom.dataSelected = row;
      state.caseDialog = 2;
      state.dialogRoom.nextNumber = row['number1'];
      
    }

    const onCancelDialog = () => {
      state.dialogRoom.dialog = false;
    }

    // dipanggil : nilai dialog berubah
    const onValueFromDialog = (dialogVal, data) => {
      if (!dialogVal) { // dialog close
        console.log("Dialog close : ", data);
        state.dialogRoom.dialog = dialogVal;

        refreshdata();
      }
    }

    const refreshdata = () => {
      fetchCommon('readQueasy', {
        caseType: 3,
        intkey: 189,
        inpInt1: '?',
        inpchar1: '?',
      });
    }

    return {
        ...toRefs(state),
        tableHeadersFour,
        add,
        onValueFromDialog,
        getMaxNumber,
        onClickEdit,
        OnDelete,
        onClickRoom,
        refreshdata,
        onCancelDialog,
        onClickDel,
        fetchdelCommon
    }
  },
    
  components: {
    DialogRoomFour:() => import('../components/DialogRoomFour.vue')
  }
})
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 55vh;

  thead tr {
    th {
      position: sticky;
      z-index: 3;
    }

    &:first-child th {
      top: 0;
    }
  }
}
  tr.selected td {
    background-color: #2d00e2 !important;
    color: #fff;
  }


</style>