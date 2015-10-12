module.exports = {

    bsFiles: {
        src :  [
            'assets/css/*.css',
            '*.html'
        ]
    },
    options: {
        watchTask: true // позволяет работать слушателю
        //,server: { // for static sites
        //    baseDir: "./",
        //    //index: "game.html"
        //}
        ,proxy: "game" // if we started with another server (wamp)
    }
};