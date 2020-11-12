import { Fragment } from "react"
import { useDisk } from "@data"
import "./ErrorView.sass"
const errorMessages = {
  101: "Invalid API key.",
  104: "API Limit Exceeded for key."
}

export const ErrorView = () => {
  const [error] = useDisk("error")
  const message = (error && error.code && errorMessages[error.code]) ? errorMessages[error.code] + " Please Contact support." : null
  return message
    ? <div className="ErrorView">
      <h1> Error </h1>
      <pre>{message}</pre>
    </div>
    : <Fragment />
}