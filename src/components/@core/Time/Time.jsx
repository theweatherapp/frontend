import { useEffect } from "react"
import { timeString } from "@utils"
import { Icon } from "@components"

export const Time = ({ value: time }) => {
  const value = timeString(new Date(time * 1000)).split(" ")
  return <div className="time">
    <a className="date">{value[0]}</a> {value[1]}
    <Icon icon="clock" />
  </div>
}