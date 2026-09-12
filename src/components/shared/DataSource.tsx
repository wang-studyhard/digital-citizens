interface DataSourceProps {
  /** 参考文献编号 */
  refNumber: number
}

/**
 * 脚注组件：显示上标引用编号
 */
export function DataSource({ refNumber }: DataSourceProps) {
  return (
    <a
      href={`#reference-${refNumber}`}
      aria-label={`查看来源 [${refNumber}]`}
      title={`查看来源 [${refNumber}]`}
      className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-mono text-duck-700 bg-duck-100 rounded-full ml-1 align-middle hover:bg-duck-200 hover:text-duck-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-duck-300 transition-colors"
    >
      {refNumber}
    </a>
  )
}
