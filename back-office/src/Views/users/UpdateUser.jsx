import { useParams } from "react-router-dom"

export default function UpdateUser() {
    const id = useParams().id;
    return (
        <div>
            UpdateUser {id}
        </div>
    )
}