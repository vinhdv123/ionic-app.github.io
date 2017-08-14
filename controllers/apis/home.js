/**
 * Created by vinhdv on 8/25/16.
 */


module.exports.controller = function (app) {
    app.get('/', function (req, res) {
        res.render('home/index.html',{title:'Home'});
    })
}