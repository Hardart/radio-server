import { Schema, model, InferSchemaType } from 'mongoose'

const ArchiveTrackSchema = new Schema(
  {
    createdAt: Schema.Types.Date,
    trackId: { type: Schema.Types.ObjectId, ref: 'Track' },
  },
  { timestamps: false, versionKey: false }
)

export type ArchiveTrack = InferSchemaType<typeof ArchiveTrackSchema>
export const ArchiveTrack = model('ArchiveTrack', ArchiveTrackSchema)
