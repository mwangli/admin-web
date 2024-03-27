import { Component } from 'react';
import { Drawer, Divider, Col, Row } from 'antd';

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
    </p>
        {content}
    </div>
);

class DrawerInfo extends Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <span>
                <a onClick={this.showDrawer} >
                    详情
                </a>
                <Drawer
                    width={540}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p style={{ ...pStyle, marginBottom: 24 }}>订单详情</p>
                    <p style={pStyle}>商品信息</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="商品名称" content="测试商品名称" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="商品价格" content="9.9" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="商品规格" content="66*78cm" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="商品作者" content="作者甲" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="商品分类" content="分类一" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="商品标签" content="标签二" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="商品描述"
                                content="这是一段商品描述......"
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>客户信息</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="客户名称" content="张山" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="客户性别" content="男" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="联系电话" content="123456789" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="物流单号" content={"ST321512666622"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="收获地址"
                                content="
                                很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的地址
                                "
                            />
                        </Col>
                    </Row>
                </Drawer>
            </span>
        );
    }
}
export default DrawerInfo