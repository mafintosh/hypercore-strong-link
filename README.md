# hypercore-strong-identifier

Generate a "strong" link to a hypercore seq that contains a root hash
of the merkle tree at that time.

```
npm install hypercore-strong-identifier
```

## Usage

``` js
const strongIdentifier = require('hypercore-strong-identifier')

strongIdentifier.generate(someFeed, 42, function (err, link) {
  if (err) throw err
  console.log(link) // {feed: someFeed.key, seq: 42, hash: <buf>}
  strongIdentifier.verify(someFeed, link, function (err, data) {
    // returns an error the feed key doesn't match
    // or if the merkle tree hash is different
    if (err) throw err
    // otherwise the data at the seq is returned
    console.log(data)
  })
})
```

## API

#### `strongIdentifier.generate(feed, seq, cb)`

Generate a strong identifier.
Returns an object that looks like this:

```js
{
  feed: <the-feed-key>,
  seq: <seq passed in>,
  hash: <the root hash of the merkle tree at seq>
}
```

#### `strongIdentifier.verify(feed, link, cb)`

Verifies a strong link and returns the data at the seq if it validates.

## License

MIT
