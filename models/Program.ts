import { Schema, model, InferSchemaType } from 'mongoose'

const ProgramSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    isPublished: { type: Boolean, default: false },
    description: String,
    image: String,
    color: String,
    hosts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    schedule: [
      {
        properties: [
          {
            start: { hh: { type: String, required: true }, mm: { type: String, required: true } },
            end: { hh: { type: String, required: true }, mm: { type: String, required: true } },
            isReplay: { type: Boolean, default: false }
          }
        ],
        weekdayIds: [{ type: Number, required: true }]
      }
    ]
  },
  { timestamps: false, versionKey: false, toObject: { virtuals: true } }
)

ProgramSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
  }
})

export type Program = InferSchemaType<typeof ProgramSchema>
export const Program = model('Program', ProgramSchema)
