<template>
  <div>
    <TabeOne v-if="room == 1"/>
    <TabeTwo v-if="room== 2"/>
    <TabeThree v-if="room== 3"/>
    <TableFour v-if="room== 4"/>
    <TableFive v-if="room== 5"/>
    <TableSix v-if="room== 6"/>
    <div class="row">
      <q-btn 
        unelevated 
        size="sm" 
        v-close-popup 
        color="primary" 
        outline label="Back"
        style="marginRight: 16px; width: 90px" 
        @click="onClickRoom('back')"
      />
      <q-btn 
        @click="onClickRoom"
        unelevated 
        size="sm" 
        color="primary"  
        label="Next" 
        style="width: 90px"
      />
    </div>
    <DialogOutline :dialogOutline="dialogOutline"/>
  </div>
</template>
<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeaders} from './table/room.table'
export default defineComponent({
    props: {
      room : {} as any
    },
    setup(props, {emit}){
        const state = reactive({
            hide_bottom: true,
            dialogOutline: {
              dialog: false,
              des: '',
              init: ''
            }
        })

        const add = () => {
            state.dialogOutline.dialog = true
        }

        const onClickRoom = (e) => {
           if (e !== 'back') {            
            if (props.room < 7 ) {
              emit('addRoom', e)
              if (props.room == 6) {
                emit('onClickRoom', e)
              }
            }
          } else {
            if (props.room > 0) {
              emit('addRoom', e)
              if (props.room == 1) {
                emit('onClickRoom', e)
              }
            }
          }
        }

        const onClickEdit = (row) => {
            state.dialogOutline.dialog = true
            state.dialogOutline.des = row.des
            state.dialogOutline.init = row.initial
        }
        return {
            ...toRefs(state),
            tableHeaders,
            add,
            onClickEdit,
            onClickRoom
        }
    },
    components: {
      DialogOutline:() => import('./components/DialogRoom.vue'),
      TabeOne : () => import('./table/Tableone.vue'),
      TabeTwo : () => import('./table/TableTwo.vue'),
      TabeThree : () => import('./table/TableThree.vue'),
      TableFour : () => import('./table/TableFour.vue'),
      TableFive : () => import('./table/TableFive.vue'),
      TableSix : () => import('./table/TableSix.vue'),
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