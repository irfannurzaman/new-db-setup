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
                  :columns="tableHeadersEnam"
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
            <DialogCancelOrderReason :DialogCancelOrderReason="DialogCancelOrderReason" @onSave="onSave"/>

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
import {tableHeadersEnam} from './restaurants.table'
import {InputParameter, NotifyCreate} from '../utils/global'
export default defineComponent({
    setup(_, {emit, root}){
        const state = reactive({
            isFetching: false,
            data: [],
            key: 'onSave',
            hide_bottom: false,
            confirm: false,
            textDelete: '' as any,
            DialogCancelOrderReason: {
                dialog: false,
                des: '',
                dataRow: ''
            }
        })

        const FETCH_DATA = async (api, body?) => {
          const GET_DATA = await root.$api.fetchAPI.FetchCommon(api, body)
          switch (api) {
            case 'readQueasy':
              state.data = GET_DATA.tQueasy['t-queasy'].map(items => ({
                char1: items['char1'],
                number1: items['number1'],
                selected: false
              }))

              if (state.data.length !== 0) {
                state.hide_bottom = true
              }   
              break;
            case 'createQueasy':
              setTimeout(() => {
                state.isFetching = false
                onRefresh()
              },1000)
              break;
          
            default:
              break;
          }
        }

        const onRefresh = () => {
          FETCH_DATA('readQueasy', {
            "caseType": 3,
		        "intkey": 11,
		        "inpInt1": "?",
		        "inpchar1": "?"
          })
        }
        onMounted(() => {
          FETCH_DATA('readQueasy', {
            "caseType": 3,
		        "intkey": 11,
		        "inpInt1": "?",
		        "inpchar1": "?"
          })
        })

        const add = () => {
            state.DialogCancelOrderReason.dialog = true
            state.key == 'onSave'
        }

        const onSave = () => {
          const {DialogCancelOrderReason, data} = state          
          if (DialogCancelOrderReason.des !== '') {  
            state.isFetching = true  
            if (state.key == 'onSave') { 
              const {tQueasy, tQueasy1} = InputParameter(
                DialogCancelOrderReason.des,
                data[data.length - 1]['number1'] + 1,
                11
              )             
              FETCH_DATA('createQueasy', {
                    "caseType": "3",
                        "tQueasy": {
                          "t-queasy":tQueasy
                        },
                        "tQueasy1": {
                          "t-queasy1": tQueasy1
                        }
              })
            }else {
              const {tQueasy, tQueasy1} = InputParameter(
                DialogCancelOrderReason.des,
                 DialogCancelOrderReason.dataRow['number1'],
                11
              )   
              FETCH_DATA('createQueasy', {
                    "caseType": 2,
                        "tQueasy": {
                          "t-queasy": tQueasy
                        },
                        "tQueasy1": {
                          "t-queasy1": tQueasy1
                        }
              })

            }     
            state.DialogCancelOrderReason.dialog = false
          }
        }

        
        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
        }


        const onClickEdit = (row) => {
            state.key = 'edit'
            state.DialogCancelOrderReason.dialog = true
            state.DialogCancelOrderReason.dataRow = row
            state.DialogCancelOrderReason.des = row.char1
        }

        const onClickDelete = (row) => {
          state.textDelete = row
          state.confirm = true
        }

        const onClikcRestaurant = (e) => {
          emit('onClikcRestaurant', e)
        }

        const onDelete = () => {
          let {des} = state.DialogCancelOrderReason
          state.isFetching = true
            FETCH_DATA('createQueasy', {
                "caseType": "12",
                "tQueasy": {
                  "t-queasy": [{
                    "key": "11",
                    "number1": state.textDelete.number1,
                    "number2": "?",
                    "number3": "?",
                    "date1": "?",
                    "date2": "?",
                    "date3": "?",
                    "char1": state.textDelete.char1,
                    "char2": "",
                    "char3": "",
                    "deci1": "?",
                    "deci2": "?",
                    "deci3": "?",
                    "logi1": "?",
                    "logi2": "true",
                    "logi3": "?",
                    "betriebsnr": "0"
                  }]
                },
                "tQueasy1": {
                  "t-queasy1": [{
                    "key": "11",
                    "number1": state.textDelete.number1,
                    "number2": "?",
                    "number3": "?",
                    "date1": "?",
                    "date2": "?",
                    "date3": "?",
                    "char1": state.textDelete.char1,
                    "char2": "",
                    "char3": "",
                    "deci1": "?",
                    "deci2": "?",
                    "deci3": "?",
                    "logi1": "?",
                    "logi2": "true",
                    "logi3": "?",
                    "betriebsnr": "0"
                  }]
                }
              }) 
              state.confirm = false
        }

        return {
            ...toRefs(state),
            tableHeadersEnam,
            add,
            onSave,
            onClickEdit,
            onClikcRestaurant,
            onRowClick,
            onClickDelete,
            onDelete
        }
    },
   components: {
      DialogCancelOrderReason:() => import('../components/DialogCancelOrderReason.vue'),
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