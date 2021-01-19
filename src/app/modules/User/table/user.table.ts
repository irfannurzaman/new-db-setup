import { TableHeader } from '~/components/VhpUI/typings';
export const tableHeaders: TableHeader[] = [
    {
        label: 'User ID',
        field: 'userinit',
        name: 'userinit',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Username',
        field: 'username',
        name: 'username',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Active',
        field: 'flag',
        name: 'flag',
        align: 'left',
        sortable: false,
    },
    { name: 'actions', field: 'actions' },
]
export const tableHeaders1: TableHeader[] = [
    {
        label: 'Function',
        field: 'number',
        name: 'number',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Selected',
        field: 'des',
        name: 'des',
        align: 'left',
        sortable: false,
    },
]