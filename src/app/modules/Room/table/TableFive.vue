<template>
  <div style="height: 450px" class="row">
      <div class="col-8">
          <div class="row">
              <div style="marginRight: 20px">
                <div class="q-mb-md">
                    <SSelect 
                      label-text="Room Type (s)" 
                      v-model="roomType" 
                      @input="onClickRoomType"
                      :options="options"/>
                </div>
                <STable
                  :loading="isFetching"
                  :columns="tableHeadersFive"
                  :data="data"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :hide-bottom="hide_bottom"
                  class="table-accounting-date"
                  flat bordered
                  style="width: 350px"
                />
              </div>
              <div style="marginTop: 10px">
                <div class="q-mb-md">
                    <q-btn flat round>
                      <img @click="dialogModel = true" :src="require('~/app/icons/Icon-Add.svg')" height="25" />
                    </q-btn>
                </div>
                <STable
                  :loading="isFetching"
                  :columns="tableHeadersFive1"
                  :data="data"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :hide-bottom="hide_bottom"
                  class="table-accounting-date"
                  flat bordered
                  style="width: 470px"
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
                <template #body-cell-actions="props">
                  <q-td :props="props" class="fixed-col right">
                    <q-icon name="mdi-dots-vertical" size="16px">
                      <q-menu :props="props" auto-close anchor="bottom right" self="top right">
                        <q-list :props="props">
                          <q-item :props="props" @click="onClickEdit(props.row)" clickable v-ripple>
                            <q-item-section>edit</q-item-section>
                          </q-item>
                          <q-item @click="deleteDataRow(props.row)" clickable v-ripple>
                            <q-item-section>delete</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-icon>
                  </q-td>
                </template>
                </STable>
              </div>
          </div>
      </div>
      <div class="col-4">
        <q-card 
            style="
                width: 300px; 
                height: 450px; 
                marginLeft: 100px; 
                borderRadius: 10px" 
            flat bordered 
            class="my-card bg-primary text-white">
            <div class="row" style="paddingTop: 10px; alignItems: center; paddingLeft: 10px;">
                <span style="marginRight: 10px" class="mdi mdi-information mdi-48px"></span>
                <div style="fontSize: 17px; fontWeight: 500">Outlet Setup</div>
            </div>
            <div style="paddingLeft: 70px; marginTop: -10px">
                <div style="marginRight: 10px">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum iste modi mollitia quis quam a! Optio est aut numquam ullam omnis, ratione nesciunt iure. Repudiandae, aspernatur. Ullam optio sint ipsa!
                </div>
            </div>
        </q-card>
      </div>
      <DialogRoomFive :dialogModel="dialogModel"/>
  </div>
</template>


<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
import {tableHeadersFive1, tableHeadersFive} from './room.table'
import {roomType, selectionAdd, roomView} from '../utils/GuestRoom'
export default defineComponent({
    setup(_, {emit, root: { $api }}){
        const state = reactive({
            data: [],
            hide_bottom: false,
            roomType: '',
            options: [],
            dialogModel: false,
            dialogOutline: {
                dialog: false,
                des: '',
                init: ''
            }
        })

    const fetchAPISetUp = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchAPISetUp(api, body);
      switch (api) {
        case 'setupRoomPrepare':
          state.options = roomType(GET_DATA)
          selectionAdd[8].options = roomView(GET_DATA)
          break;
      
        default:
          console.log('sukses', GET_DATA);
          
          break;
      }
      // state.data = tempdata;
    }
    
        onMounted(() => {
          fetchAPISetUp('setupRoomPrepare');
        });
    
        const onClickRoom = (e) => {
          emit('onClickRoom', e)
        }

        const onClickRoomType = (data) => {
          console.log('sukses', data);
          fetchAPISetUp('setupRoom',{
             "rmtype" : 11
          })
        }

        const onClickEdit = (row) => {
            state.dialogOutline.dialog = true
            state.dialogOutline.des = row.des
            state.dialogOutline.init = row.initial
        }
        return {
            ...toRefs(state),
            tableHeadersFive1,
            tableHeadersFive,
            onClickEdit,
            onClickRoom,
            onClickRoomType
        }
    },

    components: {
      DialogRoomFive: () => import('../components/DialogRoomFive.vue')
    }
})
</script>