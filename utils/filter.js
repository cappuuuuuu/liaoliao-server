function existFilterOption (option) {
  const result = {}
  for (const [key, value] of Object.entries(option)) {
    if (value) result[key] = option[key]
  }
  return result
}

module.exports = { existFilterOption }
