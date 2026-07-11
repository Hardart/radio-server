import { Settings } from '../models/GlobalSettings'

class SettingsService {
  async list() {
    return await Settings.findOne().lean()
  }

  async changeSiteStatus({ status }: { status: boolean }) {
    return await Settings.updateOne({ _id: 'global' }, { $set: { 'site.enabled': status } }, { upsert: true })
  }
  async create() {
    return await Settings.updateOne({ _id: 'global' }, {}, { upsert: true })
  }

  async update(settings: Settings) {
    return await Settings.replaceOne({ _id: 'global' }, settings, { upsert: true })
  }
}

export default new SettingsService()
