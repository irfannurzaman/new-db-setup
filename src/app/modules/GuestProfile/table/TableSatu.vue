<template>
        <div style="height: 450px" class="row">
            <div class="col-8">
                <div class="q-mb-md">
                    <q-btn flat round class="q-mr-lg">
                      <img @click="add" :src="require('~/app/icons/Icon-Add.svg')" height="25" />
                    </q-btn>
                </div>
                <STable
                  :loading="isFetching"
                  :columns="tableHeaders"
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
            <div class="col-4">
                <q-card 
                    style="
                        width: 300px; 
                        height: 450px; 
                        marginLeft: 100px; 
                        borderRadius: 10px" 
                    flat bordered 
                    class="my-card bg-primary text-white">
                    <div class="row" style="paddingTop: 10px; alignItems: center; paddingLeft: 10px;">
                        <span style="marginRight: 10px" class="mdi mdi-information mdi-48px"></span>
                        <div style="fontSize: 17px; fontWeight: 500">Outlet Setup</div>
                    </div>
                    <div style="paddingLeft: 70px; marginTop: -10px">
                        <div style="marginRight: 10px">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum iste modi mollitia quis quam a! Optio est aut numquam ullam omnis, ratione nesciunt iure. Repudiandae, aspernatur. Ullam optio sint ipsa!
                        </div>
                    </div>
                </q-card>
            </div>
            <DialogCompanyTitle @onSave="onSave" :dialogOutline="dialogOutline"/>
            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <div style="color: red "><span class="mdi mdi-delete mdi-36px"></span></div>
                  <span class="q-ml-sm">Delete the selected Request Text: {{textDelete.char1}}?</span>
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
import {tableHeaders} from './guestprofile.table'
import {GET_TABLE} from '../utils/table1'
import {InputParameter, NotifyCreate} from '../utils/global'
import { log } from 'util'
export default defineComponent({
    setup(_, {emit, root: {$api}}){
        const state = reactive({
            data: [],
            isFetching: false,
            hide_bottom: false,
            keyAdd: 'addData',
            Number: 0,
            confirm: false,
            textDelete: '' as any,
            dialogOutline: {
                dialog: false,
                title: '',
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
                onRefres()
               }, 1000)
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
          FetchData('readQueasy', {
            "caseType": 3,
		        "intkey": 141,
		        "inpInt1": "?",
		        "inpchar1": "?"
          })
        })

        const onRefres = () => {
          FetchData('readQueasy', {
            "caseType": 3,
		        "intkey": 141,
		        "inpInt1": "?",
		        "inpchar1": "?"
          })
        }

        const add = () => {
            state.dialogOutline.dialog = true
            state.keyAdd = 'addData'
            state.dialogOutline.title = ''
        }

        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
        }


        const onClickEdit = (row) => {
            state.dialogOutline.dialog = true
            state.dialogOutline.title = row.char1
            state.Number = row.number1
            state.keyAdd = 'editData'
            state.dialogOutline.keyEdit = row.char1
        }

        const onClickProfile = (e) => {
          emit('onClickProfile', e)
        }

        const onSave = () =>{ 
          const {dialogOutline, data, keyAdd, Number} = state
          let dataTable = []
          for(const items of data){
            dataTable.push(items['char1'].toLowerCase())
          }
          if (dialogOutline.title !== '') {     
            if (keyAdd == 'addData') {        
              if (!dataTable.includes(dialogOutline.title.toLowerCase())) {              
                const {tQueasy, tQueasy1} = 
                InputParameter(dialogOutline.title, data[data.length - 1]['number1']+ 1,
                141) 
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
                  state.dialogOutline.dialog = false   
              } else {
                NotifyCreate('Description already exists', 'red')
              }      
            } else {
             const xi = dataTable.filter(items => {
               const title = dialogOutline.keyEdit.toLowerCase()
               return ![title].includes(items)
              })              
              if (!xi.includes(dialogOutline.title.toLowerCase())){              
                const {tQueasy, tQueasy1} = 
                InputParameter(dialogOutline.title, Number,
                141)
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
                state.dialogOutline.dialog = false   
              } else {
                NotifyCreate('Description already exists', 'red')
              }
            }   
          } else {
            NotifyCreate('Guest / Company Title not found', 'red')
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
            141
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
            tableHeaders,
            add,
            onClickEdit,
            onClickProfile,
            onRowClick,
            onSave,
            deleteDataRow,
            onDelete
        }
    },
   components: {
      DialogCompanyTitle:() => import('../components/DialogCompanyTitle.vue'),
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