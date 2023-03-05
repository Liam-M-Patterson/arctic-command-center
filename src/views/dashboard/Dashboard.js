import { React, useState, useEffect } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormRange,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CSpinner,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useSensorStatus }  from '../../hooks/sensorStatus'

import store from '../../store'

// Imports from the charts library
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  ScatterChart,
  AreaChart, 
  Resizable, 
  styler, 
  Legend,
} from "react-timeseries-charts";

import { TimeSeries, TimeRange } from "pondjs";
import _ from "underscore";
import StackedChart  from './StackedChart';
import Radar from './Radar';




const Dashboard = () => {
  const [title, setTitle] = useState([])

  const apiUrl = store.getState().apiUrl;
  const backendUrl = store.getState().backendUrl;
  const GCLOUD_URL = store.getState().GCLOUD_URL;
  const socket = store.getState().socket;

  useEffect(() => {
    fetch(backendUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .catch(() => {
        return { title: 'Could not connect to the backend service.' };
      })
      .then((data) => {
        setTitle(data.title);
      })
  }, []);

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connected');
    });
  }, []);

  useEffect(() => {
    
    socket.on('message', data => {
      console.log('got message', data);
      setMessage(data);
      // socket.emit('liam');
    });
  }, []);
  // KINDA USELESS STUFF
  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  const data = {
    name: "traffic",
    columns: ["time", "value"],
    points: [
        [1400425947000, .52],
        [1400425948000, .18],
        [1400425949000, .26],
        [1400425950000, .93],
    ]
  }
  const series1 = new TimeSeries(data);

  // Intrusion Detection
  const [img, setImg] = useState();
  const [detectImg, setDetectImg] = useState();

  const [imgSpinner, setImgSpinner] = useState(false);
  const [imgDetectSpinner, setImgDetectSpinner] = useState(false);
 
  const fetchImage = async () => {
    const res = await fetch(apiUrl+'/img')
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  function makeImageUrl(data) {

    const imageData = atob(data);
    const byteArray = new Uint8Array(imageData.length);
    for (let i = 0; i < imageData.length; i ++) {
      byteArray[i] = imageData.charCodeAt(i);
    }

    const imageBlob = new Blob([byteArray, {type: 'image/png'}]);
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;
  }

  function setUndetectedImage(img) {
    const imageObjectURL = makeImageUrl(img);
    setImg(imageObjectURL);
    setImgSpinner(false);
    setImgDetectSpinner(true);
  } 

  function setDetectedImage(img) {
    const detectImgURL = makeImageUrl(img);
    setDetectImg(detectImgURL);
    setImgDetectSpinner(false);
  } 

  const takeNewImage = async () => {

    setImgSpinner(true);
    setImgDetectSpinner(true);

    var endpoint = apiUrl.match('localhost') ? '/get/img' : '/take/img';
    // var endpoint = '/take/img';
    const url = apiUrl+endpoint;

    const filename = await fetch(url)
      .then(response => response.json())
      .then(data => {
        const filename = data.filename;

        setUndetectedImage(data.image);
        return filename;
      });
    

    const detectUrl = apiUrl+'/detect/img';

    const detectRes = await fetch(detectUrl, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({filename: filename})
    });

    const detectImgBlob = await detectRes.blob();
    setDetectedImage(detectImgBlob);
  } 

  // wait on socket for img
  useEffect(() => {
    socket.on('img', data => {
      console.log(data)
      setUndetectedImage(data.image);
    });
  }, []);

  // wait on socket for detected img
  useEffect(() => {
    socket.on('detected img', data => {
      setDetectedImage(data.image);
    });
  }, []);

  // Sensor Displays

  const [ledWidgetState, setledWidgetState] = useState(0)
  const [ledWidget, setledWidget] = useSensorStatus({sensor: 'ledTime', state: ledWidgetState })
  // setTimeout(() => setledWidgetState(ledWidgetState+1), 10000)
  

  const [led_ON_MS, setLED_ON_MS] = useState(5000);
  const [led_OFF_MS, setLED_OFF_MS] = useState(5000);


  const updateLedFreq = async(data) => {
    var msg = data.ON ? 'H' : 'L';
    msg += data.ms;

    console.log('updating ', msg)

    const res = await fetch(apiUrl+'/update/led?message='+msg);

  };

  const sketch = (p) => {
    p.setup = () => {
    p.createCanvas(400, 400);
    };

    p.draw = () => {
    p.background(255, 255, 255);
    p.fill(0, 0, 0);
    p.ellipse(200, 200, 100, 100);
    };
  };

  // RADAR Vars
  const [iAngle, setIAngle] = useState(0);
  const [iDistance, setIDistance] = useState(0);
  const [radarDir, setRadarDir] = useState(1);
  setTimeout(() => {
    if (iAngle == 180) setRadarDir(-1)
    else if (iAngle == 0) setRadarDir(1)
      
    setIAngle(iAngle+radarDir);
    // setIDistance(random(0, 180));
  }, 100);

  return (
    <>

      <div className='d-flex justify-content-center'>
        <h1>{title}</h1>
        {message}
      </div>
    
      <WidgetsDropdown />

      <CRow>
        <div className='d-flex justify-content-center'>
          <h1> Intrusion Detection </h1>
        </div>

        <CCol>
          <div className='d-flex justify-content-center'>
            <h3> Latest Image </h3>
          </div>
          <div className='d-flex justify-content-center'>
            
            { imgSpinner ? 
              <> 
                <CSpinner /> <p> Taking Picture</p>
              </> 
              :
                <img src={img} alt="No Image" style={{maxWidth:'100%', maxHeight:'100%'}}/>
            } 
          </div>
        </CCol>

        <CCol>
          <div className='d-flex justify-content-center'>
            <h3> Detected Image </h3>
          </div>
          <div className='d-flex justify-content-center'>

            { imgDetectSpinner ? 
              <> 
                <CSpinner /> <p> Detecting Intrusion</p>
              </> 
              :
              <img src={detectImg} alt="No Image" style={{maxWidth:'100%', maxHeight:'100%'}} />
            }
          </div>
        </CCol>
      </CRow>

      <CRow className='my-2'>        
        <CCol>
          <div className='d-flex justify-content-center'>
            <CButton onClick={takeNewImage}>Capture New Image</CButton>
          </div>
          {/* <CRow className='my-5'>
            <CRow>
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon1">LED ON</CInputGroupText>
                <CFormInput defaultValue={led_ON_MS} onChange={(e) => {setLED_ON_MS( e.target.value) }}/>
                <CInputGroupText id="basic-addon1">ms</CInputGroupText>
                <CButton onClick={() => {updateLedFreq({ms: led_ON_MS, ON: true})}}>Update</CButton>
              </CInputGroup>
            </CRow>

            <CRow>
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon1">LED OFF</CInputGroupText>
                <CFormInput defaultValue={led_OFF_MS} onChange={(e) => {setLED_OFF_MS( e.target.value )}}/> 
                <CInputGroupText id="basic-addon1">ms</CInputGroupText>
                <CButton onClick={() => {updateLedFreq({ms: led_OFF_MS, ON: false})}}>Update</CButton>
              </CInputGroup>
            </CRow>
          </CRow> */}
        </CCol>
      </CRow>
      
      {/* <CRow > */}
        <div id="canvasWrapper" className='d-flex justify-content-center' 
          // style={{maxWidth:'100%', height: 500}}
        >
          <Radar  iAngle={iAngle} iDistance={iDistance}>

          </Radar>  
        </div>
      {/* </CRow> */}


      <CRow className='my-5 d-none'>
        <ChartContainer timeRange={series1.timerange()} width={800}>
            <ChartRow height="200">
                <YAxis id="axis1" label="AUD"  width="60" type="linear" />
                <Charts>
                    <LineChart axis="axis1" series={series1}/>
                    {/* <LineChart axis="axis2" series={series2}/> */}
                </Charts>
                {/* <YAxis id="axis2" label="Euro" width="80" type="linear" format="$,.2f"/> */}
            </ChartRow>
        </ChartContainer>
      </CRow>

     
      <CRow>
        <StackedChart/>
      </CRow>
      
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={ledWidget?.data}
            // data={{
            //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            //   datasets: [
            //     {
            //       label: 'My First dataset',
            //       backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
            //       borderColor: getStyle('--cui-info'),
            //       pointHoverBackgroundColor: getStyle('--cui-info'),
            //       borderWidth: 2,
            //       data: [
            //         random(50, 200),
            //         random(50, 200),
            //         random(50, 200),
            //         random(50, 200),
            //         random(50, 200),
            //         random(50, 200),
            //         random(50, 200),
            //       ],
            //       fill: true,
            //     },
            //     {
            //       label: 'My Second dataset',
            //       backgroundColor: 'transparent',
            //       borderColor: getStyle('--cui-success'),
            //       pointHoverBackgroundColor: getStyle('--cui-success'),
            //       borderWidth: 2,
            //       data: [
            //         random(50, 200),
            //         random(50, 200),
            //         random(50, 200),
            //         random(50, 200),
            //         random(50, 200),
            //         random(50, 200),
            //         random(50, 200),
            //       ],
            //     },
            //     {
            //       label: 'My Third dataset',
            //       backgroundColor: 'transparent',
            //       borderColor: getStyle('--cui-danger'),
            //       pointHoverBackgroundColor: getStyle('--cui-danger'),
            //       borderWidth: 1,
            //       borderDash: [8, 5],
            //       data: [65, 65, 65, 65, 65, 65, 65],
            //     },
            //   ],
            // }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                    <CTableHeaderCell>Usage</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last login</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
