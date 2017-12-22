# checksum-promise
Get checksum of a file in the browser using promises.

## Basic usage

Complete documentation of the files can be found [here](./docs.md).

First of all you need to include the Checksum class (either via ES6 imports or using CommonJS): 

### ES6
```js
import Checksum from 'checksum-promise'
```

### CommonJS
```js
const Checksum = require('checksum-promise')
```

Then, all you need to do is instantiate the class (optionally passing in a config object): 

```js
const checksum = new Checksum()
```

Currently, the only option available in the config is the chunk size you want to divide your file by. 

Optional config format: 

```js
{
  chunkSize: 10485760
}
```

`10485760` is the default value of the chunk size, therefore if you are ok with using this size, you don't need to supply a config whatsoever.

Finally, you can call the `calculateMd5` method of the initialized object: 

```js
checksum.calculateMd5(file).then(checksum => {
  // do whatever you need with the checksum
}).catch(error => {
  // in case calculating the checksum failed
})
```

The provided file should be retrieved from an event on a `file` input, like so:

```js
function onFileInputChange (event) {
  const file = event.target.files[0]
}
```

## Contributing

In case you want to contribute to this library, create a pull request on our [BitBucket](https://bitbucket.org/it-economia/checksum-promise), stating what you changed.

