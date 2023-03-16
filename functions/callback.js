// receives an auth code from spotify api
exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(event.queryStringParameters),
    });
};