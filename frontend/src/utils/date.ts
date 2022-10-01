type Payload = string | Date
const fromStringOrDate = (payload: Payload) => {
    if (typeof payload === 'string') return new Date(payload)
    return payload
}

export const formatDate = (payload: Payload) => {
    return fromStringOrDate(payload).toLocaleString('default', {
        dateStyle: 'short',
        timeStyle: 'short',
        hour12: true
    })
}

export const differenceInDays = (a: Payload, b: Payload) => {
    const diffInMs = Math.abs(fromStringOrDate(a).getTime() - fromStringOrDate(b).getTime())
    return Math.ceil(diffInMs / (1000 * 3600 * 24))
}

export const isPast = (payload: Payload) => {
    return new Date() > fromStringOrDate(payload)
}