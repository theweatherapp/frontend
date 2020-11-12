import { useNoteDisk } from "@data"
import { config } from "@utils"
import "./Notes.sass"

/**
 * @description Notes component provides interface to takes notes about items
 * @param {{item: string}} INotesProps
 */
export const Notes = ({ item }) => {
  const [notes, setNotes] = useNoteDisk(item, "")

  const onChange = ({ target: { value } }) => setNotes(value)
  return <div className="Notes Card">
    <h3> Notes </h3>
    <textarea value={notes || ""} onChange={onChange} />

  </div>
}