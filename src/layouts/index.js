import React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { localeData } from 'moment';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {

  state = {
    collapsed: false,
    openKeys: [],
  };
  rootSubmenuKeys = ['order', 'product', 'category', 'user'];

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  componentWillMount() {
    const {location} = this.props;
    if (location.pathname.indexOf('order') > -1) {
      this.setState({ openKeys: ['order'] })
    }
    if (location.pathname.indexOf('product') > -1) {
      this.setState({ openKeys: ['product'] })
    }
    if (location.pathname.indexOf('category') > -1) {
      this.setState({ openKeys: ['category'] })
    }
    if (location.pathname.indexOf('user') > -1) {
      this.setState({ openKeys: ['user'] })
    }
  }

  // 菜单收起
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { location, children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div style={{ height: '65px' }} />
          <Menu theme="dark" mode="inline"
            defaultSelectedKeys={[location.pathname]}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
            <SubMenu
              key="order"
              title={
                <span>
                  <Icon type="switcher" />
                  <span>订单管理</span>
                </span>
              }
            >
              <Menu.Item key="/order/new">
                <Link to="/order/new">
                  <Icon type="dollar" />
                  <span>新增订单</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/order/old">
                <Link to="/order/old">
                  <Icon type="history" />
                  <span>历史订单</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="product"
              title={
                <span>
                  <Icon type="block" />
                  <span>商品管理</span>
                </span>
              }
            >
              <Menu.Item key="/product/new">
                <Link to="/product">
                  <Icon type="shopping-cart" />
                  <span>在售商品</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/product/old">
                <Link to="/product">
                  <Icon type="shopping" />
                  <span>下架商品</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="category"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>品类管理</span>
                </span>
              }
            >
              <Menu.Item key="/category/new">
                <Link to="/product">
                  <Icon type="bars" />
                  <span>分类管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/category/tags">
                <Link to="/product">
                  <Icon type="tags" />
                  <span>标签商品</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="user"
              title={
                <span>
                  <Icon type="team" />
                  <span>用户管理</span>
                </span>
              }
            >
              <Menu.Item key="/user/customer">
                <Link to="/product">
                  <Icon type="user-delete" />
                  <span>客户信息</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/user/author">
                <Link to="/product">
                  <Icon type="user-add" />
                  <span>作者信息</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <h1 style={{ padding: '0 16px' }}>欢迎使用后台管理系统</h1>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/*<Breadcrumb.Item>用户管理</Breadcrumb.Item>*/}
              {/*<Breadcrumb.Item>员工查询</Breadcrumb.Item>*/}
            </Breadcrumb>
            <div style={{ padding: '24px', background: '#fff', minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            后台管理系统 Design ©2019 Created by mwangli
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
