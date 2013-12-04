module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('node-sprite-generator');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        spriteGenerator: {
            sprite: {
                src: [
                    'sprite_src/1x/*.png'
                ],
                spritePath: 'public/images/sprite.png',
                stylesheetPath: 'less/sprite.less',
                layout: 'vertical',
                layoutOptions: {
                    padding: 2
                },
                stylesheet: 'less',
                stylesheetOptions: {
                    prefix: 'icons',
                    pixelRatio: 1,
                    spritePath: '../images/sprite.png',
                }
            },
            sprite2x: {
                src: [
                    'sprite_src/2x/*.png'
                ],
                spritePath: 'public/images/sprite2x.png',
                stylesheetPath: 'less/sprite2x.less',
                layout: 'vertical',
                layoutOptions: {
                    padding: 2
                },
                stylesheet: 'less',
                stylesheetOptions: {
                    prefix: '2x-icons',
                    pixelRatio: 2,
                    spritePath: '../images/sprite2x.png'
                }
            }
        },
        less: {
            dev: {
                options: {
                  paths: ["less"]
                },
                files: {'public/css/style.css': 'less/style.less'} 
            }
        },
        watch: {
            less: {
                files: {
                    'public/css/style.css': 'less/style.less'
                },
                tasks: ['less']
            }
        }
    });

    grunt.registerTask('default', ['spriteGenerator', 'less', 'watch']);
    grunt.registerTask('sprite', ['spriteGenerator']);
};