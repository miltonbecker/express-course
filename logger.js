//Middleware functions always receive 3 parameters: 
//request, response and next
function myMiddleware(req, res, next) {
    let start = +new Date(); // same as Number(new Date())
    let stream = process.stdout;
    let url = req.url;
    let method = req.method;

    res.on('finish', function () {
        let duration = +new Date() - start;
        let message = `${method} to ${url}\ntook ${duration}ms\n\n`;
        stream.write(message);
    });

    next();
}

module.exports = myMiddleware;