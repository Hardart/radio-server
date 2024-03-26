import { Host } from '../models/Host'

class HostService {
  async list() {
    return await Host.find()
  }

  async add(host: Host) {
    return await Host.create(host)
  }

  async updateOne(host: Host & { id: string }) {
    return await Host.findByIdAndUpdate(host.id, host, { new: true })
  }
}

export default new HostService()
