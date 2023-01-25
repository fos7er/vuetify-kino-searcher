/**
 * simple typeof check of non primitives
 * @param {Object|Any} val
 * @returns {string}
 */
const typeOf = (val) => {
  if (val instanceof Array) {
    return 'Array'
  }
  if (val instanceof Map) {
    return 'Map'
  }
  if (val instanceof Set) {
    return 'Set'
  }
  if (val instanceof Date) {
    return 'Date'
  }
  if (val instanceof ArrayBuffer) {
    return 'ArrayBuffer'
  }
  if (val instanceof Uint8Array) {
    return 'Uint8Array'
  }
  if (val instanceof Object) {
    return 'Object'
  }

  throw 'unknown type or primitive value'
}

/**
 * Deep cloning of objects without methods
 * @param {Any} obj Object to clone
 * @returns {Object|Date|Any} Cloned object
 */
export const deepClone = (obj) => {
  if (obj !== Object(obj)) {
    // primitives
    return obj
  }

  const type = typeOf(obj)

  if (type === 'Date') {
    return new Date(obj.getTime())
  }

  if (type === 'Uint8Array') {
    return new Uint8Array(obj)
  }

  if (type === 'ArrayBuffer') {
    const buf = new ArrayBuffer(obj.byteLength)
    new Uint8Array(buf).set(new Uint8Array(obj)) // copy data
    return buf
  }

  if (type === 'Map') {
    const clone = new Map()
    for (const [key, val] of obj) {
      clone.set(key, deepClone(val))
    }
    return clone
  }

  if (type === 'Set') {
    return new Set(deepClone(Array.from(obj)))
  }

  const clone = Array.isArray(obj) ? [] : {}
  for (const p in obj) {
    clone[p] = deepClone(obj[p])
  }

  return clone
}

export const deepEqual = (a, b) => {
  if (a === b) {
    return true
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false
  }

  const typeA = typeOf(a)
  const typeB = typeOf(b)

  if (typeA !== typeB) {
    return false
  }

  if (typeA === 'Date') {
    // If the values are Date, compare them as timestamps
    return a.getTime() === b.getTime()
  }

  if (typeA === 'ArrayBuffer') {
    a = new Uint8Array(a)
    b = new Uint8Array(b)
  }

  if (typeA === 'Uint8Array') {
    if (a.byteLength !== b.byteLength) {
      return false
    }

    return a.every((el, index) => el === b[index])
  }

  if (typeA === 'Map') {
    if (a.size !== b.size) {
      return false
    }

    for (const [key, val] of a) {
      if (!deepEqual(val, b.get(key))) {
        return false
      }
    }

    return true
  }

  if (typeA === 'Set') {
    if (a.size !== b.size) {
      return false
    }

    a = Array.from(a).sort()
    b = Array.from(b).sort()
  }

  if (typeA === 'Array') {
    if (a.length !== b.length) {
      return false
    }

    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false
      }
    }

    return true
  }

  const props = Object.keys(a)

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false
  }

  return props.every(p => deepEqual(a[p], b[p]))
}

/**
 * Simple object check
 * @param {Object|Any} item
 * @returns {boolean}
 */
export const isObject = (item) => {
  return item && typeof item === 'object' &&
    !Array.isArray(item) && !(item instanceof Uint8Array) && !(item instanceof ArrayBuffer)
}

/**
 * Deep merge two objects
 * @param {Object} target
 * @param {Object} sources
 * @return {Object} Merged object
 */
export const deepMerge = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepMerge(target, ...sources)
}

/**
 * Excludes properties from object by template object(s) if properties are same.
 * @param {Object} obj
 * @param {Object} excludes
 * @return {Object} modified object
 */
export const deepExclude = (obj, ...excludes) => {
  if (!excludes.length) return obj
  const exclude = excludes.shift()

  if (isObject(obj) && isObject(exclude)) {
    for (const key in exclude) {
      if (deepEqual(obj[key], exclude[key])) {
        delete obj[key]
      } else if (isObject(exclude[key])) {
        deepExclude(obj[key], exclude[key])
      }
    }
  }

  return deepExclude(obj, ...excludes)
}
