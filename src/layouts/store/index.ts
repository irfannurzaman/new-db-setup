import { defineModule, defineMutations, defineGetters } from 'direct-vuex';
import { LayoutState } from '../models/storeModel';

const state: LayoutState = {
  step: 0,
  room: 1,
  profile: 1,
  reservation: 1,
  restaurant: 1,
  validasi: 1
};

const mutations = defineMutations<LayoutState>()({
  SET_STEP(state, step) {
    state.step = step;
  },
  SET_ROOM(state, room) {
    state.room = room;
  },
  SET_PROFILE(state, profile) {
    state.profile = profile;
  },
  SET_RESERVATION(state, reservation) {
    state.reservation = reservation;
  },

  SET_RESTAURANT(state, restaurant) {
    state.restaurant = restaurant;
  },

  SET_VALIDASI(state, validasi) {
    state.validasi = validasi;
  },
});

const getters = defineGetters<LayoutState>()({
  step: (state) => (state.step),
  room: (state) => (state.room),
  profile: (state) => (state.profile),
  reservation: (state) => (state.reservation),
  restaurant: (state) => (state.restaurant),
  validasi: (state) => (state.validasi),
});

const layoutModule = defineModule({
  namespaced: true,
  state,
  mutations,
  getters,
});

export default layoutModule;
