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
          :columns="tableHeadersDua"
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
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item @click="deleteDataRow(props.row)" clickable v-ripple>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-icon>
              </q-td>
              </q-tr>
          </template>
        </STable>
    </div> 
    <DialogGuestDocumentType :dialogOutline="dialogOutline" @onSave="onSave"/>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div style="color: red "><span class="mdi mdi-delete mdi-36px"></span></div>
          <span class="q-ml-sm">Delete the selected Request Text: <br/>  {{textDelete.char1}}?</span>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn unelevated outline size="sm" label="Cancel" color="primary" v-close-popup />
          <q-btn unelevated size="sm" label="Oke" color="primary" @click="onDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeadersDua} from './table/guestprofile.table'
import {GET_TABLE} from './utils/table2'
import {InputParameter, NotifyCreate} from './utils/global'
export default defineComponent({
    setup(_, {emit, root: {$api, $router}}){
        const state = reactive({
            isFetching: false,
            data: [],
            key: 'addData',
            number: 0,
            textDelete: '' as any,
            confirm: false,
            hide_bottom: false,
            dialogOutline: {
                dialog: false,
                documents: '',
                keyEdit: ''
            }
        })

        const FetchData = async (api, body?) => {
          const GET_DATA = await $api.fetchAPI.FetchCommon(api, body) 
          switch (api) {
            case 'createQueasy':
              setTimeout(() => {
                state.isFetching = false
                NotifyCreate('Sukses', 'green', 'positive')
                onRefres()
              }, 1000)
              break;
          
            default:
              state.data = GET_TABLE(GET_DATA)
              if (state.data.length !== 0) {
                state.hide_bottom = true
              }
              break;
          }     
        }

        onMounted(() => {
          FetchData('readQueasy', {
            "caseType": 3,
		        "intkey": 27,
		        "inpInt1": "?",
		        "inpchar1": "?"
          })
        })

        const onRefres = () => {
          FetchData('readQueasy', {
            "caseType": 3,
		        "intkey": 27,
		        "inpInt1": "?",
		        "inpchar1": "?"
          })
        }

        const onRowClick = (datarow) => {
          for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
        }


        const add = () => {
            state.dialogOutline.dialog = true
            state.dialogOutline.documents = ''
            state.key = 'addData'
        }

        const onClickEdit = (row) => {
          state.dialogOutline.dialog = true
          state.dialogOutline.documents = row.char1
          state.number = row.number1
          state.key = 'editData'
          state.dialogOutline.keyEdit = row.char1
        }

        const deleteDataRow = (row) => {
          state.confirm = true
          state.textDelete = row
        }

        const onSave = () => {
          const {dialogOutline, data, key, number} = state
          let dataTable = []
          for(const items of data){
            dataTable.push(items['char1'].toLowerCase())
          }
          if (dialogOutline.documents !== '') {
            if (key == 'addData') {              
              if (!dataTable.includes(dialogOutline.documents.toLowerCase())) {              
                const {tQueasy, tQueasy1} = InputParameter(
                  dialogOutline.documents,
                  data[data.length - 1]['number1'] + 1,
                  27
                )
                state.isFetching = true
                FetchData('createQueasy', {
                  "caseType": "3",
                  "tQueasy": {
                    "t-queasy": tQueasy
                  },
                  "tQueasy1": {
                    "t-queasy1": tQueasy1
                  }
                })
                state.dialogOutline.dialog = false
              } else {
                NotifyCreate('Description already exists', 'red')
              }
            } else {
              const {tQueasy, tQueasy1} = InputParameter(
                dialogOutline.documents,
                number,
                27
              )
              const xi = dataTable.filter(items => {
               const title = dialogOutline.keyEdit.toLowerCase()
               return ![title].includes(items)
              })
              if (!xi.includes(dialogOutline.documents.toLowerCase())){  
                state.isFetching = true
                FetchData('createQueasy', {
                  "caseType": "2",
                  "tQueasy": {
                    "t-queasy": tQueasy
                  },
                  "tQueasy1": {
                    "t-queasy1": tQueasy1
                  }
                })
                state.dialogOutline.dialog = false
              } else {
                NotifyCreate('Description already exists', 'red')
              }
            }
          }
        }

        const onDelete = () => {
          const {textDelete} = state
          state.isFetching = true
          const {tQueasy, tQueasy1} = InputParameter(
            textDelete.char1,
            textDelete.number1,
            27
          )
          FetchData('createQueasy', {
            "caseType": "12",
            "tQueasy": {
              "t-queasy": tQueasy
            },
            "tQueasy1": {
              "t-queasy1": tQueasy1
            }
          })
          state.confirm = false
        }

        return {
            ...toRefs(state),
            tableHeadersDua,
            add,
            onClickEdit,
            deleteDataRow,
            onRowClick,
            onSave,
            onDelete
        }
    },
   components: {
      DialogGuestDocumentType:() => import('./components/DialogGuestDocumentType.vue'),
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
