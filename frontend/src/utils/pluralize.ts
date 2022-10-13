const pluralize = (
    condition: number,
    singular: string,
    plural?: string,
    showNumber?: boolean
) => {
    const prefix = showNumber === false ? '' : condition
    if (plural) return `${prefix} ${condition !== 1 ? plural : singular}`
    return `${prefix} ${singular}${condition !== 1 ? 's' : ''}`
}

export default pluralize