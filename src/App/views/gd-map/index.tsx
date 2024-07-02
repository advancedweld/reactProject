import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import AMapLoader from '@amap/amap-jsapi-loader'
import styles from './style.module.css'

const AMAP_SECRET = '44b048c7633e913ced8eae81973ac5ee'
const AMAP_KEY = '6bd5bbf7da5073b454728cd23a23e8ac'
export default function MapContainer() {
  const [pos, setPos] = useState({
    lng: 116.397428, // 经度
    lat: 39.90923, // 纬度
  })
  const amapRef = useRef<any>(null)
  const geolocationRef = useRef<any>(null)
  const getMyLoction = () => {
    if (geolocationRef.current) {
      const onComplete = (data: any) => {
        console.log('🚀 ~ onComplete ~ data:', data)
      }

      const onError = (data: any) => {
        console.log('🚀 ~ onError ~ data:', data)
        // 定位出错
      }
      geolocationRef.current.getCurrentPosition(function (status, result) {
        if (status === 'complete') {
          onComplete(result)
        } else {
          onError(result)
        }
      })
    }
  }

  useEffect(() => {
    let mpInstance: any = null
    window._AMapSecurityConfig = {
      securityJsCode: AMAP_SECRET,
    }
    AMapLoader.load({
      key: AMAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      //  需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
      plugins: ['AMap.Scale', 'AMap.Geolocation'],
    })
      .then((AMap) => {
        amapRef.current = AMap
        //  地图实例
        mpInstance = new AMap.Map('amap-container', {
          // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          center: [116.397428, 39.90923], // 初始化地图中心点位置
        })
        // 地理位置插件实例
        geolocationRef.current = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          timeout: 10000, // 设置定位超时时间，默认：无穷大
          offset: [10, 20], // 定位按钮的停靠位置的偏移量
          zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          position: 'RB', //  定位按钮的排放位置,  RB表示右下
        })
      })
      .catch((e) => {
        console.log('@@@@laod error', e)
      })

    return () => {
      console.log('@@@@amap xiezai')
      mpInstance?.destroy()
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <div className={styles.pannel}>
        <Button onClick={getMyLoction}>定位到当前位置</Button>
      </div>
      <div id='amap-container' className={styles.container} style={{ height: '500px' }}></div>
    </div>
  )
}
