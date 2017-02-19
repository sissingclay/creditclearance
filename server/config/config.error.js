exports.error = (place, err, res) => {
  console.error(`${place}`, err)
  if (res) res.json(err)
  // process.exit(1)
}
