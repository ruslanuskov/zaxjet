import path from 'path';
import fs from 'fs-extra';
import beautify from 'js-beautify';
import envs from './config/envs.js';

const jsBeautify = beautify.html;
const HTML = '.html';

const htmlDir = path.resolve(envs.paths.output, '');
const htmlFiles = fs
  .readdirSync(htmlDir)
  .filter(fileName => fileName.endsWith(HTML));

function readFiles() {
  const targetDirectory = 'dist/';

  console.warn('Starting pretty html');

  Object.keys(htmlFiles).forEach(key => {
    const htmlStr = fs.readFileSync(
      path.resolve(envs.paths.output, htmlFiles[key]),
      'utf8',
    );
    const resultHtml = jsBeautify(htmlStr, {
      indent_size: 2,
      indent_char: '\x20',
      max_preserve_newlines: -1,
      preserve_newlines: false,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: 'normal',
      brace_style: 'collapse',
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: false,
      wrap_line_length: 0,
      indent_inner_html: true,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
      extra_liners: [],
      wrap_attributes: 'auto',
      operator_position: 'preserve-newline',
    });

    fs.writeFile(`${targetDirectory}${htmlFiles[key]}`, resultHtml, e => {
      if (e) {
        console.error(e);
      }
    });
  });

  console.warn('Pretty html done');
}

readFiles();
