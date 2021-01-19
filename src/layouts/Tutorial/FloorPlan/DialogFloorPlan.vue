<template>
    <q-dialog v-model="dialogFoorPlan.dialog" persistent>
      <q-card style="width: 600px; height: 400px">
        <q-toolbar>
             <q-toolbar-title 
              class="text-white text-weight-medium">
                Select a room
             </q-toolbar-title>
         </q-toolbar>

        <q-card-section class="q-pt-none" style="height: 290px">
            <div class="row justify-between" style="marginTop: 10px">
                <SInput 
                  label-text="Search Room"
                  v-model="dialogFoorPlan.des"
                 />
                <q-checkbox size="sm" v-model="showall" val="xs" label="Show All Room" /> 
            </div>
            <STable
            :loading="isFetching"
            :columns="tableHeaders"
            :data="data"
            :rows-per-page-options="[0]"
            :hide-bottom="hide_bottom"
            class="table-accounting-date"
            flat bordered
            >
              <template v-slot:body="props">
                <q-tr :props="props" @click="onRowClick(props.row)" 
                :class="{
                  selected : props.row.selected
                }">
                 <q-td 
                 :key="col.name" 
                 :props="props" 
                 v-for="col in props.cols.filter(i => ![
                 'actions'].includes(i.name))">
                    {{col.value}} 
                 </q-td>
                </q-tr>
            </template>
            </STable>
        </q-card-section>

        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn unelevated size="sm" v-close-popup color="primary" outline label="Cancel" />
          <q-btn unelevated size="sm" color="primary"  label="OK" @click="onSave" />
        </q-card-actions>

      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted, watch } from '@vue/composition-api'
import {tableHeaders} from './Colums'
export default defineComponent({
    props: {
        dialogFoorPlan: {} as any
    },

    setup(props, {emit}){
      let data
      const state = reactive({
          showall: false,
          isFetching: false,
          data: [],
          hide_bottom: true
      })

      watch(() => props.dialogFoorPlan.dialog,
      () => {
        data = undefined
        for(const i of state.data){
          i.selected = false
        }
      })

      onMounted(() => {
        for (let i = 1; i < 10; i++) {
          state.data.push({
              number: i,
              des: 'Nama ' + i,
              selected: false
          })
        }
      })

      const onRowClick = (datarow) => {
         for(const i of state.data){
            i.selected = false
          }
          datarow['selected'] = true;
          data = datarow
      }

      const onSave = () => {
        emit('onSave', data)
      }
      return {
          ...toRefs(state),
          tableHeaders,
          onRowClick,
          onSave
      }
    }
})
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

</style>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 30vh;

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
