import compiler from './compiler.js';
import options from '../src/options.json';

const resultTemplate = {
  '--color-primary': [ '#ff017d', '#cf689a', '$color-secondary', 'blue' ],
  '--color-secondary': [ '#000', '$color-secondary' ],
  '--color-background': [ 'white', 'var(--color-background)' ],
  '--color-foreground': [ 'var(--color-secondary)' ],
  '--radius-round': [ '50% 50%' ],
  '--spacing-s': [ '5rem' ],
  '--shadow-xs': [ '1px 2px 3px 4px rgba(0,0,0,0.25), inset 4px 3px 2px 1px #fff' ],
  '--border-light': [ '1px solid rgba(0,0,0,0.15)' ],
  '--amount-suffix-content': [ "'€'", "'$'" ],
  '--margin-default': [ '0.5rem !important' ],
  '--width-header': [ 'calc(100vh - (3rem / 2))' ]
};

const getExpectedOutput = (syntax, prefix = true) => {
  const template = JSON.stringify(resultTemplate);
  const prefixPattern = prefix ? ['', ''] : [/"--/g, '"'];
  switch (syntax) {
    case 'css':
      return template
        .replace(/\$color-secondary/g, 'blue')
        .replace(prefixPattern[0], prefixPattern[1]);
    default:
      return template.replace(prefixPattern[0], prefixPattern[1]);
  }
};

const availableFileSyntaxes = options.properties.syntax.enum;

availableFileSyntaxes.forEach((syntax) => {

  test(`Outputs custom properties object for ${syntax.toUpperCase()}`, async () => {
    const stats = await compiler(`example.${syntax}`, { syntax });
    const output = stats.toJson({ source: true }).modules[0].source;

    expect(output).toBe(`module.exports = ${getExpectedOutput(syntax)}`);
  });

  test(`Outputs unprefixed custom properties object for ${syntax.toUpperCase()}`, async () => {
    const prefix = false;
    const stats = await compiler(`example.${syntax}`, { syntax, prefix });
    const output = stats.toJson({ source: true }).modules[0].source;

    expect(output).toBe(`module.exports = ${getExpectedOutput(syntax, prefix)}`);
  });

});