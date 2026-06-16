/**
 * Big-number + label stat for the STAR "Result" section.
 * `metric` = { value, label }
 */
export default function MetricStat({ metric }) {
  const { value, label } = metric
  return (
    <div className="border-t-2 border-primary bg-card p-5">
      <p className="display text-3xl font-semibold leading-none text-foreground sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
    </div>
  )
}
