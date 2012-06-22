/*
 * GET home page.
 */

exports.index = function (req, res) {

    var hello = 'Mon text';
    var rand = Math.random();


    res.render('index', {
        title:hello + rand
    })
};
