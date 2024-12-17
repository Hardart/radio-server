import { Schema, model, InferSchemaType } from 'mongoose'
import { Phone } from './Phone'
import { Mail } from './Mail'
import { Address } from './Address'
import { Social } from './Social'

const ContactSchema = new Schema(
  {
    section: { type: String, enum: ['footer', 'contacts', 'commersial'] },
    emails: [
      {
        id: { type: Schema.Types.ObjectId, ref: Mail },
        label: { type: String, required: true },
        description: String,
        priority: Number
      }
    ],
    phones: [
      {
        id: { type: Schema.Types.ObjectId, ref: Phone },
        label: { type: String, required: true },
        description: String,
        priority: Number
      }
    ],
    addresses: [
      {
        label: { type: String },
        id: { type: Schema.Types.ObjectId, ref: Address },
        description: String,
        priority: Number
      }
    ],
    socials: [
      {
        social: { type: Schema.Types.ObjectId, ref: Social },
        label: { type: String, required: true },
        description: String,
        priority: Number
      }
    ]
  },
  { timestamps: false, versionKey: false }
)

export type Contact = InferSchemaType<typeof ContactSchema>
export type ContactWithId = InferSchemaType<typeof ContactSchema> & { id: string }
export const Contact = model('Contact', ContactSchema)
