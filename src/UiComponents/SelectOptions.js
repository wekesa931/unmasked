import React from 'react';
import Select from 'react-dropdown-select'
import { friendlyWord } from '../Helpers/Helper'

const SelectOptions = ({
    setpeople,
    setmembership,
    setorganization,
    setrelationship,
    setcounter,
    setnodeType,
    nodeType,
    peopleList,
    organizationList,
    membershipList,
    relationshipList,
    people,
    organization,
    membership,
    relationship
}) => {
    const nodeTypeValue = nodeType ? [{ value: nodeType, label: nodeType }] : []
    const nodeOptions = [
        { value: "Person", label: "Person" },
        { value: "Membership", label: "Membership" },
        { value: "Organization", label: "Organization" }
    ]
    let peopleListData = peopleList.map(ppl => {
        return { value: ppl.name, label: ppl.name }
    })
    let orgListData = () => {
        organizationList = organizationList.filter((item, index, self) =>
            index === self.findIndex((t) => (t.name === item.name ))
        )
        return organizationList.map(org => {
            return { value: org.name, label: org.name }
        })
    } 
    let memListData = () => {
        membershipList = membershipList.filter((item, index, self) =>
            index === self.findIndex((t) => (t.name === item.name ))
        )
        return membershipList.map(mem => {
            
            return { value: mem.name, label: mem.name }
        })
    }
    let relListData = relationshipList.map(rel => {
            return { value: rel, label: friendlyWord(rel) }
    })
    return <>
        <div className='filter-input'>
            <div className='margin-three mobile-view'>
                <div>Entity</div>
                <Select className='min-width-295' placeholder="Select Node" options={nodeOptions} values={nodeTypeValue} onChange={(values) => {
                    if (values.length > 0) {
                        if (values[0].value === 'Person') {
                            setpeople(peopleList[0].name)
                        } else if (values[0].value === 'Membership') {
                            setmembership(membershipList[0].name)
                        } else {
                            setorganization(organizationList[0].name)
                        }
                        setnodeType(values[0].value)
                    } else {
                        setnodeType("")
                    }
                }} />
            </div>
            <div className='mobile-view' style={{ display: nodeType === 'Person' ? 'block' : 'none' }}>
                <div>Person: </div>
                <Select className='min-width-295' placeholder="Select Person" values={[{ value: people, label: people }]} options={peopleListData} onChange={(values) => {
                    if (values.length > 0) {
                        setpeople(values[0].value)
                    } else {
                        setpeople('')
                    }

                }} />
            </div>
            <div className='mobile-view' style={{ display: nodeType === 'Organization' ? 'block' : 'none' }}>
                <div>Organization: </div>
                <Select className='min-width-295' placeholder="Select Organization" values={[{ value: organization, label: organization }]} options={orgListData()} onChange={(values) => {
                    if (values.length > 0) {
                        setorganization(values[0].value)
                    } else {
                        setorganization('')
                    }

                }} />
            </div>
            <div className='mobile-view' style={{ display: nodeType === 'Membership' ? 'block' : 'none' }}>
                <div>Membership: </div>
                <Select className='min-width-295' placeholder="Select Membership" values={[{ value: membership, label: membership }]} options={memListData()} onChange={(values) => {
                    if (values.length > 0) {
                        setmembership(values[0].value)
                    } else {
                        setmembership('')
                    }

                }} />
            </div>
            <div className='mobile-view margin-three'>
                <div>Relationship</div>
                <Select className='min-width-295' placeholder="Select Relationship" values={relationship ? [{ value: relationship, label: relationship }] : []} options={relListData} onChange={(values) => {
                    console.log(values)
                    if (values.length > 0) {
                        setrelationship(values[0].value)
                    } else {
                        setrelationship('')
                    }

                }} />
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => setcounter(counter => counter + 1)}>Get Relationship</button>
            <button style={{ background: '#5cb87b', border: '#5cb87b' }} onClick={() => {
                window.location.reload()
            }}>Reset Filters</button>
        </div>
    </>
}

export default SelectOptions;