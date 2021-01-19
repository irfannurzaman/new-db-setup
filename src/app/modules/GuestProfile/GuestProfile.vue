<template>
    <div>
        <TabeOne v-if="profile == 1"/>
        <TabeTwo v-if="profile== 2"/>        
        <TabeThree v-if="profile== 3"/>
        <TableFour @data="onData" v-if="profile== 4"/> 
        <TableFive v-if="profile== 5"/> 
        <q-btn 
            unelevated 
            size="sm" 
            v-close-popup 
            color="primary" 
            outline label="Back"
            style="marginRight: 20px; width: 90px" 
            @click="onClickProfile('back')"
            />

          <q-btn 
            @click="onClickProfile"
            unelevated 
            size="sm" 
            color="primary"  
            label="Next" 
            style="width: 90px"
            />
    </div>
</template>
<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeaders} from './table/guestprofile.table'
export default defineComponent({
    props: {
      profile : {} as any
    },
    setup(props, {emit, root: {$api}}){
        const state = reactive({
            hide_bottom: true,
            data: [],
        })

        const FetchData = async (api, body?) => {
          console.log('sukses1', body);
          const GET_DATA = await $api.fetchAPI.FetchAPISS(api, body)
          console.log('sukses', GET_DATA);
          
        }
        const onClickProfile = (e) => {    
          console.log('sukses',  state.data);
                
          if (e !== 'back') {   
            if (props.profile < 6 ) {
              if (props.profile == 4) {
                FetchData('writeSegment', {
                  caseType: 3,
                  tSegment: {
                    't-segment': state.data
                  }
                })
              }
              emit('addProfile', e)
              if (props.profile == 5) {
                emit('onClickProfile', e)
              }
            }
          } else {
            console.log('sukses', state.data);
            
            if (props.profile > 0) {
              emit('addProfile', e)
              if (props.profile == 1) {
                emit('onClickProfile', e)
              }
            }
          }
        }
        const onData = (data) => {
          state.data = data
        }
        return {
            ...toRefs(state),
            tableHeaders,
            onClickProfile,
            onData
        }
    },
    components: {
      DialogOutline:() => import('./components/DialogGuestProfile.vue'),
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