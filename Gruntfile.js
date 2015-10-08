module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - built on <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      views: 'source/views/',
      assets: 'source/assets/',
      build: 'public/',
      reports: 'reports/'
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.views %>',
          src: ['*.jade'],
          dest: '<%= meta.build %>',
          ext: '.html'
        }]
      }
    },
    less: {
      build: {
        options: {
          compress: false
        },
        files: [{
          '<%= meta.build %>css/style.css': '<%= meta.assets %>css/style.less',
          '<%= meta.build %>css/ie.css': '<%= meta.assets %>css/ie.less',
          '<%= meta.build %>css/print.css': '<%= meta.assets %>css/print.less'
        }]
      }
    },
    concat: {
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': '<%= meta.assets %>js/libs/modernizr-2.7.1.js',
          '<%= meta.build %>js/excanvas.js': '<%= meta.assets %>js/libs/excanvas.compiled.js',
          '<%= meta.build %>js/libs.js': ['<%= meta.assets %>js/libs/jquery-1.11.1.js', '<%= meta.assets %>js/libs/plugins/*.js'],
          '<%= meta.build %>js/l10n.js': '<%= meta.assets %>js/l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.assets %>js/site.js', '<%= meta.assets %>js/plugins/viewport.js', '<%= meta.assets %>js/plugins/*.js'],
          '<%= meta.build %>js/html5shiv.js': ['<%= meta.assets %>js/libs/html5shiv.min.js'],
          '<%= meta.build %>js/respond.js': ['<%= meta.assets %>js/libs/respond.min.js'],
          '<%= meta.build %>js/highcharts.js': ['<%= meta.assets %>js/libs/highcharts.src.js'],
          '<%= meta.build %>js/highcharts-more.js': ['<%= meta.assets %>js/libs/highcharts-more.js'],
          '<%= meta.build %>js/exporting.js': ['<%= meta.assets %>js/libs/exporting.js'],
          '<%= meta.build %>js/spiderweb.js': ['<%= meta.assets %>js/module/spiderweb.js']
        }]
      }
    },
    copy: {
      cssSupport: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>css',
          src: '*htc',
          dest: '<%= meta.build %>'
        }]
      },
      data: {
        files: [{
          expand: true,
          cwd: '<%= meta.views %>data/',
          src: '**/*',
          dest: '<%= meta.build %>data/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>images/',
          src: '**/*',
          dest: '<%= meta.build %>images/'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>icons/',
          src: '**/*',
          dest: '<%= meta.build %>'
        }]
      },
      video: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>video/',
          src: '**/*',
          dest: '<%= meta.build %>video/'
        }]
      },
      json: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>json/',
          src: '**/*',
          dest: '<%= meta.build %>json/'
        }]
      },
      ajax: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>ajax/',
          src: '**/*',
          dest: '<%= meta.build %>ajax/'
        }]
      },
      audio: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>audio/',
          src: '**/*',
          dest: '<%= meta.build %>audio/'
        }]
      },
      xml: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>xml/',
          src: '**/*',
          dest: '<%= meta.build %>xml/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>fonts/',
          src: '**/*',
          dest: '<%= meta.build %>fonts/'
        }]
      },
      htaccess: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>htaccess/',
          src: '.htaccess',
          dest: '<%= meta.build %>'
        }]
      }
    },
    jshint: {
      options: {
        devel: false,
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        boss: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          Modernizr: true,
          jQuery: true,
          $: true,
          console: true
        }
      },
      files: ['package.json', 'Gruntfile.js', '<%= meta.assets %>js/plugins/*.js', '<%= meta.assets %>js/*.js']
    },
    csslint: {
      options: {
        'important': true,
        'adjoining-classes': false,
        'known-properties': true,
        'box-sizing': false,
        'box-model': false,
        'overqualified-elements': true,
        'display-property-grouping': true,
        'bulletproof-font-face': true,
        'compatible-vendor-prefixes': false,
        'regex-selectors': true,
        'errors': true,
        'duplicate-background-images': false,
        'duplicate-properties': true,
        'empty-rules': true,
        'selector-max-approaching': true,
        'gradients': false,
        'fallback-colors': true,
        'font-sizes': false,
        'font-faces': true,
        'floats': false,
        'star-property-hack': false,
        'outline-none': false,
        'import': true,
        'ids': false,
        'underscore-property-hack': true,
        'rules-count': true,
        'qualified-headings': false,
        'selector-max': true,
        'shorthand': true,
        'text-indent': true,
        'unique-headings': false,
        'universal-selector': true,
        'unqualified-attributes': true,
        'vendor-prefix': false,
        'zero-units': true
      },
      files: ['<%= meta.build %>css/*.css']
    },
    htmlhint: {
      options: {
        'tagname-lowercase': true,
        'attr-lowercase': false,
        'attr-value-double-quotes': true,
        'spec-char-escape': true,
        'id-unique': true,
        'src-not-empty': true,
        'img-alt-require': true
      },
      files: ['<%= meta.build %>*.html']
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        options: {
          spawn: false
        },
        files: ['package.json', 'Gruntfile.js', 'source/server.js', 'source/routes.js'],
        tasks: ['jshint']
      },
      js: {
        files: ['<%= meta.assets %>js/plugins/*.js', '<%= meta.assets %>js/*.js'],
        tasks: ['jshint', 'concat']
      },
      jade: {
        files: ['<%= meta.views %>**/*.jade'],
        tasks: ['jade', 'htmlhint']
      },
      data: {
        files: ['<%= meta.views %>data/**/*.*'],
        tasks: ['copy:data']
      },
      less: {
        files: ['<%= meta.assets %>css/**/*.less'],
        tasks: ['less', 'autoprefixer'/*, 'csslint'*/]
      },
      fonts: {
        files: ['<%= meta.assets %>fonts/**/*'],
        tasks: ['copy:fonts']
      },
      images: {
        files: ['<%= meta.assets %>images/**/*'],
        tasks: ['copy:images']
      },
      videos: {
        files: ['<%= meta.assets %>videos/**/*'],
        tasks: ['copy:videos']
      },
      xml: {
        files: ['<%= meta.assets %>xml/**/*'],
        tasks: ['copy:xml']
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.build %>images/',
          src: '**/*.{png,jpg,gif}',
          dest: '<%= meta.build %>images/'
        }]
      }
    },
    cssmin: {
      options: {
        banner: '<%= meta.banner %>'
      },
      compress: {
        files: [{
          '<%= meta.build %>css/style.css': '<%= meta.build %>css/style.css',
          '<%= meta.build %>css/ie.css': '<%= meta.build %>css/ie.css',
          '<%= meta.build %>css/print.css': '<%= meta.build %>css/print.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        compress: true,
        beautify: false,
        preserveComments: false
      },
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': '<%= meta.assets %>js/libs/modernizr-2.7.1.js',
          '<%= meta.build %>js/excanvas.js': '<%= meta.assets %>js/libs/excanvas.compiled.js',
          '<%= meta.build %>js/libs.js': ['<%= meta.assets %>js/libs/jquery-1.11.1.js', '<%= meta.assets %>js/libs/plugins/*.js'],
          '<%= meta.build %>js/l10n.js': '<%= meta.assets %>js/l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.assets %>js/site.js', '<%= meta.assets %>js/plugins/*.js']
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        src: '<%= meta.build %>css/*.css'
      }
    },
    accessibility: {
      options: {
        accessibilityLevel: 'WCAG2A'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= meta.build %>',
          src: ['*.html'],
          dest: '<%= meta.reports %>',
          ext: '-report.txt'
        }]
      }
    },
    'html-validation': {
      options: {
        reset: true,
        stoponerror: false,
        reportpath: '<%= meta.reports %>html-validation-report.json',
        path: '<%= meta.reports %>html-validation-status.json',
        relaxerror: [],
        charset: 'utf-8',
        doctype: 'HTML5'
      },
      files: {
        src: ['<%= meta.build %>**/*.html']
      }
    },
    'css-validation': {
      options: {
        reset: true,
        stoponerror: false,
        reportpath: '<%= meta.reports %>css-validation-report.json',
        path: '<%= meta.reports %>css-validation-status.json',
        profile: 'css3',
        medium: 'all',
        warnings: '0'
      },
      files: {
        src: ['<%= meta.build %>css/style.css']
      }
    },
    open: {
      options: {
        delay: 10
      },
      dev: {
        path: 'http://localhost:3000'
      }
    },
    nodemon: {
      local: {
        script: 'source/server.js'
      }
    },
    concurrent: {
      options: {
        limit: 4
      },
      local: {
        tasks: ['nodemon:local', 'watch', 'open'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    plato: {
      options: {
        jshint: grunt.file.readJSON('.jshintrc')
      },
      local: {
        files: {
          'reports': ['source/**/*.js']
        }
      }
    },
    qunit: {
      options: {
        timeout: 10000,
        '--cookies-file': 'test/cookies.txt'
      },
      all: {
        options: {
          urls: [
            'http://localhost:8000/test/test.html'
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    clean: {
      build: ['public']
    }
  });
  grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
  require('time-grunt')(grunt);
  grunt.registerTask('build', ['clean', 'concat', 'less', 'jade', 'copy', 'autoprefixer', 'htmlhint', 'jshint'/*, 'csslint'*/]);
  grunt.registerTask('default', ['build', 'concurrent:local']);
  grunt.registerTask('test', ['connect:server', 'qunit']);
  grunt.registerTask('wa', ['accessibility']);
  grunt.registerTask('html', ['html-validation']);
  grunt.registerTask('css', ['css-validation']);
  grunt.registerTask('report', ['plato:local']);
  grunt.registerTask('release', ['build', 'test', 'html', 'css', 'imagemin', 'uglify', 'cssmin']);
};
