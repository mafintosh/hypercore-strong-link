const crypto = require('hypercore-crypto')

exports.generate = generate
exports.verify = verify

function generate (feed, seq, cb) {
  feed.get(seq, function (err) {
    if (err) return cb(err)
    feed.rootHashes(seq, function (err, roots) {
      if (err) return cb(err)
      cb(null, {
        feed: feed.key,
        seq,
        hash: crypto.tree(roots)
      })
    })
  })
}

function verify (feed, ptr, cb) {
  feed.ready(function (err) {
    if (err) return cb(err)
    if (!feed.key.equals(ptr.feed)) return cb(new Error('Bad feed'))
    feed.get(ptr.seq, function (err, data) {
      if (err) return cb(err)
      feed.rootHashes(ptr.seq, function (err, roots) {
        if (err) return cb(err)
        if (crypto.tree(roots).equals(ptr.hash)) return cb(null, data)
        cb(new Error('Checksum mismatch'))
      })
    })
  })
}
