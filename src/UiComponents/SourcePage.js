import React, { useEffect, useState } from 'react';
import { friendlyWord } from '../Helpers/Helper'

const occurrencesOf = (number, numbers) => numbers.reduce((counter, currentNumber) => (number === currentNumber ? counter + 1 : counter), 0);

const SourcePage = ({ sidePenData, linksData, setshowSidePane, width }) => {
    const [finalTally, setfinalTally] = useState([]);
    useEffect(() => {
        let relNodes = []
        let final = []
        linksData.forEach(lnk => {
            if (lnk.source === sidePenData.nodeId) {
                relNodes.push(lnk.name)
            }
            if (lnk.target === sidePenData.nodeId) {
                relNodes.push(lnk.name)
            }
        })

        const unique = relNodes.filter(function (item, pos) {
            return relNodes.indexOf(item) === pos;
        })
        unique.forEach((rel, i) => {
            final.push({ name: rel, num: occurrencesOf(rel, relNodes) })
        })
        setfinalTally(final)
    }, [sidePenData.nodeId, linksData]);

    const sideData = (label, data, font) => (<>
        { label !== 'Label' && <div className={`click-to-view label-text ${font}`}>{label}</div>}
        <div className={`click-to-view value-text ${font}`}>{data}</div>
    </>)

    const sideDataImage = (img) => (
        <div className='click-to-view'>
            <img width={80} src={img} alt="userImage" />
        </div>
    )
    return <div className='source-page'>
        <div className='close-btn' onClick={() => setshowSidePane()}><span style={{ display: width < 820 ? 'block' : 'none'}} >Close</span></div>
        <div style={{ marginTop: "10px" }}>
            {sidePenData.head_shot && sideDataImage(sidePenData.head_shot)}
            {sidePenData.name && sideData("Name", sidePenData.name, 'morion-font')}
            {sidePenData.label && sideData("Label", sidePenData.label, 'morion-font')}
            {sidePenData.gender && sideData("Gender", sidePenData.gender, 'morion-font')}
            {sidePenData.summary && sideData("Summary", sidePenData.summary, '')}
            <div className={`click-to-view label-text morion-font`}>Relationships</div>
            <table id="rel-data">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Nodes</th>
                    </tr>
                </thead>
                <tbody>
                    {finalTally.map(tally => (
                        <tr key={tally.name}>
                            <td>{friendlyWord(tally.name)}</td>
                            <td>{tally.num}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='click-to-view'>
                <a href={sidePenData.id} target="blank">Click to view Source</a>
            </div>
        </div>
    </div>;
}

export default SourcePage;