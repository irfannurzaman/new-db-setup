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
            />
        </q-card-section>

        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn unelevated size="sm" v-close-popup color="primary" outline label="Cancel" />
          <q-btn unelevated size="sm" color="primary"  label="OK" />
        </q-card-actions>

      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeaders} from './Colums'
export default defineComponent({
    props: {
        dialogFoorPlan: {} as any
    },

    setup(){
        const state = reactive({
            showall: false,
            isFetching: false,
            data: [],
            hide_bottom: true
        })


        onMounted(() => {
          for (let i = 1; i < 10; i++) {
            state.data.push({
                number: i,
                des: 'Nama ' + i
            })
            
          }
        })

        return {
            ...toRefs(state),
            tableHeaders
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
