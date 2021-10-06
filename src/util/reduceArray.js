const reduceArray = (array, reduceBy) => {
    const attribute = reduceBy ? reduceBy : 'id'
    return array.reduce((result, currentObj) => {
        result[currentObj[attribute]] = currentObj
        return result
    }, {})
}

export default reduceArray