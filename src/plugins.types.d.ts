
import { AuthEndpoints } from '~/api/repositories/auth.api';
import {FetchEndpoint} from '~/api/repositories/fetch.api'

export interface ApiEndpoints {
  auth: AuthEndpoints;
  fetchAPI: FetchEndpoint
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiEndpoints;
  }
}