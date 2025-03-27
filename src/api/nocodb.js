import { Api } from 'nocodb-sdk';

export const nocodb = new Api({
    baseURL: 'https://app.nocodb.com',
    headers: {
        'xc-token': '43IEAzJTc0-7D5zhBK6Er1HlZhVcTHLnVTgIx0HO'
    }
})