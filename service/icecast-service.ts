import { Parser } from 'icecast-parser'
import { Socket } from 'socket.io'
const url_old = 'https://drh-connect.dline-media.com/onair'
// const url = 'http://87.251.66.75:56565/rshstream'

export const readStream = (socket: Socket) => {
  const radioStation = new Parser({ url: url_old, emptyInterval: 2, errorInterval: 5, metadataInterval: 4 })
  radioStation.on('metadata', socketToMetadata(socket))
  radioStation.on('error', console.log)
}

const simpleMeta = {
  artistName: 'Радио Штаны',
  trackTitle: '',
  covers: { art30: '/images/simple_logo.svg', art60: '/images/simple_logo.svg', art100: '/images/simple_logo.svg' },
}

let coversCache: null | object = null
let artistCache: null | string = null

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
    if (streamTitle === 'unknown') return socket.emit('radio:jingle', simpleMeta)
    const { searchTerm, artistTitle, trackTitile } = splitTrackName(streamTitle) // получаем название артиста и трека

    trackMeta.artistName = artistTitle
    trackMeta.trackTitle = trackTitile

    // если кеш пуст либо при изменении имени артиста получаем обложку альбома
    if (!coversCache || trackMeta.artistName !== artistCache) {
      try {
        trackMeta.covers = await iTunesMetadata(searchTerm) // получаем картинки альбома
        coversCache = trackMeta.covers // картинки альбома в кеш
      } catch (error) {
        trackMeta.covers = simpleMeta.covers // сандартные картинки если не получили из Itunes
      }
    } else {
      trackMeta.covers = coversCache
    }

    artistCache = trackMeta.artistName // название артиста в кеш
    socket.emit('radio:track', trackMeta) // отправляем на клиент данные
    return
  }
}

async function iTunesMetadata(searchTerm: string) {
  const params = new URLSearchParams({ term: searchTerm, limit: '1', entity: 'song', media: 'music' })
  const response = await fetch(`https://itunes.apple.com/search?${params}`)
  const { results } = await response.json()
  return getArtWork(results[0])
}

function splitTrackName(title: string) {
  const [artistTitle, trackTitile] = title.split(' - ')
  return { artistTitle, trackTitile, searchTerm: [artistTitle, trackTitile].join(' ') }
}

function getArtWork({ artworkUrl30, artworkUrl60, artworkUrl100 }: any) {
  const art600 = convertArtString(artworkUrl100, 600)
  const art300 = convertArtString(artworkUrl100, 300)
  return { art30: artworkUrl30, art60: artworkUrl60, art100: artworkUrl100, art300, art600 }
}

function convertArtString(art: string, size: number) {
  return art.replace('100x100', `${size}x${size}`)
}
