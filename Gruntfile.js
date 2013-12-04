module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('node-spritesheet');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        spritesheet: {
            compile: {
                options: {
                    outputCss: 'public/css/sprite.css',
                    output: {
                        legacy: {
                            pixelRatio: 1,
                            outputImage: 'public/images/sprite.png',
                            httpImagePath: '../images/sprite.png',
                            selector: '.icons',
                            // Just process the non-retina files
                            filter: function( fullpath ) {
                                return fullpath.indexOf( "-2x" ) === -1;
                            },
                            resolveImageSelector: function( name, fullpath ) {
                                return 'icons-' + name + '::before';
                            }
                        },
                        retina: {
                            pixelRatio: 2,
                            outputImage: 'public/images/sprite@2x.png',
                            httpImagePath: '../images/sprite@2x.png',
                            selector: '.icons ~ ::before',
                            // Just process the retina files
                            filter: function( fullpath ) {
                                return fullpath.indexOf( "-2x" ) >= 0;
                            },
                            resolveImageSelector: function( name, fullpath ) {
                                return 'icons-' + name + '::before';
                            }
                        }
                    }
                },
                files: {
                    '': 'sprite_src/*.png'
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

    grunt.registerTask('default', ['spritesheet', 'less', 'watch']);
    grunt.registerTask('sprite', ['spritesheet']);
};