/**
 * Big-number + label stat for the STAR "Result" section.
 * `metric` = { value, label }
 */
export default function MetricStat({ metric }) {
  const { value, label } = metric
  return (
    <div className="bg-secondary p-5">
      <p className="display text-3xl font-semibold leading-none text-foreground sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-muted-foreground">
        {label}
      </p>
    </div>
  )
}
