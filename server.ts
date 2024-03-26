import { Parser } from 'icecast-parser'
import ErrorService from './service/error-service'

const radioStation = new Parser({
  url: 'https://stream.lolamedia.ru/rsh_federal',
  emptyInterval: 4,
  errorInterval: 5,
  metadataInterval: 5,
  userAgent: 'HDRT_Parser',
})
radioStation.on('metadata', onMetadata)
radioStation.on('error', console.log)
radioStation.on('empty', console.log)
let title: string | undefined = ''
function onMetadata(metadata: Map<string, string>) {
  const streamTitle = metadata.get('StreamTitle')
  if (title !== streamTitle) {
    title = streamTitle
    ErrorService.saveStream(title)
  }
}
