import React from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import TechnologywritePage from "./views/TechnologywritePage"
import NormalwritePage from "./views/NormalwritePage"
const { Header, Sider, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {} // You can also pass a Quill Delta here
  }
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render(){
    return (
      <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>首页</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>普通文章</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>技术文章</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
             <div>
              <Switch>
                <Route exact path="/" render={()=><div>HomePage</div>} />
                <Route path="/technologywrite" component= {TechnologywritePage}/>
                <Route path="/normalwrite" component= {NormalwritePage}/>
                
              </Switch>
             </div>
            </Content>
          </Layout>
        </Layout>
    );
  }
}



class Router extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    )
  }
}
export default Router;
