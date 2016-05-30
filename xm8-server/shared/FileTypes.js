export let filetypes = {
  PATCH: {
    id: '0',
    filename: 'patch'
  }
}

export let typeFromFilename = {
  [filetypes.PATCH.filename]: filetypes.PATCH
}