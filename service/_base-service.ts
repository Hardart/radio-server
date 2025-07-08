import mongoose, { mongo } from 'mongoose'

export class BaseService {
  async withTransaction<T>(transactionalFn: (session: mongo.ClientSession) => Promise<T>) {
    const session = await mongoose.startSession()

    try {
      session.startTransaction()

      // Выполняем переданную функцию с передачей сессии
      const result = await transactionalFn(session)

      // Фиксируем транзакцию
      await session.commitTransaction()

      return result
    } catch (error) {
      // Откатываем транзакцию в случае ошибки
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }
}
