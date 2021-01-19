const neo4j = require('neo4j-driver')
const user = 'neo4j'
const password = "nmgunmasked"

const driver = neo4j.driver("bolt://34.254.94.175:7687", neo4j.auth.basic(user, password), {encrypted: 'ENCRYPTION_OFF'})

export const checkName = async(body) => {
    let url = "MATCH p=()-[r]->() RETURN p"
    let nodeType = body.nodeType
    let relation = body.relationship
    if(relation){
        url = `MATCH p=()-[r:${relation}]->() RETURN p`
        if(nodeType){
            url = `MATCH (a:${nodeType})-[r:${relation}]-(b) RETURN r,a,b`
        }
    }
    if(nodeType){
        if(nodeType === 'Person' && body.people.length > 0){
            url = `MATCH (a:${nodeType} {name: '${body.people}'})-[r]-(b) RETURN r,a,b`
            if(relation){
                url = `MATCH (a:${nodeType} {name: '${body.people}'})-[r:${relation}]-(b) RETURN r,a,b` 
            }
        } else if(nodeType === 'Membership' && body.membership.length > 0){
            url = `MATCH (a:${nodeType} {label: '${body.membership}'})-[r]-(b) RETURN r,a,b`
            if(relation){
                url = `MATCH (a:${nodeType} {label: '${body.membership}'})-[r:${relation}]-(b) RETURN r,a,b` 
            }
        } else if(nodeType === 'Organization' && body.organization.length > 0) {
            url = `MATCH (a:${nodeType} {name: '${body.organization}'})-[r]-(b) RETURN r,a,b`
            if(relation){
                url = `MATCH (a:${nodeType} {name: '${body.organization}'})-[r:${relation}]-(b) RETURN r,a,b` 
            }
        } else {
            url = `MATCH (n:${nodeType}) RETURN n`
        }
    }

    const session = driver.session()
    try {
        const result = await session.run(
            url
        )
        let allRecords = []
        result && result.records && result.records.forEach(record => {
            allRecords.push(record.get(0))
        });
        // console.log(allRecords)
        return allRecords;
    } catch (e) {
        console.log(e.message)
    } finally {
        await session.close()
    }
}