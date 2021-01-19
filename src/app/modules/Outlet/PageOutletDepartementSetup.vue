<template>
  <div>
    <div style="height: 450px;">
      <q-btn flat round class="q-mr-lg">
        <img @click="add" :src="icon_add" height="30" />
      </q-btn>
      <STable
        :columns="tableHeaders"
        :data="data"
        :rows-per-page-options="[0]"
        :hide-bottom="hide_bottom"
        class="table-accounting-date"
        flat bordered
        style="width: 500px"
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
    <DialogOutline :dialogOutline="dialogOutline" :options="options" />
    </div>
</template>
<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeaders} from './table/outline.table'
import { store } from '~/store';
export default defineComponent({
  setup(_, { emit, root: { $api, $router } }) {
    const state = reactive({
      data: [],
      icon_add: require('~/app/icons/Icon-Add.svg'),
      maxDept: 0,
      hide_bottom: false,
      dialogOutline: {
        dialog: false,
        dataSelected: null,
        num: '',
        depart: '',
      },
      type: 0,
      temp_table_departtype: {},
      options: [],
    });

    // single
    const FetchAPISetUp = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchAPISetUp(api, body);
      state.maxDept = GET_DATA['maxDept'];
      state.data = mapSelect(GET_DATA);
      state.hide_bottom = true;
    };

    const FetchCommon = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchCommon(api, body);
      console.log(GET_DATA.tHoteldpt['t-hoteldpt']);
      state.options = mapSelects(GET_DATA);
      // for (let index = 0; index < GET_DATA.tHoteldpt['t-hoteldpt'].length; index++) {
      //   const element = GET_DATA.tHoteldpt['t-hoteldpt'][index]['num'];
      //   const elements = GET_DATA.tHoteldpt['t-hoteldpt'][index]['depart'];
      //   state.options.push(elements);
      // }
    };

    const mapSelects = (GET_DATA) => {
      const data = GET_DATA.tHoteldpt['t-hoteldpt']
      return data.map(items => ({
        label : `${items.num} - ${items.depart}`,
        value : items.num
      }))
    }

    const mapSelect = (GET_DATA) => {
      const data = GET_DATA.deptList['dept-list']
      return data.map(items => ({
        nr : items.num ,
        bezeich : items.depart,
        selected: false,
        'tr-bez':
          items.num == 0
            ? 'Front Office'
            : items.num == 1
            ? 'HARRIS CAFE'
            : items.num == 2
            ? 'ROOM SERVICE'
            : items.num == 3
            ? 'LOBBY LONGUE'
            : items.num == 4
            ? 'TUBE BAR'
            : items.num == 5
            ? 'BOUTIQUE'
            : items.num == 6
            ? 'POOL SIDE'
            : items.num == 10
            ? 'MINIBAR'
            : items.num == 11
            ? 'BANQUET'
            : items.num == 14
            ? 'DE GUCCI SPA & FITNES'
            : 'LAUNDRY',
      }))
    }
        
    onMounted(() => {
      FetchAPISetUp('setupDepartPrepare', {
        'max-dept': '',
      });
      FetchCommon('loadHotelDepartment', {
        'max-dept': '',
      });
    });

    const add = () => {
      state.dialogOutline.dialog = true;
       for (let i = 0; i<state.options.length; i++) {
        if (0 == state.options[i]['value']) {
          state.dialogOutline.dataSelected = state.options[i];
          break;
        }
      }state.type = 0;
    };

    const onClickEdit = (row) => {
      state.type = 1;

      for (let i = 0; i<state.options.length; i++) {
        if (row.nr == state.options[i]['value']) {
          state.dialogOutline.dataSelected = state.options[i];
          break;
        }
      }

      state.dialogOutline.num = row.nr;
      state.dialogOutline.depart = row.bezeich;

      state.dialogOutline.dialog = true;

    };
    const onRowClick = (datarow) => {
      for(const i of state.data){
        i.selected = false
      }
      datarow['selected'] = true;
    }

    return {
      ...toRefs(state),
      tableHeaders,
      add,
      onClickEdit,
      onRowClick,
      logout: store.dispatch.auth.doLogout,
    };
  },
  components: {
    // DialogOutline: () => import('./components/DialogOutline.vue'),
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