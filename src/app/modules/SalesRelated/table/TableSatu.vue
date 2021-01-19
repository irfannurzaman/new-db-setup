<template>
        <div style="height: 450px" class="row">
            <div class="col-8">
                <STable
                  :loading="isFetching"
                  :columns="tableHeaders"
                  :data="data"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :hide-bottom="hide_bottom"
                  class="table-accounting-date"
                  flat bordered
                  style="width: 423px; height: 400px"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props" @click="onRowClick(props.row)" 
                      :class="{
                        selected : props.row.selected
                      }">
                       <q-td 
                       key="paramnr" 
                       :props="props" 
                       >
                        {{props.row.paramnr}} 
                       </q-td>
                       <q-td 
                       key="bezeichnung" 
                       :props="props" 
                       >
                        {{props.row.bezeichnung}} 
                        <q-popup-edit v-model="props.row.bezeichnung">
                          <q-input v-model="props.row.bezeichnung" dense autofocus counter />
                        </q-popup-edit>
                       </q-td>
                       <q-td 
                       key="fdecimal" 
                       :props="props" 
                       >
                        {{props.row.fdecimal}} 
                        <q-popup-edit v-model="props.row.fdecimal">
                          <q-input v-model="props.row.fdecimal" dense autofocus counter />
                        </q-popup-edit>
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
                            <div class="q-my-md q-mr-md text-weight-bold" style="fontSize: 18px">Sales Transaction Related Setup - Tax and Service</div>
                            <div class="q-mr-md">
                                <p>Here you will setup Goverment Tax/VAT and service charge value for your hotel.</p> 
                                <p>These values are needed during Sales article setup.</p>
                            </div>
                        </div>
                    </div>                   
                </q-card>
            </div>
        </div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
} from '@vue/composition-api';
import { tableHeaders } from './salesrelated.table';
export default defineComponent({
  setup(_, { emit, root: { $api } }) {
    const state = reactive({
      data: [],
      hide_bottom: true,
      dialogOutline: {
        dialog: false,
        number: '',
      },
    });
    
    const fetchCommon = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchCommon(api, body);
      const tempdata = GET_DATA['tHtparam']['t-htparam'];
      for(const i of tempdata){
        i['selected'] = false
      }
      state.data = tempdata;
    }
    
        onMounted(() => {
          fetchCommon('readHtparam',{
            caseType: 5,
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

        const onClickProfile = (e) => {
          emit('onClickProfile', e)
        }
        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
        }

        const onRowClickValue = (row) => {
            console.log('sukses', row);
            
        }


        return {
            ...toRefs(state),
            tableHeaders,
            add,
            onClickEdit,
            onClickProfile,
            onRowClick,
            onRowClickValue
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


</style>