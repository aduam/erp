export const graphError = (err) => {
  const error = err.graphQLErrors.reduce((acc, cur, i) => {
    if (i === 0) {
      acc.push(cur.message)
      return acc
    }
    acc.push(`, ${cur.message}`)
    return acc
  }, [])
  return error.join('')
}