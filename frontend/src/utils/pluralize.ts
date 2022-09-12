const pluralize = (
    condition: number,
    noun: string,
    suffix: string = 's'
) => {
    return `${condition} ${noun}${condition !== 1 ? suffix : ''}`
}

export default pluralize