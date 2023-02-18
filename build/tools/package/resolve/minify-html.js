const { minify } = require('html-minifier-terser');


const DEFAULT_HTML_MINIFIER_OPTIONS = {
  caseSensitive: true,
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: false,
  continueOnParseError: true,
  removeComments: true,
  sortAttributes: true,
  sortClassName: true,
  keepClosingSlash: true,
};

function minifyHTML(
  code,
  options = DEFAULT_HTML_MINIFIER_OPTIONS,
) {
  return minify(code, options);
}


module.exports = {
  DEFAULT_HTML_MINIFIER_OPTIONS,
  minifyHTML,
};
