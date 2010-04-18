#!/bin/sh
java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js ../glge.js --externs closure_externals.js --js_output_file ../glge_closure.js
java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js ../glge_math.js --externs closure_externals.js --js_output_file ../glge_math_closure.js