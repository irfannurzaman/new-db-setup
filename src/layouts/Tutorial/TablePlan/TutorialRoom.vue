<template>
    <div class="row">
        <div style="marginRight: 20px; alignSelf: flex-end">
            <q-btn flat round class="q-mr-lg">
              <img :src="play" height="40" />
            </q-btn>
        </div>
        <div style="marginRight: 20px; alignSelf: flex-end"> 
            <q-btn 
             @click="onBack"
              unelevated
              size="sm" 
              outline 
              style="height: 25px; width: 100px" 
              color="primary" 
              label="Back" />
        </div>
        <div style="width: 80%">
            <div class="row" style="margin: 10px; justifyContent: center;">
                <div style="marginTop: 15px">
                    <q-btn @click="addData" flat round class="q-mr-lg">
                      <img :src="add" height="25" />
                    </q-btn>
                    <q-btn flat round style="marginRight: 100px">
                      <img :src="deleteIcon" height="25" />
                    </q-btn>
                </div>
                <SSelect label-text="Outlet" style="width: 160px; marginRight: 10px;"/>
                <q-btn unelevated size="sm" color="primary" style="height: 25px; width: 33px; marginTop: 25px; marginRight: 10px">
                    <span class="mdi mdi-magnify"></span>
                </q-btn>
                <SFile label-text="Picture Name" style="marginRight: 10px; width: 130px" v-model="file">
                    <span class="mdi mdi-attachment mdi-rotate-315 mdi-18px"></span>
                </SFile>
                <q-btn
                  @click="uploadFile"
                  unelevated
                  color="primary"
                  size="sm"
                  type="file"
                  label="Upload"
                  style="height: 25px; marginTop: 25px; marginRight: 100px"
                />
                <q-btn 
                  unelevated
                  size="sm" 
                  outline 
                  style="height: 25px; marginTop: 25px; marginRight: 10px" 
                  color="primary" 
                  label="Cancel" />
                <q-btn
                  unelevated
                  color="primary"
                  size="sm"
                  label="Save Floor Plan"
                  style="height: 25px; marginTop: 25px;"
                />
            </div>
            <div class="grid" :style="bg">
              <VueDragResize 
              v-for="i in pageList"
              :key="i"
              :isResizable="false"
              :w="35" :h="35" :x="i.x" :y="i.y"
              :parentLimitation="true"
              v-on:resizing="resize" v-on:dragging="resize"
              >
                <div class="grid2">
                  <div>150</div>
                  <q-separator/>
                  <div></div>
                </div>
              </VueDragResize>
            </div>
        </div>
        <DialogFoorPlan :dialogFoorPlan="dialogFoorPlan"/>
    </div>
</template>


<script lang="ts">
import {defineComponent, toRefs, reactive } from '@vue/composition-api'
import VueDragResize from 'vue-drag-resize'
import {pageList} from './pageList'
import {store} from '~/store'
import { Notify } from 'quasar'
export default defineComponent({
    setup(_,{root}){
        const state = reactive({
          items: [],
          width: 0,
          height: 0,
          top: 120,
          left: 30,
          file: '',
          add: require('~/app/icons/Icon-Add.svg'),
          deleteIcon: require('~/app/icons/Icon-Delete.svg'),
          play: require('~/app/icons/Icon-Play2.svg'),
          res: require('~/app/icons/Icon-Resturant.svg'),
          bg: {
            backgroundColor: '#C4C4C4'
          },
          dialogFoorPlan: {
            dialog: false
          }
        })

        const NotifyCreate = (message) => Notify.create({
          message: message,
          color: 'red',
          position: 'top',
          textColor: 'white',
          timeout: 2000,
        });


        const resize =(newRect) => {
          state.width = newRect.width;
          state.height = newRect.height;
          state.top = newRect.top;
          state.left = newRect.left;
        }

        const onBack = () => {
         store.commit.layout.SET_STEP(7)
          store.commit.layout.SET_VALIDASI(7)
          store.commit.layout.SET_RESTAURANT(2)
          root.$router.push('/')
        }

        const uploadFile = () => {
          if (state.file !== '') {
            state.bg.backgroundColor = '#2acafa'
            state.file = ''
          } else {
            NotifyCreate('File Not Found')
          }
        }

        const addData = () => {
          state.dialogFoorPlan.dialog = true
        }

        return {
          ...toRefs(state),
          pageList,
          resize,
          onBack,
          uploadFile,
          addData
        }
    },
    components: {
        VueDragResize,
        DialogFoorPlan: () => import('./DialogFloorPlan.vue')
    },
})
</script>

<style lang="scss" scoped>
  .grid {
    height: 500px;
    // background-color: #caccca;
    position: relative;
  }
  .grid2{
    background-color: rgb(255, 255, 255);
    width: 35px; 
    height: 35px;
    text-align: center;
    font-size: 12px;
    font-weight: bold
  }
</style>