import { Parser } from 'icecast-parser'
import ErrorService from './service/error-service'

const radioStation = new Parser({
  url: 'https://stream.lolamedia.ru/rsh_federal',
  emptyInterval: 10,
  errorInterval: 10,
  metadataInterval: 6,
  userAgent: 'HDRT_Parser',
})

radioStation.on('metadata', onMetadata)
radioStation.on('error', err => ErrorService.addError(err))
radioStation.on('empty', () => ErrorService.saveEmpty('Пустые данные'))
let title: string | undefined = ''

function onMetadata(metadata: Map<string, string>) {
  const streamTitle = metadata.get('StreamTitle')
  if (title !== streamTitle) {
    title = streamTitle
    ErrorService.saveStream(title)
  }
}
