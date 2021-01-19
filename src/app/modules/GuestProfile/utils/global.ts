import {Notify} from 'quasar'

export const InputParameter = (data, number, key) => {          
    return {
              "tQueasy": [{
                  "key": key,
                  "number1": number,
                  "number2": "?",
                  "number3": "?",
                  "date1": "?",
                  "date2": "?",
                  "date3": "?",
                  "char1": data,
                  "char2": "",
                  "char3": "",
                  "deci1": "?",
                  "deci2": "?",
                  "deci3": "?",
                  "logi1": "?",
                  "logi2": "true",
                  "logi3": "?",
                  "betriebsnr": "0"
              }],
              "tQueasy1": [{
                  "key": key,
                  "number1": number,
                  "number2": "?",
                  "number3": "?",
                  "date1": "?",
                  "date2": "?",
                  "date3": "?",
                  "char1": data,
                  "char2": "",
                  "char3": "",
                  "deci1": "?",
                  "deci2": "?",
                  "deci3": "?",
                  "logi1": "?",
                  "logi2": "true",
                  "logi3": "?",
                  "betriebsnr": "0"
              }]
    }
  }

 export const NotifyCreate = (mess, col?, type?) => Notify
  .create({
      message: mess,
      color: col,
      type: type,
});

