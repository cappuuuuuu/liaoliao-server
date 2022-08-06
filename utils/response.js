const response = {
  success: function ({
    data = null,
    message = null
  }) {
    return {
      status: 'success',
      data,
      message
    }
  },
  error: function ({
    code = 400,
    data = null,
    message = null
  }) {
    return {
      status: 'error',
      code,
      data,
      message
    }
  }
}

module.exports = response
