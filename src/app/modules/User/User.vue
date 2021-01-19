<template>
    <div>
        <div style="height: 450px" class="row">
            <div class="col-4">
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
                  style="width: 330px"
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
                <div class="q-mb-md row">
                    <SSelect :disable="!active" style="width: 180px; marginRight: 62px" label-text="Outlet" :options="options" v-model="outlet" @input="actived"/>
                    <SInput  :disable="activeInput" style="width: 180px" label-text="Username" v-model="username"/>
                </div>
                <div style="marginTop: -30px" >
                    <q-toggle v-model="value" :disable="username == ''"/>
                    <q-btn flat round style="font-size: 14px;color: #1976D2" icon="mdi-lock"  @click="dialog" :disable="!value" />
                </div>
                <STable
                  :loading="isFetching"
                  :columns="tableHeaders1"
                  :data="datas"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :hide-bottom="hide_bottom"
                  class="table-accounting-date"
                  flat bordered
                  style="width: 424px"
                >
                <template v-slot:body="props">
                        <q-tr :props="props"
                        @click="onRowClick2(props.row)" 
                        :class="{
                          selected : props.row.selected
                        }">
                            <q-td :props="props" key="des">
                                {{props.row.des}}
                            </q-td>
                            <q-td v-for="col in props.cols.filter(x => ![
                                'des'
                                ].includes(x.name))" :props="props" :key="col.name">
                                    <q-checkbox v-model="col.value" size="xs" />
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
        </div>
        <div class="row">
            <q-btn 
            unelevated 
            size="sm" 
            v-close-popup 
            color="primary" 
            outline label="Back"
            style="marginRight: 20px; width: 90px" 
            @click="onClickUser('back')"
            />

            <q-btn 
            @click="onClickUser"
            unelevated 
            size="sm" 
            color="primary"  
            label="Next" 
            style="width: 90px"
            />
        </div>
        <DialogOutline :dialogOutline="dialogOutline"/>
    </div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
} from '@vue/composition-api';
import { tableHeaders, tableHeaders1 } from './table/user.table';
export default defineComponent({
  setup(_, { emit, root: { $api } }) {
    const state = reactive({
      data: [],
      datas: [],
      options: [],
      hide_bottom: false,
      value: false,
      active: false,
      activeInput: true,
      username: '',
      outlet: [],
      dialogOutline: {
        dialog: false,
        number: '',
      },
    });

    const FetchAPISS = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchAPISS(api, body);
      const tempdata = mapSelect(GET_DATA);
      state.data = tempdata;
      if (state.data.length !== 0) {
        state.hide_bottom = true
      }
    };
    const FetchCommon = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchCommon(api, body);
      state.datas = mapSelectFunction(GET_DATA);
      const tempdata = mapSelects(GET_DATA);
      state.options = tempdata;
      if (state.data.length !== 0) {
        state.hide_bottom = true
      }
    };

    const mapSelect = (GET_DATA) => {
      const data = GET_DATA['tBediener']['t-bediener'];
      return data.map((items) => ({
        userinit: items.userinit,
        username: items.username,
        flag: items.flag - 1 === 0 ? 'NO' : 'YES',
        selected: false
      }))
    }

    const mapSelectFunction = (GET_DATA) => {
      const data = GET_DATA.tQueasy['t-queasy'];
      return data.map((items) => ({
        number: items.char3,
        des: items.char3,
        selected: false
      }))
    }
    
    const mapSelects = (GET_DATA) => {
      const data = GET_DATA.tQueasy['t-queasy'];
      return data.map(items => ({
        label: `${items.number1} - ${items.char3}`,
        value: items.number1
      }))
    }
    
    onMounted(() => {
      FetchAPISS('readBedienerList',{
        caseType: 5,
        inpchar1: '',
      });
      FetchCommon('readQueasy',{
        caseType: 3,
        intkey: 19,
        inpInt1: '?',
        inpchar1: '?',
      });
    });

    const add = () => {
      state.active = true;
    };

    const actived = () => {
      state.activeInput = false;
    };

    const dialog = () => {
      console.log('msk');
      
      state.dialogOutline.dialog = true;
    };

    const onClickUser = (e) => {
      emit('onClickUser', e);
    };

    const onRowClick = (datarow) => {
      for(const i of state.data){
        i.selected = false
      }
      datarow['selected'] = true;
    }
    const onRowClick2 = (datarow) => {
      for(const i of state.datas){
        i.selected = false
      }
      datarow['selected'] = true;
    }


    return {
      ...toRefs(state),
      tableHeaders,
      tableHeaders1,
      add,
      dialog,
      actived,
      onClickUser,
      onRowClick,
      onRowClick2
    };
  },
  components: {
      DialogOutline:() => import('./components/DialogUser.vue')
  },
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
  #selected {
    background-color: #2d00e2 !important;
    color: #fff;
  }


</style>