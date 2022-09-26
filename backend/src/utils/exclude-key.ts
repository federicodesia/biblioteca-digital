export default <T extends object, Key extends keyof T>(
    obj: T,
    ...keys: Key[]
): Omit<T, Key> => {
    const tempObj = { ...obj }
    keys.forEach(key => delete tempObj[key])
    return tempObj
}