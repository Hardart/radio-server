import { Schema, model, InferSchemaType } from 'mongoose'

const GlobalSettings = new Schema(
  {
    _id: { type: String, default: 'global' },
    site: {
      enabled: { type: Boolean, required: true, default: true },
      maintenanceMessage: {
        type: String,
        default: 'Сайт временно недоступен'
      }
    }
  },
  { timestamps: false, versionKey: false }
)

export type Settings = InferSchemaType<typeof GlobalSettings>
export const Settings = model('Settings', GlobalSettings)
