type DataSourceProps = {
  refNumber: number
}

export function DataSource({ refNumber }: DataSourceProps) {
  return (
    <a href={`#reference-${refNumber}`} aria-label={`查看来源 [${refNumber}]`} title={`查看来源 [${refNumber}]`} className="data-source">
      [{refNumber}]
    </a>
  )
}
