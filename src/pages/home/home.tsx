import { Button, Layout} from '@douyinfe/semi-ui';
import { IconLanguage,IconMoon} from '@douyinfe/semi-icons';
import LogoImg from "../../static/logo.svg";
import './style.scss';
const Home=()=>{
  const { Header, Content,Sider} = Layout;
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
            <Button theme='solid' style={{borderRadius:5}} type='primary'>连接钱包</Button>
          </div>
        </Header>
        <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
        </Layout>
        {/* <Footer>Footer</Footer> */}
    </Layout>
  )
}
export default Home
