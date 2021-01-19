<template>
        <div style="height: 450px" class="row">
            <div class="col-8">
                <STable
                  :loading="isFetching"
                  :columns="tableHeadersEmpat"
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
                       key="bezeich" 
                       :props="props" 
                       >
                        {{props.row.bezeich}} 
                        <q-popup-edit v-model="props.row.bezeich">
                          <q-input v-model="props.row.bezeich" dense autofocus counter />
                        </q-popup-edit>
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
import { tableHeadersEmpat } from './guestprofile.table';
export default defineComponent({
  setup(_, { emit, root: { $api } }) {
    const state = reactive({
      data: [],
      hide_bottom: false,
      dialogOutline: {
        dialog: false,
        number: '',
      },
    });

    const FetchCommon = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchCommon(api, body);
      state.data = GET_DATA['tSegment']['t-segment'];
      if (state.data.length == 0) {
        for (let index = 700; index <= 708; index++) {
          state.data.push({
            segmentcode: index - 610,
            betriebsnr: 3,
            segmentgrup: 0,
            bezeich: `VIP ${index - 700}`,
            bemerkung: '',
            'vip-level': 0,
          })
          emit('data', state.data)
        }
      }
      if (state.data.length !== 0) {
        state.hide_bottom = true;
      }
      
    };

    onMounted(() => {
      FetchCommon('readSegment', {
        caseType: 8,
        int2: '?',
        char1: '?',
      });
    });

    const add = () => {
      state.dialogOutline.dialog = true;
    };

    const onClickEdit = (row) => {
      state.dialogOutline.dialog = true;
      state.dialogOutline.number = row.number;
    };

    const onRowClick = (datarow) => {
      for(const i of state.data){
        i.selected = false
      }
      datarow['selected'] = true;
    }

    const onClickProfile = (e) => {
      emit('onClickProfile', e);
    };
    return {
      ...toRefs(state),
      tableHeadersEmpat,
      add,
      onClickEdit,
      onClickProfile,
      onRowClick
    };
  },
  components: {
    DialogOutline: () => import('../components/DialogGuestProfile.vue'),
  },
});
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 40vh;

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


</style>