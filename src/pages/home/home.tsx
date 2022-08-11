import { Button, Dropdown, Layout, Modal} from '@douyinfe/semi-ui'
import { IconLanguage,IconMoon} from '@douyinfe/semi-icons'
import { DropDownMenuItem } from '@douyinfe/semi-ui/lib/es/dropdown'
import StarMaskOnboarding from "@starcoin/starmask-onboarding"
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {setIsStarMaskInstalled,systemStateType} from "../../store/reducers/systemReducer"
import { useDispatch, useSelector } from 'react-redux'
import routers  from '../../routers'
import LogoImg from "../../static/logo.svg"
import starMaskLogo from "../../static/stc.svg"
import installImg from "../../static/install.svg"
import './style.scss'


//starcoin 全局变量
const EmployeeWindow = window as any
const starcoin = EmployeeWindow.starcoin


const Home=()=>{
  const { Header, Content} = Layout;
  const systemState = useSelector<{system:systemStateType}>(state=>state.system)
  const dispatch = useDispatch()
  const menu:DropDownMenuItem[] = [
    { node: 'title', name: '网络'},
    { node: 'item', name: 'Starcoin 主网络'},
    { node: 'item', name: 'Barnard 测试网络'},
    { node: 'item', name: 'Proxima 测试网络'},
    { node: 'item', name: 'Halley 测试网络'}
  ];

  const {isStarMaskInstalled} = systemState as systemStateType
  const [isInstall,setIsInstall] = useState(false)
  
  
 
  useEffect(()=>{
    const is = StarMaskOnboarding.isStarMaskInstalled()
    dispatch(setIsStarMaskInstalled(is))
   
  },[dispatch])

 

  const openInstallUrl=()=>{
    window.open("https://chrome.google.com/webstore/detail/starmask/mfhbebgoclkghebffdldpobeajmbecfk","_blank")
    setIsInstall(true)
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
                    window.location.reload()
                  }}
                >刷新以连接</Button>
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

  //连接到钱包
  const connectStarMask = async ()=>{
    const is = StarMaskOnboarding.isStarMaskInstalled()
    if(!is){
      dispatch(setIsStarMaskInstalled(false));
      return
    }

    try {
      const newAccounts = await starcoin.request({
        method: 'stc_requestAccounts',
      })
        window.console.log("连接成功",newAccounts)
      } catch (error) {
        window.console.log("连接失败，请重新操作")
      }
  }

  

  return(
    <Layout className='layout'>
        <Header className='header'>
          <div className='logo'>
            <img className='logimg' src={LogoImg} alt="starcoin" />
            <span className='app-title'>Starcoin Dapps</span>
          </div>
          <div className='header-right'>
          {/* <IconSun /> */}
            <Button style={{marginRight:10}} theme='borderless' type='tertiary' icon={<IconMoon size='large' />} aria-label="暗色模式" />
         
            <Button theme='borderless' type='tertiary' style={{marginRight:10}} >
              <span className='language-btn'>
                <IconLanguage size='large' />
                <span style={{fontSize:15,fontWeight:'bold'}}>CN</span>
              </span>
            </Button>

            <Dropdown trigger={'click'} showTick position={'bottom'} menu={menu}>
                <Button   type='tertiary' style={{marginRight:10}}>Starcoin 主网络</Button>
            </Dropdown>

            <Button onClick={connectStarMask} theme='solid' style={{borderRadius:5}} type='primary'>连接钱包</Button>
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
