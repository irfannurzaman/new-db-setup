<template>
  <q-dialog v-model="dialogOutline.dialog" persistent>
    <q-card style="width: 500px;">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium">
          New Bed Type
        </q-toolbar-title>
      </q-toolbar>


      <q-card-section class="q-pt-none">
        <div class="row" style="padding: 20px;">
          <div class="col-6">
            <SInput label-text="Room Category" v-model="dialogOutline.des" />
          </div>
          <div class="col-6">
            <SInput
              label-text="Room Category Code"
              v-model="dialogOutline.init"
            />
          </div>
        </div>
        <SSelect multiple label-text="Room Types" style="padding: 20px;" />
      </q-card-section>
      
      <q-separator />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          unelevated
          size="sm"
          v-close-popup
          color="primary"
          outline
          label="Cancel"
        />
        <q-btn
          unelevated
          size="sm"
          color="primary"
          label="OK"
          @click="onSave"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
} from '@vue/composition-api';
export default defineComponent({
  props: {
    dialogOutline: {} as any,
  },
})
</script>
<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

</style>
