const loggerMiddleware = (req, res, next) => {
    const { url, ip, method } = req;


    console.log(`${new Date().toISOString()} Request ${method} to endpoint ${url} from ip ${ip}`)

    next()
}

module.exports = loggerMiddleware;
