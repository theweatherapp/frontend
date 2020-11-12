import classNames from "classnames"
export const Icon = ({ icon, ...props }) => {
  props.className = classNames("fa fa-" + icon, props.className)
  return <i {...props} />
}
