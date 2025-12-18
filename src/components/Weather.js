import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import axios from "axios";
import {useEffect,useState} from 'react';
import moment from 'moment/moment';
import 'moment/min/locales';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux'
import { changeResult} from '../features/weatherApiSlice'
moment.locale('ar');


let cancelAxios=null
export default function Weather(){
const dispatch = useDispatch()
const result = useSelector((state) =>{
  console.log('the state is ',state)
  return state.result;
})



    const[DataAndTime,setDataAndTime]=useState("");
    const { t, i18n } = useTranslation();
  const[temp,setTemp]=useState({
    number:null,
    description:'',
    minTemp:null,
    maxTemp:null,
    icon:null
  });
  const [local,setLocal]=useState('ar')
  useEffect(()=>{
          i18n.changeLanguage(local);
  },[])
    useEffect(()=>{  
      dispatch(changeResult())
      setDataAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));

  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=5ac64d67625099cfe2dab3030a9d6a10`
     ,{ cancelToken:new axios.CancelToken((c)=>{
      cancelAxios=c;

     })}
  )
    .then(response => {
      const responseTemp=Math.round(response.data.main.temp -272.15);
      const min=Math.round(response.data.main.temp_min-272.15);
      const max=Math.round(response.data.main.temp_max-272.15);
      const description=response.data.weather[0].description;
      const responseIcon=response.data.weather[0].icon;
      setTemp({number:responseTemp,
        description:description,
        minTemp:min,
        maxTemp:max,
      icon:`https://openweathermap.org/img/wn/${responseIcon}@2x.png`})

    })
    .catch(error => {
      console.error( error);
    });
    return ()=>{
      cancelAxios();
    }
  
    },[]);
    function handelLangugeClick(){
      if(local=='en'){
     setLocal('ar')
    i18n.changeLanguage('ar')
  moment.locale('ar');}
    else{
      setLocal('en')
      i18n.changeLanguage('en')
      moment.locale('en');
    }
    setDataAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }
  return (
    <>
      <Container maxWidth="sm">
        {/* content container */}
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection:'column'
          }}
        >
          <div
            style={{
              width: '100%',
              direction:local =='ar'?'rtl':'ltr',
              backgroundColor: "#2f69b3",
              color: 'white',
              padding: '10px',
              borderRadius: "15px",
              boxShadow: '0px 7px 1px rgba(0,0,0,0.5)'
            }}
          >
            {/* content  */}
            <div>
              {/* city && time */}
              <div
                style={{
                  display: 'flex',
                  direction: local =='ar'?'rtl':'ltr',
                  alignItems: 'end',
                  justifyContent: "start"
                }}
              >
                <Typography variant="h2" style={{ 
                    marginRight: '20px' ,
                    fontWeight:'600'}}>
                       {t('Cairo')}
                </Typography>
                <Typography variant="h5" style={{ marginRight: '20px' }}>
                     {DataAndTime}
                </Typography>
              </div>
              {/* end city && time */}

              <hr />

              {/* Degree&&Description */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                
                {/* النصوص: 38 - broken clouds - الصغرى/الكبرى */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    
                  {/* TEMP */}
                  <Typography variant="h1" style={{ textAlign: 'center' }}>
                    {temp.number}
                  </Typography>
                  <img src={temp.icon}></img>
                  {/* end TEMP */}
</div>

                  {/* Description */}
                  <Typography variant="h6" style={{ textAlign: 'center' }}>
                   {t( temp.description)}
                  </Typography>

                  {/* MIN && MAX TEMP */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <h5 style={{ margin: '4px 0' }}>{t("min")}: {temp.minTemp}</h5>
                    <h5 style={{ margin: '4px 0' }}>{t("max")} {temp.maxTemp}</h5>
                  </div>
                  {/*End MIN && MAX TEMP */}

                </div>

                {/* Cloud Icon جنبهم */}
                <CloudIcon style={{ fontSize: "200px", color: 'white' }} />

              </div>
              {/* end Degree&&Description */}

            </div>
            {/*-- content  */}
          </div>
        <div style={{display:'flex' ,justifyContent:'end',
            direction:local =='ar'?'rtl':'ltr',width:'100%',marginTop:'20px'
        }}>
            <Button variant="text" style={{
                color:'white'}} onClick={handelLangugeClick}>
                  {local=='en'?'Arabic':'انجليزي'}
                  </Button>
        </div>
        </div>
        {/* end content container */}
      </Container>
    </>
  );
}
