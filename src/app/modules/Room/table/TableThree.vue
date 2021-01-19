<template>
  <div style="height: 450px" class="row">
    <div class="col-8">
      <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img @click="add" :src="icon_add" height="25" />
        </q-btn>
      </div>
      <STable
        :columns="tableHeadersThree"
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
        <template v-slot:body="props">
            <q-tr :props="props" @click="onRowClick(props.row)" 
            :class="{
              selected : props.row.selected
            }">
             <q-td 
             :key="col.name" 
             :props="props" 
             v-for="col in props.cols.filter(x=> ![
             'actions'].includes(x.name))">
                {{col.value}} 
             </q-td>
            <q-td :id="props.row.selected ? 'selected': ''" key="actions" :props="props" class="fixed-col right">
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
            </q-tr>
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
                <div class="q-my-md q-mr-md text-weight-bold" style="fontSize: 18px">Room Related Setup - Room View</div>
                <div class="q-mr-md">
                  <p>Here you will setup room category and room type.</p>
                  <p>Currently available room category can be added, edited, and removal.</p>
                </div>
            </div>
        </div>
      </q-card>
    </div>
    <DialogRoomThree 
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
import {tableHeadersThree} from './room.table'
import { Notify } from 'quasar'
import { log } from 'util'
export default defineComponent({
    setup(_, {emit, root:{$api}}){
        const state = reactive({
            data: [],
            icon_add: require('~/app/icons/Icon-Add.svg'),
            hide_bottom: false,
            caseDialog: null,
            confirm: false,
            dialogRoom: {
                dialog: false,
                des: '',
                nextNumber: 0,
                dataSelected: null,
                dataDel: null 
            }
        })


        const FETCH_DATA = async (api, body?) => {
          const GET_DATA = await $api.fetchAPI.FetchAPISS(api, body)
          console.log('GET : ', GET_DATA);
          // -----

          if (api == "readParamtext") {
            const tempData = GET_DATA['tParamtext']['t-paramtext'];

            for(let i = 0; i < tempData.length; i++) {
              tempData[i]['number'] = tempData[i]['sprachcode']+1;
              tempData[i]['selected'] = false
            }

            state.data = tempData;
            console.log('tempData : ', tempData);
            
            state.hide_bottom = true;

          } else if (api == "delParamtext") {
            refreshdata();
          }  
        }
        
        onMounted(() => {
          FETCH_DATA('readParamtext', {
            caseType: "7",
            pTxtNo: "230",
          })
        })

        const add = () => {
          state.dialogRoom.nextNumber = getMaxNumber();
          console.log('next : ', state.dialogRoom.nextNumber);
          
          state.caseDialog = 1;
          state.dialogRoom.dialog = true;
        }

        const onClickDel = (row) => {
          console.log('Delete No : ', row['sprachcode']);
          
          state.dialogRoom.dataDel = row['sprachcode'];
          state.confirm = true;
          state.dialogRoom.nextNumber = row.number;
          state.dialogRoom.des = row.ptexte;
        }

        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
        }


        const OnDelete = (e) => {
          FETCH_DATA('delParamtext', {
            caseType: "1",
            int1: "230",
            int2: "0",
            int3: state.dialogRoom.dataDel
          })
        }

        const onClickRoom = (e) => {
          emit('onClickRoom', e)
        }

        const onClickEdit = (row) => {
          console.log('row', row)

          state.dialogRoom.dialog = true
          state.dialogRoom.dataSelected = row;
          state.caseDialog = 2;
          state.dialogRoom.nextNumber = row['sprachcode'];
          state.dialogRoom.des = row.des
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

        const getMaxNumber = () => {
          const dataSprachcode = [];

          for (let i = 0; i<state.data.length; i++) {
            dataSprachcode.push(i, state.data[i]["sprachcode"]);
          }
          return (Math.max(...dataSprachcode) + 1);
        }

        const refreshdata = () => {
          FETCH_DATA('readParamtext', {
            caseType: "7",
            pTxtNo: "230",
          })
        }

        return {
            ...toRefs(state),
            tableHeadersThree,
            add,
            onClickRoom,
            onValueFromDialog,
            getMaxNumber,
            onClickEdit,
            OnDelete,
            onCancelDialog,
            refreshdata,
            onClickDel,
            onRowClick
        }
    },

    components: {
      DialogRoomThree:() => import('../components/DialogRoomThree.vue')
    }
})
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 35vh;

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
  #selected {
    background-color: #2d00e2 !important;
    color: #fff;
  }

</style>