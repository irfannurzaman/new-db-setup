<template>
  <div>
    <div style="height: 450px;">
      <q-btn flat round class="q-mr-lg">
        <img @click="add" :src="icon_add" height="30" />
      </q-btn>
          <STable
            :columns="tableHeadersOne"
            :data="data"
            :rows-per-page-options="[0]"
            :hide-bottom="hide_bottom"
            class="table-accounting-date"
            flat bordered
            style="width: 402px"
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
      <DialogRoom 
        :dialogRooms="dialogRoom.dialog"
        :dataTable="data"
        @onCancel="onCancelDialog"
        :caseDialog="caseDialog"
        :maxNumber="dialogRoom.nextNumber"
        :dataSelected="dialogRoom.dataSelected"
        @onValueFromDialog="onValueFromDialog"/>
        
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
import {tableHeadersOne} from './table/room.table'
import { Notify } from 'quasar'
export default defineComponent({
    setup(_, {emit, root:{$api, $router}}){
        const state = reactive({
            data: [],
            icon_add: require('~/app/icons/Icon-Add.svg'),
            hide_bottom: false,
            caseDialog: null,
            confirm: false,
            dialogRoom: {
                dialog: false,
                des: '',
                init: '',
                nextNumber: 0,
                dataSelected: null, 
            },
            // add: true
        })

        const fetchDelData = async (api, body?) => {
          const GET_DATA = await $api.fetchAPI.FetchAPISS(api, body)

          refreshdata();
        }
        // single
        const FETCH_DATA = async (api, body?) => {
          const GET_DATA = await $api.fetchAPI.FetchAPISS(api, body)
          console.log('Refresh : ', GET_DATA);

          const tempData = GET_DATA['tParamtext']['t-paramtext'];

          for(let i = 0; i<tempData.length; i++) {
            tempData[i]['number'] = tempData[i]['txtnr']-9200;
            tempData[i]['selected'] = false
          }

          state.data = tempData;
          state.hide_bottom = true;
        
        }        

        onMounted(() => {
          FETCH_DATA('readParamtext1', {
            caseType: "2",
            int1: "9201",
            int2: "9299",
            int3: "?",
            char1: ""
          })
        })

        const add = () => {
          state.dialogRoom.nextNumber = getMaxNumber();
          console.log('next : ', state.dialogRoom.nextNumber);
          
          state.caseDialog = 1;
          state.dialogRoom.dialog = true;

        }

        const onClickDel = (row) => {
          state.confirm = true;
          state.dialogRoom.nextNumber = row.number;
          state.dialogRoom.des = row.ptexte;
        }

        const OnDelete = (e) => {
          console.log('Masuk : ', state.dialogRoom.nextNumber);
          
          fetchDelData('delParamtext', {
            caseType: "2",
            int1: state.dialogRoom.nextNumber + 9200,
            int2: "0",
            int3: "0"
          })

          refreshdata();
        }

        const onClickRoom = (e) => {
          emit('onClickRoom', e)
        }        

        const onClickEdit = (row) => {
          console.log('row', row);
          
          state.dialogRoom.dialog = true
          state.dialogRoom.dataSelected = row;
          state.caseDialog = 2;

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
          const dataTxtNr = [];

          for (let i = 0; i<state.data.length; i++) {
            dataTxtNr.push(i, state.data[i]["txtnr"]);
          }
          return (Math.max(...dataTxtNr) + 1);
        }

        const refreshdata = () => {
          FETCH_DATA('readParamtext1', {
            caseType: "2",
            int1: "9201",
            int2: "9299",
            int3: "?",
            char1: ""
          })
        }

        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
        }

        return {
            ...toRefs(state),
            tableHeadersOne,
            add,
            onClickEdit,
            onClickRoom,
            onValueFromDialog,
            getMaxNumber,
            refreshdata,
            OnDelete,
            onCancelDialog,
            onClickDel,
            fetchDelData,
            onRowClick,
        }
    },

    components: {
      DialogRoom:() => import('./components/DialogRoom.vue')
    }
})
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 40vh;

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