import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {E, updateState} from "/utils/state"
import "focus-visible/dist/focus-visible"
import "gridjs/dist/theme/mermaid.css"
import {Center, Heading, VStack} from "@chakra-ui/react"
import {Grid} from "gridjs-react"
import NextHead from "next/head"

const EVENT = "http://localhost:8000/event"
export default function Component() {
const [state, setState] = useState({"events": [{"name": "state.hydrate"}]})
const [result, setResult] = useState({"state": null, "events": [], "processing": false})
const router = useRouter()
const Event = events => setState({
  ...state,
  events: [...state.events, ...events],
})
useEffect(() => {
  const update = async () => {
    if (result.state != null) {
      setState({
        ...result.state,
        events: [...state.events, ...result.events],
      })
      setResult({
        state: null,
        events: [],
        processing: false,
      })
    }
    await updateState(state, result, setResult, EVENT, router)
  }
  update()
})
return (
<Center>
<VStack>
<Heading>
{`Welcome to Chicaghost!`}</Heading>
<Grid search={true}
data={[["Red Line", "How does this affect my trip?\r\nBerwyn station is temporarily closed.&nbsp;\r\n\r\nPlease use the adjacent stations at Bryn Mawr or Argyle, located within a few blocks of Berwyn station.\r\n\r\nIn addition, the #92 Foster buses are rerouted to serve Bryn Mawr station. See separate alert for details.\r\n\r\nWhy is service being changed?\r\nLawrence station is temporarily closed for reconstruction as part of the Red and Purple Modernization (RPM) Program.\r\n\r\nMap\r\n\r\nClick on image for a larger view.\r\n\r\n\r\n", "more than an hour"], ["Red Line", "How does this affect my trip?\r\nLawrence station is temporarily closed.&nbsp;\r\n\r\nPlease use the adjacent stations at Argyle or Wilson, located within a few blocks of Lawrence station.\r\n\r\nIn addition, #81 Lawrence buses is rerouted to serve Wilson station for the duration of the temporary closure. See separate alert for details.\r\n\r\nWhy is service being changed?\r\nLawrence station is temporarily closed for reconstruction as part of the Red and Purple Modernization (RPM) Program.\r\n\r\nMap\r\n\r\nClick on image for a larger view.\r\n\r\n\r\n", "more than an hour"]]}
sort={true}
columns={["Line", "Description", "Duration"]}
resizable={true}
pagination={true}/></VStack>
<NextHead>
<title>{`Pynecone App`}</title>
<meta content="favicon.ico"
name="description"/>
<meta property="og:image"
content="A Pynecone app."/></NextHead></Center>
)
}