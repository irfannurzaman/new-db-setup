<template>
        <div class="row justify-between">
            <div class="col-3" v-show="change == 0">
                <SSelect @input="onClickopOutlet(opOutlet)" :options="op_Outlet" v-model="opOutlet" label-text="Outlet"/>
                <div class="row">
                    <div class="col-6">
                        <SSelect
                        @input="onClickTransaksiType(valueTransaksiType)" 
                        :options="optionsTransaksiType" 
                        v-model="valueTransaksiType" 
                        :disable="disableTransactionType" 
                        label-text="Transaction Type"/>
                    </div>
                    <div class="col">
                        <SSelect 
                        @input="onClickSubGroup(valueSubGroup)"
                        :options="optionsSubGroup"
                        v-model="valueSubGroup"
                        :disable="disableSubgroup" 
                        label-text="Subgroup"/>
                    </div>
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
                  style="height: 400px"
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
                                <q-item-section>edit</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-icon>
                      </q-td>
                      </q-tr>
                  </template>
                </STable>
            </div>

            <div class="col-3" v-show="change == 0">
                <SInput v-model="description" label-text="Description" />
                <SSelect label-text="Linked F/O Article" disabled/>
                <div class="row">
                    <div class="col-6">
                        <SInput label-text="Unit Price" />
                    </div>
                    <div class="col-6">
                        <SInput label-text="Happy Hour Price" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <SInput label-text="Recipe Number" />
                    </div>
                    <div class="col-6">
                        <SInput label-text="Cost" />
                    </div>
                </div>
                  <SSelect label-text="Kitchen Partner" disabled/>
                  <q-checkbox size="xs" v-model="article" label="Article Active" />
                <div class="row">
                    <div class="col-6">
                      <q-btn flat round>
                        <img @click="onPlay" :src="iconPlay" height="30"/>
                      </q-btn>
                    </div>
                    <div class="col-6 q-mt-sm">
                        <q-btn 
                            unelevated 
                            size="sm" 
                            color="primary" 
                            outline label="Cancel"
                            class="q-mr-sm"
                        />
                        <q-btn 
                            unelevated 
                            size="sm" 
                            color="primary"  
                            label="Save" 
                        />
                    </div>
                </div>
                
            </div> 

            <div class="col-1" v-show="change == 0">
                <q-card flat class="button_crud">
                    <q-icon class="text-white cursor-pointer q-ma-md mdi mdi-file-plus mdi-24px"></q-icon>
                    <q-icon class="text-white cursor-pointer q-ma-md mdi mdi-pencil mdi-24px"></q-icon>
                    <q-icon class="text-white cursor-pointer q-ma-md mdi mdi-delete mdi-24px"></q-icon>
                </q-card>
            </div>

            <div class="col-8" v-show="change == 1">
                <div class="row">
                    <div class="col-5">
                <SSelect label-text="Outlet" />
                <STable
                  :loading="isFetching"
                  :columns="tableHeadersTigaPlus"
                  :data="dataPlus"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :hide-bottom="hide_bottom"
                  class="table-accounting-date"
                  flat bordered
                  style="height: 400px"
                />
          <div class="row" style="margin-top: 0.7rem;">
            <div class="col-6 q-gutter-sm">
            <q-btn color="white" text-color="black" />
            <q-btn color="primary" />
            <q-btn color="secondary"  />
            <q-btn color="amber" glossy  />
            <q-btn color="brown-5"  />
            <q-btn color="deep-orange" glossy  />
            <q-btn color="purple" />
            <q-btn color="black"  />
            <q-btn color="brown-5"  />
            <q-btn color="deep-orange" glossy  />
            <q-btn color="purple" />
            <q-btn color="black"  />
            </div>
          </div>
        </div>
        <div class="col-2">
          <q-btn flat round>
            <img @click="onPlay" :src="iconPlay" height="30" />
          </q-btn>
        </div>
        <div class="col-5">
                <STable
                  :loading="isFetching"
                  :columns="tableHeadersTigaPlus"
                  :data="dataPlus"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :hide-bottom="hide_bottom"
                  class="table-accounting-date"
                  flat bordered
                  style="height: 400px; margin-top: 4rem;"
                >
                </STable>
                    </div>
                </div>
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
                            <div class="q-my-md q-mr-md text-weight-bold" style="fontSize: 18px">Sales Transaction Related Setup - Billing Article</div>
                            <div class="q-mr-md">
                                <p>Here you will setup all articles needed by Front Office Cashier.</p> 
                                <p>Currenctly available articles can be used, used, added, or deactivated.</p>
                            </div>
                        </div>
                    </div>                   
                </q-card>
            </div>
        </div>
</template>
<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeadersTiga, tableHeadersTigaPlus} from './restaurants.table'
import {optionsOutlet} from '../utils/table3'
import { promises } from 'fs'
export default defineComponent({
    setup(_, {emit, root: {$api}}){
        const state = reactive({
            data: [],
            dataPlus: [],
            op_Outlet:[],
            disableTransactionType: true,
            hide_bottom: true,
            disableSubgroup: true,
            opOutlet: '',
            description: '',
            dialogOutline: {
                dialog: false,
                number: '',
            },
            article: false,
            iconPlay: require('~/app/icons/Icon-Play.svg'),
            change: 0,
            optionsTransaksiType: [],
            valueTransaksiType: '',
            optionsSubGroup: [],
            valueSubGroup: ''
        })

        const FETCH_API = async (api, body?) => {
          const [GET_DATA, GET_COMMON] = await Promise.all([
            $api.fetchAPI.FetchCommon(api, body),
            $api.fetchAPI.FetchCommon(api, body)
          ])
          switch (api) {
            case "loadHotelDepartment":
              state.op_Outlet = optionsOutlet(GET_DATA)
              break;  
            case "getReadArticle1":
              console.log('sukses', GET_COMMON)
              state.optionsSubGroup = GET_COMMON
              .tArtikel['t-artikel'].map(items => ({
                label: items['bezeich'],
                artnr: items['artnr'],
                dept: items['departement'],
                bezeich: items['bezeich']
              }))
              break;
            default:
              break;
          }
        }
        onMounted(() => {
          FETCH_API('loadHotelDepartment')
            for (let i = 1; i <= 20; i++) {
                state.data.push({
                    price: '0.00',
                    des: 'Bank Transfer',
                    selected: false
                })
                
            }
            for (let i = 1; i <= 20; i++) {
                state.dataPlus.push({
                    subgroup: "Tips",
                    des: "Trick",
                })
                
            }
        })

        const add = () => {
            state.dialogOutline.dialog = true
        }

        const onClickEdit = (row) => {
            state.dialogOutline.dialog = true
            state.dialogOutline.number = row.number
        }

        const onClikcRestaurant = (e) => {
          emit('onClikcRestaurant', e)
        }

        const onClickTransaksiType = (dataSelect) => {
          FETCH_API('getReadArticle1', {
            "caseType": "32",
            "artNo": "?",
            "dept": dataSelect.value2,
            "aName": "?",
            "artart": "0",
            "betriebsNo": "?",
            "actFlag": "?"
          })
          state.disableSubgroup = false
        }

        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
          state.description = datarow.des
        }

        const onClickSubGroup = (data) => {
          console.log('sukses', data);
          
        }


        const onPlay = () => {
          if (state.change == 0){
            state.change = 1
          } else {  
            state.change = 0
          }
         }

         const onClickopOutlet = (opOutlet) => {
           const dataType = ['SALES', 'PAYMENT', 'FB COMPLIMENT']
           let transactionType = {
             artartList: {
               'artart-list':[]
             }
            }
           for(const i of dataType){
             transactionType.artartList['artart-list'].push({
               dept: opOutlet.value,
               bezeich: i,
               'tr-bez': i
             })
           }
           state.optionsTransaksiType = transactionType
           .artartList['artart-list']
           .map(items => ({
             label: items['bezeich'],
             value: items['tr-bez'],
             value2: items['dept']
           }))
           state.disableTransactionType = false
         }

        return {
            ...toRefs(state),
            onRowClick,
            tableHeadersTiga,
            tableHeadersTigaPlus,
            add,
            onClickEdit,
            onClikcRestaurant,
            onPlay,
            onClickopOutlet,
            onClickTransaksiType,
            onClickSubGroup
        }
    },
   components: {
    //   DialogOutline:() => import('../components/DialogGuestProfile'),
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

.button_crud {
    width: 50px;
    // height: 135px;
    background: $primary-gradient;
}
</style>