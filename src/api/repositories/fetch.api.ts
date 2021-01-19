import { DoRequest } from '../config/repository';
const INV_URL = 'vhpSetup';
const Common = 'Common'
const VHP_AR = 'vhpAR'
const VHP_SetUp = 'vhpSetup'
const VHP_SS = 'vhpSS'

export interface FetchEndpoint {
    FetchAPI: any,
    FetchCommon: any,
    FetchAPIAR: any
    FetchAPISetUp: any
    FetchAPISS: any
}

export default (doFetch: DoRequest): FetchEndpoint => ({
  FetchAPI: (api, body) =>
    doFetch({ url: `${INV_URL}/${api}`, body }).then(([, res]) => res),
  FetchCommon: (api, body) =>
    doFetch({ url: `${Common}/${api}`, body }).then(([, res]) => res),
  FetchAPIAR: (api, body) =>
    doFetch({ url: `${VHP_AR}/${api}`, body }).then(([, res]) => res),
  FetchAPISetUp: (api, body) =>
    doFetch({ url: `${VHP_SetUp}/${api}`, body }).then(([, res]) => res),
  FetchAPISS: (api, body) =>
    doFetch({ url: `${VHP_SS}/${api}`, body }).then(([, res]) => res),
})
