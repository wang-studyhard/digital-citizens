type DataSourceProps = {
  refNumber: number
}

export function DataSource({ refNumber }: DataSourceProps) {
  return (
    <a href={`#reference-${refNumber}`} aria-label={`查看来源 [${refNumber}]`} title={`查看来源 [${refNumber}]`} className="data-source" aria-haspopup="dialog" onClick={(event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      window.dispatchEvent(new CustomEvent('open-evidence', { detail: { trigger: event.currentTarget, reference: refNumber } }))
    }}>
      [{refNumber}]
    </a>
  )
}
