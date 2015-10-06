module.exports = {

    // если понадобится чтото удалить а что то оставить
    // https://github.com/gruntjs/grunt-contrib-clean

    // Deletes all files, but skips .txt files
    client: ['dist/*', '!dist/*.txt']
};