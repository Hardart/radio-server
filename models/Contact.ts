import { Schema, model, InferSchemaType } from 'mongoose'
enum ContactType {
  PHONE = 'phone',
  MAIL = 'mail',
  LINK = 'link'
}
const ContactSchema = new Schema(
  {
    label: { type: String, required: true },
    type: { type: String, enum: ContactType, required: true },
    phoneId: { type: Schema.Types.ObjectId, ref: 'Phone' },
    mail: String,
    text: String,
    href: String
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

ContactSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})

export type Contact = InferSchemaType<typeof ContactSchema>
export type ContactWithID = Contact & { id: string }
export const Contact = model('Contact', ContactSchema)
