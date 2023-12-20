const url = "http://localhost:3000/graphql"

const responseHandler = function (resolve: any, reject: any, res: any) {
    var retData = res.data.errors ? res.data.errors[0].message : {
        code: 200
    };
    if (res.statusCode == 200 && retData.code == 200) {
        resolve(res.data.data);
    } else {
        reject(res.data);
    }
}

const graphql = () => {
    return {
        query: function (queryObj: any) {
            return new Promise(function (resolve, reject) {
                wx.request({
                    url: url,
                    method: 'POST',
                    data: JSON.stringify({
                        query: queryObj.query,
                        variables: queryObj.variables
                    }),
                    header: queryObj.header,
                    complete: function (res) {
                        responseHandler(resolve, reject, res);
                    }
                });
            });
        },

        mutate: function (mutateObj: any) {
            return new Promise(function (resolve, reject) {
                wx.request({
                    url: url,
                    method: 'POST',
                    data: JSON.stringify({
                        query: mutateObj.mutation,
                        variables: mutateObj.variables
                    }),
                    header: mutateObj.header,
                    complete: function (res) {
                        responseHandler(resolve, reject, res);
                    }
                });
            });
        }
    }
}

export { graphql }