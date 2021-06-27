const notEmpty = (str: any) => {
  return (typeof str === 'string') && str.length > 0
}

export default { notEmpty }