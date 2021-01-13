import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner'
import { nodeStartInformation, nodeEndInformation, nodeStartInfoForNodeType, nodeEndInfoForNodeType } from './Helpers/Helper'
import SelectOptions from './UiComponents/SelectOptions'
import AppHeader from './UiComponents/AppHeader/AppHeader'
import AppFooter from './UiComponents/AppFooter/AppFooter'
import { useWindowDimensions } from './UiComponents/AppHeader/AppHeader'
import { ForceGraph } from "./components/forceGraph";
import { checkName } from './Model/Model'
import './App.css';

const App = () => {
  const { width } = useWindowDimensions();
  const [nodeData, setnodeData] = useState([])
  const [nodeType, setnodeType] = useState('');
  const [padding, setpadding] = useState('0%');
  const [linkData, setlinkData] = useState([])
  const [loading, setloading] = useState(true);
  const [finalNodeData, setfinalNodeData] = useState();
  const [peopleList, setpeopleList] = useState([]);
  const [organizationList, setorganizationList] = useState([]);
  const [relationshipList, setrelationshipList] = useState([]);
  const [organization, setorganization] = useState('');
  const [membershipList, setmembershipList] = useState([]);
  const [relationship, setrelationship] = useState('');
  const [membership, setmembership] = useState('');
  const [people, setpeople] = useState('');
  const [counter, setcounter] = useState(0);
  const [showSidePane, setshowSidePane] = useState(false);
  const [sidePenData, setsidePenData] = useState({});
  const nodeHoverTooltip = React.useCallback((node) => {
    let name = node.name
    node && setsidePenData({ ...node.properties, nodeId: node.id })
    setshowSidePane(true)
    return `<div>     
      <b id='morion-font'>${name}</b>
      <br/>
      <i id='view-more-details'>Double click to view source</i>
    </div>`;
  }, []);


  useEffect(() => {
    setloading(true)
    const getData = async () => {
      try {
        const neoData = await checkName({ nodeType, organization, relationship, people, membership })
        if (neoData.length === 0) {
          alert("No data was found")
          setloading(false)
          return;
        }
        if (relationship && !nodeType) {
          let nodes = []
          let links = []
          neoData.forEach(data => {
            let start = nodeStartInformation(data)
            let end = nodeEndInformation(data)
            nodes = [...nodes, start, end]
            let relationship = data.segments[0].relationship
            links = [...links, {
              name: relationship.type,
              source: relationship.start.low,
              target: relationship.end.low,
              linkLength: 300,
              opacity: neoData.length > 7 ? 0 : 1
            }]
            setfinalNodeData(nodes.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
            setlinkData(links)
            setpadding('0%')
          })
        } else if (nodeType) {
          if (organization || people || membership) {
            let nodes = []
            let links = []
            neoData.forEach(data => {
              let start = nodeStartInfoForNodeType(nodeData, data)
              let end = nodeEndInfoForNodeType(nodeData, data)
              nodes = [...nodes, start, end]
              links = [...links, {
                name: data.type,
                source: data.start.low,
                target: data.end.low,
                linkLength: 300,
                opacity: 1
              }]
            })
            setfinalNodeData(nodes.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
            setlinkData(links)
            setpadding('0%')
          }
        } else {
          fixAllData(neoData)
          setpadding('12%')
        }

      } catch (e) {
        console.log(e.message)
      }
      setloading(false)
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const fixAllData = (neoData) => {
    let nodes = []
    let links = []
    let peopleNames = []
    let membershipType = []
    let organizationType = []
    let relationshipType = []
    neoData.forEach(data => {
      let start = nodeStartInformation(data)
      let end = nodeEndInformation(data)

      let peopleStart = data.start.labels[0] === 'Person' ? [{ id: data.start.identity.low, name: data.start.properties.name }] : []
      let peopleEnd = data.end.labels[0] === 'Person' ? [{ id: data.end.identity.low, name: data.end.properties.name }] : []
      let orgStart = data.start.labels[0] === 'Organization' ? [{ id: data.start.identity.low, name: data.start.properties.name }] : []
      let orgEnd = data.end.labels[0] === 'Organization' ? [{ id: data.end.identity.low, name: data.end.properties.name }] : []
      let membStart = data.start.labels[0] === "Membership" ? [{ id: data.start.identity.low, name: data.start.properties.label }] : []
      let membEnd = data.end.labels[0] === "Membership" ? [{ id: data.end.identity.low, name: data.end.properties.label }] : []
      peopleNames = [...peopleNames, ...peopleStart, ...peopleEnd]
      nodes = [...nodes, start, end]
      organizationType = [...organizationType, ...orgStart, ...orgEnd]
      relationshipType = [...relationshipType, data.segments[0].relationship.type]
      membershipType = [...membershipType, ...membStart, ...membEnd]

      let relationship = data.segments[0].relationship
      links = [...links, {
        name: relationship.type,
        source: relationship.start.low,
        target: relationship.end.low,
        linkLength: 300,
        opacity: 0
      }]
    })
    setmembershipList(membershipType.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
    setpeopleList(peopleNames.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
    setorganizationList(organizationType.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
    setrelationshipList(relationshipType.filter((item, i) => relationshipType.indexOf(item) === i))
    setnodeData(nodes.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
    setfinalNodeData(nodes.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i))
    setlinkData(links)
  }


  return (
    <div>
      <AppHeader />
      {(linkData.length > 0 && finalNodeData.length > 0)
        && <SelectOptions
          setpeople={val => setpeople(val)}
          setmembership={val => setmembership(val)}
          setorganization={val => setorganization(val)}
          setrelationship={val => setrelationship(val)}
          setcounter={val => setcounter(val)}
          setnodeType={val => setnodeType(val)}
          nodeType={nodeType}
          peopleList={peopleList}
          organizationList={organizationList}
          membershipList={membershipList}
          relationshipList={relationshipList}
          people={people}
          organization={organization}
          membership={membership}
          relationship={relationship}
        />}
        <div className='flex-center'>
          <p style={{ display: width < 820 && !loading ? 'block' : 'none'}}>Long press node to view summary</p>
        </div>
      <section className="Main"> {
        (loading === false && linkData.length > 0 && finalNodeData.length > 0)
          ?
          <ForceGraph
          sidePenData={sidePenData}
            loading={loading}
            linksData={linkData}
            nodesData={finalNodeData}
            nodeHoverTooltip={nodeHoverTooltip}
            padding={padding}
            showingSidePen={showSidePane}
            showSidePane={() => setshowSidePane(true)}
            setshowSidePane={() => setshowSidePane(false)}
          />
          : <div className='auto-loader'>
            <Loader
              type="TailSpin"
              color="#243c90"
              height={100}
              width={100}
            />
          </div>

      } </section>
      <AppFooter />
    </div>
  );
}

export default App;