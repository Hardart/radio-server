import { Schema, model, InferSchemaType } from 'mongoose'

const ArchiveTrackSchema = new Schema(
  {
    createdAt: Schema.Types.Date,
    trackId: { type: Schema.Types.ObjectId, ref: 'Track' },
  },
  { timestamps: false, versionKey: false }
)

ArchiveTrackSchema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret) {
    ret.track = ret.trackId
    delete ret._id
    delete ret.trackId
  },
})

ArchiveTrackSchema.virtual('track', {
  ref: 'Track',
  localField: 'trackId',
  foreignField: '_id',
  justOne: true,
})

export type ArchiveTrack = InferSchemaType<typeof ArchiveTrackSchema>
export const ArchiveTrack = model('ArchiveTrack', ArchiveTrackSchema)
