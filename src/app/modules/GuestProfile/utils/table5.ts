export const nations = (data) => {
    return data.tNation['t-nation'].map(items =>({
        label: `${items['kurzbez']} - ${items['bezeich']}`,
        value: items
    }))
}

export const data_table = (data) => {
    return data.tNation['t-nation'].map(items => ({
        bezeich: items['bezeich'],
        kurzbez: items['kurzbez'],
        selected: false
    }))
}