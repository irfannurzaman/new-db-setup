import { TableHeader } from '~/components/VhpUI/typings';
export const tableHeaders: TableHeader[] = [
    {
        label: 'Number',
        field: 'nr',
        name: 'nr',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Outlet',
        field: 'bezeich',
        name: 'bezeich',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Outlet Type',
        field: 'tr-bez',
        name: 'tr-bez',
        align: 'left',
        sortable: false,
    },
    { name: 'actions', field: 'actions' },
]