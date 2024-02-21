import { Schema, model, InferSchemaType } from 'mongoose'

const ArchiveTrackSchema = new Schema(
  {
    date: Schema.Types.Date,
    trackId: { type: Schema.Types.ObjectId, ref: 'Track' },
  },
  { timestamps: false, versionKey: false }
)

ArchiveTrackSchema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id
  },
})

export type ArchiveTrack = InferSchemaType<typeof ArchiveTrackSchema>
export const ArchiveTrack = model('ArchiveTrack', ArchiveTrackSchema)
