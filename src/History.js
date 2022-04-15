
const History = ({historyList}) => {
  

return historyList.map(({description}) => (
    <div>
    <h1>Location name: {description} </h1>
    </div>
    ))
}

export default History;