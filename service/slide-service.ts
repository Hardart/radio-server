import { Slide } from '../models/Slide'

class SlideService {
  async findOne(id: string) {
    return await Slide.findById(id)
  }

  async save(slideData: Slide) {
    return await Slide.create(slideData)
  }

  async updatePriority(slides: Slide[]) {
    await Slide.deleteMany()
    return await Slide.insertMany(slides)
  }

  async deleteOne({ id }: { id: string }) {
    return await Slide.findByIdAndDelete(id)
  }

  async list() {
    return await Slide.find().select('-updatedAt -createdAt').sort({ priority: 'asc' })
  }
}

export default new SlideService()
