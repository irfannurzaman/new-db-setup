<template>
  <div>
    <div style="height: 450px">
      <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img @click="add" :src="icon_add" height="30" />
        </q-btn>
      </div>
    <STable
      :loading="isFetching"
      :columns="tableHeaderstwo"
      :data="data"
      :rows-per-page-options="[0]"
      :pagination.sync="pagination"
      :hide-bottom="hide_bottom"
      class="table-accounting-date"
      flat bordered
      style="width: 450px"
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
    <DialogOutline :dialogOutline="dialogOutline" />
    </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
} from '@vue/composition-api';
import { tableHeaderstwo } from './table/room.table';
export default defineComponent({
  setup(_, { emit, root: { $api, $router } }) {
    const state = reactive({
      data: [],
      icon_add: require('~/app/icons/Icon-Add.svg'),
      hide_bottom: false,
      dialogOutline: {
        dialog: false,
        des: '',
        init: '',
        l_bed: [],
        t_bed: [],
      },
      t_bed:[],
      l_bed:[],
      t_bezeich: [],
      t_code: [],
      bezeich: [],
      shortbez: [],
    });

    const fetchapi = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchCommon(api, body);
      state.data = mapSelect(GET_DATA);
      state.hide_bottom = true;
    };

    const fetchapiSS = async (api, body?) => {
      const GET_DATA_SS = await $api.fetchAPI.FetchAPISS(api, body);
      const count = GET_DATA_SS['tParamtext']['t-paramtext'].length;
      console.log(GET_DATA_SS['tParamtext']['t-paramtext'], 'no');
      for (let n_bedsetup = 0; n_bedsetup < count; n_bedsetup++) {
        state.t_bed[n_bedsetup] =
          GET_DATA_SS['tParamtext']['t-paramtext'][n_bedsetup]['notes'];
        console.log(state.t_bed);
        // state.l_bed[n_bedsetup] =
        //   GET_DATA_SS['tParamtext']['t-paramtext'][n_bedsetup]['ptexte'];
        // console.log(state.t_bed);
        console.log(state.l_bed);
      }
    }

    const mapSelect = (GET_DATA) => {
      const data = GET_DATA['tQueasy']['t-queasy']
      return data.map((items) => ({
        no: items.number1,
        number: items.char3,
        des: items.char1,
        initial: '',
        selected: false
      }))
    }

    const onRowClick = (datarow) => {
      for(const i of state.data){
        i.selected = false
      }
      datarow['selected'] = true;
    }

    onMounted(() => {
      fetchapi('readQueasy', {
        caseType: 3,
        intkey: 152,
        inpInt1: '?',
        inpchar1: '',
      });
      fetchapiSS('readParamtext1',{
        caseType: 2,
        int1: 9201,
        int2: '9206',
        int3: '?',
        char1: '',
      });
    });

    const add = () => {
      state.dialogOutline.dialog = true;
      state.dialogOutline.des = '';
      state.dialogOutline.init = '';
      state.dialogOutline.t_bed = state.t_bed;
      state.dialogOutline.l_bed = state.l_bed;
    };

    const onClickRoom = (e) => {
      emit('onClickRoom', e);
    };

    const onClickEdit = (row) => {
      state.dialogOutline.dialog = true;
      state.dialogOutline.des = row.number;
      state.dialogOutline.init = row.des;
    };
    return {
      ...toRefs(state),
      tableHeaderstwo,
      add,
      onClickEdit,
      onClickRoom,
      onRowClick
    };
  },
  components: {
    DialogOutline: () => import('./components/DialogRoomTwo.vue'),
  },
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