import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TableContent from './table';

const TabHeader = () => {
    return (
        <Tabs
            defaultActiveKey="user"
            id="uncontrolled-tab-example"
            className="mb-3 mt-3"
        >
            <Tab eventKey="user" title="User">
                <TableContent/>
            </Tab>
            <Tab eventKey="blog" title="Blog">
                Tab content for Blog
            </Tab>
        </Tabs>
    )
}

export default TabHeader
