/**
 * Represents a record that is serialized (url-friendly)
 *
 * Meant to contain the minimal identifiable properties to be able to restore the record, eventually
 *
 * Used when transmitting records over the network (internet), such as:
 *  - Encoded within a URL string
 *  - Stored on a cache system (localstorage, cookie, etc.)
 */
export type SerializedRecord = string

