<template>
    <div>
        <TabeOne v-if="sales == 1"/>
        <TabeTwo v-if="sales== 2"/>        
        <TabeThree v-if="sales== 3"/>
        
        <div class="row">
            <q-btn 
            unelevated 
            size="sm" 
            v-close-popup 
            color="primary" 
            outline label="Back"
            style="marginRight: 8px; width: 90px" 
            @click="onClickSales('back')"
            />

            <q-btn 
            @click="onClickSales"
            unelevated 
            size="sm" 
            color="primary"  
            label="Next" 
            style="width: 90px"
            />
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeaders} from './table/salesrelated.table'
export default defineComponent({
    props: {
      sales : {} as any
    },
    setup(props,{emit}){
        const state = reactive({
            data: [],
            hide_bottom: true,
             dialogOutline: {
                dialog: false,
                number: '',
            }
        })


        onMounted(() => {
            for (let i = 1; i <= 20; i++) {
                state.data.push({
                    number: i,
                    des: 'I Phoneyyyhhhhh' + i,
                    initial: 'xsssssssss' + i
                })
                
            }
        })

        const onClickSales = (e) => {
            // emit('onClickSales', e)
            console.log(e ,'ok');
            // console.log(props.sales,'ok2');            
            // console.log('props', props.sales);
            
            if (e !== 'back') {
                console.log('props', props.sales);
                
                if(props.sales < 4){
                    emit('addSales', e)
                    if(props.sales == 3) {
                        // alert("Step 5")
                        emit('onClickSales', e) // next page reservation                        
                    }
                }
            } else {
                // alert('Back')
                if (props.sales > 0){
                    emit('addSales', e)
                    if(props.sales == 1){
                        emit('onClickSales', e)
                    }
                }
            }
        }

        return {
            ...toRefs(state),
            tableHeaders,
            onClickSales
        }
    },
    components: {
      DialogOutline:() => import('./components/DialogSalesRelated.vue'),
      TabeOne : () => import('./table/TableSatu.vue'),
      TabeTwo : () => import('./table/TableDua.vue'),  
      TabeThree : () => import('./table/TableTiga.vue'),  
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