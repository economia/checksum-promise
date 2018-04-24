import SparkMD5 from 'spark-md5'
import { readAsArrayBuffer } from 'promise-file-reader'

const DEFAULT_CHUNK_SIZE = 10485760

/**
 * Checksum class
 *
 * @param {{chunkSize: number?}} options
 */
export default class Checksum {
  constructor (options) {
    const defaultOptions = {
      chunkSize: DEFAULT_CHUNK_SIZE
    }

    this.options = Object.assign({}, defaultOptions, options)
    this.currentChunk = 0
  }

  /**
   * Calculates the MD5 checksum of the provided file
   * @param {Object} file
   * @returns {Promise<any>}
   */
  calculateMd5 (file) {
    return new Promise((resolve, reject) => {
      const {
        chunkSize
      } = this.options
      const spark = new SparkMD5.ArrayBuffer()

      Object.assign(this, {
        blobSlice: Blob.prototype.slice || Blob.prototype.mozSlice || Blob.prototype.webkitSlice,
        chunks: Math.ceil(file.size / chunkSize),
        currentChunk: 0,
        file,
        spark
      })

      return this.readSlice().then(() => {
        return resolve(spark.end())
      }).catch(err => {
        return reject(err)
      })
    })
  }

  /**
   * Reads a chunk of the provided file and appends it to the Spark Array Buffer
   * @returns {Promise<any>}
   */
  readSlice () {
    return new Promise((resolve, reject) => {
      const {
        blobSlice,
        chunks,
        file,
        options: {
          chunkSize
        },
        spark
      } = this
      const start = this.currentChunk * chunkSize
      const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

      return readAsArrayBuffer(blobSlice.call(file, start, end)).then(loadedArrayBuffer => {
        spark.append(loadedArrayBuffer)
        if (++this.currentChunk < chunks) {
          return this.readSlice().then(() => {
            return resolve()
          })
        } else {
          return resolve()
        }
      }).catch(err => {
        return reject(err)
      })
    })
  }
}
