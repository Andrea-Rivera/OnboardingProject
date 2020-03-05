import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class NavBar extends Component {
    state = { }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render() {
        const { activeItem } = this.state

        return (
            <Segment inverted>
                <Menu inverted secondary>

                    <Menu.Item header as={Link} exact to="/" children="CustomerIndex" />
                    <Menu.Item header as={Link} exact to="/Products" children="ProductIndex" />
                    <Menu.Item header as={Link} exact to="/Stores" children="Stores" />
                    <Menu.Item header as={Link} exact to="/Sales" children="Sales" />
                     
                </Menu>
            </Segment>
        )
    }
}

export default NavBar