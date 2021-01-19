<template>
  <div>
    <TabeOne v-if="reservation == 1"/>
    <TabeTwo v-if="reservation== 2"/>        
    <TabeThree v-if="reservation== 3"/>
    <TableFour v-if="reservation== 4"/> 
    <TableFive v-if="reservation== 5"/> 
    <q-btn 
      unelevated 
      size="sm" 
      v-close-popup 
      color="primary" 
      outline label="Back"
      style="marginRight: 20px; width: 90px" 
      @click="onClickReservation('back')"
      />
    <q-btn 
      @click="onClickReservation"
      unelevated 
      size="sm" 
      color="primary"  
      label="Next" 
      style="width: 90px"
      />
  </div>
</template>
<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted, watch } from '@vue/composition-api'
import {tableHeaders} from './table/reservation.table'
export default defineComponent({
    props: {
      reservation : {} as any
    },
    setup(props, {emit}){
        const state = reactive({
            hide_bottom: true,
            dialogOutline: {
                dialog: false,
                number: '',
            }
        })

        const add = () => {
            state.dialogOutline.dialog = true
        }

        const onClickReservation = (e) => {
          
         if (e !== 'back') {            
            if (props.reservation < 6 ) {
              emit('addReservation', e)
              if (props.reservation == 5) {
                emit('onClickReservation', e)
              }
            }
          } else {
            if (props.reservation > 0) {
              emit('addReservation', e)
              if (props.reservation == 1) {
                emit('onClickReservation', e)
              }
            }
          }
        }

        const onClickEdit = (row) => {
            state.dialogOutline.dialog = true
            state.dialogOutline.number = row.number
        }
        return {
            ...toRefs(state),
            tableHeaders,
            add,
            onClickEdit,
            onClickReservation
        }
    },
    components: {
      DialogOutline:() => import('./components/DilaogReservation.vue'),
      TabeOne : () => import('./table/TableSatu.vue'),
      TabeTwo : () => import('./table/TableDua.vue'),  
      TabeThree : () => import('./table/TableTiga.vue'),
      TableFour : () => import('./table/TableEmpat.vue'), 
      TableFive : () => import('./table/TableLima.vue'),
      }
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


</style>