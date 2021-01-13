import * as d3 from "d3";
import { mugShotText, friendlyWord, outerColor, textColor, onArrowHover, onHoverLinkMethod, onHoverMethod, connecedNodes, customeStringWrap } from '../Helpers/Helper'
import styles from "./forceGraph.module.css";


export function runForceGraph(
  container,
  linksData,
  nodesData,
  nodeHoverTooltip,
  setshowSidePane,
  deviceWidth
) {
  const links = linksData.map((d) => Object.assign({}, d));
  const nodes = nodesData.map((d) => Object.assign({}, d));

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;
  const isMobile = deviceWidth < 600;

  const labelName = (d) => {
    return d.name;
  }
  const mouseOut = (d) => {
    d3.select(this).style("cursor", "default")
    if (d.canHover) {
      onHoverMethod(d.id, linksData).forEach(item => {
        d3.select(`.node-${item}`).attr("opacity", 1)
        d3.select(`.label-${item}`).attr("opacity", 1)
      })
      onHoverMethod(d.id, linksData).forEach(item => {
        d3.selectAll(`.link-${item}`).attr("stroke-opacity", 0.6)
        d3.selectAll(`.link-${item}`).attr("opacity", 0.6)
      })
      if (nodesData.length > 7) {
        onHoverLinkMethod(d.id, linksData).forEach(item => {
          d3.select(`.${item}`).attr("opacity", 0)
        })
        onArrowHover(d.id, linksData).forEach(item => {
          d3.select(`#${item}`).attr("fill-opacity", 0)
        })
      }
      mugShotText(nodes).forEach(item => {
        d3.select(`.label-${item}`).attr("opacity", 0)
      })
    }
    removeTooltip()
    setshowSidePane()
  }
  const mouseOver = (d) => {
    d3.select(this).style("cursor", "pointer");
    if (d.canHover) {
      onHoverMethod(d.id, linksData).forEach(item => {
        d3.select(`.node-${item}`).attr("opacity", 0.1)
        d3.select(`.label-${item}`).attr("opacity", 0.05)
      })
      onHoverMethod(d.id, linksData).forEach(item => {
        d3.selectAll(`.link-${item}`).attr("stroke-opacity", 0)
        d3.selectAll(`.link-${item}`).attr("opacity", 0)
      })
      onHoverLinkMethod(d.id, linksData).forEach(item => {
        d3.select(`.${item}`).attr("opacity", 1)
      })
      onArrowHover(d.id, linksData).forEach(item => {
        d3.select(`#${item}`).attr("fill-opacity", 1)
      })
      mugShotText(nodes).forEach(item => {
        d3.select(`.label-${item}`).attr("opacity", 1)
      })
    }
    addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
  }
  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 1,
        lineHeight = 1, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")) || 0,
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      let mainWidth = 50
      let dx = -30
      if (customeStringWrap(words, ["Director", "Vucan", "Lab"])) {
        mainWidth = 65;
        dx = -45
      }
      if (customeStringWrap(words, ["Director", "at", "KEMSA"])) {
        mainWidth = 50;
        dx = -40
      }
      if (customeStringWrap(words, ["Chairman", "of", "Council"])) {
        dx = -45
      }
      if (customeStringWrap(words, ["Director", "Shareholder", "Kilig"])) {
        dx = -45
      }
      if (customeStringWrap(words, ["Director", "Pevans", "Africa"])) {
        dx = -45
      }
      if (customeStringWrap(words, ["Director", "Shareholder", "Ziwala"])) {
        dx = -50
        mainWidth = 70;
      }
      while (true) {
        word = words.pop()
        if (!word) {
          break;
        }
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > mainWidth) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr('dx', dx).attr("y", y).attr("dy", (lineNumber * lineHeight) + "em").text(word);
        }
      }
    });
  }

  const drag = (simulation) => {
    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = d.x;
      d.fy = d.y;
    };

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  // Add the tooltip element to the graph
  const tooltip = document.querySelector("#graph-tooltip");
  if (!tooltip) {
    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add(styles.tooltip);
    tooltipDiv.style.opacity = "0";
    tooltipDiv.id = "graph-tooltip";
    document.body.appendChild(tooltipDiv);
  }
  const div = d3.select("#graph-tooltip");

  const addTooltip = (hoverTooltip, d, x, y) => {
    div
      .transition()
      .duration(200)
      .style("opacity", 0.9);
    div
      .html(hoverTooltip(d))
      .style("left", `${x}px`)
      .style("top", `${y - 28}px`);
  };

  const removeTooltip = () => {
    div
      .transition()
      .duration(200)
      .style("opacity", 0);
  };

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(function (d) {
      if (isMobile) {
        return 50
      } else {
        return 300
      }

    }).strength(() => {
      if (isMobile) {
        return 0.5
      } else {
        return 0.5
      }
    }))
    .force("charge", d3.forceManyBody().strength(() => {
      if (isMobile) {
        return -10
      } else {
        return -10
      }
    }))
    .force('collide', d3.forceCollide(() => {
      if (isMobile) {
        return 35
      } else {
        return 48
      }
    }))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height]);
  // .call(d3.zoom().on("zoom", function () {
  //   svg.attr("transform", d3.event.transform);
  // }));

  svg
    .append("g")
    .attr("stroke-opacity", 0)
    .selectAll("marker")
    .data(links)
    .enter().append("svg:marker")    // This section adds in the arrows
    .attr("fill-opacity", d => d.opacity)
    .attr("id", (d) => `${d.name}-${d.source.id.toString()}-${d.target.id.toString()}`)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", 0.6)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");


  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .enter().append("polyline")
    .attr("class", d => `link-${d.source.id.toString()} link-${d.target.id.toString()}`)
    .text(function (d) {
      return d.name;
    })
    .attr("stroke-width", 1);

  const linkText = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(links)
    .enter()
    .append("text")
    .attr("class", (d) => `link-text-${d.source.id.toString()}-link-text-${d.target.id.toString()} link-text-${d.target.id.toString()}-link-text-${d.source.id.toString()}`)
    .attr("font-family", "'Roboto', sans-serif")
    .attr("x", function (d) {
      if (d.target.x > d.source.x) {
        return (d.source.x + (d.target.x - d.source.x) / 2);
      }
      else {
        return (d.target.x + (d.source.x - d.target.x) / 2);
      }
    })
    .attr("y", function (d) {
      if (d.target.y > d.source.y) {
        return (d.source.y + (d.target.y - d.source.y) / 2);
      }
      else {
        return (d.target.y + (d.source.y - d.target.y) / 2);
      }
    })
    .attr("fill", "black")
    .style("font", "normal 12px Arial")
    .attr("opacity", d => d.opacity)
    .attr("dy", ".35em")
    .text(function (d) { return friendlyWord(d.name); });

  var defs = svg.append("defs")

  var imagePattern = defs
    .selectAll("pattern")
    .data(nodes)
    .enter()
    .append("pattern")
    .attr("id", (d) => `imagePattern-${d.id}`)
    .attr("height", 1)
    .attr("width", 1)
    .attr("x", "0")
    .attr("y", "0")

    // .attr("x", 0)
    // .attr("y", -80)
    // .attr("height", 280)
    // .attr("width", 120)

  imagePattern.append("image")
    .attr("x", 0)
    .attr("y", (d) => {
      if (connecedNodes(d.id, linksData).length > 5) {
        return -80;
      } else {
        return -40;
      }
    })
    .attr("height", (d) => {
      if (connecedNodes(d.id, linksData).length > 5) {
        return 280;
      } else {
        return 150;
      }
    })
    .attr("width",  (d) => {
      if (connecedNodes(d.id, linksData).length > 5) {
        return 120;
      } else {
        return 70;
      }
    })
    .attr("xlink:href", (d) => {
      if (d.properties.head_shot) {
        return `${d.properties.head_shot}`
      } else {
        return ""
      }
    })

  const node = svg
    .append("g")
    .attr("stroke-width", 40)
    .attr("stroke-fill", "red")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("stroke", (d) => outerColor(d.color))
    .attr("r", (d) => {
      if (connecedNodes(d.id, linksData).length > 5) {
        return isMobile ? 40 : 55
      } else if (connecedNodes(d.id, linksData).length > 3) {
        return isMobile ? 35 : 40
      } else {
        return isMobile ? 25 : 35
      }
    })
    .attr("fill", (d) => {
      if (d.properties.head_shot) {
        return `url(#imagePattern-${d.id})`
      } else {
        return d.color
      }

    })
    .attr("class", d => 'node-' + d.id.toString())
    .style('cursor', 'pointer')
    .on('dblclick', (d) => {
      var win = window.open(d.properties.id, '_blank');
      win.focus();
    })
    .on('dblTap', (d) => {
      var win = window.open(d.properties.id, '_blank');
      win.focus();
    })
    .on("click", function (d) {
      addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
    })
    .call(drag(simulation));

  const label = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("font-family", "Roboto', sans-serif")
    .style("font-size", () => {
      if (isMobile) {
        return "6px"
      } else {
        return "9px"
      }
    })
    .style("font-weight", 800)
    .style("stroke-width", 4)
    .attr('text-anchor', 'middle')
    .attr('opacity', (d) => {
      if(d.properties.head_shot){
        return 0
      } else {
        return 1
      }
    })
    .attr('dominant-baseline', 'text-after-edge')
    .attr('fill', (d) => {
      return textColor(d.label)
    })
    .attr("class", d => 'label-' + d.id.toString())
    .text(d => { return labelName(d); })
    .call(drag(simulation))
    .style('cursor', 'pointer')
    .on('dblclick', (d) => {
      var win = window.open(d.properties.id, '_blank');
      win.focus();
    })
    .on('dblTap', (d) => {
      var win = window.open(d.properties.id, '_blank');
      win.focus();
    })
    .on("click", function (d) {
      addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
    })
    .call(wrap, 100);


  label.on("mouseover", (d) => {
    mouseOver(d)
  })
    .on("mouseout", (d) => {
      mouseOut(d)
    });

  node.on("mouseover", (d) => {
    mouseOver(d)
  })
    .on("mouseout", (d) => {
      mouseOut(d)
    });

  simulation.on("tick", () => {
    link.attr("points", function (d) {
      return d.source.x + "," + d.source.y + " " +
        (d.source.x + d.target.x) / 2 + "," + (d.source.y + d.target.y) / 2 + " " +
        d.target.x + "," + d.target.y;
    })
      .attr("marker-mid", (d) => `url(#${d.name}-${d.source.id.toString()}-${d.target.id.toString()})`);
    linkText
      .attr("x", function (d) {
        return ((d.source.x + d.target.x) / 2);
      })
      .attr("y", function (d) {
        return ((d.source.y + d.target.y) / 2);
      });

    // update node positions
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    // update label positions
    label
      .attr("x", d => { return d.x; })
      .attr("y", d => { return d.y; })
  });

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    }
  };
}
