export const optionsOutlet = (data) => {
    const datafilter = data.tHoteldpt['t-hoteldpt'].filter(x => ![
        0
    ].includes(x.num))
    return datafilter.map(items => ({
        label: items['depart'],
        value: items['num']
    }))
}

export const table_data = (data) => {
    return data.tTisch['t-tisch'].map(items => ({
        tischnr: items['tischnr'],
        bezeich: items['bezeich'],
        selected: false
    }))
}