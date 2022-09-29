const pluralize = (
    condition: number,
    singular: string,
    plural?: string
) => {
    if(plural) return `${condition} ${condition !== 1 ? plural : singular}`
    return `${condition} ${singular}${condition !== 1 ? 's' : ''}`
}

export default pluralize