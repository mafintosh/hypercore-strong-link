# hypercore-strong-link

Generate a "strong" link to a hypercore seq that contains a root hash
of the merkle tree at that time.

```
npm install hypercore-strong-link
```

## Usage

``` js
const strongLink = require('hypercore-strong-link')

strongLink.generate(someFeed, 42, function (err, link) {
  if (err) throw err
  console.log(link) // {feed: someFeed.key, seq: 42, treeHash: <buf>}
  strongLink.verify(someFeed, link, function (err, data) {
    // returns an error the feed key doesn't match
    // or if the merkle tree hash is different
    if (err) throw err
    // otherwise the data at the seq is returned
    console.log(data)
  })
})
```

## API

#### `strongLink.generate(feed, seq, cb)`

Generate a strong identifier.
Returns an object that looks like this:

```js
{
  feed: <the-feed-key>,
  seq: <seq passed in>,
  treeHash: <the root hash of the merkle tree at seq>
}
```

#### `strongLink.verify(feed, link, cb)`

Verifies a strong link and returns the data at the seq if it validates.

## License

MIT
