import { useState, useEffect } from 'react'

import store from '../store'
import { getStyle } from '@coreui/utils'
import { cilArrowBottom, cilArrowTop } from '@coreui/icons'

export const useSensorStatus = (props) => {
  
  const sensor = props.sensor
  var sensorState = props.state
  const apiUrl = store.getState().apiUrl
  
  const widgetData = {
    title: 'Title',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          backgroundColor: 'rgba(255,255,255,.2)',
          borderColor: 'rgba(255,255,255,.55)',
          data: [],
          fill: true,
        },
      ],
    },
  }

  const [status, setStatus] = useState(widgetData)

  const setSensorStatus = (responseData) => {
    var widget = {}
    widget.title = responseData.title
    widget.direction = responseData.direction === 'top' ? cilArrowTop : cilArrowBottom
    widget.data = {
      labels: responseData.labels,
      datasets: [
        {
          label: responseData.label,
          backgroundColor: responseData.backgroundColor,
          borderColor: responseData.borderColor,
          data: responseData.dataPoints,
          fill: true,
          pointBackgroundColor: getStyle('--cui-info'),
        },
      ],
    }
    return widget
  }

  useEffect(() => {
    fetch(apiUrl + '/status/' + sensor)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((responseData) => {
        responseData.backgroundColor = 'rgba(255,255,255,.5)'
        responseData.backgroundColor = 'rgba(255,255,255,.7)'
        responseData.label = 'UV Index'
        
        setStatus(setSensorStatus(responseData))
      })
  }, [sensorState])

  return [ status, setStatus ]
}
