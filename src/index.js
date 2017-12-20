import SparkMD5 from 'spark-md5'
import { readAsArrayBuffer } from 'promise-file-reader'

const DEFAULT_CHUNK_SIZE = 10485760

export default class Checksum {
  constructor (options) {
    const defaultOptions = {
      chunkSize: DEFAULT_CHUNK_SIZE
    }

    this.options = Object.assign({}, defaultOptions, options)
  }

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

  readSlice () {
    return new Promise((resolve, reject) => {
      let {
        blobSlice,
        chunks,
        currentChunk,
        file,
        options,
        spark
      } = this

      const {
        chunkSize
      } = options

      const start = currentChunk * chunkSize
      const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

      return readAsArrayBuffer(blobSlice.call(file, start, end)).then(loadedArrayBuffer => {
        spark.append(loadedArrayBuffer)
        currentChunk++
        if (currentChunk < chunks) {
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
