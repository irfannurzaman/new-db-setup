<template>
        <div class="row justify-between">
            <div class="col-6">
                <div class="row">
                    <div class="col-6">
                        <SSelect v-model="outlet" :options="optionsOut" label-text="Outlet"/>
                    </div>
                    <div class="col">
                        <SSelect v-model="minutes" :options="optionsMinutes" label-text="Tolerance (minutes)"/>
                    </div>
                </div>

                <STable
                  :loading="isFetching"
                  :columns="tableHeadersEmpat"
                  :data="data"                   
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :hide-bottom="hide_bottom"
                  class="table-accounting-date"
                  flat bordered
                  style="height: 400px; max-width: 450px"
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td :props="props" key="weekday">
                                {{props.row.weekday}}
                            </q-td>
                            <q-td 
                            v-for="col in props.cols.filter(x => ![
                                'weekday'
                                ].includes(x.name))" 
                                :props="props" :key="col.name">
                                    <q-checkbox v-model="col.value" size="xs" />
                            </q-td>
                        </q-tr>
                    </template>
                </STable>

                <STable
                  :loading="isFetching"
                  :columns="tableHeadersEmpat"
                  :data="data1"                   
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :hide-bottom="hide_bottom"
                  class="table-accounting-date q-mt-md"
                  flat bordered
                  style="height: 400px"
                >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td :props="props" key="hour">
                                {{props.row.hour}}
                            </q-td>
                            <q-td v-for="col in props.cols.filter(x => ![
                                'hour'
                                ].includes(x.name))" :props="props" :key="col.name">
                                    <SInput type="number" size="xs" />
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
                            <div class="q-my-md q-mr-md text-weight-bold" style="fontSize: 18px">Restaurant Related Setup - Happy Hour</div>
                            <div class="q-mr-lg">
                                <p>Here you will setup happy hour to apply discounted prices during certain period of time .</p> 
                                <p>This is an optional feature with a precondition the selling articles have been defined in each outlet.</p>
                            </div>
                        </div>
                    </div>                   
                </q-card>
            </div>
        </div>
</template>
<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeadersEmpat} from './restaurants.table'
import {optionsOutlet} from '../utils/table1'

export default defineComponent({
    setup(_, {emit, root: {$api}}){
        const state = reactive({
            data: [],
            data1: [],
            optionsOut:[],
            optionsMinutes: [],
            hide_bottom: true,
            dialogOutline: {
                dialog: false,
                number: '',
            },
            article: false,
            outlet: '',
            minutes: '00',
            iconPlay: require('~/app/icons/Icon-Play.svg')
        })

        const FETCH_DATA = async (api, body?) => {
            const GET_DATA = await $api.fetchAPI.FetchCommon(api, body)
            state.optionsOut = optionsOutlet(GET_DATA)
        }

        onMounted(() => {
            FETCH_DATA('loadHotelDepartment')
            state.optionsMinutes = [
                '00', '01', '02', 
                '03', '05', '10',
                '15', '20', '30',
                '40', '50', '60']

            for (let i = 1; i <= 1; i++) {
                state.data.push({
                    weekday: 'Active',
                    mon: false,
                    tue: false,
                    wed: false,
                    thu: false,
                    fri: true                    
                });

                state.data1.push({
                    hour: 'Price',
                    satu: "",
                    dua: "",
                });
            }
        })
        
        const x = (e) => {
            console.log('e', e);
            
        }

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

        const onPlay = () => {
            // root.$router.push('/tutorial_room')
        }

        return {
            ...toRefs(state),
            tableHeadersEmpat,
            add,
            onClickEdit,
            onClikcRestaurant,
            onPlay,
            x
        }
    },
   components: {
    //   DialogOutline:() => import('../components/DialogGuestProfile'),
      }
})
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 85px;

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

.button_crud {
    width: 50px;
    // height: 135px;
    background: $primary-gradient;
}
</style>