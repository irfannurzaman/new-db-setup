<template>
  <q-dialog v-model="dialogOutline.dialog" persistent>
    <q-card style="width: 300px;">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium">
          Outlet
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="q-pt-none">
        <div style="padding: 20px;">
          <SSelect
            label-text="Outlet Type"
            :options="options"
            v-model="dialogOutline.dataSelected"
          />
          <SInput label-text="Outlet Name" v-model="dialogOutline.depart" />
            </div>
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
          label="Save"
          @click="onSave"
        />
        </q-card-actions>

      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted, computed, watch } from '@vue/composition-api'
import { Notify } from 'quasar'
export default defineComponent({
  props: {
    dialogOutline: {} as any,
    options: {} as any,
  },


})

</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

</style>
