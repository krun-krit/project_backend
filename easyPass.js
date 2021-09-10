const { json } = require('body-parser');
var http = require('http');
var url = require('url');

const { create_user, topUp, paid, get_gate, create_staff } = require('./prototype')

http.createServer(function (req, res) {

    var request_path = url.parse(req.url, true);
    var message = '';
    var status = 200;
    var data;


    switch (request_path.pathname) {
        case '/create_user':
            try {
                data = create_user({
                    id_card: request_path.query.id_card,
                    firstname: request_path.query.firstname,
                    lastname: request_path.query.lastname,
                    address: request_path.query.address,
                    phone: request_path.query.phone,
                    email: request_path.query.email
                });
                message = 'success'
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;

        case '/topUp':
            try {
                data = topUp(request_path.query.id_card, request_path.query.top_up);
                message = 'success'
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;

        case '/paid':
            try {
                data = paid(request_path.query.id_card, request_path.query.id_tollGate);
                message = 'success'
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;

        case '/get_gate':
            try {
                data = get_gate();
                message = 'success'
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;

        case '/create_staff':
            try {
                data = create_staff({
                    id: request_path.query.id,
                    name: request_path.query.name,
                    phone: request_path.query.phone,
                    address: request_path.query.address
                });
                message = 'success'
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;

        default:
            message = 'Wrong path'
    }

    let object = {
        statusCode: status,
        message: message,
        data: data
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(object));


}).listen(8080);
console.log('Server running on port 8080.');

