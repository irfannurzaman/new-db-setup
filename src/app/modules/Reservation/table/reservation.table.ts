import { TableHeader } from '~/components/VhpUI/typings';
export const tableHeaders: TableHeader[] = [
    {
        label: 'Number',
        field: 'number1',
        name: 'number1',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Segment Code',
        field: 'char1',
        name: 'char1',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Segment Group',
        field: 'des',
        name: 'des',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Remark',
        field: 'initial',
        name: 'initial',
        align: 'left',
        sortable: false,
    },
    { name: 'actions', field: 'actions' },
]
export const tableHeadersDua: TableHeader[] = [
    {
        label: 'Description',
        field: 'bezeich',
        name: 'bezeich',
        align: 'left',
        sortable: false,
    },
    { name: 'actions', field: 'actions' },
]
export const tableHeadersTiga: TableHeader[] = [
    {
        label: 'Code',
        field: 'char1',
        name: 'char1',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Description',
        field: 'char3',
        name: 'char3',
        align: 'left',
        sortable: false,
    },
    { name: 'actions', field: 'actions' },
]
export const tableHeadersEmpat: TableHeader[] = [
    {
        label: 'Code',
        field: 'char1',
        name: 'char1',
        align: 'left',
        sortable: false,
    }, 
    {
        label: 'Description',
        field: 'char3',
        name: 'char3',
        align: 'left',
        sortable: false,
    }, 
    {
        label: 'Returnable',
        field: 'logi3',
        name: 'logi3',
        align: 'left',
        sortable: false,
    },
    { name: 'actions', field: 'actions' },
]
export const tableHeadersLima: TableHeader[] = [
    {
        label: 'Reservation Cancellation Reason',
        field: 'char3',
        name: 'char3',
        align: 'left',
        sortable: false,
    },
    { name: 'actions', field: 'actions' },
]