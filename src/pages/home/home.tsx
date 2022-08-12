import { Button, Layout, Modal} from '@douyinfe/semi-ui'
import { IconLanguage,IconMoon,IconSun} from '@douyinfe/semi-icons'
import StarMaskOnboarding from "@starcoin/starmask-onboarding"
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {setIsStarMaskInstalled,setStarcoinAccount,setNetwork,systemStateType} from "../../store/reducers/systemReducer"
import { useDispatch, useSelector } from 'react-redux'
import routers  from '../../routers'
import LogoImg from "../../static/logo.svg"
import starMaskLogo from "../../static/stc.svg"
import installImg from "../../static/install.svg"
import './style.scss'
import { providers } from '@starcoin/starcoin'


//starcoin 全局变量
const EmployeeWindow = window as any
const starcoin = EmployeeWindow.starcoin


const Home=()=>{
  const { Header, Content} = Layout;
  const systemState = useSelector<{system:systemStateType}>(state=>state.system)
  const dispatch = useDispatch()
  const networkList:{[propName:string]:any}={
    "1":"Starcoin 主网络",
    "251":'Barnard 测试网络',
    "252":'Proxima 测试网络',
    "253":'Halley 测试网络'
  }

  const {isStarMaskInstalled,account,network} = systemState as systemStateType
  const [isInstall,setIsInstall] = useState(false)
  const [themeMode,setThemeMode] = useState(localStorage.getItem('theme-mode'))
  let starcoinProvider: providers.Web3Provider
  

 
  useEffect(()=>{
    const is = StarMaskOnboarding.isStarMaskInstalled()
    dispatch(setIsStarMaskInstalled(is))
    console.log(is && starcoin.isConnected())
    if(is){
      // 连接远程节点
      try {
        if (starcoin) {
          // eslint-disable-next-line
          starcoinProvider = new providers.Web3Provider(starcoin, 'any')
          handleNewNetwork()
        }
      } catch (error) {
        console.error(error)
      }

      //更新账号
      if(starcoin.isConnected()){
        dispatch(setStarcoinAccount(starcoin.selectedAddress))
      }
    }
    
   
    starcoin.on('connect', handelConnectStarMaskSucc);
    starcoin.on('accountsChanged',handleNewAccounts) 
    starcoin.on('networkChanged', handleNewNetwork)
    // eslint-disable-next-line
  },[]) 


  //已链接到钱包
  const handelConnectStarMaskSucc=()=>{
    if(starcoin.isConnected()){
      dispatch(setStarcoinAccount(starcoin.selectedAddress))
      handleNewNetwork()
    }
  }

  //钱包账号切换
  const handleNewAccounts=()=>{ 
    dispatch(setStarcoinAccount(starcoin.selectedAddress))
  }

  //钱包网络切换
  const handleNewNetwork=async ()=>{
    const network = await starcoinProvider.getNetwork()
    dispatch(setNetwork(network.chainId))
  }


  const openInstallUrl=()=>{
    window.open("https://chrome.google.com/webstore/detail/starmask/mfhbebgoclkghebffdldpobeajmbecfk","_blank")
    setIsInstall(true)
  }


  //连接到钱包
  const connectStarMask = async ()=>{
    const is = StarMaskOnboarding.isStarMaskInstalled()
    if(!is){
      dispatch(setIsStarMaskInstalled(false));
      return
    }
    dispatch(setIsStarMaskInstalled(is));
    try {
      const newAccounts = await starcoin.request({
        method: 'stc_requestAccounts',
      })
        console.log("连接成功",newAccounts)
        dispatch(setStarcoinAccount(newAccounts[0]))
      } catch (error) {
        console.log("连接失败，请重新操作")
      }
  }


  //切换主题
  const switchTheme=()=>{
    const body = document.body;
    if (body.hasAttribute('theme-mode')) {
        body.removeAttribute('theme-mode')
        localStorage.setItem("theme-mode",'')
        setThemeMode('')
    } else {
        body.setAttribute('theme-mode', 'dark')
        localStorage.setItem("theme-mode",'dark')
        setThemeMode('dark')
    }
  }

  const renderStarMaskModal=()=>{
    return(
      <Modal
          header={null}
          footer={null}
          visible={!isStarMaskInstalled}
          closeOnEsc={false}
          centered={true}
          height={450}
          width={380}
      >
          {
            isInstall===false?
              <div className='installModalContent'>
                <img className='starMaskLogo' src={starMaskLogo} alt="StarMask" />
                <h3 style={{textAlign: 'center', fontSize: 30,fontWeight:'bold',marginTop:20}}>StarMask</h3>
                <p className='installTips'>您尚未安装 StarMask 插件钱包</p>
                <Button 
                  size='large' 
                  theme='solid' 
                  type='primary' 
                  style={{ borderRadius: 8,marginTop:50,padding:"25px 30px"}}
                  onClick={
                    ()=>{openInstallUrl()}
                  }
                >下载 StarMask 插件钱包</Button>
              </div>
            :
              <div className='installModalContent'>
                <img style={{width:300}}  src={installImg} alt="StarMask" />
                <h3 style={{textAlign: 'center', fontSize: 18,fontWeight:'bold',marginTop:15}}>已完成插件安装？</h3>
                <Button 
                  size='large' 
                  theme='solid' 
                  type='primary' 
                  style={{ borderRadius: 8,marginTop:40,padding:"22px 45px"}}
                  onClick={()=>{
                    connectStarMask()

                  }}
                >连接钱包</Button>
                <p className='actionBtns'>
                  <span>还未安装?</span> 
                  <span 
                    style={{color:'#0064fa',marginLeft:10,cursor:'pointer'}}
                    onClick={
                      ()=>{openInstallUrl()}
                    }
                  >点击下载</span>
                </p>
              </div>
          }
          
      </Modal>
    )
  }

  

  return(
    <Layout className='layout'>
        <Header className='header'>
          <div className='logo'>
            <img className='logimg' src={LogoImg} alt="starcoin" />
            <span className='app-title'>Starcoin Dapps</span>
          </div>
          <div className='header-right'>
            <Button 
              onClick={switchTheme} 
              style={{marginRight:10}} 
              theme='borderless' 
              type='tertiary' 
              icon={ themeMode===''?<IconMoon size='large' />: <IconSun  size='large' />} 
              aria-label="暗色模式" 
            />
         
            <Button theme='borderless' type='tertiary' style={{marginRight:10}} >
              <span className='language-btn'>
                <IconLanguage size='large' />
                <span style={{fontSize:15,fontWeight:'bold'}}>CN</span>
              </span>
            </Button>
            
            <Button   type='tertiary' style={{marginRight:10}}>{ network!==''? networkList[network]:"未连接到网络"}</Button>
            
            {
              account===""? <Button onClick={connectStarMask} theme='solid' style={{borderRadius:5}} type='primary'>连接钱包</Button>:null
            }
           
          </div>
        </Header>
        <Layout>
            <Content className='content-main'>
              <Routes>
                {
                  routers[0].children.map((item,index)=>(<Route  key={item.path} path={item.path} element={<item.component></item.component>}/>))
                }
              </Routes>
            </Content>
            {renderStarMaskModal()}
        </Layout>
        {/* <Footer>Footer</Footer> */}
    </Layout>
  )
}
export default Home
