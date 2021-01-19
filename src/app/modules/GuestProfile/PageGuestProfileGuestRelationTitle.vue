<template>
  <div>
    <div style="height: 450px;">
    <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img @click="add" :src="require('~/app/icons/Icon-Add.svg')" height="25" />
        </q-btn>
    </div>
    <STable
      :loading="isFetching"
      :columns="tableHeadersTiga"
      :data="data"
      :rows-per-page-options="[0]"
      :pagination.sync="pagination"
      :hide-bottom="hide_bottom"
      class="table-accounting-date"
      flat bordered
      style="width: 202px"
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
                      <q-item @click="deleteDataRow(props.row)" clickable v-ripple>
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
    <DialogRelationTitle :dialogOutline="dialogOutline" @onSave="onSave"/>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div style="color: red "><span class="mdi mdi-delete mdi-36px"></span></div>
          <span class="q-ml-sm">Delete the selected Request Text: <br/> {{textDelete.char1}}?</span>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn unelevated outline size="sm" label="Cancel" color="primary" v-close-popup />
          <q-btn unelevated size="sm" label="Oke" color="primary" @click="onDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeadersTiga} from './table/guestprofile.table'
import {GET_TABLE} from './utils/table3'
import {InputParameter, NotifyCreate} from './utils/global'
export default defineComponent({
    setup(_, {emit, root: {$api, $router}}){
        const state = reactive({
            isFetching: false,
            data: [],
            hide_bottom: false,
            confirm: false,
            textDelete: '' as any,
            dialogOutline: {
              dialog: false,
              relationship: '',
              key: 'addData',
              dataEdit: '' as any,
              keyEdit: ''
            }
        })

        const FetchData = async (api, body?) => {
          const GET_DATA = await $api.fetchAPI.FetchCommon(api, body)  
           switch (api) {
             case 'createQueasy':
               setTimeout(() => {
                 state.isFetching = false
                 NotifyCreate('Sukses', 'green', 'positive')
                 onRefresh()
               },1000)
               break;
           
             default:
               state.data = GET_TABLE(GET_DATA)
               if (state.data.length !== 0) {
                 state.hide_bottom = true
               }
               break;
           }        
        }


        onMounted(() => {
          onRefresh()
        })

        const onRefresh = () => {
          FetchData('readQueasy', {
            "caseType": 3,
		        "intkey": 13,
		        "inpInt1": "?",
		        "inpchar1": "?"
          })
        }

        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
        }


        const add = () => {
          const {dialogOutline} = state
          dialogOutline['dialog'] = true
          dialogOutline['relationship'] = ''
          dialogOutline['key'] = 'addData'
        }

        const onClickEdit = (row) => {
          const {dialogOutline} = state
          dialogOutline['dialog'] = true
          dialogOutline['relationship'] = row.char1
          dialogOutline['keyEdit'] = row.char1
          dialogOutline['dataEdit'] = row
          dialogOutline['key'] = 'addEdit'
          
        }

        const onSave = () => {
          const {data, dialogOutline} = state
          let dataTable = []
          for(const items of data){
            dataTable.push(items['char1'].toLowerCase())
          }
          if (dialogOutline.relationship !== '') {     
            if (dialogOutline.key == 'addData') {
                if (!dataTable.includes(dialogOutline.relationship.toLowerCase())) {   
                  const {tQueasy1, tQueasy} = InputParameter(
                    dialogOutline.relationship,
                    data[data.length - 1]['number1'] + 1,
                    13
                  )
                  state.isFetching = true
                  FetchData('createQueasy', {
                    "caseType": "3",
                    "tQueasy": {
                      "t-queasy": tQueasy
                    },
                    "tQueasy1": {
                      "t-queasy1": tQueasy1
                    }
                  })
                  dialogOutline['dialog'] = false            
                } else {
                  NotifyCreate('Description already exists', 'red')
                }              
            } else {
              const {tQueasy1, tQueasy} = InputParameter(
                dialogOutline.relationship,
                dialogOutline.dataEdit.number1,
                13
              )
              const xi = dataTable.filter(items => {
               const title = dialogOutline.keyEdit.toLowerCase()
               return ![title].includes(items)
              })
              if (!xi.includes(dialogOutline.relationship.toLowerCase())){
                state.isFetching = true
                FetchData('createQueasy', {
                  "caseType": "2",
                  "tQueasy": {
                    "t-queasy": tQueasy
                  },
                  "tQueasy1": {
                    "t-queasy1": tQueasy1
                  }
                })
                dialogOutline['dialog'] = false   
              } else {
                NotifyCreate('Description already exists', 'red')
              }
            }    
          } else {
            NotifyCreate('Relationship not found', 'red')
          }
        }

        const deleteDataRow = (row) => {
          state.confirm = true
          state.textDelete = row
        }

        const onDelete = () => {
          const {dialogOutline, textDelete} = state
          const {tQueasy, tQueasy1} = InputParameter(
            textDelete.char1, 
            textDelete.number1,
            13
          )
          state.isFetching = true    
            FetchData('createQueasy', {
                "caseType": "12",
                  "tQueasy": {
                    "t-queasy": tQueasy
                  },
                  "tQueasy1": {
                    "t-queasy1": tQueasy1
                  }
            })
          state.confirm = false
        }
        return {
            ...toRefs(state),
            tableHeadersTiga,
            add,
            onClickEdit,
            onRowClick,
            onSave,
            deleteDataRow,
            onDelete
        }
    },
   components: {
      DialogRelationTitle:() => import('./components/DialogRelationTitle.vue'),
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