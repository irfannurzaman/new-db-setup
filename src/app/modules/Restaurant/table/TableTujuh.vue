<template>
  <div style="height: 450px;" class="row">
    <div class="col-8">
      <div class="row">
        <div class="col-5">
          <SSelect label-text="Outlet" :options="options"/>
          <SInput label-text="Foot Note 1" />
          <SInput label-text="Foot Note 2" />
          <SInput label-text="Foot Note 3" />
        </div>
      </div>
      <div class="row">
        <div class="col-6 q-mt-sm">
          <q-btn
            unelevated
            size="sm"
            color="primary"
            outline
            label="Cancel"
            class="q-mr-sm"
          />
          <q-btn unelevated size="sm" color="primary" label="Save" />
        </div>
      </div>

            <div class="col-1">
                <q-card flat class="button_crud">
                    <q-icon class="text-white cursor-pointer q-ma-md mdi mdi-file-plus mdi-24px"></q-icon>
                    <q-icon class="text-white cursor-pointer q-ma-md mdi mdi-pencil mdi-24px"></q-icon>
                    <q-icon class="text-white cursor-pointer q-ma-md mdi mdi-delete mdi-24px"></q-icon>
                </q-card>
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
                    <!-- <DialogOutline :dialogOutline="dialogOutline"/> -->
    </div>
</template>
<script lang="ts">
import {defineComponent,  toRefs, reactive, onMounted } from '@vue/composition-api'
export default defineComponent({
    setup(_, {emit, root: { $api }}){
        const state = reactive({
            options: [],
        })

        const FetchCommon = async (api, body?) => {
      const GET_DATA = await $api.fetchAPI.FetchCommon(api, body);
      const tempdata = mapSelect(GET_DATA);
      state.options = tempdata;
    };

    const mapSelect = (GET_DATA) => {
      const data = GET_DATA.tHoteldpt['t-hoteldpt'];
      return data.map(items => ({
        label: `${items.num} - ${items.depart}`,
        value: items.num,
      }))
    }

    onMounted(() => {
      FetchCommon('loadHotelDepartment');
    });

        const onClikcRestaurant = (e) => {
          emit('onClikcRestaurant', e)
        }
        return {
            ...toRefs(state),
            onClikcRestaurant,
        }
    },
})
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 35vh;

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