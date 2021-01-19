export const roomType = (data) => {    
    return data.rmtype['rmtype'].map(items => ({
        label: `${items['kurzbez']} - ${items['bezeichnung']}`,
        value: items['zikatnr']
    }))
}

export const roomView = (data) => {    
    return data.tParamtext['t-paramtext'].map(items => ({
        label: items['ptexte'],
        value: items['sprachcode']
    }))
}
export const selectionAdd = [
    {
        labelText: 'Locations',
        width: '100px',
        value: '',
        options: []
    },
    {
        labelText: 'Floor',
        width: '100px',
        value: ''
    },
    {
        labelText: 'Room Number',
        width: '150px',
        value: ''
    },
    {
        labelText: 'PABX Ext',
        width: '100px',
        value: ''
    },
    {
        labelText: 'Connectio Room (s)',
        width: '150px',
        value: ''
    },
    {
        labelText: '',
        width: '100px',
        top: '25px',
        value: ''
    },
    {
        labelText: 'Max Pax',
        width: '100px',
        value: ''
    },
    {
        labelText: 'HK Point',
        width: '100px',
        value: ''
    },
    {
        labelText: 'View',
        width: '150px',
        value: '',
        options: []
    },
]