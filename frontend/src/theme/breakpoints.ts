export const breakpoints = {
    xs: '0em',
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
}

export type Breakpoint = keyof typeof breakpoints

const min = (key: Breakpoint) => `(min-width: ${breakpoints[key]})`
const max = (key: Breakpoint) => `(max-width: ${breakpoints[key]})`

export const up = (key: Breakpoint) => min(key)
export const down = (key: Breakpoint) => max(key)
export const between = (a: Breakpoint, b: Breakpoint) => `${min(a)} and ${max(b)}`

export const only = (key: Breakpoint) => {
    const keys = Object.keys(breakpoints) as Breakpoint[];
    const index = keys.indexOf(key);

    if (index === 0) {
        const next = keys.at(index + 1)
        if (next) return down(next)
    }

    if (index === keys.length - 1) return up(key)
    return between(key, keys[index + 1])
}