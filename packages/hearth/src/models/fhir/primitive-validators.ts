import { SchemaDefinitionProperty } from 'mongoose'

export const code: SchemaDefinitionProperty = {
  type: String,
  validate: {
    validator: (v: string) => {
      return /^[^\s]+(\s[^\s]+)*$/.test(v)
    },
    message: (props) => `${props.value} is not a valid code!`
  }
}

export const base64Binary: SchemaDefinitionProperty = {
  type: String
}

export const url: SchemaDefinitionProperty = {
  type: String,
  validate: {
    validator: (v: string) => {
      return /^\S*$/.test(v)
    },
    message: (props) => `${props.value} is not a valid url!`
  },
  get: (v: string) => {
    return encodeURI(v)
  }
}

export const uri: SchemaDefinitionProperty = {
  type: String,
  validate: {
    validator: (v: string) => {
      return /^\S*$/.test(v)
    },
    message: (props) => `${props.value} is not a valid uri!`
  },
  get: (v: string) => {
    return encodeURI(v)
  }
}

// https://github.com/Chinlinlee/Burni/blob/main/models/mongodb/FHIRDataTypesSchema/dateTime.js
export const dateTime: SchemaDefinitionProperty = {
  type: Date,
  get: (v: Date) => {
    // return moment(v).format('YYYY-MM-DDTHH:mm:ssZ')
    return v.toISOString()
  }
}

export const unsignedInt: SchemaDefinitionProperty = {
  type: Number,
  validate: {
    validator: (v: string) => {
      return /^[0]|([1-9][0-9]*)$/.test(v)
    },
    message: (props) => `${props.value} is not a valid unsignedInt!`
  },
  default: void 0
}
