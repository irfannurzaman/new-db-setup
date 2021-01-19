import { TableHeader } from '~/components/VhpUI/typings';
export const tableHeaders: TableHeader[] = [
    {
        label: 'Number',
        field: 'paramnr',
        name: 'paramnr',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Description',
        field: 'bezeichnung',
        name: 'bezeichnung',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Value',
        field: 'fdecimal',
        name: 'fdecimal',
        align: 'left',
        sortable: false,
    }
]
export const tableHeadersDua: TableHeader[] = [
    {
        label: 'Code',
        field: 'wabkurz',
        name: 'wabkurz',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Description',
        field: 'bezeich',
        name: 'bezeich',
        align: 'left',
        sortable: false,
    },
    // {
    //     label: 'Rate',
    //     field: 'rate',
    //     name: 'rate',
    //     align: 'left',
    //     sortable: false,
    // },
    { name: 'actions', field: 'actions' },
]
export const tableHeadersTiga: TableHeader[] = [
    {
        label: 'Description',
        field: 'desc',
        name: 'desc',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Unit Price',
        field: 'price',
        name: 'price',
        align: 'right',
        sortable: false,
    }
]