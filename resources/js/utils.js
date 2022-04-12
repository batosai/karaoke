export const pluck = (list, key) => list.reduce((pV, cV) => (key in cV ? [...pV, cV[key]] : [...pV]), [])
