import React from "react";
import { runForceGraph } from "./forceGraphGenerator";
import SourcePage from '../UiComponents/SourcePage'
import { useWindowDimensions } from '../UiComponents/AppHeader/AppHeader'
import { legendValues } from '../Helpers/Helper'
import styles from "./forceGraph.module.css";

export const ForceGraph = ({ sidePenData, showingSidePen, linksData, nodesData, nodeHoverTooltip, padding, setshowSidePane, showSidePane }) => {
    const { width } = useWindowDimensions();
    const containerRef = React.useRef(null);
    
    React.useEffect(() => {
        let destroyFn;

        if (containerRef.current) {
            const { destroy } = runForceGraph(containerRef.current, linksData, nodesData, nodeHoverTooltip, setshowSidePane, width);
            destroyFn = destroy;
        }

        return destroyFn;
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);
    return <>
        {showingSidePen
            && <SourcePage
                width={width}
                sidePenData={sidePenData}
                linksData={linksData}
                setshowSidePane={() => setshowSidePane(false)} />}
        <div id='ref-div' ref={containerRef}
            className={styles.container}
        >
            <div id='legend'>
                {legendValues.map(leg => (
                    <React.Fragment key={leg.color}>
                        <LegendItems 
                        label={leg.name} 
                        color={leg.color}/>
                    </React.Fragment>
                ))}
            </div>
        </div>
    </>
}

const LegendItems = ({ label, color}) => {
    return <div className='legend-node'>
        <div style={{ background: color }} className='legend-color'></div>
        <span>{label}</span>
    </div>
}