<template>
  <div>
    <div style="height: 450px;">
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
    <DialogOutline :dialogOutline="dialogOutline"/>
  </div>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeaders} from './table/reservation.table'
export default defineComponent({
    setup(_, {emit, root: { $api, $router} }){
        const state = reactive({
            data: [],
            hide_bottom: false,
            dialogOutline: {
                dialog: false,
                number: '',
            }
        })
        const fetchCommon = async (api, body?) => {
          const GET_DATA = await $api.fetchAPI.FetchCommon(api, body);
          const tempdata = GET_DATA['tQueasy']['t-queasy'];
          for(const i of tempdata){
            i['selected'] = false
        }
          state.data = tempdata;
          if (state.data.length !== 0) {
             state.hide_bottom = true 
          }
        }
    
        onMounted(() => {
          fetchCommon('readQueasy',{
            caseType: 3,
            intkey: 27,
            inpInt1: '?',
            inpchar1: '?',
          });
        });

        const add = () => {
            state.dialogOutline.dialog = true
        }


        const onClickEdit = (row) => {
            state.dialogOutline.dialog = true
            state.dialogOutline.number = row.number
        }

        const onClickReservation = (e) => {
          emit('onClickReservation', e)
        }

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
            onClickReservation,
            onRowClick,
        }
    },
   components: {
      DialogOutline:() => import('./components/DilaogReservation.vue'),
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