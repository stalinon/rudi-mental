import { Api } from 'nocodb-sdk';

const nocodb = new Api({
    baseURL: 'https://app.nocodb.com',
    headers: {
        'xc-token': process.env.REACT_APP_API_TOKEN
    }
})

export const listExercises = function (offset, limit) {
    return nocodb.dbViewRow.list(
        "noco",
        "pxs7yguqn4kdrh2",
        "mlkdr9qliie4r01",
        "vw1f4mrgudje32rn", 
        {
            "offset": offset,
            "limit": limit,
            "where": ""
        }
    ).then(function (data) {
        return {
            list: data.list.map(r => {
                return {
                    name: r.Name,
                    description: r.Description,
                    link: r.GSLink,
                    timeSignature: { top: r.Top, bottom: r.Bottom }
                }
            }),
            total: data.pageInfo.totalRows
        }
    });
}

export const addExercise = function (exercise) {
    return nocodb.dbViewRow.create(
        "noco",
        "pxs7yguqn4kdrh2",
        "mlkdr9qliie4r01",
        "vw1f4mrgudje32rn",
        {
            Name: exercise.name,
            Description: exercise.description,
            GSLink: exercise.link,
            Top: exercise.timeSignature.top,
            Bottom: exercise.timeSignature.Bottom,
        });
}