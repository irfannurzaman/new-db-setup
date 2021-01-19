<template>
    <div>
        <TableOne v-if="restaurant == 1"/>
        <TableTwo v-if="restaurant== 2"/>        
        <TableThree v-if="restaurant== 3"/>
        <TableFour v-if="restaurant== 4"/> 
        <TableFive v-if="restaurant== 5"/> 
        <TableSix v-if="restaurant== 6"/> 
        <TableSeven v-if="restaurant== 7"/> 
        <q-btn 
            unelevated 
            size="sm" 
            v-close-popup 
            color="primary" 
            outline label="Back"
            style="marginRight: 20px; width: 90px" 
            @click="onClikcRestaurant('back')"
            />

          <q-btn 
            @click="onClikcRestaurant"
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
import { stat } from 'fs'
import {tableHeaders} from './table/restaurants.table'
export default defineComponent({
    props: {
      restaurant : {} as any
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

        const onClikcRestaurant = (e) => {
          
         if (e !== 'back') {            
            if (props.restaurant < 8 ) {
              emit('addRestaurant', e)
              if (props.restaurant == 7) {
                emit('onClikcRestaurant', e)
              }
            }
          } else {
            if (props.restaurant > 0) {
              emit('addRestaurant', e)
              if (props.restaurant == 1) {
                emit('onClikcRestaurant', e)
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
            onClikcRestaurant
        }
    },
    components: {
      // DialogOutline:() => import('./components/DialogRestaurant'),
      TableOne : () => import('./table/TableSatu.vue'),
      TableTwo : () => import('./table/TableDua.vue'),  
      TableThree : () => import('./table/TableTiga.vue'),
      TableFour : () => import('./table/TableEmpat.vue'),
      TableFive : () => import('./table/TableLima.vue'),
      TableSix : () => import('./table/TableEnam.vue'),
      TableSeven : () => import('./table/TableTujuh.vue'),
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