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
                  :columns="tableHeadersLima"
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
                              <q-item :props="props" @click="onClickDelete(props.row)" clickable v-ripple>
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
            <DialogOrderReqText @onSave="onSave" :DialogOrderReqText="DialogOrderReqText"/>
            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <div style="color: red "><span class="mdi mdi-delete mdi-36px"></span></div>
                  <span class="q-ml-sm">Delete the selected Request Text {{textDelete.char1}}?</span>
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
import { stat } from 'fs'
import {tableHeadersLima} from './restaurants.table'
import {InputParameter, NotifyCreate} from '../utils/global'
export default defineComponent({
    setup(_, {emit, root}){
        const state = reactive({
            key: 'add',
            data: [],
            hide_bottom: false,
            isFetching: false,
            confirm: false,
            textDelete: '' as any,
            DialogOrderReqText: {
                dialog: false,
                number: '',
                des: '',
                keyEdit: ''
            }
        })

        const FETCH_DATA = async (api, body?) => {
          const GET_DATA = await root.$api.fetchAPI.FetchCommon(api, body)
          switch (api) {
            case "createQueasy":
              setTimeout(() => {
                state.isFetching = false
                onRefresh()
              },1000)
              break;
          
            default:
              const data = GET_DATA.tQueasy['t-queasy'].map(items => ({
                char1: items['char1'],
                selected: false,
                number1: items['number1']
              }))
              state.data = data
              if (state.data.length !== 0) {
                state.hide_bottom = true
              }       
              break;
          }
        }
        onMounted(() => {
          FETCH_DATA('readQueasy', {
            "caseType": 3,
		        "intkey": 12,
		        "inpInt1": "?",
		        "inpchar1": "?"
          })
        })

        const onRefresh = () => {
          FETCH_DATA('readQueasy', {
            "caseType": 3,
		        "intkey": 12,
		        "inpInt1": "?",
		        "inpchar1": "?"
          })
        }

        const add = () => {
          state.key = 'add'
          state.DialogOrderReqText.dialog = true
        }


        const onClickEdit = (row) => {
            state.key = 'edit'
            state.DialogOrderReqText.dialog = true
            state.DialogOrderReqText.des = row.char1
            state.DialogOrderReqText.number = row.number1
            state.DialogOrderReqText.keyEdit = row.char1
        }

        const onClickDelete = (row) => {
          state.textDelete = row
          state.confirm = true
        }

        const onClikcRestaurant = (e) => {
          emit('onClikcRestaurant', e)
        }

        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
        }

        const onSave = () => {
          let {DialogOrderReqText, data} = state
          let dataTable = []
          for(const items of data){
            dataTable.push(items['char1'].toLowerCase())
          }
          if (DialogOrderReqText.des !== '') {            
            if (state.key == 'add') { 
              if (!dataTable.includes(DialogOrderReqText.des.toLowerCase())) {
                state.isFetching = true
                const {tQueasy, tQueasy1} = InputParameter(
                  DialogOrderReqText.des,
                  data[data.length - 1]['number1'] + 1,
                  12 )         
                FETCH_DATA('createQueasy', {
                  "caseType": "3",
                  "tQueasy": {
                    "t-queasy": tQueasy
                  },
                  "tQueasy1": {
                    "t-queasy1": tQueasy1
                  }
                })
                DialogOrderReqText['dialog'] = false
              }  else {
                NotifyCreate('Description already exists', 'red')
              }   
            } else {
              const xi = dataTable.filter(items => {
               const title = DialogOrderReqText.keyEdit.toLowerCase()
               return ![title].includes(items)
              })
              if (!xi.includes(DialogOrderReqText.des.toLowerCase())){
                state.isFetching = true
                const {tQueasy, tQueasy1} = InputParameter(
                  DialogOrderReqText.des,
                  DialogOrderReqText.number,
                  12 )   
                FETCH_DATA('createQueasy', {
                  "caseType": "2",
                  "tQueasy": {
                    "t-queasy": tQueasy
                  },
                  "tQueasy1": {
                    "t-queasy1": tQueasy1
                  }
                }) 
                DialogOrderReqText['dialog'] = false  
              } else {
                NotifyCreate('Description already exists', 'red')
              }
            }
          } else {
            NotifyCreate('New request order not found', 'red')
          }
        }

        const onDelete = () => {
          let {DialogOrderReqText, textDelete} = state
          const {tQueasy, tQueasy1} = InputParameter(
            textDelete['char1'],
            textDelete['number1'],
            12 )
          state.isFetching = true
            FETCH_DATA('createQueasy', {
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
            tableHeadersLima,
            add,
            onClickEdit,
            onClikcRestaurant,
            onRowClick,
            onSave,
            onClickDelete,
            onDelete
        }
    },
   components: {
      DialogOrderReqText:() => import('../components/DialogRequestOrderText.vue'),
      }
})
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 45vh;

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