<template>
        <div class="row justify-between">
            <div class="col-3">
                <SSelect label-text="Outlet"/>
                <div class="row">
                    <div class="col-6">
                        <SSelect label-text="Transaction Type"/>
                    </div>
                    <div class="col">
                        <SSelect label-text="Subgroup"/>
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
                    </q-tr>
                </template>
                </STable>
            </div>

            <div class="col-3">
                <SSelect label-text="Description"/>
                <div class="row">
                    <div class="col-6">
                        <SInput label-text="Argroup"/>
                    </div>
                    <div class="col-6">
                        <SInput label-text="Unit Price"/>
                    </div>
                </div>
                <SSelect label-text="Service Charge"/>
                <div class="row">
                    <div class="col-6">
                        <SSelect label-text="Goverment Tax"/>
                    </div>
                    <div class="col-6">
                        <SSelect label-text="Other Tax"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <SSelect label-text="Account Number"/>
                    </div>
                    <div class="col-6">
                        <SSelect label-text="Stock Number"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <SSelect label-text="Stock Article Number"/>
                    </div>
                    <div class="col-6">
                        <SSelect label-text="Recipe Number"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <SSelect label-text="FB - Cost"/>
                    </div>
                    <div class="col-6">
                        <SSelect label-text="Cost Account Number"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <q-checkbox size="xs" v-model="article" label="Article Active" />
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

            <div class="col-1">
                <q-card flat class="button_crud">
                    <q-icon class="text-white cursor-pointer q-ma-md mdi mdi-file-plus mdi-24px"></q-icon>
                    <q-icon class="text-white cursor-pointer q-ma-md mdi mdi-pencil mdi-24px"></q-icon>
                    <q-icon class="text-white cursor-pointer q-ma-md mdi mdi-delete mdi-24px"></q-icon>
                </q-card>
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
import {tableHeadersTiga} from './salesrelated.table'
export default defineComponent({
    setup(_, {emit}){
        const state = reactive({
            data: [],
            hide_bottom: true,
            dialogOutline: {
                dialog: false,
                number: '',
            },
            article: true
        })
        onMounted(() => {
            for (let i = 1; i <= 20; i++) {
                state.data.push({
                    desc: 'Additional Room' + i,
                    price: '00.0' + i,
                    selected: false
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

        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
        }


        const onClickProfile = (e) => {
          emit('onClickProfile', e)
        }
        return {
            ...toRefs(state),
            tableHeadersTiga,
            add,
            onClickEdit,
            onClickProfile,
            onRowClick
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