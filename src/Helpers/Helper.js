export const nodeColor = (label) => {
  let colorNode = {
    // Person: '#fdcb32',
    Person: '#fdcb32',
    Membership: '#2b4fb9',
    Organization: '#5cb87b'
  }
  return colorNode[label]
}

export const legendValues = [
  {
    name: "Person",
    color: "#fdcb32"
  }, {
    name: "Membership",
    color: "#2b4fb9"
  }, {
    name: "Organization",
    color: "#5cb87b"
  }
]

export const textColor = (node) => {
  let text = {
    Person: "white",
    Membership: "White",
    Organization: "white"
  }
  return text[node]
}

export const nodeRadius = (label) => {
  let nodeName = {
    Person: 60,
    Membership: 55,
    Organization: 45
  }
  return nodeName[label]
}

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isLowerCase = (str) => {
  return str === str.toLowerCase() && str !== str.toUpperCase();
}

export const friendlyWord = (word) => {
  const splited = word.split("")

  let newWord = ''
  splited.forEach(sp => {
    if (isLowerCase(sp)) {
      newWord += sp
    } else {
      newWord = newWord + " " + sp
    }
  })
  return capitalize(newWord)
}
export const nodeStartInformation = (data) => {
  return {
    id: data.start.identity.low,
    name: data.start.properties.name ? data.start.properties.name : data.start.properties.label,
    label: data.start.labels[0],
    color: nodeColor(data.start.labels[0]),
    radius: nodeRadius(data.start.labels[0]),
    canHover: true,
    properties: data.start.properties
  }
}

export const nodeEndInformation = (data) => {
  return {
    id: data.end.identity.low,
    name: data.end.properties.name ? data.end.properties.name : data.end.properties.label,
    label: data.end.labels[0],
    color: nodeColor(data.end.labels[0]),
    radius: nodeRadius(data.end.labels[0]),
    canHover: true,
    properties: data.end.properties
  }
}

export const outerColor = (color) => {
  let outColor = {
    blue: '#b7d7ea',
    red: '#eac4c4',
    yellow: '#eae0b3',
  }
  return outColor[color]
}

export const nodeStartInfoForNodeType = (nodeData, data) => {
  return {
    id: data.start.low,
    name: nodeData.find(dat => dat.id === data.start.low)?.name,
    label: nodeData.find(dat => dat.id === data.start.low)?.label,
    color: nodeColor(nodeData.find(dat => dat.id === data.start.low)?.label),
    radius: nodeRadius(nodeData.find(dat => dat.id === data.start.low)?.label),
    canHover: false,
    properties: nodeData.find(dat => dat.id === data.start.low)?.properties,
  }
}

export const nodeEndInfoForNodeType = (nodeData, data) => {
  return {
    id: data.end.low,
    name: nodeData.find(dat => dat.id === data.end.low)?.name,
    label: nodeData.find(dat => dat.id === data.end.low)?.label,
    color: nodeColor(nodeData.find(dat => dat.id === data.end.low)?.label),
    radius: nodeRadius(nodeData.find(dat => dat.id === data.end.low)?.label),
    canHover: false,
    properties: nodeData.find(dat => dat.id === data.end.low)?.properties,
  }
}

//**************** Force graph helpers *****************//
export const customeStringWrap = (node, word) => {
  let itContains = false
  for (let wd of word) {
    if (!node.includes(wd)) {
      itContains = false;
      break;
    } else {
      itContains = true;
    }
  }
  return itContains
}

export const connecedNodes = (node, linkData) => {
  let safeNodes = []

  linkData.forEach(lnk => {
    if (lnk.source === node) {
      safeNodes.push(lnk.source)
      safeNodes.push(lnk.target)
    }
    if (lnk.target === node) {
      safeNodes.push(lnk.source)
      safeNodes.push(lnk.target)
    }
  })
  return safeNodes.filter(function (item, pos) {
    return safeNodes.indexOf(item) === pos;
  })
}

export const mugShotText = (nodeData) => {
  let affetctedText = []
  nodeData.forEach(nd => {
    if(nd.properties.head_shot){
      affetctedText.push(nd.id.toString())
    }
  })
  return affetctedText;
}

export const onHoverMethod = (node, linkData) => {
  let safeNodes = []
  let unsafeNodes = []

  let finalNodes = []

  linkData.forEach(lnk => {
    if (lnk.source === node) {
      safeNodes.push(lnk.source.toString())
      safeNodes.push(lnk.target.toString())
    }
    if (lnk.target === node) {
      safeNodes.push(lnk.source.toString())
      safeNodes.push(lnk.target.toString())
    }
  })


  linkData.forEach(lnk => {
    safeNodes.forEach(nd => {
      if (lnk.source === parseFloat(nd)) {
        finalNodes.push(lnk.source.toString())
        finalNodes.push(lnk.target.toString())
      }
      if (lnk.target === parseFloat(nd)) {
        finalNodes.push(lnk.source.toString())
        finalNodes.push(lnk.target.toString())
      }
    })

  })

  finalNodes = finalNodes.filter(function (item, pos) {
    return finalNodes.indexOf(item) === pos;
  })
  linkData.forEach(nod => {
    unsafeNodes.push(nod.source.toString())
    unsafeNodes.push(nod.target.toString())
  })
  let data = []
  unsafeNodes.forEach(un => {
    if (!finalNodes.includes(un)) {
      data.push(un);
    }
  })
  return data;
}

export const onHoverLinkMethod = (node, linkData) => {
  let safeNodes = []
  let saferNodes = []
  linkData.forEach(lnk => {
    if (lnk.source === node) {
      saferNodes.push(lnk)
    }
    if (lnk.target === node) {
      saferNodes.push(lnk)
    }
  })
  linkData.forEach(lnk => {
    saferNodes.forEach(safer => {
      if (lnk.source === safer.source) {
        safeNodes.push(`link-text-${lnk.source}-link-text-${lnk.target}`)
        safeNodes.push(`link-text-${lnk.target}-link-text-${lnk.source}`)
      }
      if (lnk.target === safer.target) {
        safeNodes.push(`link-text-${lnk.target}-link-text-${lnk.source}`)
        safeNodes.push(`link-text-${lnk.source}-link-text-${lnk.target}`)
      }
    })

  })
  return safeNodes
}

export const onArrowHover = (node, linkData) => {
  let safeNodes = []
  let saferNodes = []
  linkData.forEach(lnk => {
    if (lnk.source === node) {
      saferNodes.push(lnk)
    }
    if (lnk.target === node) {
      saferNodes.push(lnk)
    }
  })
  linkData.forEach(lnk => {
    saferNodes.forEach(safer => {
      if (lnk.source === safer.source) {
        safeNodes.push(`${lnk.name}-${lnk.source.toString()}-${lnk.target.toString()}`)
        safeNodes.push(`${lnk.name}-${lnk.target.toString()}-${lnk.source.toString()}`)
      }
      if (lnk.target === safer.target) {
        safeNodes.push(`${lnk.name}-${lnk.source.toString()}-${lnk.target.toString()}`)
        safeNodes.push(`${lnk.name}-${lnk.target.toString()}-${lnk.source.toString()}`)
      }
    })

  })
  return safeNodes

}