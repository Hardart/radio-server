import { Schema, model, InferSchemaType } from 'mongoose'

const ProgramSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    hosts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    schedule: {
      daysId: [Number],
      start: { type: String, required: true },
      end: { type: String, required: true },
      isReplay: { type: Boolean, default: false },
    },
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
)

ProgramSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  },
})

export type Program = InferSchemaType<typeof ProgramSchema>
export const Program = model('Program', ProgramSchema)
