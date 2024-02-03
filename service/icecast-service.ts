import { Parser } from 'icecast-parser'
import { Socket } from 'socket.io'
const url = 'https://drh-connect.dline-media.com/onair'

export const readStream = (socket: Socket) => {
  const radioStation = new Parser({ url, emptyInterval: 2, errorInterval: 5 })
  radioStation.on('metadata', socketToMetadata(socket))
  radioStation.on('error', console.log)
}

function socketToMetadata(socket: Socket) {
  let streamTitle = ''
  const trackMeta = {
    artistName: '',
    trackTitle: '',
    covers: {},
  }
  return async function onMetadata(metadata: Map<string, string>) {
    const metadataTitle = metadata.get('StreamTitle')
    if (streamTitle === metadataTitle) return
    streamTitle = metadataTitle ?? 'unknown'
    if (streamTitle === 'unknown') return
    const { searchTerm, artistTitle, trackTitile } = splitTrackName(streamTitle)
    try {
      trackMeta.covers = await iTunesMetadata(searchTerm)
    } catch (error) {
      console.log(error)
    }
    trackMeta.artistName = artistTitle
    trackMeta.trackTitle = trackTitile
    socket.emit('radio:track', trackMeta)
  }
}

async function iTunesMetadata(searchTerm: string) {
  const params = new URLSearchParams({ term: searchTerm, limit: '1', entity: 'song' })
  const response = await fetch(`https://itunes.apple.com/search?${params}`)
  const { results } = await response.json()
  const { artworkUrl30, artworkUrl60, artworkUrl100 } = results[0]
  return { art30: artworkUrl30, art60: artworkUrl60, art100: artworkUrl100 }
}

function splitTrackName(title: string) {
  const [artistTitle, trackTitile] = title.split(' - ')
  return { artistTitle, trackTitile, searchTerm: [artistTitle, trackTitile].join(' ') }
}
