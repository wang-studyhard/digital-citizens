interface DataSourceProps {
  /** 参考文献编号 */
  refNumber: number
}

/**
 * 脚注组件：显示上标引用编号
 */
export function DataSource({ refNumber }: DataSourceProps) {
  return (
    <sup className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-mono text-duck-600 bg-duck-100 rounded-full ml-0.5 cursor-help hover:bg-duck-200 hover:text-duck-800 transition-colors">
      {refNumber}
    </sup>
  )
}
