import { deepClone } from './deep'

/**
 * Возвращает новый объект c клонированными свойствами properties
 * @param {Object} obj Source object
 * @param {Array<string>} properties Array of property names
 * @returns {Object} New object
 */
export default function collectProperties (obj, properties) {
  if (obj !== Object(obj) || !Array.isArray(properties)) {
    throw new Error('Invalid input parameters')
  }

  const newObj = {}
  properties.forEach(p => {
    if (typeof p !== 'string') {
      throw new Error('Invalid property type')
    }
    if (!obj.hasOwnProperty(p)) {
      throw new Error(`Missing property=${p}`)
    }
    newObj[p] = deepClone(obj[p])
  })
  return newObj
}
