module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        run: {
            application: {
                cmd: "ember",
                args: [
                    "build",
                    "-prod"
                ]
            }
        },

        easy_rpm: {
            options: {                
                summary: "cti-stix-ui",
                group: "Applications",
                license: "Apache-2.0",
                vendor: "unfetter",
                release: 1,
                buildArch: "noarch",
                tempDir: "target/build",
                rpmDestination: "target/rpm"
            },
            application: {
                files: [                    
                    {
                        src: [
                            "**/*"
                        ],
                        dest: "/usr/share/cti-stix-ui",
                        cwd: "dist"
                    }, {
                        src: [
                            "."
                        ],
                        cwd: "dist",
                        dir: true,
                        dest: "/usr/share/cti-stix-ui"
                    }
                ],
                excludeFiles: [
                    "tests/**",
                    "testem.js"
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-run");
    grunt.loadNpmTasks("grunt-easy-rpm");

    grunt.registerTask("default", [ "run", "easy_rpm" ]);
};