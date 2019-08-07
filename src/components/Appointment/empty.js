import React from "react"
import Button from "components/Button"


export default function Empty(props) {

return (
  <main class="appointment__add">
  <img
    class="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={() => props.onAdd() }
    />
</main>
)

} 