export const GET_TABLE = (data) => {
    return data.tQueasy['t-queasy'].map(items => ({
        betriebsnr: items['betriebsnr'],
        char1: items['char1'],
        char2: items['char2'],
        char3: items['char3'],
        date1: items['date1'],
        date2: items['date2'],
        date3: items['date3'],
        deci1: items['deci1'],
        deci2: items['deci2'],
        deci3: items['deci3'],
        key: items['key'],
        logi1: items['logi1'],
        logi2: items['logi2'],
        logi3: items['logi3'],
        number1: items['number1'],
        number2: items['number2'],
        number3: items['number3'],
        selected: false
    }))
}