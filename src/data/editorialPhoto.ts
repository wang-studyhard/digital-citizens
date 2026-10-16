import mediaManifest from '../../public/media/manifest.json'

export function editorialPhoto(id: string) {
  const asset = mediaManifest.assets.find((item) => item.id === id)
  if (!asset || asset.reviewStatus !== 'approved') throw new Error(`未找到可用的编辑照片：${id}`)
  return asset
}
