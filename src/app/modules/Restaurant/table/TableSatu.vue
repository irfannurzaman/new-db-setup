<template>
        <div style="height: 450px" class="row">
            <div class="col-8">
                <div class="row">
                    <SSelect label-text="Outlet" @input="onClickOutlet(outlet)" v-model="outlet" :options="options" style="width: 180px; marginRight: 20px"/>
                    <q-btn @click="add('Quick Add')" :disable="disableAdd" unelevated size="sm" color="primary"  label="Quick Add" style="height: 25px; marginTop: 25px" />
                </div>
                <div class="q-mb-md">
                    <q-btn @click="add('New Table')"  :disable="disableAdd" flat round class="q-mr-lg">
                      <img :src="require('~/app/icons/Icon-Add.svg')" height="25" />
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
                                <q-item-section>edit</q-item-section>
                              </q-item>
                              <q-item @click="deleteDataRow(props.row)" clickable v-ripple>
                                <q-item-section>delete</q-item-section>
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
            <DialogDiningTable :dialogDiningTable="dialogDiningTable" @onSave="onSave"/>
    </div>
</template>
<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeaders} from './restaurants.table'
import {optionsOutlet, table_data} from '../utils/table1'

export default defineComponent({
    setup(_, {emit, root: {$api}}){
        const state = reactive({
            isFetching: false,
            data: [],
            hide_bottom: false,
            options: [],
            outlet: '',
            disableAdd: true,
            dialogDiningTable: {
                dialog: false,
                number: '',
                KEYADD: '',
                tableNumber: '',
                des: '',
                quickadd: '' as any,
                checkbox: false
            }
        })

        const FETCH_DATA = async (api, body?) => {
          const [GET_DATA, GET_VHPSS]= await Promise.all([
            $api.fetchAPI.FetchCommon(api, body),
            $api.fetchAPI.FetchAPISS(api, body)
          ])
          switch (api) {
            case 'loadHotelDepartment':
              state.options = optionsOutlet(GET_DATA)          
              break;
            case 'writeTable': 
              setTimeout(() => {
                state.isFetching = false
              },1000)
            break;
          
            default:
              state.data = table_data(GET_VHPSS)
              state.disableAdd = false
              if (state.data.length !== 0) {
                state.hide_bottom = true
              }
              break;
          }
        }
        onMounted(() => {
          FETCH_DATA('loadHotelDepartment')

        })

        const add = (add?) => {
          state.dialogDiningTable.dialog = true
          state.dialogDiningTable.KEYADD = add
        }

        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
        }

        const onSave = (data) => {
          if (data.quickadd !== '') {
            state.isFetching = true
            if (data.KEYADD == 'Quick Add') {
              let dataTable = state.data
              for (let i = 1; i <= Number(data.quickadd); i++) {
                const number = dataTable[dataTable.length - 1]['tischnr'] + 1
                dataTable.push({
                  bezeich: 'Table ' + number,
                  selected: false,
                  tischnr: number
                })
              }              
                FETCH_DATA('writeTable', {
                  "iCase": 1,
                  "inpDept": 1,
                  "inpTisch": "?",
                  tTisch:{
                    't-tisch': dataTable
                  }
                })
            }
          }

          if (data.des !== '' && data.tableNumber !== '') {
            console.log('sukses1');
          }

          state.dialogDiningTable.dialog = false
          
        }

        const onClickOutlet = (data) => {          
          FETCH_DATA('readTable', {
            "iCase" : 1,
            "dept": data.value,
            "tableNo": "?"
          })       
        }

        const onClickEdit = (row) => {
            state.dialogDiningTable.dialog = true
            state.dialogDiningTable.number = row.number
        }

        const onClikcRestaurant = (e) => {
          emit('onClikcRestaurant', e)
        }
        
        return {
            ...toRefs(state),
            tableHeaders,
            add,
            onClickEdit,
            onClikcRestaurant,
            onRowClick,
            onClickOutlet,
            onSave
        }
    },
   components: {
      DialogDiningTable:() => import('../components/DialogDiningTable.vue'),
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