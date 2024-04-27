let zak = "zak"
let sally = "sally"
let holly = "holly"
let molly = "molly"

const element = (
    <ul style={{'color': 'blue', 'fontSize': '24px'}}>
        <li>{zak}</li>
        <li>{sally}</li>
        <li>{holly}</li>
        <li>{molly}</li>
    </ul>
)
ReactDOM.render(element, document.getElementById("content"))
