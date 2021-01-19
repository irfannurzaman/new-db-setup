export const optionsOutlet = (data) => {
    const datafilter = data.tHoteldpt['t-hoteldpt'].filter(x => ![
        0
    ].includes(x.num))
    return datafilter.map(items => ({
        label: items['depart'],
        value: items['num']
    }))
}