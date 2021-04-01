import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';
import { extract } from 'custom-property-extract';
import schema from './options.json';

export default function loader(source) {
  const options = {
    syntax: 'css',
    prefix: true,
    ...getOptions(this)
  };

  validate(schema, options, {
    name: 'Custom property extract loader',
    baseDataPath: 'extractOptions',
  });

  source = extract(source, { ...options, source: 'content' });
  return `export default ${JSON.stringify(source)}`;
}