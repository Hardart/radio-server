import { Program } from '../models/Program'

class ProgramService {
  async list() {
    return await Program.find()
  }
}

export default new ProgramService()

// async list() {
//   return await Program.aggregate([
//     {
//       $unwind: '$schedule',
//     },
//     {
//       $unwind: '$schedule.dayId',
//     },
//     { $sort: { 'schedule.start': 1 } },
//     {
//       $group: {
//         _id: '$schedule.dayId',
//         programs: {
//           $push: {
//             title: '$title',
//             isReplay: '$schedule.isReplay',
//             start: '$schedule.start',
//             end: '$schedule.end',
//             image: '$image',
//             hosts: '$hosts',
//           },
//         },
//       },
//     },
//     {
//       $sort: {
//         _id: 1,
//       },
//     },
//   ])
// }
