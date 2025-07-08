import { Schema, model, InferSchemaType } from 'mongoose'

const RadioProgramSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    isPublished: { type: Boolean, default: false },
    showInMenu: { type: Boolean, default: false },
    description: String,
    image: String,
    color: String,
    type: { type: String, enum: ['программа', 'дайджест'], default: 'программа' },
    hosts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }]
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
)

RadioProgramSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})

export type RadioProgram = InferSchemaType<typeof RadioProgramSchema>
export const RadioProgram = model('RadioProgram', RadioProgramSchema)
